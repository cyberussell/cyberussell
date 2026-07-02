-- ============================================================
-- AI Computer Skills Analyzer — Supabase Migration
-- Run this once in the Supabase SQL Editor
-- ============================================================

create table if not exists computer_skills_attempts (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  name text,
  email text,
  overall_score int not null,
  skill_level text not null,
  category_scores jsonb not null,
  task_results jsonb not null,
  strengths jsonb not null,
  weaknesses jsonb not null,
  recommendations jsonb not null,
  career_matches jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_cs_attempts_session_id on computer_skills_attempts(session_id);
create index if not exists idx_cs_attempts_created_at on computer_skills_attempts(created_at desc);
