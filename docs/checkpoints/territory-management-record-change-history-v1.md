# Record Change History (1-Year Retention) — v1

**Date:** 2026-07-23
**Product:** Territory Management System (TMS)
**Feature:** A permanent-ish "Record History" section on the Admin's record detail page, distinct from Visit History — logs record creation, edits (with a before/after diff), and a publisher's correction/move/removal recommendation together with the Admin's later apply/dismiss of it. Requested after Russell pointed out (from a live screenshot of the "Flagged for Correction" queue) that once a correction/move/removal recommendation is applied or dismissed, the publisher's free-text reason disappears with no record of it — "admin cannot see the notes made by the publishers."

## Files Modified
- `territory-management-system/migrations/039_record_history.sql` (new) — `territory_record_history` table + admin-only RLS policy
- `src/lib/territory-management-system/modules/records/history.ts` (new) — `buildEditSummary()` (before/after diff text) + `RECORD_HISTORY_ACTION_LABELS`/`RECORD_HISTORY_ACTION_STYLES`
- `src/lib/territory-management-system/modules/records/history.test.ts` (new) — 6 unit tests for `buildEditSummary`
- `src/lib/territory-management-system/modules/records/types.ts` — `RecordHistoryAction`, `RecordHistoryEntry`
- `src/lib/territory-management-system/modules/records/queries.ts` — new `logRecordHistory()`/`listRecordHistory()`; every record-mutating function that can meaningfully log a history entry (`createRecord`, `updateRecord`, `recommendRecordCorrection`/`dismissCorrectionRecommendation`/`applyRecordCorrection`, `recommendRecordMove`/`dismissMoveRecommendation`/`applyRecordMove`, `recommendRecordForRemoval`/`dismissRemovalRecommendation`) now accepts a `congregationId` (several didn't before) and an optional actor, and logs accordingly
- `src/lib/territory-management-system/modules/auth/queries.ts` — `RoleSession` gained `userName` (profiles.full_name), so callers can attribute history entries without a separate lookup
- `src/app/territory-management-system/actions/records.ts` / `actions/publisher.ts` — updated call sites to pass the new params
- `src/components/territory-management-system/RecordHistoryList.tsx` (new) — read-only display
- `src/app/territory-management-system/dashboard/records/[recordId]/page.tsx` — renders the new "Record History" section
- `src/components/territory-management-system/publisher/PublisherFAQ.tsx` — two new FAQ entries documenting the 6-month (visits) vs. 1-year (record history) retention split

## Summary of Changes
The core fix: `recommendRecordCorrection`/`recommendRecordMove`/`recommendRecordForRemoval` now log the publisher's reason/notes verbatim to `territory_record_history` at recommend time, since applying or dismissing the recommendation clears those same columns off `territory_records` itself (`correction_recommended_reason`, `move_recommended_notes`, `removal_recommended_reason`) — history is now the only place that text survives either outcome. `actor_name` is a plain-text snapshot (Admin's `full_name` at write time, or a partnership's name), not a live `profiles` join — same "no live join" choice already made for `removal_recommended_by`/`correction_recommended_by`/`move_recommended_by` on `territory_records` itself, and it means an entry reads the same years later even if the Admin's account is renamed or removed.

`updateRecord`'s diff (`buildEditSummary`) fetches the record's current row before writing, compares only the fields the edit forms actually expose (address, unit, resident name, Plus Code, household members, Do Not Call, notes-changed-flag), and skips logging entirely when nothing changed — a Save click with no edits produces no history noise. Retention is 1 year vs. Visit History's 6 months (`logVisit`'s existing opportunistic cleanup) — same "delete on every write" pattern, just a longer window since this is a lower-volume, more consequential audit trail.

`tsc`/`vitest` (59/59, includes the new `history.test.ts`)/`next build` all clean. Not live-verified in a browser (no live TMS credentials in this session) — code-reviewed only. Also required fixing an unrelated live production bug from the *previous* session's TMS work: migration `038_record_admin_audit.sql` (the separate Admin add/edit audit-note feature, committed but not yet pushed at the time) hadn't been applied to the live Supabase project, so the shared `RECORD_WITH_LOCATION_SELECT`'s new profile embeds broke every record-list query — Russell applied that migration manually via the Supabase SQL editor mid-session to unblock.

## Remaining Work
None planned — fully scoped, single-batch request.

## Known Issues
- **Migration 039 not yet applied to the live Supabase project.** Same situation as 038 before it — until Russell runs it, any deploy of this code will break record queries the same way 038 did (the new `territory_record_history` table doesn't exist yet, though this one is a new table rather than new columns on an existing one, so the blast radius should be limited to `logRecordHistory` calls throwing rather than the shared select breaking outright — still, apply before deploying).
- Same pending-push blocker as `644b8d2` — see `territory-management-record-formatting-admin-audit-v1.md` for the git-remote-credential root cause. This commit is `7c83ea8`.

## Next Recommended Task
Russell: apply migration `039_record_history.sql` to the live TMS Supabase project (same SQL editor flow as 038), fix the `origin` remote credential and push both pending commits, then live-verify by recommending a correction as a publisher, dismissing it as Admin, and confirming the reason still shows up under "Record History" on the record detail page.
