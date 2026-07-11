-- Repair migration: live-verification of the Owner Dashboard found that owner-initiated
-- INSERTs into `orders` and `inventory_items` fail with "new row violates row-level
-- security policy", even though `businesses`/`branches`/`staff_members`/`customers` (same
-- is_business_owner() pattern, migration 001) work correctly. This means 003's owner/staff
-- policies for these two tables likely didn't fully apply when it was first run.
--
-- Safe to run even if some or all of these policies already exist — each is dropped first.
-- Run against the dedicated LMS Supabase project's SQL Editor.

drop policy if exists "owner manages orders" on public.orders;
drop policy if exists "staff manages orders" on public.orders;
drop policy if exists "customer reads own orders" on public.orders;
drop policy if exists "owner manages inventory" on public.inventory_items;
drop policy if exists "staff manages inventory" on public.inventory_items;

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
