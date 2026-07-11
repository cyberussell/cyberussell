-- Repair migration: live-verification of Delivery Management found that owner-initiated
-- INSERTs into `drivers` fail with "new row violates row-level security policy", even
-- though the policy SQL in 012 is identical in shape to every other is_business_owner()/
-- is_business_staff() table (orders, inventory_items, customers, etc.) which all work
-- correctly. This is the same failure mode phase 2 hit for `orders`/`inventory_items`
-- (fixed by 003b) — 012's policies for `drivers` likely didn't fully apply when first run.
--
-- Safe to run even if some or all of these policies already exist — each is dropped first.
-- Run against the dedicated LMS Supabase project's SQL Editor.

drop policy if exists "owner manages drivers" on public.drivers;
drop policy if exists "staff manages drivers" on public.drivers;

create policy "owner manages drivers" on public.drivers
  for all using (public.is_business_owner(business_id)) with check (public.is_business_owner(business_id));
create policy "staff manages drivers" on public.drivers
  for all using (public.is_business_staff(business_id)) with check (public.is_business_staff(business_id));
