-- Phase 8f: audit logs. Records who did what to which entity, for an
-- owner-only Activity History view — mainly staff accountability across
-- order status/assignment/priority changes and destructive deletes.

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  -- References profiles rather than auth.users so the owner-facing Activity
  -- view can embed the actor's name in one query (matches the pattern
  -- staff_members.profile_id already uses).
  actor_id uuid references public.profiles(id) on delete set null,
  actor_role text not null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_logs_business_idx on public.audit_logs (business_id, created_at desc);

alter table public.audit_logs enable row level security;

-- Both roles write (most logged actions are performed by staff), only the
-- owner reads — this is an accountability trail, not something staff review.
create policy "owner and staff log activity" on public.audit_logs
  for insert
  with check (public.is_business_owner(business_id) or public.is_business_staff(business_id));

create policy "owner reads activity log" on public.audit_logs
  for select
  using (public.is_business_owner(business_id));
