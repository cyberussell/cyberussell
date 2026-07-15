# TMS Production Audit + Remediation — v2

**Date:** 2026-07-15
**Product:** Territory Management System (TMS)
**Feature:** Russell asked for a fresh audit, fixes, and a go/no-go verdict — following directly from a same-day audit that found one Critical and several Medium/Low findings, plus two real bugs he hit live (an un-deletable legacy assignment batch, and zero-record territories being blocked entirely).

## Files Modified
- `territory-management-system/migrations/014_legacy_batch_ownership_fix.sql` — **run by Russell**
- `territory-management-system/migrations/015_protect_profile_role_column.sql` — **run by Russell**
- `territory-management-system/migrations/016_rate_limits.sql` — needs to be run
- `territory-management-system/migrations/017_error_logs.sql` — needs to be run
- `territory-management-system/seed-empty-territory.sql` — **run by Russell** (one-off, not numbered)
- `src/app/territory-management-system/actions/group-leader.ts` — legacy-batch delete fix
- `src/app/territory-management-system/actions/auth.ts`, `actions/password.ts`, `actions/publisher.ts` — rate limiting + error logging
- `src/app/territory-management-system/api/health/route.ts` (new)
- `src/lib/territory-management-system/rateLimit.ts`, `errors.ts` (new)
- `src/lib/territory-management-system/modules/assignment/engine.ts`, `queries.ts` — zero-record-territory support
- `src/lib/territory-management-system/modules/assignment/engine.test.ts` (new — first test coverage in TMS)
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx` — empty-territory UX

## Summary of Changes

**Bug 1 — legacy batches un-deletable.** The prior session's Group Leader batch-ownership migration (013) added `created_by`, with DELETE/UPDATE RLS requiring `created_by = auth.uid()`. Any batch created before that migration has `created_by = NULL`, and `NULL = auth.uid()` is never true in SQL — so those batches became permanently stuck. Migration 014 treats a NULL-owner batch as legacy/unowned, manageable by any Group Leader in the congregation (matching pre-013 behavior for those rows only); real owners keep the 013 protection.

**Critical security finding — closed.** `profiles`' only RLS policy ("own profile") was `for all` at row-level only, with no column restriction — any signed-in user could `PATCH` their own `role`/`congregation_id` via the REST API and grant themselves admin access to their own or another congregation. Unlike the same bug class already fixed in the Appointment System/LMS (a billing-tier nuisance there), `role` is the actual `requireRole()` auth gate in TMS, making this a full privilege escalation. Confirmed via full-codebase grep that every real `profiles` write already goes through the service-role client (invites, revoke/restore, the `handle_new_user()` trigger, which runs `security definer`) — migration 015 revokes `INSERT`/`UPDATE` from `authenticated` outright, no legitimate flow broken.

**Bug 2 — zero-record territories blocked entirely.** `calculateAssignment` hard-errored ("No approved records are available") whenever the eligible pool was empty, so a Group Leader could never generate an assignment/QR for a brand-new, unmapped territory — even though the admin territory-picker never disabled selecting one. Fixed: zero records now produces every requested partnership with an empty list instead of an error (`createAssignment` also skips the now-pointless `.insert([])` call). Publisher workspace shows "This territory has no records yet — searching the area and adding new contact records is today's activity" instead of the record-card list, "Sync & Finish" is available immediately (vacuously done — nothing to visit), and territory maps are additionally gated on the territory actually having section/block structure. Seeded a real test territory (0 records, 4 sections, 6 blocks each) to verify.

**Remaining audit findings — closed.** TMS was the only one of the three Supabase-backed products (LMS, Appointment System, TMS) with zero rate limiting, zero error tracking, no health endpoint, and no tests. Brought it to parity: fixed-window `rate_limits` table + `checkRateLimit()`/`clientIp()` (same pattern as the other two products) wired into login, password reset, and all 8 unauthenticated publisher actions; `error_logs` table + `logError()` wired into every publisher-action catch block; `GET /territory-management-system/api/health`; 6 new vitest cases for the assignment engine, including a regression guard for the zero-record fix.

`npx tsc --noEmit`, `npx next build`, and `npx vitest run` (engine suite) all clean. Deployed to production across 3 commits this session (`82a3827`, `fe5c744`).

## Remaining Work
None planned. Every finding from the original audit is now either fixed or was re-verified as a non-issue.

## Known Issues
Migrations 016 (`rate_limits`) and 017 (`error_logs`) haven't been confirmed run yet — both fail open/silently no-op until then (rate limiting and error logging simply don't do anything, nothing breaks). Migrations 011 (`partnership_admin_note`) and 012 (`removal_recommendation`) from the earlier same-day session were also never explicitly confirmed run — still an open question.

## Next Recommended Task
Russell runs migrations 016 and 017 (and confirms 011/012 status), then live-verifies: the previously-stuck legacy batch can now be deleted; generating an assignment against the new zero-record seed territory succeeds and shows the new empty-state messaging; a burst of rapid publisher-form submissions gets rate-limited past the configured threshold; a deliberately-triggered publisher-action failure shows up in `error_logs`.
