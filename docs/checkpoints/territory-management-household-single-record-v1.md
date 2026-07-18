# Territory Management System — Household Counts as One Record + Record Detail Browsing — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Two related changes Russell requested after reviewing the assigned-records list on a real device.

## Files Modified
- `src/lib/territory-management-system/modules/assignment/engine.ts`
- `src/lib/territory-management-system/modules/assignment/engine.test.ts`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes
1. **Household counts as one record.** Previously the assignment engine (`calculateAssignment`) had zero Plus Code awareness — it sliced a flat, pre-sorted list of eligible record ids into chunks of 6, which meant a multi-person household could be split across two different Ministry Partners whenever it happened to straddle a chunk boundary, and each household member counted separately toward the "of 6" total. Now:
   - `calculateAssignment` takes `EligibleRecord[]` (`{id, plusCode}`) instead of plain `string[]`. Records sharing a non-empty Plus Code are folded into a single assignment "unit," in first-occurrence order, before chunking — a unit fills exactly one of the `maxPerPartnership` slots regardless of how many raw records it contains, and its members always land in the same partnership together. A blank/null Plus Code never merges with another blank one (each stays its own singleton unit).
   - `fetchEligibleRecordIds` in `queries.ts` now also selects `plus_code` and returns `EligibleRecord[]` to feed the engine.
   - `getBatchSummary`'s `recordCount`/`completedCount` (the source of every "X of 6 completed" display, on both the publisher's batch-landing page and the Group Leader's Partners tab) now group `partnership_records` by Plus Code (falling back to the record's own id when blank) the same way. Confirmed with Russell: a household counts as **completed once any one member has a logged visit**, not only once every resident individually does.
   - `engine.test.ts` updated for the new signature (`noPlusCode()` helper wraps existing plain-id test cases) plus a new `describe('household (Plus Code) grouping')` block covering: keeping a household together, never splitting one across a chunk boundary, never merging two different blank-Plus-Code records, and capping partnership count by unit count rather than raw record count.
2. **Record Detail household browsing.** The existing static "N contact records at this address" line (in the colored header card) is now a tap-to-expand disclosure (chevron, matching the existing pattern in `SectionBlockTree.tsx`) — collapsed by default, so records with no household get zero added clutter. Expanded, it lists each sibling's name + latest status badge; tapping one calls the new `onSelectHouseholdRecord` prop, which the parent wires to the same `setView({name:'detail', recordId})` navigation the rest of the workspace already uses. `householdRecords` widened from `{id, label}` to also carry `latestResult: VisitResult | null` (derived from each sibling's own `visits[0]?.result` in `PublisherWorkspaceApp`'s existing derivation). Added `key={selected.record.id}` to `PublisherRecordDetailView`'s render in `PublisherWorkspaceApp` — necessary because this is the first way to reach a different record's detail view without unmounting the component (previously always required going back to the list first), so without the `key` remount, per-record UI state (the new household disclosure, the existing mobile Move/Moved/Correction toggle) would incorrectly carry over from whichever record you were just viewing.

## Remaining Work
None requested beyond this. `AssignmentForm.tsx`'s client-side "how many partnerships would this produce" preview text still estimates off a flat per-territory `approvedCount` (not Plus-Code aware) — left untouched since it's only a rough heads-up before generating, and the real result always comes from the actual engine call; flagging here in case Russell later wants that estimate to account for households too.

## Known Issues
None found. `npx tsc --noEmit` and `npx vitest run` (excluding the pre-existing, network-dependent `appointment-system/slots.test.ts` live-Supabase test, unrelated to this product and already failing in this sandbox before this session) clean — 48/48, including 14/14 in `engine.test.ts` with the new household coverage. Live-verified the Record Detail UI piece via a temporary scratch route (removed before finishing): the disclosure expands/collapses, tapping a sibling navigates to their own detail view with the correct status badge, and the disclosure correctly resets to collapsed on arrival (confirming the `key` remount fix). The assignment-engine and `getBatchSummary` grouping logic could not be live-verified against the real Supabase project in this sandbox (no live credentials) — reviewed carefully and covered by the new unit tests instead.

## Next Recommended Task
Deployed at Russell's request. Russell spot-checks live: generate a fresh assignment over a territory with a real multi-person household and confirm (a) both people land in the same partnership, (b) the Group Leader's "X of 6" no longer double-counts them, (c) logging a visit for just one of them marks the pair "done" for that count, and (d) the Record Detail page's new household disclosure expands and jumps between them correctly.
