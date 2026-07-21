# Publisher Workspace — FAQ/All Statuses Close Button — v1

**Date:** 2026-07-21
**Product:** Territory Management System (TMS)
**Feature:** Add an X/close control to the "All Statuses" and "FAQ" panels for easy dismissal.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes
Follow-up to `territory-management-publisher-status-faq-links-v1.md` (which moved "Status"/"FAQ"
out of the crowded Home-tab pill row into centered text links below the panel content). Russell
asked for an easy way to dismiss those two panels once opened, rather than only being reachable
via the text links or pill row again. Added a small `X` icon button (lucide-react, imported
alongside the other icons already used in this file), absolutely positioned top-right over
whichever of `PublisherStatusHelp`/`PublisherFAQ` is currently rendered. On click it calls
`setMapView(availablePanelTabs[0]?.key ?? 'territory')` — reusing the exact same "first available
real panel, else fall back" fallback expression already used to compute the default `activeView`
elsewhere in this block, so behavior stays consistent with how the panel already picks a default.

## Remaining Work
None for this pass.

## Known Issues
- The close button always returns to the *first* available panel tab (Map, if present; otherwise
  the next one down the list), not necessarily whichever panel was active immediately before the
  publisher opened "All Statuses"/"FAQ". E.g. if a publisher was on "Search Area" and then opened
  "FAQ", closing lands back on "Map" rather than "Search Area". Not fixed here since it wasn't
  part of the request — flagging in case Russell wants "return to previous panel" behavior
  specifically, which would need a small separate piece of state to remember the last real panel
  tab.

## Next Recommended Task
Russell spot-checks live on a real assignment with multiple panel tabs available (Map/Pins/Search
Area all present at once) to see whether the "always defaults to first panel" close behavior
above is acceptable, or whether it should remember and return to the previously active panel
instead.
