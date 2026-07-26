# Search-area ownership popup names the specific partner(s) — v1

**Date:** 2026-07-26
**Product:** Territory Management System (TMS)
**Feature:** Follow-up to `territory-management-publisher-ux-batch-v1.md` item 3 — Russell asked for the search-area "Map" button's popup to name the actual Ministry Partner(s) currently working that block, instead of the generic "the ministry partner currently working in this area."

## Files Modified
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/SearchScopeRecordsList.tsx`

## Summary of Changes

New `getPartnersSearchingBlocks(supabase, congregationId, blockIds, assignmentDate, excludePartnershipId)` query reads `partnership_search_blocks` (blocks are shareable since migration 037, so a block can have zero, one, or several current searchers) joined to `partnerships.name`, excluding the calling partnership's own lock on its own blocks. Returns a `Record<blockId, string[]>`.

Wired into both places `searchScopeRecords` is produced:
- `getPartnershipByToken` (initial workspace load) — new `searchScopeBlockPartners` field on `PartnershipWorkspace`.
- `getSearchScopeRecordsAction` (the manual Refresh action) — return type changed from a bare array to `{ records, blockPartners }`; both call sites in `PublisherWorkspaceApp.tsx` (`handleRefreshSearchScope`, `handleChooseSearchScope`) updated to destructure and store both.

`SearchScopeRecordsList.tsx` now takes a `blockPartners` prop and looks up the tapped record's own `block.id` when building the "Map" confirm popup's message:
- One or more other partners found → "This block is currently being searched by {names}." (Oxford-comma joined via a small `formatPartnerNames` helper — "Juan & Maria", "Juan & Maria and Pedro & Ana", "A, B, and C").
- None found → falls back to a generic "No other Ministry Partner currently has this block locked for search — you may be the only one working this area today."

No migration needed — `partnership_search_blocks` and `partnerships.name` both already existed.

## Remaining Work
- Not live-verified in a real browser (no TMS credentials in this sandbox) — verified via `npx tsc --noEmit` (clean), `npx vitest run` (101/101, unchanged), `npx next build` (clean).
- Not yet committed.

## Known Issues
None found.

## Next Recommended Task
Russell live-verifies with two real search-only partnerships locking the same shareable block on the same day — confirm each sees the other's actual partnership name in the popup (and their own name is correctly excluded), then commit and push.
