-- Critical fix, found live while verifying phase 5: querying `businesses`
-- started throwing "stack depth limit exceeded" (infinite recursion),
-- breaking every owner login, not just new phase 5 features.
--
-- Root cause: is_business_owner()/is_business_staff() (from 001_init.sql)
-- were declared as plain `language sql` functions, never `security definer`.
-- Simple single-statement `language sql` functions get INLINED by the
-- Postgres planner rather than treated as an opaque call boundary. Once
-- migration 007 added a policy on `businesses` calling is_business_customer()
-- (which queries `customers`, whose own RLS calls is_business_owner(), which
-- queries `businesses` again), the planner tried to inline that cycle
-- indefinitely: businesses -> customers -> businesses -> customers -> ...
-- This bug was latent since migration 001 — it only became triggerable once
-- enough cross-referencing policies existed to actually close the loop.
--
-- Fix: mark both `security definer` (matching is_business_customer(), which
-- was already declared correctly in 006). Security-definer functions are
-- never inlined, so they act as a real boundary and the cycle can't form.

create or replace function public.is_business_owner(b uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.businesses where id = b and owner_id = auth.uid());
$$;

create or replace function public.is_business_staff(b uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.staff_members
    where business_id = b and profile_id = auth.uid() and active = true
  );
$$;

-- Also pin search_path on the customer-role helper for consistency/safety.
create or replace function public.is_business_customer(b uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.customers
    where business_id = b and profile_id = auth.uid()
  );
$$;
