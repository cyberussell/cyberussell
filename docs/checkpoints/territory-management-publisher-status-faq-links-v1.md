# Publisher Workspace — Status/FAQ Text Links + All Partners Self-Status Fix — v1

**Date:** 2026-07-21
**Product:** Territory Management System (TMS)
**Feature:** Separate "Status"/"FAQ" out of the Home tab's pill row into centered text links, rename "Status" to "All Statuses", and fix a real bug where a partnership's own "All Partners" card stayed stuck on "In Progress" after ending ministry.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes
Two follow-ups from Russell:

1. **Status/FAQ layout.** The Home tab's pill row previously mixed `help` ("Status") and `faq`
   ("FAQ") in with the real panel tabs (Map/Pins/Search Area/Summary/Share), crowding it on
   narrow screens. Split the tab list into `panelTabs` (the five real panels, still rendered as a
   pill row when 2+ are available) and a separate always-present centered text-link row below the
   active panel for "All Statuses" (renamed from "Status") and "FAQ" — plain text, not buttons.
   `activeView`'s derivation was reworked so `mapView === 'help' | 'faq'` short-circuits
   independently of `panelTabs` availability — previously `availableTabs` included help/faq, so
   removing them from the pill array without this change would have made clicking either link
   silently snap back to the first panel tab.

2. **Bug fix — stale self-status.** A search-only (zero-assigned-record) partnership ending its
   own ministry (via "Slide to End My Ministry"/"Slide for Early Out", available on both the Home
   and List tabs) had its own card in the workspace's own "All Partners" tab
   (`PartnerStatusList`, fed from `workspace.batchPartnerships` — a snapshot fetched once at
   initial load, see `territory-management-publisher-offline-nav-search-ux-v1.md`) stay on "In
   Progress" until a manual, online-only Refresh. Root cause: `handleTerminate`/`handleFinish`
   updated the top-level `workspace.ended_early_at`/`finished_at` fields optimistically but never
   patched the matching entry inside `workspace.batchPartnerships`, which is a separate array.
   Fixed by mirroring the same optimistic update onto the self-entry (matched by `p.id === w.id`)
   in both handlers. Other partners' entries in that same list are untouched — they remain a
   deliberate offline-first snapshot by design; only the viewing partnership's own entry needed
   patching, since that one changes as a direct result of the viewer's own action.

## Remaining Work
None for this pass.

## Known Issues
- Other Ministry Partners' statuses in the "All Partners" tab remain a snapshot from initial load
  (or last manual Refresh) — this is deliberate (see the offline-nav fix checkpoint) and out of
  scope here; only the self-entry staleness was a genuine bug.

## Next Recommended Task
Russell reviews the diff, commits, and pushes (Vercel auto-deploys on push). Live spot-check on a
real device: end a search-area ministry and confirm "All Partners" immediately shows "Ended
Early" for yourself with no Refresh needed.
