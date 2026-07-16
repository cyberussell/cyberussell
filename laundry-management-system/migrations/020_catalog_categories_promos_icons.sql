-- Splits the flat service_catalog_items list (name + price only, since
-- migration 018) into real laundry categories: Washing/Drying/Wash & Dry/Fold
-- priced per load, Dry Cleaning priced per individual piece, and Add-ons
-- (detergent, softener, plastic bag) priced per piece. Adds a per-item icon
-- (a custom upload overriding a category default chosen in app code, so
-- "no icon stored yet" always has a sensible fallback) and a simple
-- scheduled percent/fixed promo — the "less price this week" ask.

alter table public.service_catalog_items
  add column category text not null default 'wash'
    check (category in ('wash', 'dry', 'wash_dry', 'fold', 'dry_clean', 'addon')),
  add column unit text not null default 'load'
    check (unit in ('load', 'piece')),
  add column icon_key text,
  add column icon_url text,
  add column promo_type text check (promo_type in ('percent', 'fixed')),
  add column promo_value numeric(10,2) check (promo_value >= 0),
  add column promo_starts_at timestamptz,
  add column promo_ends_at timestamptz,
  add constraint service_catalog_items_promo_pair_check
    check ((promo_type is null) = (promo_value is null));

-- Public bucket, same shape as business-logos (013) — icons are small and
-- meant to render on the POS grid/catalog manager without a signed URL.
-- Write access is still locked down below via RLS on storage.objects.
insert into storage.buckets (id, name, public)
values ('service-icons', 'service-icons', true)
on conflict (id) do nothing;

-- Files are stored as `{business_id}/{catalog_item_id}.<ext>` —
-- storage.foldername(name) splits the object path into segments, so
-- segment [1] is the business_id, same convention as business-logos.
create policy "owner manages own catalog icons" on storage.objects
  for all
  using (bucket_id = 'service-icons' and public.is_business_owner((storage.foldername(name))[1]::uuid))
  with check (bucket_id = 'service-icons' and public.is_business_owner((storage.foldername(name))[1]::uuid));

create policy "public reads catalog icons" on storage.objects
  for select
  using (bucket_id = 'service-icons');

-- Re-defines create_walk_in_order_with_items (018) to apply an active promo
-- window, if any, to the price looked up for each line item — this is what
-- actually charges the discounted price at order time, not just a cosmetic
-- POS display. A null promo_starts_at/promo_ends_at means "always started"/
-- "never ends" respectively. Fixed discounts are floored at 0 so a stale or
-- oversized promo_value can never make a line item negative.
create or replace function public.create_walk_in_order_with_items(
  p_business_id uuid,
  p_branch_id uuid,
  p_customer_id uuid,
  p_assigned_staff_id uuid,
  p_walk_in_name text,
  p_walk_in_phone text,
  p_weight_kg numeric,
  p_expected_completion_at timestamptz,
  p_payment_status text,
  p_notes text,
  p_created_by uuid,
  p_pickup_requested boolean,
  p_pickup_address text,
  p_pickup_scheduled_at timestamptz,
  p_items jsonb
)
returns table (order_id uuid, order_number text)
language plpgsql
as $$
declare
  v_order_id uuid;
  v_order_number text;
  v_item jsonb;
  v_name text;
  v_price numeric(10,2);
  v_promo_type text;
  v_promo_value numeric(10,2);
  v_promo_starts_at timestamptz;
  v_promo_ends_at timestamptz;
  v_effective_price numeric(10,2);
begin
  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'An order must have at least one item.';
  end if;

  insert into public.orders (
    business_id, branch_id, customer_id, assigned_staff_id, walk_in_name, walk_in_phone,
    service_label, amount, weight_kg, expected_completion_at, payment_status, notes, created_by,
    pickup_requested, pickup_address, pickup_scheduled_at
  ) values (
    p_business_id, p_branch_id, p_customer_id, p_assigned_staff_id, p_walk_in_name, p_walk_in_phone,
    '', 0, p_weight_kg, p_expected_completion_at, p_payment_status, p_notes, p_created_by,
    p_pickup_requested, p_pickup_address, p_pickup_scheduled_at
  ) returning id, public.orders.order_number into v_order_id, v_order_number;

  for v_item in select * from jsonb_array_elements(p_items) loop
    select sci.name, sci.price, sci.promo_type, sci.promo_value, sci.promo_starts_at, sci.promo_ends_at
    into v_name, v_price, v_promo_type, v_promo_value, v_promo_starts_at, v_promo_ends_at
    from public.service_catalog_items sci
    where sci.id = (v_item->>'catalog_item_id')::uuid
      and sci.business_id = p_business_id
      and sci.active = true;

    if not found then
      raise exception 'Catalog item % not found for this business.', v_item->>'catalog_item_id';
    end if;

    v_effective_price := v_price;
    if v_promo_type is not null
       and now() >= coalesce(v_promo_starts_at, '-infinity'::timestamptz)
       and now() <= coalesce(v_promo_ends_at, 'infinity'::timestamptz)
    then
      if v_promo_type = 'percent' then
        v_effective_price := greatest(v_price * (1 - v_promo_value / 100), 0);
      else
        v_effective_price := greatest(v_price - v_promo_value, 0);
      end if;
    end if;

    insert into public.order_items (order_id, catalog_item_id, name, unit_price, quantity)
    values (v_order_id, (v_item->>'catalog_item_id')::uuid, v_name, v_effective_price, (v_item->>'quantity')::int);
  end loop;

  return query select v_order_id, v_order_number;
end;
$$;

revoke all on function public.create_walk_in_order_with_items from public;
grant execute on function public.create_walk_in_order_with_items to authenticated;
