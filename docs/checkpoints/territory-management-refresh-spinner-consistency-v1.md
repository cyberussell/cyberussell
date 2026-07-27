# Territory Management System — Refresh-button spinner consistency — v1

**Date:** 2026-07-27
**Product:** Territory Management System (TMS)
**Feature:** Every "Refresh" button now spins its icon while the refresh is in flight, matching the Partners tab's existing behavior

## Files Modified
- src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx
- src/components/territory-management-system/GroupLeaderTabs.tsx

## Summary of Changes
Russell pointed out the Partners tab's Refresh button (`PartnerStatusList.tsx`) already spins its `RefreshCw` icon while refreshing, but three other Refresh buttons in TMS didn't — they just sat static during their full-page reload, giving no feedback that anything was happening:

1. **Publisher workspace Home tab Refresh** (`PublisherWorkspaceApp.tsx`) — added a shared `fullRefreshing` state, set `true` at the top of `handleFullRefresh` (the helper added in the previous session for the `?view=` tab-drift fix) before navigating. Icon now spins and the button disables while `fullRefreshing` is true.
2. **Publisher workspace List tab Refresh** — same `handleFullRefresh`/`fullRefreshing`, since both buttons route through the same helper (only one is ever mounted at a time, since they belong to different tabs).
3. **Group Leader Home tab Refresh** (`GroupLeaderTabs.tsx`) — added a local `refreshing` state, set `true` in the button's `onClick` right before `window.location.reload()`, same spin + disable pattern.

All three still do a real `window.location`-based full reload (not a soft refetch) — the spin is purely a visual "something is happening" cue for however long the network round-trip to the new page takes, same reasoning as the pre-existing Partners/search-scope/incoming-request Refresh buttons that already had this.

## Remaining Work
None — audited every `RefreshCw`-icon button in the TMS component tree; all now spin while their respective refresh/reload is in flight.

## Known Issues
None identified.

## Next Recommended Task
Russell live-verifies: tap each of the four Refresh buttons (publisher Home, publisher List, publisher Partners, Group Leader Home) and confirm the icon spins during the reload/refetch, not just on the Partners tab as before.
