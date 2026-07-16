-- Replaces LMS staff invites' emailed-link flow (admin.inviteUserByEmail(),
-- which always produces implicit-flow links that @supabase/ssr's PKCE-forced
-- browser client can't process — the same root cause fixed for LMS's
-- accept-invite page and TMS's set-password page earlier this session) with
-- the temp-password pattern already proven in Territory Management System's
-- Group Leader invites: an owner sets/generates a password directly, the
-- account is flagged must_change_password, and the very next login is forced
-- onto a change-password screen before reaching the dashboard. No link to
-- expire, no cross-device/cross-browser PKCE mismatch, nothing to deliver by
-- email at all.

alter table public.profiles add column must_change_password boolean not null default false;

-- Sets must_change_password atomically as part of the same trigger-driven
-- insert admin.createUser()'s metadata already drives — unlike TMS's
-- equivalent, LMS's trigger already fully handles staff_members creation
-- from metadata, so no follow-up .update() call (and its associated
-- theoretical race window) is needed for the invite path at all. A reset
-- (existing account, no new insert) still needs one — see
-- resetStaffPassword() in staff/queries.ts.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_role text := coalesce(new.raw_user_meta_data->>'role', 'customer');
  v_business_id uuid := (new.raw_user_meta_data->>'business_id')::uuid;
  v_must_change_password boolean := coalesce((new.raw_user_meta_data->>'must_change_password')::boolean, false);
begin
  insert into public.profiles (id, full_name, role, must_change_password)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    v_role,
    v_must_change_password
  );

  if v_role = 'staff' and v_business_id is not null then
    insert into public.staff_members (business_id, branch_id, profile_id, title, email)
    values (
      v_business_id,
      (new.raw_user_meta_data->>'branch_id')::uuid,
      new.id,
      coalesce(new.raw_user_meta_data->>'title', ''),
      new.email
    );
  elsif v_role = 'customer' and v_business_id is not null then
    insert into public.customers (business_id, profile_id, full_name, phone, email)
    values (
      v_business_id,
      new.id,
      coalesce(new.raw_user_meta_data->>'full_name', ''),
      coalesce(new.raw_user_meta_data->>'phone', ''),
      new.email
    );
  end if;

  return new;
end;
$$;
