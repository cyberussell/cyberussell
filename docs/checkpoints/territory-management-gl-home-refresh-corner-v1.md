# Territory Management System — Group Leader Home Refresh moved into QR panel corner — v1

**Date:** 2026-07-27
**Product:** Territory Management System (TMS)
**Feature:** Group Leader Home tab's Refresh button relocated onto the QR/summary panel itself

## Files Modified
- src/components/territory-management-system/GroupLeaderTabs.tsx

## Summary of Changes
Russell asked for the Home tab's Refresh button to move onto the QR panel — upper-left corner, same row as the existing trash/delete icon (which sits upper-right), icon only (no "Refresh" text). Removed the old standalone `flex justify-end` row above the panel and added an icon-only `RefreshCw` button at `absolute left-4 top-4` inside both panel states that render on Home:

1. The "all partners done" results-summary `Card` — plain blue (`text-[#2563EB]`), mirroring the trash icon's plain-red icon-only style at `right-4 top-4`.
2. The QR-not-done `Card` — same position, but color-branches on `isOverflow` (that card goes black-background for auxiliary/overflow batches) the same way the existing trash icon and other panel text already do: light blue (`text-[#60A5FA]`) on the black background, standard blue otherwise.

Same `refreshing` state and `window.location.reload()` behavior as before (added last session for the spin-while-refreshing fix) — only the button's position/markup changed, not its logic.

## Remaining Work
None.

## Known Issues
None identified.

## Next Recommended Task
Russell live-verifies the Refresh icon sits at the QR panel's upper-left, same row as the trash icon, in both the "QR not yet all done" and "all partners done" summary states (and in both normal and Auxiliary/overflow-batch coloring).
