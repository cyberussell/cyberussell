# Publisher polish batch: end-ministry button styling/placement, map-icon lockdown for viewers — v1

**Date:** 2026-07-27
**Product:** Territory Management System (TMS)
**Feature:** Six items from Russell's screenshots, all publisher-workspace-facing.

## Files Modified
- `src/components/territory-management-system/publisher/SearchScopeRecordsList.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`

## Summary of Changes

1. **Search-area card: Plus Code no longer shown**, and the **End My Ministry / End My Ministry Early button restyled** from a flat bordered/light-red button to an embossed red gradient button (`bg-gradient-to-r from-red-600 to-red-500`, white text, shadow) — matching the raised look of the app's other primary (blue gradient) action buttons. Applied everywhere the button appears (now List-tab only, see item 3).

2. **Search-area ownership popup**: confirm button shortened from "Open in Google Maps" to **"Open Maps"** so it fits the button width cleanly at both English and longer partner-name message lengths. The specific-partner-name feature itself (built last session) was already correct — this screenshot just happened to show the solo/no-one-else-searching fallback case, confirmed working as intended.

3. **"End My Ministry" removed from the Home tab entirely** — Russell wants it List-tab only (Home is map/territory-focused, not where ministry gets ended). The List tab's own instance (with its existing "skip when Sync & Finish banner is already showing" guard) is unchanged.

4. **Read-only "viewing someone else's assignment" record detail: map icons removed, contact-detail text enlarged.** The Territory Map icon and "Open in Google Maps" pin icon on a record's blue header card are now hidden entirely when `readOnly` (viewing another Ministry Partner's assignment as a read-only viewer) — a viewer shouldn't have a path to navigate to a record that isn't theirs. To fill the resulting empty space, the record's address/Section-Block/resident-name text bumps up a size (`text-lg`/`text-base` instead of default/`text-sm`) specifically in the read-only case.

5. **Confirmed (no code change needed):** the List tab's "End My Ministry"/"End My Ministry Early" button already correctly hides itself whenever the "All assigned records are done!" → Sync & Finish banner is showing (`!(allDone && workspace.records.length > 0)` guard, built last session) — verified this logic is still intact and correct.

No migration needed — pure UI/copy/gating changes.

## Remaining Work
- Not live-verified in a real browser (no TMS credentials in this sandbox) — verified via `npx tsc --noEmit` (clean), `npx vitest run` (101/101, unchanged), `npx next build` (clean).

## Known Issues
None found.

## Next Recommended Task
Russell live-verifies all five items on a real device, particularly the read-only viewer's record detail card (font size bump reads correctly with the map icons gone) and the restyled End Ministry button's contrast/legibility.
