-- Adds two new service categories (Ironing, Wash & Dry and Fold Combo) and a
-- Services-vs-Add-ons split for the POS grid and every receipt surface.
--
-- order_items.is_addon is a SNAPSHOT taken at order-creation time, same
-- reasoning as the existing name/unit_price snapshots on this table: a
-- catalog item's category could change (or the item could later be
-- deactivated/deleted) after an order is placed, but a historical receipt
-- must keep showing the grouping as it was at order time. A plain boolean
-- rather than duplicating the whole category enum — the receipt only ever
-- needs the binary Services/Add-ons split, nothing more granular.

-- Widen the category check constraint. Looked up dynamically rather than
-- assuming Postgres's default auto-generated constraint name, since it was
-- declared inline (no explicit name) in migration 020.
do $$
declare
  v_constraint_name text;
begin
  select con.conname into v_constraint_name
  from pg_constraint con
  join pg_class rel on rel.oid = con.conrelid
  join pg_attribute att on att.attrelid = con.conrelid and att.attnum = any(con.conkey)
  where rel.relname = 'service_catalog_items'
    and con.contype = 'c'
    and att.attname = 'category';

  if v_constraint_name is not null then
    execute format('alter table public.service_catalog_items drop constraint %I', v_constraint_name);
  end if;
end $$;

alter table public.service_catalog_items
  add constraint service_catalog_items_category_check
  check (category in ('wash', 'dry', 'iron', 'fold', 'wash_dry', 'wash_dry_fold', 'dry_clean', 'addon'));

alter table public.order_items
  add column is_addon boolean not null default false;

-- Re-defines create_walk_in_order_with_items (018, previously re-defined in
-- 020 for promo pricing) to also snapshot is_addon from the catalog item's
-- category at order-creation time.
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
  v_category text;
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
    select sci.name, sci.price, sci.category, sci.promo_type, sci.promo_value, sci.promo_starts_at, sci.promo_ends_at
    into v_name, v_price, v_category, v_promo_type, v_promo_value, v_promo_starts_at, v_promo_ends_at
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

    insert into public.order_items (order_id, catalog_item_id, name, unit_price, quantity, is_addon)
    values (v_order_id, (v_item->>'catalog_item_id')::uuid, v_name, v_effective_price, (v_item->>'quantity')::int, v_category = 'addon');
  end loop;

  return query select v_order_id, v_order_number;
end;
$$;

revoke all on function public.create_walk_in_order_with_items from public;
grant execute on function public.create_walk_in_order_with_items to authenticated;
