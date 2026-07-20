# Publisher Done Screen — Link to Results Pie Chart — v1

**Date:** 2026-07-20
**Product:** Territory Management System (TMS)
**Feature:** After finishing ministry, publisher can view their day's results as a pie chart

## Files Modified
- `src/components/territory-management-system/VisitResultPieChart.tsx` (new — restored from git history, commit `6555c56`'s pre-swap version, plus the `potential_bible_study` color the bar chart gained after that)
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes
Russell asked that once a publisher ends ministry (Sync & Finish or End My Ministry Early), they
land somewhere that shows the day's results, specifically as a pie chart rather than the existing
bar chart. Confirmed via `AskUserQuestion` that the existing "Thank you for your service today!"
Bible-verse screen should stay as-is, not be replaced outright.

Added a "View My Results" button to that done screen that sets `mapView` to `'summary'` and
`view` to `'home'` — takes the publisher straight to the Home > Summary tab (reachable manually
via the same toggle at any other time too). Swapped that tab's chart from `VisitResultBarChart`
to a restored `VisitResultPieChart` (a plain SVG donut + legend, no chart library, matching the
codebase's existing plain-SVG convention). Scoped narrowly: the Group Leader's own Home tab
(`GroupLeaderTabs.tsx`) still uses `VisitResultBarChart` and was not touched — Russell had
explicitly asked for a bar chart there previously for mobile readability (see `VisitResultBarChart.tsx`'s
own comment), and this request was specifically about the publisher's own results view, not a
global revert.

`npx tsc --noEmit`, `npx vitest run` (84/84), and `npx next build` all clean. No migration
needed — pure client-side state/UI change.

**Follow-up (same session, next commit):** Russell noted the Summary tab was reachable from the
Home toggle at any time, mid-session — he wants it hidden until ministry has actually ended (a
partial-day view would be misleading). Changed the Summary tab's `available` flag in the same
tabs array (`PublisherWorkspaceApp.tsx`) from unconditional `true` to `sessionEnded` — it now
only appears in the Map/Pins/Search Area/Summary/Share/Status/FAQ toggle once
`workspace.finished_at || workspace.ended_early_at` is set, same as the "View My Results" button
already only being reachable post-finish. `tsc`/`vitest` (84/84)/`next build` clean.

## Remaining Work
None for this pass.

## Known Issues
None identified.

## Next Recommended Task
Russell spot-checks live: finish a partnership's ministry (either path), confirm the "View My
Results" button appears on the Thank You screen, tap it, and confirm it lands on Home > Summary
showing a pie chart with the day's own logged results (not the whole congregation's).
