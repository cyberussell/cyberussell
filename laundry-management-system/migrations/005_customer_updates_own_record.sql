-- Same class of gap as 004: `001_init.sql` gave the customer role a SELECT-only
-- policy on `customers` ("customer reads own record"), with no matching UPDATE
-- policy. That's fine as long as customers never edit their own profile — but
-- the Customer Portal's "Update Profile" feature needs it. Adding it now, before
-- shipping the feature, rather than discovering it live like migration 004.

create policy "customer updates own record" on public.customers
  for update using (profile_id = auth.uid()) with check (profile_id = auth.uid());
