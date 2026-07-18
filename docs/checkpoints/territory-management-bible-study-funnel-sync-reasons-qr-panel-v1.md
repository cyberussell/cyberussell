# Bible Study Funnel (Potential BS), Sync Failure Reasons, Overflow QR Panel, Card-Tone Unification — v1

**Date:** 2026-07-17 (built), migration confirmed applied 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** 4-item batch — this batch was built and committed in a prior session that did not write its own checkpoint or `working-on.md` entry; reconstructed here from the actual committed diff (`f55e71d`) after the gap was flagged mid-conversation.

## 1. New "Potential BS" Bible Study funnel stage
Previously the funnel jumped straight from a cold visit to "Started Bible Study." Added an earlier "Potential BS" stage (real interest shown, no regular study yet) that takes over the default-pool slot `started_bible_study` used to occupy. `started_bible_study` itself became a locked follow-up choice, reachable only once a record is already `potential_bible_study` (confirming a real study began), narrowing further to `bible_study`/`discontinued` from there. Full priority chain lives in `records/schema.ts`'s `getSelectableResults()`.

New migration `028_potential_bible_study_result.sql` — widens the `territory_record_visits_result_check` constraint to include `potential_bible_study`. No data changes, no backfill needed.

`VisitResult` isn't derived from one shared source everywhere, so every enumeration site needed the new value added by hand:
- `records/types.ts` — `VisitResult` union
- `records/schema.ts` — `VISIT_RESULTS`, `VISIT_RESULT_LABELS` ("Potential BS"), `VISIT_RESULT_STYLES`, `BIBLE_STUDY_FAMILY_RESULTS`, `POTENTIAL_BIBLE_STUDY_RESULTS`/`STARTED_BIBLE_STUDY_RESULTS` (new), `getSelectableResults()` priority chain rewritten
- `ReportsView.tsx` — new "Potential BS" `StatCard` (Sparkles icon) in the results grid
- `VisitResultBarChart.tsx` — new `RESULT_COLORS.potential_bible_study` (`#06B6D4`)
- `GroupLeaderTabs.tsx` — new "Potential BS" tile in its own duplicate stat-list (Sparkles icon)

## 2. Sync failure reasons surfaced in the aggregate screen
`SyncQueueItem.error` (offline sync queue, `offline/db.ts`) was already captured per-item and shown on the individual record's detail view, but not on the aggregate "N item(s) failed to sync" screen. `PublisherWorkspaceApp.tsx` gained `QUEUE_ITEM_TYPE_LABELS` + `describeQueueItem()` (friendly label per queue item type, e.g. "Visit: Potential BS" instead of just "visit") and now lists every failed item with its captured error message directly above the existing "Sync Now" retry button, plus a hint to contact the Group Leader if it keeps failing.

## 3. Overflow QR gets a matching dark panel
The QR *image* was already inverted (white-on-black) for overflow batches from an earlier round, but the surrounding `Card` panel (heading, link, caption) was still the plain white/navy default — none of it branched on `isOverflow`. `GroupLeaderTabs.tsx`'s QR card now flips to a black panel (`border-black bg-black`) with white heading/caption and a lighter blue link (`#60A5FA`) when `isOverflow` is true, matching the pattern already used elsewhere in this codebase for status-conditional `Card` overrides (`bg-amber-50`, `bg-red-50` via `className`).

## 4. Card-tone (color) logic unified
`AssignedRecordsList.tsx` and `PublisherRecordDetailView.tsx` previously had their own separate, independently-maintained red/green/amber card-tinting rules that could drift out of sync. Both now call the shared `getRecordCardTone()` in `records/schema.ts` (which already existed for a similar purpose, extended to cover the new Bible-Study-family states so `potential_bible_study` gets the same green tinting as a confirmed study).

## Verification
`npx tsc --noEmit` and `npx vitest run` (52/52) confirmed clean on the final committed state (re-verified in a later session). Live verification method not recorded — this checkpoint is reconstructed from the diff after the fact, not written by the session that did the work.

## Remaining Work
None identified beyond what's listed above.

## Known Issues
None identified.

## Next Recommended Task
Migration `028` confirmed applied by Russell (2026-07-18). Spot-check live: a fresh visit can be logged as "Potential BS," a second visit on that same record narrows to Started Bible Study/Potential BS/No Positive Response, the aggregate sync-failure screen shows real error text on an intentionally-failed item, and an overflow batch's QR panel renders fully black/white end to end (not just the QR image).
