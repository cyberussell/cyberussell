-- Phase 7: Professional plan features (Pickup/Delivery Management, Driver
-- Assignment, Priority Queue). Drivers are a separate lightweight roster —
-- not staff_members — since they don't need logins, just a name/phone/vehicle
-- directory the owner assigns to pickup/delivery legs of an order. Pickup and
-- delivery extend the existing orders table with nullable columns rather than
-- new parallel entities, reusing the existing state machine/timeline/detail
-- page instead of duplicating them.

create table public.drivers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  phone text not null default '',
  vehicle_info text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index drivers_business_idx on public.drivers (business_id);

alter table public.orders
  add column is_priority boolean not null default false,
  add column pickup_requested boolean not null default false,
  add column pickup_address text not null default '',
  add column pickup_scheduled_at timestamptz,
  add column pickup_completed_at timestamptz,
  add column delivery_scheduled_at timestamptz,
  add column driver_id uuid references public.drivers(id) on delete set null;

create index orders_priority_idx on public.orders (business_id, is_priority);
create index orders_pickup_idx on public.orders (business_id, pickup_requested, pickup_completed_at);
create index orders_driver_idx on public.orders (driver_id);

-- ── Row Level Security ────────────────────────────────────────────────────────────────
alter table public.drivers enable row level security;

create policy "owner manages drivers" on public.drivers
  for all using (public.is_business_owner(business_id)) with check (public.is_business_owner(business_id));
create policy "staff manages drivers" on public.drivers
  for all using (public.is_business_staff(business_id)) with check (public.is_business_staff(business_id));
