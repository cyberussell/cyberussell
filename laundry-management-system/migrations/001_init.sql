-- Laundry Management System schema — run against the DEDICATED LMS Supabase project
-- (not the main cyberussell.com project, not the Appointment System's project).
-- See laundry-management-system/SETUP.md.
--
-- Scope: multi-tenant foundation only (auth, tenants, branches, staff, customers).
-- Order/inventory/booking tables are added in a later migration once that feature work starts.

-- ── Profiles (every signed-in user — owner, staff, or customer; mirrors auth.users) ─────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('owner', 'staff', 'customer')),
  full_name text not null default '',
  phone text not null default '',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Businesses (the tenant root — one laundry business subscription) ────────────────────
create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$'),
  phone text not null default '',
  address text not null default '',
  timezone text not null default 'Asia/Manila',
  plan_tier text not null default 'essential' check (plan_tier in ('essential', 'professional')),
  -- plan_status is flipped manually after payment until billing is wired up
  plan_status text not null default 'trial' check (plan_status in ('trial', 'active', 'suspended')),
  trial_ends_at timestamptz not null default now() + interval '14 days',
  settings jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index businesses_owner_idx on public.businesses (owner_id);

-- ── Branches (a business can run multiple physical branches; pricing is per-branch) ─────
create table public.branches (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  address text not null default '',
  phone text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index branches_business_idx on public.branches (business_id);

-- ── Staff (links a staff profile to the business/branch they work at) ───────────────────
create table public.staff_members (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (business_id, profile_id)
);
create index staff_members_business_idx on public.staff_members (business_id);
create index staff_members_profile_idx on public.staff_members (profile_id);

-- ── Customers (a business's customer list; profile_id is set once they create an account) ─
create table public.customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  full_name text not null default '',
  phone text not null default '',
  email text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now()
);
create index customers_business_idx on public.customers (business_id);
create index customers_profile_idx on public.customers (profile_id);

-- ── Row Level Security ────────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.branches enable row level security;
alter table public.staff_members enable row level security;
alter table public.customers enable row level security;

create policy "own profile" on public.profiles
  for all using (id = auth.uid()) with check (id = auth.uid());

create policy "owner manages business" on public.businesses
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create or replace function public.is_business_owner(b uuid)
returns boolean language sql stable as $$
  select exists (select 1 from public.businesses where id = b and owner_id = auth.uid());
$$;

create or replace function public.is_business_staff(b uuid)
returns boolean language sql stable as $$
  select exists (
    select 1 from public.staff_members
    where business_id = b and profile_id = auth.uid() and active = true
  );
$$;

create policy "owner manages branches" on public.branches
  for all using (public.is_business_owner(business_id)) with check (public.is_business_owner(business_id));
create policy "staff reads branches" on public.branches
  for select using (public.is_business_staff(business_id));

create policy "owner manages staff" on public.staff_members
  for all using (public.is_business_owner(business_id)) with check (public.is_business_owner(business_id));
create policy "staff reads own row" on public.staff_members
  for select using (profile_id = auth.uid());

create policy "owner manages customers" on public.customers
  for all using (public.is_business_owner(business_id)) with check (public.is_business_owner(business_id));
create policy "staff manages customers" on public.customers
  for all using (public.is_business_staff(business_id)) with check (public.is_business_staff(business_id));
create policy "customer reads own record" on public.customers
  for select using (profile_id = auth.uid());
