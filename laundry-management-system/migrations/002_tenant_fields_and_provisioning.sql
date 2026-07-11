-- Adds the remaining business-creation fields Russell's SaaS-foundation spec calls for
-- (currency, per-branch hours), and extends the signup trigger so staff invites and customer
-- self-registration auto-provision their tenant-scoped row the same way owner signup already
-- auto-provisions a profile. Run against the dedicated LMS Supabase project.

alter table public.businesses
  add column currency text not null default 'PHP';

alter table public.branches
  add column business_hours jsonb not null default '{}';

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_role text := coalesce(new.raw_user_meta_data->>'role', 'customer');
  v_business_id uuid := (new.raw_user_meta_data->>'business_id')::uuid;
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    v_role
  );

  if v_role = 'staff' and v_business_id is not null then
    insert into public.staff_members (business_id, branch_id, profile_id, title)
    values (
      v_business_id,
      (new.raw_user_meta_data->>'branch_id')::uuid,
      new.id,
      coalesce(new.raw_user_meta_data->>'title', '')
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
