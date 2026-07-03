-- ============================================================
-- Client Intake — Supabase Migration
-- Run this once in the Supabase SQL Editor
-- ============================================================

create table if not exists client_intakes (
  id text primary key,
  client_name text not null default '',
  client_email text,
  client_phone text,
  business_name text,
  service_ids text[] not null default '{}',
  checklist jsonb not null default '[]',
  notes text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_client_intakes_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_client_intakes_updated_at on client_intakes;
create trigger trg_client_intakes_updated_at
  before update on client_intakes
  for each row execute function update_client_intakes_updated_at();
