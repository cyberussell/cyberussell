# Correction Recommendation Barangay/Section/Block — v1

**Date:** 2026-07-19
**Product:** Territory Management System (TMS)
**Feature:** Extend the publisher's "Recommend a Correction" form (already had Section/Block since migration 030) with the same Barangay (Territory) picker just added to the Move recommendation — a correction can now move a record into a different barangay entirely, not just a different Section/Block within its current one.

## Files Modified
- `territory-management-system/migrations/034_correction_recommendation_territory.sql` (new)
- `src/lib/territory-management-system/modules/records/types.ts`
- `src/lib/territory-management-system/modules/records/queries.ts`
- `src/lib/territory-management-system/modules/assignment/schema.ts`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/app/territory-management-system/dashboard/records/flagged/page.tsx`
- `src/components/territory-management-system/publisher/RecommendCorrectionForm.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/SearchScopeRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes

Migration `034_correction_recommendation_territory.sql` adds `correction_recommended_territory_id` (territory_records' *fourth* FK to `territories`, real FK with `on delete set null`, same pattern as 030/031/032/033). The new embed (`correction_territory:territories!correction_recommended_territory_id(...)`) was added with its disambiguation hint directly — the broader audit of every unqualified embed across the codebase was already done in the prior batch (033), so this only needed its own new hinted embed, not a re-audit.

`RecommendCorrectionForm.tsx` gained a Barangay dropdown (labeled by `description`, the actual barangay name field) above the existing Section/Block, cascading exactly like `MarkMovedForm`'s Move recommendation. **Dropped the old `sections` prop** (scoped to one fixed territory) in favor of `territories: TerritoryStructure[]` + `currentTerritoryId` (full congregation list, matching Move) — updated all three call sites: `PublisherRecordDetailView.tsx` (desktop + mobile), and `SearchScopeRecordDetailView.tsx` (which also lost its own now-unused `sections` prop, replaced with `territories` threaded straight through from `PublisherWorkspaceApp`'s `territoryStructures`).

`recommendRecordCorrection()` in `records/queries.ts` was refactored from positional args to an object param specifically so adding `territoryId` couldn't silently reorder either of its two existing call sites (`recommendCorrectionAction` and `recommendSearchScopeCorrectionAction`, both in `actions/publisher.ts`). Both actions now validate the client-supplied `territoryId` via a new `territorySectionBlockBelongsToCongregation()` congregation-ownership check (already built for Move in the prior batch, reused here) instead of the old `sectionBlockBelongsToTerritory(supabase, record.territory_id, ...)`, since `territoryId` is no longer always the record's own, server-derived value.

Both the Admin's "Flagged for Correction" page and the publisher's own pending-recommendation banner (added in the prior Move batch) now show the barangay change alongside the Section/Block change.

## Verification
- `npx tsc --noEmit`, `npx next build`, and `npx vitest run` (56/56) all clean.
- Live-verified via a temporary scratch route (removed before finishing): Barangay dropdown defaults to the record's current territory ("Poblacion" / Section A / Block 1); switching to "San Jose" correctly cascaded Section to B and Block to 3; submit fired `onRecommendCorrection` with the correct `territoryId`/`sectionId`/`blockId` for the newly selected barangay, plus Plus Code and reason.
- **Not live-tested against a real Supabase database** (no live credentials in this sandbox) — same standing limitation as every other TMS session. `SearchScopeRecordDetailView`'s own instance of the form wasn't separately live-tested (it reuses the identical component with the same prop shape as the tested path, just from a different parent) — code-reviewed only.

## Remaining Work
- **Migration 034 needs to be applied to the live Supabase project** alongside 032 and 033 (still pending from the prior batch) — until all three are applied, the Move and Correction recommendation flows will error in production.
- Real end-to-end verification still needed once migrations are applied: submit a real cross-barangay correction, confirm it shows correctly on Flagged for Correction with the right barangay diff, and that Apply Correction actually moves the record to the new territory.

## Known Issues
None identified this pass.

## Addendum (same session, same commit): hide "Records per publisher" when 0 approved records

Russell caught via a real screenshot that `AssignmentForm.tsx`'s "Records per publisher" stepper (from the prior batch) is meaningless when the selected territories have 0 approved records — every partnership starts empty regardless of the cap. Fixed: the stepper and its "Each partnership can hold up to N approved records" bullet are now hidden whenever `eligibleTotal === 0`, leaving just the existing "every partnership will start empty" message. The hidden `maxPerPartnership` form field still submits at its last value either way (harmless — `calculateAssignment` has nothing to cap with zero eligible records). Live-verified via a scratch route with two side-by-side forms (0-approved territory vs. a territory with 33 approved) — confirmed the stepper correctly hides/shows in each case, matching Russell's exact screenshot scenario. No migration dependency, works immediately on deploy.

File added to this batch: `src/components/territory-management-system/AssignmentForm.tsx`.
