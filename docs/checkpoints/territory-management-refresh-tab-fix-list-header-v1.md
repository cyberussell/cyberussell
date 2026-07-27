# Territory Management System — Refresh-button tab drift fix, List tab header layout — v1

**Date:** 2026-07-27
**Product:** Territory Management System (TMS)
**Feature:** Refresh button no longer drops the publisher onto the wrong tab; List tab header shares a row with its Refresh button

## Files Modified
- src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx

## Summary of Changes
Two requests from Russell, both on the publisher workspace:

1. **Refresh-button tab drift.** The Home and List tabs' "Refresh" buttons both did a plain `window.location.reload()`. Switching tabs via the bottom nav (`PublisherBottomMenu`) is an in-memory `setView()` only — it never updates the URL's `?view=` query param, which is what the server page (`page.tsx`) reads on mount to pick `initialView`. So if a publisher opened the workspace on Home (URL has no `?view=`), tapped over to List (URL still unchanged), and hit List's Refresh, the reload would re-mount on Home instead of List — silently bouncing them off the tab they were refreshing. Same bug in reverse for Home's Refresh if the publisher had arrived via a `?view=list` link (e.g. the claim-success flow) and then navigated back to Home in-memory. Fixed with a new `handleFullRefresh(targetView: 'home' | 'list')` helper that stamps `?view=<current tab>` onto the URL before navigating, so the reload always lands back on the tab the button was pressed from. Both buttons now call it instead of `window.location.reload()` directly.
2. **List tab header layout.** "Assigned Contact Records" was a separate centered block below the Refresh button's own row. Restructured to match `PartnerStatusList`'s "All Partners" header pattern: one `flex items-center justify-between` row holding the h2 on the left and Refresh on the right. The territory name/description lines that used to sit under the h2 now render in their own centered block below the row (only when there are territories), and Refresh still renders unconditionally (records or not), same as before — just sharing the header's row instead of a `flex justify-end` row of its own.

## Remaining Work
None — both requests are complete.

## Known Issues
None identified.

## Next Recommended Task
Russell live-verifies: (1) switch to List, hit Refresh, confirm it stays on List (not Home) — and the same for Home after arriving via a `?view=list` link; (2) confirm the List tab's "Assigned Contact Records" header and Refresh button now sit on one line, matching the Partners tab's "All Partners" row. Then this is done — no further action needed unless something looks off.
