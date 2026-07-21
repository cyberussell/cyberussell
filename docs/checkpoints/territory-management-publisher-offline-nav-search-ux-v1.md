# Publisher Workspace — Offline Nav Fix + Search-Area UX Batch — v1

**Date:** 2026-07-21
**Product:** Territory Management System (TMS)
**Feature:** Five follow-ups from real screenshots Russell shared of the publisher workspace, mostly around the "searching a fresh area" (overflow/zero-record) partnership flow.

## Files Modified
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/components/territory-management-system/publisher/PublisherBottomMenu.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/SearchScopeRecordsList.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordForm.tsx`
- `src/components/territory-management-system/publisher/AddedRecordsList.tsx`
- New: `src/components/territory-management-system/publisher/PartnerStatusList.tsx`
- New: `src/components/territory-management-system/publisher/SearchScopeSummaryCard.tsx`

## Summary of Changes

1. **Fixed a real offline bug**, found from a screenshot of a blank browser page: the workspace's
   "All Partners" bottom-nav icon was a real `<Link>` back to the server-rendered batch-landing
   page (`/assignment/[batchToken]`, `force-dynamic`) — every other tab in the offline-first
   workspace is an in-memory view change, but this one silently required a network round-trip,
   which hard-fails offline (blank browser error page, stranding the publisher mid-ministry).
   Fixed by turning "All Partners" into an in-memory view fed from data fetched once at initial
   (online) page load, same pattern as everything else here: `getPartnershipByToken` now also
   calls `getBatchSummary` and attaches the result as `batchPartnerships` on `PartnershipWorkspace`;
   a new `getBatchPartnersAction` provides a manual, online-only "Refresh"; new
   `PartnerStatusList.tsx` renders it read-only (deliberately non-clickable — no new navigation
   that could reintroduce the same bug). `PublisherBottomMenu.tsx` had its one `href`-based item
   converted to `onClick` and the now-dead `Link`/`href` branching removed.
2. **"Area To Search" page (the List tab for a search-scope partnership):**
   - Added the same "Slide to end ministry" control already on Home — it was previously
     reachable only from Home, but a partner searching an area spends most of their time here.
   - Relabeled it from "Slide for Early Out" to "Slide to End My Ministry" whenever the
     partnership has zero assigned records (`isSearchOnlyPartnership`) — "Early" doesn't
     describe anything for a partnership with no quota of incomplete records to leave behind.
   - `SearchScopeRecordsList.tsx` cards now show resident name, Section/Block, and Plus Code
     (previously only "Blk X").
3. **`PublisherRecordForm.tsx`**: Section moved onto the same grid row as Block (previously
   Section shared a row with Territory, and Block sat alone on its own full-width row).
4. **`AddedRecordsList.tsx`**: cards now show resident name and household number (previously
   showed neither).
5. **Search-ministry finish summary**: the Home > Summary tab's `VisitResultPieChart` is always
   all-zero for a search-scope partnership (they never log a visit result — they only add
   records). New `SearchScopeSummaryCard.tsx` replaces it in that case: records added, households
   (grouped by Plus Code, blank ones counted individually — same rule as `AssignedRecordsList`),
   territory, section, and blocks worked.

No DB migrations needed for any of this — everything was already available client-side or via
existing query shapes.

`npx tsc --noEmit`, `npx vitest run` (87/87), and `npx next build` all clean. Live-verified all
five items via a temporary scratch route with mock data (screenshotted, removed before
finishing) — confirmed the All Partners tab renders correctly with no navigation (status badges,
progress bars), the Area To Search cards show all four fields, the End Ministry slider appears
there with the search-only wording, the Add Record form's Section+Block share a row, Added
Records cards show name+household count, and the Summary tab shows the new stats card once the
partnership is finished. Zero console errors. Could not live-verify against the real TMS
Supabase project (no `supabase-ldc` credentials in this sandbox, the standing limitation for
this product).

## Remaining Work
None for this pass.

## Known Issues
None known — this batch is pure client/query logic with no schema dependency, so there's nothing
blocked on a migration this time.

## Next Recommended Task
Russell spot-checks live: confirm the "All Partners" tab no longer shows a blank page when
tapped while offline (the original bug report), and click through a real overflow/search-scope
partnership to confirm the relabeled "Slide to End My Ministry" and the new Search Summary stats
match what's actually in My Added Records.
