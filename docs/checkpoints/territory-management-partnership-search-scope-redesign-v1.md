# Overflow Search-Scope Redesign: Partnership-Level Choice + Overlap Prevention + Colored Pins — v1

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Corrects the overflow search-scope feature built earlier this session (checkpoint `territory-management-overflow-cross-batch-search-scope-v1.md`, items 3/4). Russell reviewed it live and identified the wrong design: the Group Leader shouldn't pick the section/blocks when *generating* the overflow batch — each **Ministry Partner** should pick their own, once, after claiming their partnership, and that choice should be what actually prevents two pairs from covering the same block (the batch-level design never enforced that). **This supersedes migration 025's approach entirely** — migration 026 drops `assignment_batch_search_blocks` outright and replaces it with a partnership-level table.

## Files Modified
- `territory-management-system/migrations/026_partnership_search_blocks.sql` (new)
- `src/lib/territory-management-system/modules/assignment/{queries,types,schema}.ts`
- `src/app/territory-management-system/actions/{group-leader,publisher}.ts`
- `src/app/territory-management-system/group-leader/dashboard/page.tsx`
- `src/components/territory-management-system/{GroupLeaderTabs,OverflowAssignmentForm,HouseholdDistributionMap}.tsx`
- `src/components/territory-management-system/publisher/{PublisherWorkspaceApp,PublisherRecordForm}.tsx`
- `src/components/territory-management-system/publisher/ChooseSearchScopeForm.tsx` (new)
- `src/lib/territory-management-system/modules/territory/queries.ts` (removed now-dead `getBlockRecordCounts`)

## Summary of Changes

**Schema:** `026_partnership_search_blocks.sql` drops `assignment_batch_search_blocks` (migration 025's table — confirmed with Russell it had no real data yet) and creates `partnership_search_blocks` (partnership_id, section_id, block_id, `assignment_date`). The **`unique(block_id, assignment_date)`** constraint is the actual overlap-prevention mechanism now — a block can only ever be locked in by one partnership per day, congregation-wide, regardless of which Group Leader or batch.

**Group Leader side — reverted to plain generation:** `OverflowAssignmentForm.tsx` lost the entire "Narrow to a search area" step added this session; back to just territory checkboxes + publisher/group-size steppers. `createOverflowAssignmentSchema` removed (back to `createAssignmentSchema`); `createAssignment()`'s `searchScope` param and its block-insert logic removed. `GroupLeaderTabs.tsx`/`group-leader/dashboard/page.tsx` no longer fetch/pass `todaysTerritoryStructures`/`blockRecordCounts`. `territory/queries.ts`'s now-unused `getBlockRecordCounts()` deleted.

**Publisher side — new required one-time step:** `assignment/types.ts`'s `SearchScope` now carries full block objects (`{id, label}[]`) not just label strings, and `PartnershipWorkspace` gained `takenBlockIds` (congregation-wide, today — only populated for an overflow partnership that hasn't chosen yet). New `getSearchScopeForPartnership()`/`getTakenBlockIdsForDate()`/`lockPartnershipSearchBlocks()` in `assignment/queries.ts` replace the old batch-scoped `getSearchScopeForBatch()`. New `chooseSearchScopeAction` (validates the batch is overflow, the partnership hasn't already chosen — one-time only, and the section belongs to one of the batch's own territories) delegates to `lockPartnershipSearchBlocks()`, which catches a Postgres unique-violation (`23505`) on the block/date constraint and turns it into a friendly "just claimed by another partner" message — the real race-condition safety net, not just an app-level pre-check. New `ChooseSearchScopeForm.tsx` (territory if >1, section, blocks — taken ones shown disabled/"Already claimed"). `PublisherWorkspaceApp.tsx` renders **only** this form (hiding the map toggle, records list, End Ministry button, everything) whenever `workspace.batch.is_overflow && workspace.claimed_at && !workspace.searchScope && !readOnly` — mirrors how the unclaimed state already hides everything behind the rename form. Called directly (not through the offline sync queue) since it needs a live, real-time answer about block availability.

**Locked "Add a New Contact Record":** `PublisherRecordForm.tsx` gained an optional `lockedScope` prop — territory/section render as fixed text instead of dropdowns, and the block `<select>` only offers the partnership's own locked blocks. `addPublisherRecordAction` re-validates server-side: if the partnership has a locked scope, the submitted block must be within it (no change for a partnership with no scope — regular, non-overflow partnerships keep the existing whole-territory behavior).

**Red/blue map pins:** `HouseholdDistributionMap.tsx`'s `records` prop widens to accept an optional `color?: 'blue' | 'red'` per pin (default blue — every existing call site, Admin Reports and the Assigned Records map, is unaffected). Red is a small inline SVG data URI (same marker geometry as the existing CDN blue one) rather than a second external asset source. `PublisherWorkspaceApp.tsx`'s Search Area map now combines existing pre-assigned records (blue, from `getRecordsInBlocks`) with this partnership's own added records filtered to their locked blocks (red).

## Remaining Work
None — feature complete for this pass.

## Known Issues
None identified. `npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. Live-verified via a temporary scratch route (mock data, removed before finishing): the Group Leader's overflow form has no search-area step; a claimed overflow partnership sees only `ChooseSearchScopeForm` (everything else hidden) with an already-taken block shown disabled; once a scope is locked, the full workspace unlocks and the Add Record form shows fixed territory/section text with a block dropdown narrowed to exactly the locked blocks; the Search Area map showed one blue pin (existing) and one red pin (own added record), confirmed via inspecting each marker's icon source. `chooseSearchScopeAction`'s actual submission (including the unique-constraint race-condition path) could not be exercised end-to-end against a real database in this sandbox — the render/gating logic is verified, the DB-level constraint itself is standard Postgres behavior.

## Next Recommended Task
Russell: (1) run migration 026 in the TMS Supabase SQL editor (drops `assignment_batch_search_blocks` from migration 025 — nothing to preserve, per Russell's confirmation it was unused — and creates `partnership_search_blocks`), (2) generate a plain overflow batch and confirm there's no search-area step on the Group Leader side, (3) as a Ministry Partner, claim a partnership and confirm the required "Choose Your Search Area" step appears and blocks everything else until saved, (4) with two partnerships, confirm the second correctly sees the first's chosen blocks as "Already claimed" and can't pick them, (5) confirm the Add Record form's fixed territory/section and narrowed block list, and the Search Area map's blue/red pin distinction. Then commit + deploy at Russell's request.
