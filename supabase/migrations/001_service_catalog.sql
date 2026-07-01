-- ============================================================
-- Cyberussell Service Catalog — Supabase Migration
-- Run this once in the Supabase SQL Editor
-- ============================================================

-- Services (master table)
create table if not exists services (
  id text primary key,
  service_name text not null,
  slug text unique,
  category text,
  short_description text,
  product_brief text,
  starting_price text,
  estimated_timeline text,
  status text not null default 'draft',
  featured boolean not null default false,
  icon text,
  cover_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Best For
create table if not exists service_best_for (
  id bigserial primary key,
  service_id text not null references services(id) on delete cascade,
  item text not null,
  sort_order int not null default 0
);

-- What's Included
create table if not exists service_inclusions (
  id bigserial primary key,
  service_id text not null references services(id) on delete cascade,
  item text not null,
  sort_order int not null default 0
);

-- What's NOT Included
create table if not exists service_exclusions (
  id bigserial primary key,
  service_id text not null references services(id) on delete cascade,
  item text not null,
  sort_order int not null default 0
);

-- Technology Stack
create table if not exists service_stack (
  id bigserial primary key,
  service_id text not null references services(id) on delete cascade,
  category text not null,
  technology text not null,
  sort_order int not null default 0
);

-- Client Must Provide
create table if not exists service_requirements (
  id bigserial primary key,
  service_id text not null references services(id) on delete cascade,
  item text not null,
  sort_order int not null default 0
);

-- Deliverables
create table if not exists service_deliverables (
  id bigserial primary key,
  service_id text not null references services(id) on delete cascade,
  item text not null,
  sort_order int not null default 0
);

-- Optional Add-ons
create table if not exists service_addons (
  id bigserial primary key,
  service_id text not null references services(id) on delete cascade,
  addon_name text not null,
  description text,
  price text,
  sort_order int not null default 0
);

-- FAQs
create table if not exists service_faqs (
  id bigserial primary key,
  service_id text not null references services(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order int not null default 0
);

-- Internal Notes
create table if not exists service_notes (
  id bigserial primary key,
  service_id text not null references services(id) on delete cascade,
  notes text
);

-- Auto-update updated_at
create or replace function update_services_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_services_updated_at on services;
create trigger trg_services_updated_at
  before update on services
  for each row execute function update_services_updated_at();
