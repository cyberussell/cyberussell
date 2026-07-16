-- Converts order-taking from a single free-text service_label + manually
-- entered amount into a real POS-style cart: staff tap items from a
-- business-owned price catalog, quantities build up order_items, and
-- orders.amount/service_label become trigger-maintained totals instead of
-- directly-entered fields. Every existing query that reads orders.amount or
-- service_label (getDashboardStats, listOrders, getReportsData,
-- getBranchPerformance, getCustomerPerformance, getEmployeeProductivity,
-- CustomerDetailView) keeps working unchanged — the trigger is the sole
-- writer of both columns going forward.
--
-- Known, accepted limitation: getRevenueByService/getMonthlyServiceRequests/
-- the "Top services" report in getReportsData group by the single
-- service_label per order — once an order can have multiple items, those
-- three specific breakdowns stop being meaningful (they still run, they're
-- just no longer an accurate per-service split). Deliberately not fixed in
-- this migration; total revenue and every other report stays correct.

create table public.service_catalog_items (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  price numeric(10,2) not null default 0 check (price >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index service_catalog_items_business_idx on public.service_catalog_items (business_id);

alter table public.service_catalog_items enable row level security;

-- Deliberately narrower than inventory_items' owner+staff-both-CRUD: pricing
-- is sensitive, staff select items when taking orders but can't change what
-- things cost.
create policy "owner manages catalog" on public.service_catalog_items
  for all using (public.is_business_owner(business_id)) with check (public.is_business_owner(business_id));
create policy "staff reads catalog" on public.service_catalog_items
  for select using (public.is_business_staff(business_id));

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  -- set null (not cascade) so a later catalog edit/deactivation never
  -- touches historical orders — name/unit_price below are snapshots taken
  -- at order-creation time, independent of the catalog item's current state.
  catalog_item_id uuid references public.service_catalog_items(id) on delete set null,
  name text not null,
  unit_price numeric(10,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  line_total numeric(10,2) generated always as (unit_price * quantity) stored,
  created_at timestamptz not null default now()
);
create index order_items_order_idx on public.order_items (order_id);

alter table public.order_items enable row level security;

-- No business_id column on this table — every policy keys through the
-- parent order via the same is_business_owner/is_business_staff helpers
-- orders itself already uses, matching orders' own owner/staff/customer
-- three-way RLS split.
create policy "owner manages order items" on public.order_items
  for all using (
    exists (select 1 from public.orders o where o.id = order_items.order_id and public.is_business_owner(o.business_id))
  ) with check (
    exists (select 1 from public.orders o where o.id = order_items.order_id and public.is_business_owner(o.business_id))
  );
create policy "staff manages order items" on public.order_items
  for all using (
    exists (select 1 from public.orders o where o.id = order_items.order_id and public.is_business_staff(o.business_id))
  ) with check (
    exists (select 1 from public.orders o where o.id = order_items.order_id and public.is_business_staff(o.business_id))
  );
create policy "customer reads own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and o.customer_id in (select id from public.customers where profile_id = auth.uid())
    )
  );

-- Sole writer of orders.amount/service_label from here on. Plain (not
-- security definer) so the UPDATE below still runs as the invoking user,
-- subject to orders' own RLS policies rather than silently bypassing them —
-- if RLS is ever misconfigured this fails loud instead of quietly writing
-- cross-tenant. Runs AFTER on order_items, which in turn fires orders'
-- existing BEFORE-UPDATE append_order_status_history trigger (008) — that
-- trigger only appends to status_history when status itself changes, and
-- this UPDATE never touches status, so no spurious history entries.
create or replace function public.sync_order_totals_from_items()
returns trigger
language plpgsql
as $$
declare
  v_order_id uuid := coalesce(new.order_id, old.order_id);
  v_amount numeric(10,2);
  v_label text;
begin
  select coalesce(sum(unit_price * quantity), 0) into v_amount
  from public.order_items where order_id = v_order_id;

  select string_agg(name || case when quantity > 1 then ' x' || quantity else '' end, ', ' order by created_at)
  into v_label from public.order_items where order_id = v_order_id;

  update public.orders set amount = v_amount, service_label = coalesce(v_label, service_label)
  where id = v_order_id;

  return null;
end;
$$;

drop trigger if exists order_items_sync_totals_trigger on public.order_items;
create trigger order_items_sync_totals_trigger
  after insert or update or delete on public.order_items
  for each row execute function public.sync_order_totals_from_items();

-- Transactional order+items creation — Supabase's JS client can't span a
-- transaction across two separate .insert() calls from a Server Action, so
-- the whole "insert order header, then insert every line item" sequence
-- lives in one function instead.
--
-- Security-critical: p_items carries ONLY catalog_item_id + quantity, never
-- a name or price. This function is reachable directly via supabase.rpc()
-- from any authenticated session, not only through the app's Server Action
-- — if it trusted a client-supplied price, a staff member could bypass the
-- UI entirely (devtools) and post arbitrary prices, defeating "staff can
-- select items but can't change prices." Price/name are looked up here,
-- authoritatively, by catalog_item_id + business_id + active=true.
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
    select sci.name, sci.price into v_name, v_price
    from public.service_catalog_items sci
    where sci.id = (v_item->>'catalog_item_id')::uuid
      and sci.business_id = p_business_id
      and sci.active = true;

    if not found then
      raise exception 'Catalog item % not found for this business.', v_item->>'catalog_item_id';
    end if;

    insert into public.order_items (order_id, catalog_item_id, name, unit_price, quantity)
    values (v_order_id, (v_item->>'catalog_item_id')::uuid, v_name, v_price, (v_item->>'quantity')::int);
  end loop;

  return query select v_order_id, v_order_number;
end;
$$;

revoke all on function public.create_walk_in_order_with_items from public;
grant execute on function public.create_walk_in_order_with_items to authenticated;
