# Group Leader Concurrent Assignment Batches — v1

**Date:** 2026-07-15
**Product:** Territory Management System (TMS)
**Feature:** Russell asked "can other TGL generate a qr code?" and flagged the real risk: multiple Group Leaders logging in at the end of the week could each generate assignments, and no two should cover the same territory.

## Files Modified
- `territory-management-system/migrations/013_group_leader_assignment_ownership.sql` — **run by Russell before this code shipped**
- `src/lib/territory-management-system/modules/assignment/types.ts` — `AssignmentBatch` gained `created_by: string | null`
- `src/lib/territory-management-system/modules/assignment/queries.ts` — `createAssignment` now takes `createdBy`, sets it on insert, and rejects (via a new `getTerritoryIdsInUseToday`) any territory already claimed by another Group Leader's active batch today; `getBatchForDate` renamed to `getBatchForGroupLeaderAndDate` (adds a `created_by` filter)
- `src/app/territory-management-system/actions/group-leader.ts` — `createGroupLeaderAssignmentAction` only ever deletes the caller's own prior batch and passes `createdBy: userId`; `deleteGroupLeaderAssignmentAction` gained an explicit ownership check (defense in depth on top of RLS)
- `src/app/territory-management-system/group-leader/dashboard/page.tsx` — "today's batch" now means "my own batch today"

## Summary of Changes

Investigated first (before touching anything): `assignment_batches` had `unique (congregation_id, assignment_date)` — exactly **one shared batch per congregation per day**, no `created_by` at all. `createGroupLeaderAssignmentAction`'s "regenerate" flow deleted *any* existing batch for today unconditionally — meaning a second Group Leader logging in the same day didn't just risk double-covering a territory, they could silently delete the first Group Leader's entire batch (every partnership, every publisher's progress) with no warning. Reported this finding to Russell before proposing a fix, since it was worse than what he'd asked about.

Confirmed the design via `AskUserQuestion`: multiple Group Leaders should be able to run separate concurrent batches the same day (not a single shared batch with a guardrail), and a territory conflict should be a hard block with a clear error, not a silent auto-filtered picker.

Migration `013` adds `assignment_batches.created_by`, moves the uniqueness constraint to `(congregation_id, assignment_date, created_by)` (old NULL-creator rows stay valid — Postgres doesn't treat NULL as equal to NULL for uniqueness), adds `owns_assignment_batch()`/`owns_partnership()` security-definer helper functions (same pattern as `is_congregation_admin`), and splits each of the 4 assignment tables' RLS into congregation-wide **reads** (every Group Leader can still see every batch today, for coordination/reports) but creator-scoped **writes** (a Group Leader can only insert/update/delete their own batch and its children) — enforced at the database level, not just in application code.

`createAssignment` now checks every selected territory against every other active batch's territories for that day before creating anything, returning a named error (e.g. "Territory 3 is already assigned in another Group Leader's active batch today. Choose different territories.") rather than allowing the conflict to happen silently.

Publisher-facing writes (the QR/token workflow) are unaffected — those always ran on the service-role client, which bypasses RLS entirely, so none of this touches that path.

`npx tsc --noEmit` and `npx next build` both clean. **Not live-verified**: same standing limitation as every TMS session — no live Supabase credentials in this environment to click through two Group Leader accounts generating concurrent batches.

## Remaining Work

None planned — this closes the gap Russell flagged. No admin-facing "see all active batches today" view was added since it wasn't requested (Admin already has congregation-wide read access via RLS if this comes up later).

## Known Issues

None found. Existing batches created before migration 013 have `created_by = null` — they won't show up under any specific Group Leader's "my batch today" view going forward, but they're not deleted and Reports/history still read them normally.

## Next Recommended Task

Russell live-verifies with two real Group Leader accounts: (1) GL A generates a batch covering Territory 1; GL B logs in the same day and can generate their own separate batch covering Territory 2 without affecting GL A's; (2) GL B attempts to include Territory 1 in their own batch and gets the clear conflict error instead of it silently succeeding or wiping out GL A's batch; (3) GL B's "Delete Assignment" only ever affects their own batch.
