-- ============================================================
-- Subscribers — Supabase Migration
-- Run this once in the Supabase SQL Editor
-- ============================================================

create table if not exists subscribers (
  id text primary key,
  name text not null default '',
  email text not null unique,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create index if not exists idx_subscribers_created_at on subscribers (created_at desc);
