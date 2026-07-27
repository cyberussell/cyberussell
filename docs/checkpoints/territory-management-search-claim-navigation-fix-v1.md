# Fix claimed-record not appearing/navigating, add List tab refresh button — v1

**Date:** 2026-07-27
**Product:** Territory Management System (TMS)
**Feature:** Bug fix + small addition, both reported live against the Search tab's "Add to My List" feature from earlier this session.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherSearchPanel.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes

1. **Real bug fixed: claiming an unassigned record via Search didn't navigate anywhere and never actually appeared in the records list.** Root cause: the publisher workspace only ever reads `workspace.records` from its initial server-rendered load — the claim action itself (a live, non-offline-queued call) correctly inserted the `partnership_records` row server-side, but nothing refetched the client's in-memory state afterward, so the toast telling the publisher to "refresh Home to see it" was the only signal, and even that required them to know to do it. Fixed by having a successful claim trigger a full page reload targeting `?view=list` (the same query param `BatchLandingBottomMenu` already uses to land on a specific tab on first mount) — this re-runs the server component's fetch fresh, so the newly-claimed record's full detail (territory/section/block, visit history) is genuinely there, and the publisher lands directly on "Assigned Contact Records" instead of staying on Search. Removed the now-dead `claimedIds` optimistic-tracking state that never actually got reached (the page was already navigating away by the time it would have rendered).

2. **Added a "Refresh" button to the List tab** ("you may add a refresh button in the card list since there is no push notification") — same full-reload pattern as the Home tab's Refresh, always visible on the List tab regardless of whether records exist yet. Covers every way a publisher's assigned list can change without their own action: a claimed Search result, an approved "Ask," or a "Pass" from another partner — none of which have any push notification in this offline-first app.

No migration needed.

## Remaining Work
- Not live-verified in a real browser (no TMS credentials in this sandbox) — verified via `npx tsc --noEmit` (clean), `npx vitest run` (101/101, unchanged), `npx next build` (clean).
- Not yet committed (Russell didn't ask to push this round).

## Known Issues
None found.

## Next Recommended Task
Russell live-verifies: claim an unassigned record via Search and confirm it lands directly on the records list with the new record visible and correctly showing as assigned; confirm the new List tab Refresh button works (and is disabled offline). Then commit and push whenever ready.
