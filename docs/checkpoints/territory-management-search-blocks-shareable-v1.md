# Search-Area Blocks Made Shareable (drop block exclusivity) — v1

**Date:** 2026-07-22
**Product:** Territory Management System (TMS)
**Feature:** Publisher search-area picker — `ChooseSearchScopeForm` block exclusivity

## Files Modified
- `territory-management-system/migrations/037_partnership_search_blocks_shareable.sql` (new)
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/components/territory-management-system/publisher/ChooseSearchScopeForm.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/OverflowAssignmentForm.tsx`

## Summary of Changes
Russell flagged a screenshot of `ChooseSearchScopeForm` ("Choose Your Search Area," the post-claim
section+block picker shown to overflow/zero-record partnerships) showing "One or more of these
blocks were just claimed by another partner — please pick different ones." That was the original,
deliberate design from `026_partnership_search_blocks.sql`: a `unique(block_id, assignment_date)`
constraint made every block congregation-wide exclusive for the day, enforced both by that DB
constraint and by client-side "Already claimed"/disabled state fed from `takenBlockIds`.

Russell's decision: the section stays a one-time, single choice per partnership (unchanged — it
was always a single-select dropdown, never exclusive), but blocks should be shareable —
multiple Ministry Partners can lock in and search the same block on the same day.

Changes:
- New migration `037_partnership_search_blocks_shareable.sql` drops the
  `unique(block_id, assignment_date)` constraint (`partnership_search_blocks_block_id_assignment_date_key`)
  on `partnership_search_blocks`.
- Removed `getTakenBlockIdsForDate` and the `takenBlockIds` computation inside
  `getPartnershipByToken` (`assignment/queries.ts`).
- Removed the `takenBlockIds` field from the partnership-workspace type (`assignment/types.ts`).
- `ChooseSearchScopeForm.tsx`: removed the `takenBlockIds` prop, the disabled/"Already claimed"
  block styling, and updated the helper copy (dropped "so no one else covers the same ground,"
  which is no longer true).
- `PublisherWorkspaceApp.tsx`: removed the now-unused `takenBlockIds` prop pass-through.
- `lockPartnershipSearchBlocks`: removed the now-impossible Postgres `23505` unique-violation
  branch and its friendly-message translation.
- `OverflowAssignmentForm.tsx`: updated a stale comment that described block exclusivity as the
  mechanism preventing two pairs from covering the same ground.

## Verification
- `npx tsc --noEmit` — clean (after `npm install`, `node_modules` was missing at session start).
- `npx vitest run` — 79/79 passing (1 unrelated pre-existing failure in
  `src/lib/appointment-system/slots.test.ts`, missing Appointment System env vars, untouched by
  this change).
- `npx next build` — clean.
- Not live-clicked in a browser — no TMS credentials in this sandbox, the standing limitation for
  this product.

## Remaining Work
None. Migration 037 has been applied live by Russell (no `supabase-ldc` credentials in this
sandbox to apply it directly, the standing limitation for this product — SQL provided directly,
Russell confirmed it ran).

## Known Issues
None identified.

## Next Recommended Task
Russell spot-checks live: two different Ministry Partners should both be able to lock in the same
section/block for the same day without any "claimed by another partner" error.
