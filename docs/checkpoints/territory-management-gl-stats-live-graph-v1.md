# Group Leader Live Stats + Full Results Graph — v1

**Date:** 2026-07-20
**Product:** Territory Management System (TMS)
**Feature:** Fix frozen Visits tab stats, move "Generate New" off the results graph, show all result categories in the Home tab chart

## Files Modified
- `src/components/territory-management-system/GroupLeaderTabs.tsx`
- `src/components/territory-management-system/VisitResultBarChart.tsx`

## Summary of Changes
Russell reported two bugs from live screenshots of the Group Leader ("TGL") workspace:

1. **Visits tab stats not updating after publisher logs.** The stat cards displayed `resultBaseline[key]` — a `localStorage` snapshot taken the first time the device opened that day's batch — as the primary number. Only the small delta badge reflected the live count, so the number a Group Leader actually reads never visibly changed as publishers synced new visits. Fixed by displaying the live `stats.resultCounts[key]` as the value, keeping the delta badge (still baseline-relative) as secondary "since I opened this page" context.

2. **Home tab results graph looked broken / "missing."** `VisitResultBarChart` only rendered result types with a nonzero count. On a day with activity in only one category (e.g. Do Not Call = 3, everything else 0 — Russell's exact scenario), that produced a single lone red bar, which didn't read as "a graph" to him. Confirmed via `AskUserQuestion` that he wanted every category always visible, not a genuinely broken/blank chart. Removed the zero-count filter — now shows all 11 result types (excludes the internal-only `undone` status, never publisher-selectable), sorted by count, with the bar-width math guarded against an all-zero day (`Math.max(entries[0]?.count ?? 0, 1)`).

Also moved the "Generate New" button out of the "all partners done" summary card (where it sat directly under the graph) into the standalone actions row below, next to "Create Auxiliary Groups" — per Russell's explicit ask that the button not be shown inside the same card as the graph. The not-done QR-code card's own inline "Generate New" button is unchanged.

## Remaining Work
None — both fixes are complete and deployed.

## Known Issues
None identified in this pass.

## Next Recommended Task
Russell spot-checks live: Visits tab numbers actually move (not just the delta arrow) as publishers sync new visits; the Home tab's results chart shows every category including zeros once all partners are done; "Generate New" appears below the results card instead of inside it.
