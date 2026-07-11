-- Third instance of the same gap as 004/005: `branches` only ever got owner
-- ("owner manages branches") and staff ("staff reads branches") read policies.
-- The Customer Portal's "View Pickup Schedule" needs a customer to read their
-- own business's branch(es) (for business_hours) — there was no policy letting
-- them do that at all.

create or replace function public.is_business_customer(b uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.customers
    where business_id = b and profile_id = auth.uid()
  );
$$;

create policy "customer reads own business branches" on public.branches
  for select using (public.is_business_customer(business_id));
