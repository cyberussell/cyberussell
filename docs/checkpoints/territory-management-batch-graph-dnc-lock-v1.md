# Batch-Scoped Reporting Graph, Undone Bucket, Do Not Call 6-Month Lock — v1

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Russell flagged the Group Leader Home tab's "completed today" breakdown as wrong — it was counting every visit logged today anywhere in the batch's territories, not just this batch's own assigned records, so a second same-day batch on an overlapping territory (e.g. this Group Leader's own overflow batch) inflated the numbers. He also asked for an "Undone" bucket covering records left incomplete when a partnership is force-ended (which deliberately never writes a DB row — see below), a new 6-month Do Not Call lock during which a publisher cannot log any visit at all, and for an ongoing Bible Study's follow-up options to include "Not At Home".

## Investigation / decisions confirmed via AskUserQuestion before touching schema
- **Do Not Call timestamp**: new `territory_records.do_not_call_at` column (migration), auto-maintained by a DB trigger rather than app code, so it stays correct regardless of which path flips `do_not_call` (a logged visit result, an Admin's edit-form checkbox, a publisher's own edit, CSV import).
- **Lock behavior**: fully locked — zero visit options at all — for 6 months from `do_not_call_at`, not just a visual badge.
- **Graph fix scope**: Group Leader Home tab only. The Admin's Reports page (`getReportStats`) is a deliberately broader congregation-wide, multi-day rollup and was left untouched.

## Files Modified

**Migration** — `territory-management-system/migrations/027_do_not_call_lock.sql` (**Russell has not run this yet — required before deploying, see below**): adds `do_not_call_at timestamptz`, a `tms_set_do_not_call_at()` trigger (stamps `now()` the moment `do_not_call` flips true on insert or update, clears it back to null when flipped false), and a one-time backfill (`now()` for any record already flagged, since there's no way to know the real historical date).

**Schema/types**:
- `records/types.ts` — `TerritoryRecord.do_not_call_at: string | null`.
- `records/schema.ts` — `BIBLE_STUDY_FOLLOWUP_RESULTS` gained `'not_home'`. New `DO_NOT_CALL_LOCK_MONTHS = 6`, `doNotCallUnlockDate()`, `isDoNotCallLocked()`. `getSelectableResults()` gained an optional third `doNotCallAt` param — returns `[]` (locked) instead of `DO_NOT_CALL_RESULTS` while still within the window; omitting the param (as the Admin's own call site still does) never locks, preserving Admin's full authority to log a visit regardless — the lock is publisher-only, per the ask ("Publisher will not be able to update the status").

**Publisher-facing lock UI**:
- `PublisherVisitLogForm.tsx` — new `doNotCallAt` prop; renders a "Do Not Call — Locked" notice (with the unlock date) instead of the form when `getSelectableResults` comes back empty.
- `PublisherRecordDetailView.tsx` — passes `doNotCallAt` through; the existing "Do Not Call" line now appends "— locked until [date]" while active.
- `AssignedRecordsList.tsx` — locked records get a lock icon (replacing the usual pending/completed circle) and "Do Not Call (Locked)" in the card's territory/section line.

**Server-side enforcement (defense in depth)**:
- `records/queries.ts` — `getRecordDoNotCall()` now returns `{ doNotCall, doNotCallAt }` instead of a bare boolean.
- `actions/publisher.ts` (`logPublisherVisitAction`) — passes `doNotCallAt` into `getSelectableResults`, so a crafted/stale submission against a locked record is rejected the same way an out-of-range Bible Study result already was.
- `actions/records.ts` (Admin's `logVisitAction`) — updated for the new return shape but deliberately still calls `getSelectableResults` with only 2 args (no lock).

**Batch-scoped graph + Undone/locked-DNC buckets** — `reports/queries.ts`:
- New `getBatchVisitResultCounts()` replaces the territory-wide `getVisitResultCounts` call inside `getBatchStats` specifically. Resolves this batch's actual `partnership_records` (record + owning partnership's `ended_early_at`), looks up each record's most-recent visit *within today's range*, and for any record with none: counts it as `do_not_call` if currently locked (structurally couldn't have been visited), else `undone` if its partnership has ended early, else leaves it uncounted (still in progress — `remainingRecords` already covers that separately).
- `getVisitResultCounts` itself (territory + date-range based) is untouched and still backs `getReportStats`'s congregation-wide rollup, per the confirmed scope decision.

## Verification
`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. Live-verified the client-only pieces via a temporary scratch route (`/dev-scratch-tms-dnc`, mock props, removed before finishing) — couldn't be verified: this dev environment has no live TMS Supabase credentials (standing limitation), so the actual `getBatchVisitResultCounts` query and the DB trigger were reviewed carefully but not round-tripped against a real database. Confirmed:
- A locked DNC record (mock `do_not_call_at` 2 months ago) shows the lock icon + "Do Not Call (Locked)" on its card, and `PublisherVisitLogForm` shows the locked notice with the correct 6-months-later unlock date instead of a dropdown.
- An ongoing-Bible-Study `PublisherVisitLogForm` (`latestResult="bible_study"`) now offers Progressing / Discontinued / Not At Home (Moved stays filtered out here, same as before — that path goes through the separate Mark as Moved flow).
- `VisitResultBarChart` renders an "Undone" bar correctly (already generic over every `VISIT_RESULTS` entry — no chart-side change was needed).

## Remaining Work — migration must be run before this is safe to use
**`027_do_not_call_lock.sql` has NOT been run yet.** Until it is, `getRecordDoNotCall`, `getBatchVisitResultCounts`, and the publisher's own Record a Visit flow all select `do_not_call_at`, a column that won't exist on the live DB — **every "Record a Visit" submission (publisher and Admin) and the Group Leader Home tab will error until the migration runs.** This needs to go out together: Russell should run migration 027 in the TMS Supabase SQL editor as part of, or immediately after, this deploy.

## Next Recommended Task
Russell (1) runs migration 027, (2) confirms a real Do Not Call record locks for a publisher and shows the right unlock date, (3) confirms an ongoing Bible Study now offers Not At Home, (4) checks the Home tab's breakdown against a batch he knows the real numbers for — especially one day where a partnership was force-ended early, to confirm "Undone" shows up correctly and the totals no longer look inflated by another same-day batch.
