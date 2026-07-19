# Bible Study Funnel Step Removal + Admin Weekly Notes Menu — v1

**Date:** 2026-07-20
**Product:** Territory Management System (TMS)
**Feature:** Remove Bible Study as a selectable status, add admin Weekly Notes menu

## Files Modified
- `src/lib/territory-management-system/modules/records/schema.ts`
- `src/lib/territory-management-system/modules/records/schema.test.ts`
- `src/lib/territory-management-system/modules/records/queries.ts`
- `src/lib/territory-management-system/modules/reports/queries.ts`
- `src/lib/territory-management-system/modules/reports/date.ts`
- `src/lib/territory-management-system/modules/reports/date.test.ts` (new)
- `src/components/territory-management-system/publisher/PublisherVisitLogForm.tsx`
- `src/components/territory-management-system/publisher/PublisherStatusHelp.tsx`
- `src/components/territory-management-system/TerritoryReportTable.tsx`
- `src/components/territory-management-system/dashboard/DashboardSidebar.tsx`
- `src/app/territory-management-system/dashboard/weekly-notes/page.tsx` (new)

## Summary of Changes

### 1. Bible Study removed as its own selectable funnel step
The funnel used to require confirming "Bible Study" as a distinct intermediate stage between Started Bible Study and Progressive BS. It's now direct: Potential BS -> Started Bible Study -> Progressive BS -> Discontinued/Unlocated.

- `SELECTABLE_VISIT_RESULTS` (`records/schema.ts`) now excludes `bible_study`.
- `started_bible_study` folds directly into `BIBLE_STUDY_ONGOING_RESULTS`'s narrowing, so its next-visit choices are the same Progressive BS/No Positive Response/Unlocated set `progressing` already offered. The now-redundant `STARTED_BIBLE_STUDY_RESULTS` constant was removed.
- `bible_study` deliberately stays in the `VISIT_RESULTS` enum (never deleted) so already-logged historical visits still render a correct label/color/badge — same treatment as `undone`/`initial_visit`/`progressing`/`discontinued`. `BIBLE_STUDY_ONGOING_RESULTS` still recognizes a legacy record whose latest result is `bible_study` and narrows it to the follow-up set correctly, rather than falling through to the full default pool.
- Every dropdown/status-selection UI in TMS already reads from `getSelectableResults()`/`SELECTABLE_VISIT_RESULTS` as its single source (admin `RecordForm`/`VisitLogForm`/`VisitHistoryList` Override, publisher `PublisherRecordForm`/`PublisherVisitLogForm`), so no call site needed touching beyond the schema itself.

### 2. Two dependent stats updated to match
Both previously matched only the literal `'bible_study'` result, which would have silently gone to zero for all new data:
- Group Leader Dashboard's "Bible Studies in the Area" count (`countActiveBibleStudies`, `reports/queries.ts`) now matches the full `BIBLE_STUDY_ONGOING_RESULTS` family (`started_bible_study`/`progressing`, plus legacy `bible_study`).
- Admin Reports per-territory table's "Bible Study" column (`getTerritoryReportRows`) renamed to "Progressive BS" (field renamed `bibleStudy` -> `progressiveBibleStudy`), now counts `progressing` + legacy `bible_study` instead of only `bible_study`. `TerritoryReportTable.tsx` updated to match.

### 3. Copy updated
`PublisherStatusHelp.tsx` (the Status tab in the publisher workspace) — removed the "Bible Study" entry entirely, and "Started Bible Study"'s description now says the next visit becomes Progressive BS (was "Bible Study"). `PublisherFAQ.tsx` was checked and doesn't reference the funnel at all, so left untouched.

### 4. New admin "Weekly Notes" menu
Russell wants a single place to review every visit note publishers left in the current review week, without opening each contact record individually, with the same Override/Undo controls already on the per-record detail page.

- New `listWeeklyVisitNotes()` (`records/queries.ts`) returns one row per record whose CURRENT latest visit (not just any visit logged that week) has a non-empty note and falls in the window. This matters because Override/Undo always act on a record's true latest visit — including a stale, already-superseded note here would let those actions silently mutate the wrong (newer) visit.
- New `notesWeekRange()` (`reports/date.ts`, deliberately separate from the existing `weeklyRange` used by the Reports Daily/Weekly/Monthly toggle, which is untouched) implements the specific rule Russell asked for: the Monday-Sunday window does NOT advance the instant Monday begins — it keeps showing the just-finished week through all of Monday and only rolls over on Tuesday, matching when admins actually review the past week at their meeting.
- New page `dashboard/weekly-notes` reuses `VisitHistoryList` per row exactly as the per-record detail page does (badge, date, notes, Override/Undo), just scoped to one visit at a time, with a record-identifying header line above each.
- New sidebar nav entry "Weekly Notes" — distinct from the existing "Notes" page (end-of-ministry partnership notes, unrelated data).

## Remaining Work
None — both items complete and deployed.

## Known Issues
- The funnel logic itself is verified by 6 new `getSelectableResults` unit tests rather than a live click-through — no live Supabase credentials in this sandbox.
- The Weekly Notes page's rendering was verified via a temporary scratch route with mock data (layout confirmed matching Russell's reference screenshot exactly) rather than against a real Supabase database, for the same reason.
- `notesWeekRange`'s rollover math has 6 dedicated unit tests covering the Monday-grace-day/Tuesday-rollover boundary explicitly.

## Next Recommended Task
Russell spot-checks live: logging a visit as "Potential BS" then "Started Bible Study" then confirms the next visit's Status dropdown offers Progressive BS/No Positive Response with no "Bible Study" option anywhere; the Reports table's renamed "Progressive BS" column and the Dashboard's "Bible Studies in the Area" count both still show sensible numbers; and the new Weekly Notes menu lists this week's real visit notes with working Override/Undo.
