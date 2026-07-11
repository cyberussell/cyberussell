-- Same root cause as 004, now hitting the customer role: `businesses` had an
-- owner policy and (after 004) a staff policy, but requireCustomerAccess()'s
-- `customers -> business:businesses(*)` join needs a customer-read policy too.
-- Found live while verifying the Customer Portal (2026-07-11) — RLS silently
-- nulled out `business` for every customer login, same failure shape as the
-- staff bug in 004. Uses is_business_customer() added in 006.

create policy "customer reads own business" on public.businesses
  for select using (public.is_business_customer(id));
