-- ============================================================
-- AI Digital Literacy Checker — Supabase Migration
-- Run this once in the Supabase SQL Editor
-- ============================================================

create table if not exists digital_literacy_attempts (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  name text,
  email text,
  overall_score int not null,
  skill_level text not null,
  category_scores jsonb not null,
  answers jsonb not null,
  strengths jsonb not null,
  weaknesses jsonb not null,
  recommendations jsonb not null,
  career_matches jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_dl_attempts_session_id on digital_literacy_attempts(session_id);
create index if not exists idx_dl_attempts_created_at on digital_literacy_attempts(created_at desc);
