-- Fixes a pre-existing gap in 001_init.sql: `businesses` only ever got an
-- "owner manages business" policy. Every other tenant-scoped table (branches,
-- staff_members, customers) correctly pairs the owner policy with a
-- "staff reads ..." policy using the existing is_business_staff() helper, but
-- businesses never got one. This silently breaks requireStaffAccess()'s
-- `staff_members` -> `business:businesses(*)` join for every staff login: RLS
-- blocks the nested business row, so `business` comes back null even though
-- the foreign key resolves fine. Found live while building the Staff Portal
-- (2026-07-11) — the first time a real staff session ever hit this join.

create policy "staff reads own business" on public.businesses
  for select using (public.is_business_staff(id));
