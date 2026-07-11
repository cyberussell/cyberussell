-- Orders and inventory foundation for the Owner Dashboard. Simple order model (free-text
-- service label + manually entered amount, no services/pricing catalog table) and walk-in
-- orders can be fully anonymous (customer_id optional). Run against the dedicated LMS
-- Supabase project.

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  branch_id uuid not null references public.branches(id) on delete restrict,
  customer_id uuid references public.customers(id) on delete set null,
  walk_in_name text not null default '',
  walk_in_phone text not null default '',
  service_label text not null,
  amount numeric(10,2) not null default 0,
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'ready', 'completed', 'cancelled')),
  notes text not null default '',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  ready_at timestamptz,
  completed_at timestamptz
);
create index orders_business_idx on public.orders (business_id);
create index orders_business_status_idx on public.orders (business_id, status);
create index orders_business_created_idx on public.orders (business_id, created_at);

create table public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  name text not null,
  unit text not null default 'pcs',
  quantity numeric(10,2) not null default 0,
  low_stock_threshold numeric(10,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index inventory_items_business_idx on public.inventory_items (business_id);

-- ── Row Level Security ────────────────────────────────────────────────────────────────
alter table public.orders enable row level security;
alter table public.inventory_items enable row level security;

create policy "owner manages orders" on public.orders
  for all using (public.is_business_owner(business_id)) with check (public.is_business_owner(business_id));
create policy "staff manages orders" on public.orders
  for all using (public.is_business_staff(business_id)) with check (public.is_business_staff(business_id));
create policy "customer reads own orders" on public.orders
  for select using (
    customer_id in (select id from public.customers where profile_id = auth.uid())
  );

create policy "owner manages inventory" on public.inventory_items
  for all using (public.is_business_owner(business_id)) with check (public.is_business_owner(business_id));
create policy "staff manages inventory" on public.inventory_items
  for all using (public.is_business_staff(business_id)) with check (public.is_business_staff(business_id));
