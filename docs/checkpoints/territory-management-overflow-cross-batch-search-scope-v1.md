# Overflow QR Color, Cross-Batch Passing, Search-Scope Overflow Assignments, Pin Popup Fallback — v1

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Five follow-ups from Russell's live phone testing of the overflow-assignment feature: (1) navy QR for overflow batches, (2) cross-batch record passing to any of the same Group Leader's batches today, (3) an overflow batch can narrow to a specific section + blocks to search, with a read-only view of whatever records already exist there, (4) that search area gets its own pin map, (5) map pin popups fall back through resident name and Plus Code before "No address on file".

## Files Modified
- `territory-management-system/migrations/025_overflow_search_scope.sql` (new)
- `src/lib/territory-management-system/modules/assignment/qr.ts`
- `src/app/territory-management-system/group-leader/dashboard/page.tsx`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/lib/territory-management-system/modules/assignment/schema.ts`
- `src/app/territory-management-system/actions/group-leader.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/lib/territory-management-system/modules/territory/queries.ts`
- `src/lib/territory-management-system/modules/records/queries.ts`
- `src/lib/territory-management-system/modules/reports/queries.ts`
- `src/lib/territory-management-system/modules/offline/db.ts`
- `src/lib/territory-management-system/modules/offline/sync.ts`
- `src/components/territory-management-system/GroupLeaderTabs.tsx`
- `src/components/territory-management-system/OverflowAssignmentForm.tsx`
- `src/components/territory-management-system/HouseholdDistributionMap.tsx`
- `src/components/territory-management-system/publisher/MoveRecordForm.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/PublisherBottomMenu.tsx`
- `src/components/territory-management-system/publisher/SearchScopeRecordsList.tsx` (new)
- `src/components/territory-management-system/publisher/SearchScopeRecordDetailView.tsx` (new)

## Summary of Changes

**1. Overflow QR color (navy):** `getAssignmentBatchQrDataUrl()` takes an optional `darkColor` param; the Group Leader dashboard page passes `#1E3A8A` for `is_overflow` batches, plain black (default) otherwise.

**2. Cross-batch record passing:** New `getGroupLeaderPartnershipsForDate()` (assignment/queries.ts) returns every other Ministry Partner across ALL of the same Group Leader's batches today (original + overflow), not just the caller's own batch — each tagged with a `batchLabel` ("Assignment"/"Overflow"/"Overflow 2"...) computed the same way `GroupLeaderTabs`'s own switcher does. `movePartnershipRecordAction` now allows a destination in any batch owned by the same Group Leader on the same day (checked via a new `getBatchById()` lookup + congregation/date/creator comparison), not just the same `batch_id`. `MoveRecordForm` shows the batch label next to each option. Confirmed with Russell: scope is "same Group Leader, any batch today," not narrowed to the same territory.

**3. Overflow search-scope (section + blocks, read-only records, location-only fix):** New migration `025_overflow_search_scope.sql` adds `assignment_batch_search_blocks` (batch_id, section_id, block_id), RLS mirroring `assignment_batch_territories`. `OverflowAssignmentForm` gained an optional "Narrow to a search area" step (shown once exactly one territory is checked) — picks one section, then any of its blocks (checkboxes; blocks with zero records get an "Empty" tag, per Russell's choice not to restrict selection to empty-only). `createOverflowAssignmentAction`/`createAssignment` re-verify the section/blocks belong to the submitted territory server-side before writing. Publisher side: new `getRecordsInBlocks()` query, `PartnershipWorkspace.searchScope`/`searchScopeRecords` fields populated by `getPartnershipByToken` via a new `getSearchScopeForBatch()` helper. New read-only UI (`SearchScopeRecordsList.tsx`, `SearchScopeRecordDetailView.tsx`) reachable via a new "Search Area" bottom-nav item (shown only when a batch has a search scope) — records are view-only, with a manual "Refresh" button (new `getSearchScopeRecordsAction`, a plain read, not queued through the offline sync system — the point is checking live state) and a "Recommend a Location Correction" action (new `recommendSearchScopeCorrectionAction`, validated against the batch's own search-scope blocks instead of partnership ownership, queued through the existing offline sync queue as a new `recommendSearchScopeCorrection` item type, lands in the Admin's existing Flagged for Correction queue).

**4. Search-area pin map:** `PublisherWorkspaceApp`'s Territory Map / Assigned Records pill toggle extended to a third "Search Area" option (shown only when `searchScopeRecords` is non-empty), fed by the same `HouseholdDistributionMap` component via a new `searchScopeLocations` array. The toggle logic was generalized from a hardcoded two-option branch to a filtered list of up to three tabs.

**5. Pin popup fallback:** `RecordLocation` type gained `residentName`; `getApprovedRecordLocations` (admin) and both publisher-side `RecordLocation` builders (assigned + search-scope) now populate it. `HouseholdDistributionMap`'s `Pin` interface now carries `residentName`/`plusCode` through (previously decoded for positioning then discarded) and the popup's primary line falls back `address || residentName || plusCode || 'No address on file'`.

## Remaining Work
- Migration `025_overflow_search_scope.sql` has not been run against the live Supabase project — needed before any of features 3/4 work in production (feature 1/2/5 don't depend on it).
- Not committed to git yet.

## Known Issues
None identified — `npx tsc --noEmit`, `npx vitest run` (52/52), and `npx next build` all clean; live-verified via a temporary scratch route (mock data, removed before finishing) covering all five features, including all three popup-fallback branches (address-wins, name-only, Plus-Code-only) and the read-only search-scope detail view's correction form.

## Next Recommended Task
Russell: (1) run migration 025 in the TMS Supabase SQL editor, (2) as a real Group Leader, generate an overflow assignment with a search area narrowed to specific blocks and confirm the QR is navy, (3) pass a record from the original assignment to an overflow Ministry Partner and confirm the batch label shows correctly, (4) as that overflow partner, confirm the "Search Area" tab shows existing records read-only, the map renders, and a location-correction recommendation lands in the Admin's Flagged for Correction list. Then commit + deploy at Russell's request.
