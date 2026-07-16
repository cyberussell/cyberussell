-- The Staff table showed "Pending invite" in place of a name for any
-- not-yet-accepted staff member, with no way to tell who was actually
-- invited — staff_members never stored email (only customers did), and the
-- real value lives in auth.users, which the owner-scoped dashboard query
-- can't join against directly. Mirrors the customers.email pattern already
-- established in 001_init.sql/002_tenant_fields_and_provisioning.sql.

alter table public.staff_members add column email text not null default '';

-- Backfill existing rows (invited staff already on record) from auth.users.
update public.staff_members sm
set email = u.email
from auth.users u
where u.id = sm.profile_id
  and sm.email = '';

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
