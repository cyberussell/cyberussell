# "Moved" → "Unlocated" rename, Section/Block on Recommend a Correction — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Two independent changes in one batch, plus a Tagalog typo fix.

## Files Modified
- `src/lib/territory-management-system/modules/records/schema.ts` — `VISIT_RESULT_LABELS.moved` → `'Unlocated'`
- `src/components/territory-management-system/publisher/MarkMovedForm.tsx` — button/heading/body text
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx` — mobile toggle button text; new `sections` prop threaded into both `RecommendCorrectionForm` render sites
- `src/components/territory-management-system/publisher/PublisherStatusHelp.tsx` — `status: 'Moved'` → `'Unlocated'`, cross-reference text, and the `malipang` → `malibang` typo fix
- `src/components/territory-management-system/publisher/PublisherFAQ.tsx` — quoted status reference updated
- `src/components/territory-management-system/publisher/RecommendCorrectionForm.tsx` — new Section/Block cascading `<select>` fields, `CorrectionFields` gained `sectionId`/`blockId`
- `src/components/territory-management-system/publisher/SearchScopeRecordDetailView.tsx` — new `sections` prop threaded into `RecommendCorrectionForm`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx` — derives `sections` per record from the existing `territoryStructures` prop for both call sites; `handleRecommendCorrection`/`handleRecommendSearchScopeCorrection` forward `sectionId`/`blockId` into the offline sync queue payload; fixed an optimistic-record type error from the new `TerritoryRecordWithLocation` fields
- `src/lib/territory-management-system/modules/assignment/schema.ts` — `recommendCorrectionSchema`/`recommendSearchScopeCorrectionSchema` gained required `sectionId`/`blockId` (uuid)
- `src/app/territory-management-system/actions/publisher.ts` — both correction actions parse and forward the new fields
- `src/lib/territory-management-system/modules/records/queries.ts` — `RECORD_WITH_LOCATION_SELECT` gained aliased joins (`correction_section`/`correction_block`, disambiguated via the `!column_name` PostgREST hint since there are now two FKs to `territory_sections`/`territory_blocks`); `recommendRecordCorrection` takes `sectionId`/`blockId`; `dismissCorrectionRecommendation`/`applyRecordCorrection` clear/apply the two new columns alongside the existing Plus Code ones
- `src/lib/territory-management-system/modules/records/types.ts` — `TerritoryRecord` gained `correction_recommended_section_id`/`block_id`; `TerritoryRecordWithLocation` gained `correction_section`/`correction_block`
- `src/app/territory-management-system/dashboard/records/flagged/page.tsx` — Flagged for Correction cards now show the current → recommended Section/Block alongside the existing Plus Code line
- `territory-management-system/migrations/030_correction_section_block.sql` (new)

## Summary of Changes
Russell asked for the publisher-facing "Moved" status to be renamed "Unlocated." Since `VISIT_RESULT_LABELS` is a single shared constant (also read by Admin's `ReportsView`/`RecordForm`/`VisitLogForm` and the Group Leader's Visits tab), he confirmed (via clarifying question) the rename should apply everywhere, not just the publisher UI — the underlying `'moved'` DB value/enum is untouched, only the human-readable label. Every hardcoded literal "Moved" in publisher-facing UI text (buttons, headings, Status tab, FAQ) was updated to match; code comments and internal identifiers (`MarkMovedForm`, `markingMoved`, `onUpdateMoved`, `MovedRecordFields`) were deliberately left alone as an out-of-scope pure-cosmetic rename. Also fixed a Tagalog typo Russell flagged directly: "malipang" → "malibang" in the Progressive BS status description.

Separately, Russell asked for the "Recommend a Correction" flow (`RecommendCorrectionForm.tsx`, previously Plus Code + reason only) to also let a publisher recommend a Section/Block change, prefilled from the record's current values whenever opened from an actual Contact Record — which is always, since both of this form's call sites (`PublisherRecordDetailView` for assigned records, `SearchScopeRecordDetailView` for search-scope records) are real `territory_records` with known `section_id`/`block_id`. Confirmed via clarifying question: real cascading dropdowns tied to the territory's actual Section/Block rows (so Admin's existing one-click "Apply Correction" can apply them, same as it already does for Plus Code), not free text — this required a new migration.

## Remaining Work
None requested beyond what's built.

## Known Issues
- **Migration 030 confirmed applied by Russell, 2026-07-18** — the schema is live, but no real correction has actually been submitted end-to-end yet.
- The Flagged for Correction page's new Section/Block display line was code-reviewed only (relies on a PostgREST `!column_name` FK-disambiguation join hint, `correction_section:territory_sections!correction_recommended_section_id(id, label)`) — not yet exercised against real data, since that requires a real publisher submission and live credentials this sandbox doesn't have.
- Live-verified via a temporary scratch route: the "Unlocated" rename (MarkMovedForm button/heading, PublisherStatusHelp entry and cross-reference, malibang fix) and the RecommendCorrectionForm's new Section/Block cascading selects (prefill from mock "Section 3 / Block 12," switching Section resets Block correctly, submit payload includes the right `sectionId`/`blockId`) — all confirmed working client-side.

## Next Recommended Task
Russell spot-checks live: submit a real "Recommend a Correction" with a changed Section/Block as a publisher, confirm it shows up correctly on the Admin's Flagged for Correction page, and that "Apply Correction" actually moves the record to the new Section/Block.
