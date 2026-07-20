# Funnel: Discontinued Status, Potential BS Narrowing, Other→Busy — v1

**Date:** 2026-07-20
**Product:** Territory Management System (TMS)
**Feature:** Three funnel/label changes to the visit-result status system

## Files Modified
- `territory-management-system/migrations/036_study_discontinued_result.sql` (new)
- `src/lib/territory-management-system/modules/records/types.ts`
- `src/lib/territory-management-system/modules/records/schema.ts`
- `src/lib/territory-management-system/modules/records/schema.test.ts`
- `src/components/territory-management-system/publisher/PublisherStatusHelp.tsx`
- `src/components/territory-management-system/VisitResultBarChart.tsx`
- `src/components/territory-management-system/VisitResultPieChart.tsx`
- `src/components/territory-management-system/ReportsView.tsx`
- `src/components/territory-management-system/GroupLeaderTabs.tsx`

## Summary of Changes
Three requests in one message. (1) Add "Discontinued" to the Started Bible Study / Progressive
BS follow-up choices. Confirmed via `AskUserQuestion` this should be a genuinely new, distinct
status (not just renaming the existing "No Positive Response") — that one is the funnel's
dead-end from Potential BS (interest never really took), the new one specifically means a study
that was underway and stopped. Added `study_discontinued` to `VISIT_RESULTS`
(`records/schema.ts`) and `VisitResult` (`records/types.ts`), a new migration widening the
`territory_record_visits.result` check constraint, its own label ("Discontinued"), bar/pie chart
colors, and card badge color (`bg-stone-100 text-stone-600`, distinct from `discontinued`'s
gray). Added to `BIBLE_STUDY_FOLLOWUP_RESULTS` alongside the existing `discontinued` — so Started
Bible Study/Progressive BS now offer 3 outcomes (Progressive BS / No Positive Response /
Discontinued) instead of 2. Excluded from `SELECTABLE_VISIT_RESULTS` (cold-start pool) and left
out of `BIBLE_STUDY_ONGOING_RESULTS`/`BIBLE_STUDY_FAMILY_RESULTS` — same as `discontinued`, a
record reverts to the plain default pool for its next visit once discontinued, no special ongoing
status. (2) Removed "Potential BS" as a re-confirmable choice once a record is already at
Potential BS — `POTENTIAL_BIBLE_STUDY_RESULTS` narrowed from `[started_bible_study,
potential_bible_study, discontinued]` to `[started_bible_study, discontinued]`; a record must now
move forward (Started Bible Study) or dead-end (No Positive Response), not loop back onto its own
current status. (3) Renamed the "Other" status label to "Busy" (`VISIT_RESULT_LABELS.other`) —
same underlying `'other'` value and notes-required validation, just the display label and the two
"Notes are required..." error messages.

Updated `PublisherStatusHelp.tsx`: Potential BS's description no longer mentions re-confirming
itself; Started Bible Study and Progressive BS's descriptions now mention Discontinued as a
possible next status; added a new "Discontinued" entry distinguishing it from "No Positive
Response"; renamed the "Other" entry to "Busy". Checked the dashboard FAQ
(`dashboard/faq/page.tsx`) for any references to these statuses — found none, left untouched
(same finding as the prior funnel-change session). Added a `study_discontinued` StatCard to both
`ReportsView.tsx` (admin Reports > Visits) and `GroupLeaderTabs.tsx` (Group Leader > Visits tab)
for parity with the existing `discontinued` card, using a new `BookX` icon to stay visually
distinct. `TerritoryReportTable.tsx`'s per-territory Started/Progressive BS columns were checked
and don't need changes — they only count currently-active studies, and a discontinued record
(old or new variant) already falls out of that count by design, same as before.

Updated `schema.test.ts`: rewrote the `getSelectableResults` funnel tests for the new Potential BS
(2 choices, not 3) and Started Bible Study/Progressive BS (3 choices, not 2) shapes, added a
cold-start negative check for `study_discontinued`, and a new small `VISIT_RESULT_LABELS`
describe block locking down the `other` → "Busy" rename and the `study_discontinued` vs.
`discontinued` label distinction. 87/87 tests pass (81 previous + 6 new/rewritten).

`npx tsc --noEmit`, `npx vitest run` (87/87), and `npx next build` all clean.

## Remaining Work
None for this pass.

## Known Issues
- **Migration 036 has NOT been applied to the live TMS Supabase project** — the `supabase-ldc`
  MCP server returned "Unauthorized" in this sandbox (no access token configured, the same
  standing limitation noted in every prior TMS checkpoint). Russell needs to run
  `territory-management-system/migrations/036_study_discontinued_result.sql` against the TMS
  project himself before logging a visit as "Discontinued" will work in production — until then
  the DB's check constraint will reject it.

## Next Recommended Task
Russell applies migration 036 to the live TMS Supabase project, then spot-checks live: a record
at Potential BS now offers only Started Bible Study / No Positive Response (no self-reconfirm); a
record at Started Bible Study or Progressive BS now offers Progressive BS / No Positive Response
/ Discontinued; logging "Discontinued" is accepted and shows up correctly in both the record's
Visit History and the new Reports/Group Leader "Discontinued" stat card; and the "Busy" label
(with its notes-required behavior intact) shows everywhere "Other" used to.
