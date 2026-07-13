# Territory Management System — Production Readiness Audit — v1

**Date:** 2026-07-13
**Product:** Territory Management System (TMS)
**Feature:** Full code-level production audit of the foundation + Administrator module + assignment engine/QR workflow + offline publisher workspace + group-leader dashboard + reports (everything built across this product's prior sessions, recovered from an uncommitted sibling worktree — see `territory-management-foundation-v1.md`) and fixes for every real issue found.

## Files Modified
- `src/lib/territory-management-system/modules/territory/queries.ts`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/assignment/engine.ts`
- `src/lib/territory-management-system/modules/congregation/schema.ts`
- `src/lib/territory-management-system/modules/offline/sync.ts`
- `src/app/territory-management-system/actions/records.ts`
- `src/app/territory-management-system/actions/congregation.ts`
- `src/components/territory-management-system/VisitLogForm.tsx`
- `src/components/territory-management-system/VisitHistoryList.tsx`
- `src/components/territory-management-system/AssignmentForm.tsx`
- `src/components/territory-management-system/dashboard/DataTable.tsx`
- `src/components/territory-management-system/dashboard/FilterPills.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/SyncStatusBar.tsx`
- `src/components/territory-management-system/publisher/AssignedRecordsList.tsx`
- `src/components/territory-management-system/publisher/PublisherVisitLogForm.tsx`

## Files Created
- `src/lib/territory-management-system/modules/records/localTime.ts`
- `src/components/territory-management-system/dashboard/DashboardSkeleton.tsx`
- `src/components/territory-management-system/dashboard/DashboardErrorFallback.tsx`
- `src/app/territory-management-system/dashboard/loading.tsx`, `error.tsx`
- `src/app/territory-management-system/group-leader/dashboard/loading.tsx`, `error.tsx`
- `src/app/territory-management-system/assignment/[batchToken]/loading.tsx`, `error.tsx`

## Summary of Changes

Read every screen, Server Action, query module, and the 3 migrations end-to-end (no code was skipped) and fixed every real issue found:

**Security / data integrity:**
- `addSection`/`addBlock` (territory queries), the manual `createRecordAction` (admin record entry), and `createAssignment`'s territory-selection insert all accepted a client-supplied parent id (territoryId/sectionId) and wrote it straight into a child table with only the caller's own `congregation_id` verified by RLS — never that the parent id itself belonged to that congregation. A tampered hidden form field could plant a section/block/record/batch-territory row referencing another congregation's data (not readable back out, thanks to RLS on the join, but real corruption). Fixed by validating ownership before every such insert — the same check the publisher's RLS-free path (`addPublisherRecordAction`) already correctly did; the admin paths just hadn't matched it.
- `congregations.timezone` accepted any string; an invalid IANA zone would only fail later, deep inside Reports/Assignment date math. Added an `Intl.DateTimeFormat` validity check to the zod schema so it's caught at the settings form instead.
- `updateCongregation`'s unique-constraint violation (duplicate congregation number) surfaced a raw Postgres error string to the admin. Translated to a friendly message.

**Business-rule correctness bugs (from an incomplete migration):** migration 002 replaced the phase-1 placeholder visit-result set (`visited/not_home/do_not_call/return_visit`) with the real 6-value set (`initial_visit/return_visit/bible_study/not_home/do_not_call/moved`), but two display/default spots were never updated to match:
- `VisitLogForm`'s result `<select>` defaulted to `"visited"`, a value that no longer exists in `VISIT_RESULTS` — the browser silently fell back to whatever option rendered first instead of the intended default. Fixed to `"initial_visit"`.
- `VisitHistoryList`'s `RESULT_STYLES` color map only covered the old 4 values — 3 of the 6 real results (`initial_visit`, `bible_study`, `moved`) rendered as an unstyled badge. Rebuilt the map to cover all 6.

**Offline sync correctness:**
- `handleSync` in the publisher workspace had no re-entrancy guard — multiple trigger paths (auto-sync-on-reconnect, plus an immediate sync after every enqueue) could call `flushQueue` concurrently, letting the same queued item be picked up and submitted twice. Added a ref-based lock.
- `flushQueue` treated a plain network failure (offline mid-sync, or the online-status hook's necessarily-optimistic initial value) identically to a genuine server rejection — both flipped the item to `'failed'` and showed a scary "N item(s) failed to sync" toast. Split these: network-shaped exceptions now revert the item to `'pending'` for a silent retry; only real `result.error` rejections are surfaced as failed.
- `SyncStatusBar` conflated pending and failed counts into one "N pending sync" label, so a publisher couldn't tell "still waiting for signal" from "genuinely broken, needs attention." Split into separate pending/failed counts with a distinct failed indicator.
- `AssignedRecordsList` showed a plain green checkmark for any `completed_at` (set optimistically the moment a visit is logged, before sync confirms it), even when that visit's sync had actually failed. Added a distinct warning indicator for records with a failed queue item, so a false "done" isn't presented as fact.

**Missing UX states (explicit audit ask):** no `loading.tsx` or `error.tsx` existed anywhere in the product — a real gap versus LMS, which has this pattern. Added a shared `DashboardSkeleton`/`DashboardErrorFallback` pair for both the admin and group-leader dashboards (mirrors the LMS-proven shape), and a lightweight branded loading/error pair for the public QR-scanned assignment routes, where blank-page-on-slow-connection is most likely to read as a broken link.

**Accessibility:** `DataTable`'s sortable column headers had no `aria-sort`, and its Prev/Next pagination buttons were icon-only with no accessible name. `FilterPills` had no `aria-pressed` on the active filter. All three fixed.

**Duplicate code:** `nowLocalDatetime()` was hand-duplicated verbatim in `VisitLogForm.tsx` and `PublisherVisitLogForm.tsx` — extracted to `modules/records/localTime.ts`. The "6 records max per partnership" number was hardcoded in `AssignmentForm.tsx`'s helper text while the actual engine used a separate `DEFAULT_MAX_PER_PARTNERSHIP` constant — exported the constant and had the form import it, so the UI hint can never drift from real behavior.

**Verified clean:** `npx tsc --noEmit` and `npx next build` both pass with zero errors after every fix, all TMS routes still correctly marked dynamic.

## Remaining Work
- Nothing DB-backed has been live-verified yet — no Supabase project exists for this product. Per the original foundation checkpoint, Russell still needs to provision the dedicated TMS Supabase project, run all 3 migrations in order, and provision a first congregation + admin per `territory-management-system/SETUP.md`.
- Publisher-facing token comparisons (`access_token`/`claim_token`) use ordinary `.eq()` equality, not constant-time comparison. Given 128 bits of entropy per token this is not considered exploitable over a network (timing noise dwarfs any signal), so it was not changed — flagging as a defense-in-depth option only, not a required fix.
- No automated test suite exists for this product (none exists for any product in this codebase yet) — all verification here was `tsc`/`next build` plus manual code tracing, not live-clicked or unit-tested, since there's no database to click against yet.

## Known Issues
None found that weren't fixed. Everything flagged above was corrected in this pass.

## Next Recommended Task
Russell provisions the TMS Supabase project and runs the 3 migrations (`001_init.sql`, `002_assignment_engine.sql`, `003_group_leader_and_reports.sql`) in order, then a full live pass: admin login → create a territory with generated sections/blocks → CSV import → generate an assignment → scan the QR as a publisher (ideally on a real phone, airplane-mode toggle mid-session to exercise the offline queue for real) → log a visit → confirm sync → check Reports and the Group Leader dashboard reflect it. That live pass is the one thing this code-only audit could not cover.
