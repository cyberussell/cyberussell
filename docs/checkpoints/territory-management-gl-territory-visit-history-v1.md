# Group Leader Territory Visit History (Last 30 Days) — v1

**Date:** 2026-07-23
**Product:** Territory Management System (TMS)
**Feature:** A "Territories Worked (Last 30 Days)" list on the Group Leader dashboard — every territory with at least one logged visit in the last month, showing Territory Number — Barangay Name, which Sections had a visit (House To House or Auxiliary Groups, undistinguished), and the date of the most recent visit. Sorted most-recently-visited first. Requested mid-session from a live screenshot of the "no assignment generated yet" empty state.

## Files Modified
- `src/lib/territory-management-system/modules/reports/queries.ts` — new `TerritoryVisitHistoryEntry` type + `getTerritoryVisitHistory()`
- `src/components/territory-management-system/TerritoryVisitHistoryList.tsx` (new) — read-only list, reused in both render locations below
- `src/app/territory-management-system/group-leader/dashboard/page.tsx` — fetches the history regardless of whether today's batch exists yet; renders it directly below the territory checklist on the pre-assignment empty-state screen, and passes it into `GroupLeaderTabs`
- `src/components/territory-management-system/GroupLeaderTabs.tsx` — new `territoryHistory` prop, rendered below the stat-card grid on the "Dashboard" tab

## Summary of Changes
`getTerritoryVisitHistory` fetches `territory_record_visits` since a 30-days-ago cutoff, then resolves each visit's record → territory/section via two follow-up queries (deliberately not a nested PostgREST embed — `territory_records`/`territory_sections` each carry more than one FK to `territories`/`territory_sections` via the correction/move recommendation columns, the same ambiguous-embed footgun this codebase has hit before). Groups by territory, tracking the latest `visited_at` and the distinct set of Section labels touched. Not filtered by batch type at all — a visit counts the same whether it came from a House To House or an Auxiliary Groups partnership, satisfying "both for the house to house or by the auxiliary groups" for free (visits carry no batch-type distinction to filter on in the first place).

Confirmed 3 design decisions with Russell via `AskUserQuestion` before building: (1) sort order — most-recently-visited first, not oldest-first; (2) placement — below the existing territory list/checklist wherever it appears, which in practice means both the pre-assignment empty-state screen (directly under `AssignmentForm`'s "Territory map(s)" checklist) and the Dashboard tab (below the stat cards) once a batch exists; (3) visibility on the pre-assignment screen — yes, shown there too, since that's exactly the screen Russell was looking at when he asked.

`tsc`/`vitest` (59/59, no new tests added — this is a straightforward read/aggregate query, no branching logic worth unit-testing in isolation)/`next build` all clean. Not live-verified in a browser (no live TMS credentials in this session) — code-reviewed only.

## Remaining Work
None planned — fully scoped, single-batch request.

## Known Issues
- Same pending-push blocker as the other two TMS commits this session (`644b8d2`, `7c83ea8`) — see their checkpoints for the git-remote-credential root cause.
- Not live-verified — Russell should spot-check both render locations (pre-assignment screen, and the Dashboard tab after generating today's assignment) once deployed.

## Next Recommended Task
Russell: fix the `origin` remote credential and push all three pending commits, then live-verify this feature by checking a Group Leader account with at least one visit logged in the last 30 days.
