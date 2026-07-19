# TGL Records-Per-Publisher + Move Recommendation Barangay/Section/Block — v1

**Date:** 2026-07-19
**Product:** Territory Management System (TMS)
**Feature:** Two requests in one message. (1) The Group Leader can now set how many records each publisher/pair gets when generating an assignment, instead of a fixed 6. (2) The "Recommend New Location" (Move recommendation) form gained a Barangay → Section → Block cascading picker, since the moved person may now live in a different territory entirely.

## Files Modified
- `territory-management-system/migrations/033_move_recommendation_location.sql` (new)
- `src/lib/territory-management-system/modules/records/types.ts`
- `src/lib/territory-management-system/modules/records/queries.ts`
- `src/lib/territory-management-system/modules/assignment/schema.ts`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/lib/territory-management-system/modules/reports/queries.ts`
- `src/app/territory-management-system/actions/group-leader.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/app/territory-management-system/actions/records.ts`
- `src/app/territory-management-system/dashboard/records/flagged/page.tsx`
- `src/components/territory-management-system/AssignmentForm.tsx`
- `src/components/territory-management-system/publisher/MarkMovedForm.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes

**(1) Records-per-publisher, TGL-configurable.** `calculateAssignment()` in `engine.ts` already accepted `maxPerPartnership` as an optional parameter — it was just never called with anything but the hardcoded `DEFAULT_MAX_PER_PARTNERSHIP = 6` default. Added a new "Records per publisher" `NumberStepper` (min 1, max 30, default 6) to `AssignmentForm.tsx` — the same form the Group Leader already uses to enter Publishers/Group size — threaded through `createAssignmentSchema` → `createGroupLeaderAssignmentAction` → `createAssignment` → `calculateAssignment`. It's a hard per-partnership cap once submitted, same as before, not a soft suggestion (confirmed this framing with Russell before building). The form's own live breakdown math (partnerships needed, shortfall warning) now recalculates against the chosen value instead of the constant. `OverflowAssignmentForm`/`createOverflowAssignmentAction` untouched — overflow batches always start with zero records (`forceZeroRecords`), so a per-partnership cap is meaningless there.

**(2) Barangay/Section/Block on the Move recommendation.** Migration `033_move_recommendation_location.sql` adds `move_recommended_territory_id/section_id/block_id` (real FKs, `on delete set null`, same pattern as 030/031/032). **This is territory_records' third set of FKs to territories/territory_sections/territory_blocks** — the same failure mode that silently broke assignment generation once already (migration 030, see `territory-management-ambiguous-fk-embed-fix-v1`) was audited proactively this time: every unqualified `territories(...)`/`territory_sections(...)`/`territory_blocks(...)` embed selecting from `territory_records` anywhere in the codebase was found and given a `!column` disambiguation hint — `RECORD_WITH_LOCATION_SELECT` (records/queries.ts), the nested embed in `getPartnershipByToken` (assignment/queries.ts), and `getApprovedRecordLocations` (reports/queries.ts, the Reports page's household map pins). New `move_territory`/`move_section`/`move_block` embeds added alongside.

`MarkMovedForm.tsx`'s "Recommend New Location" form gained a Barangay (Territory, labeled by `description` — the actual barangay name field, confirmed via `TerritoryForm.tsx`'s "Barangay Name" label — not `name`, which is "Territory Number") → Section → Block cascade, defaulting to the record's own current territory so a publisher only touches it if the barangay actually changed. New `territorySectionBlockBelongsToCongregation()` query function added — unlike the Correction flow (where `territoryId` is always the record's own, server-derived, never client input), Move lets the publisher pick a *different* territory, so `recommendMoveAction` needed an extra congregation-ownership check on the submitted `territoryId` before trusting it, on top of the existing section-belongs-to-territory check. `applyRecordMove` now also writes `territory_id`/`section_id`/`block_id` onto the real record when applied (always together, since the form always submits a full location — no partial-field case like Correction has). Admin's "Flagged for Move" page and the publisher's own pending-recommendation banner both now show the barangay/section/block change alongside the address change.

## Verification
- `npx tsc --noEmit`, `npx next build`, and `npx vitest run` (56/56) all clean.
- Live-verified via a temporary scratch route (removed before finishing):
  - `AssignmentForm`'s new stepper: changed to 7, confirmed the breakdown text recalculated correctly (25 records → "3 partnerships with 7 records and 1 partnership with 4 records").
  - Barangay dropdown defaults to the record's current territory ("Poblacion" / Section A / Block 1); switching to "San Jose" correctly cascaded Section to B and Block to 3; submit fired `onRecommendMove` with the correct `territoryId`/`sectionId`/`blockId` for the newly selected barangay.
- **Not live-tested against a real Supabase database** — no live credentials in this sandbox, standing limitation for this product. The ambiguous-embed audit was done by careful code review (grepping every `territories(`/`territory_sections(`/`territory_blocks(` embed in the codebase and tracing which table each selects from), not by hitting a real PostgREST instance — worth Russell's extra attention given this exact bug already happened once silently.

## Remaining Work
- **Migrations 032 and 033 both need to be applied to the live Supabase project** before the Move recommendation flow (Recommend New Location, Flagged for Move, Mark as Pending) will work at all — until then, submitting a real "Recommend New Location" in production will error since the columns don't exist yet. The TGL records-per-publisher feature has no migration dependency and works immediately once deployed.
- Real end-to-end verification still needed once migrations are applied: submit a real cross-barangay move recommendation, confirm it shows correctly on Flagged for Move with the right barangay/section/block diff, and that Apply Move actually moves the record to the new territory (and that it then shows up correctly in that territory's future assignment generation).

## Known Issues
None identified this pass.
