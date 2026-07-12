-- Phase 8e: business logo upload (first pass of the "files & documents" item
-- from the production-readiness roadmap — logo only, receipt PDF is
-- generated in code and needs no schema change).

alter table public.businesses
  add column logo_url text;

-- Public bucket: logos are meant to be visible on receipts/branding without
-- a signed URL. Write access is still locked down below via RLS on
-- storage.objects — public only affects reads.
insert into storage.buckets (id, name, public)
values ('business-logos', 'business-logos', true)
on conflict (id) do nothing;

-- ── Row Level Security (storage.objects) ────────────────────────────────────────────
-- Files are stored as `{business_id}/logo.<ext>` — storage.foldername(name)
-- splits the object path into segments, so segment [1] is the business_id.
create policy "owner manages own logo" on storage.objects
  for all
  using (bucket_id = 'business-logos' and public.is_business_owner((storage.foldername(name))[1]::uuid))
  with check (bucket_id = 'business-logos' and public.is_business_owner((storage.foldername(name))[1]::uuid));

create policy "public reads logos" on storage.objects
  for select
  using (bucket_id = 'business-logos');
