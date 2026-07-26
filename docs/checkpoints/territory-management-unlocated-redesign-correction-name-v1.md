# Unlocated flow redesign, Correction resident-name field, card/button polish — v1

**Date:** 2026-07-27
**Product:** Territory Management System (TMS)
**Feature:** Twelve items from Russell across two messages in one session, all publisher/Group-Leader-workspace-facing.

## Files Modified
- `src/components/territory-management-system/publisher/MarkMovedForm.tsx`
- `src/components/territory-management-system/publisher/RecommendCorrectionForm.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/HouseholdDistributionMap.tsx`
- `src/components/territory-management-system/GroupLeaderTabs.tsx`
- `src/lib/territory-management-system/modules/assignment/schema.ts`
- `src/lib/territory-management-system/modules/records/queries.ts`
- `src/lib/territory-management-system/modules/records/types.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/app/territory-management-system/dashboard/records/flagged/page.tsx`
- `territory-management-system/migrations/041_correction_resident_name.sql` (new, **applied live by Russell**)

## Summary of Changes

1. **Unlocated flow redesigned.** `MarkMovedForm`'s chooser dropped from 4 options to 2: "Suggest New Location" and "Request Record Removal" — the "Correction" (formerly "Update Current Resident," a direct no-review write) and "Report Contact in Another Territory" (quick note) options were removed entirely from this chooser, since Correction now lives solely in the main 4-button row's own Correction button (item 2) and duplicating it here was confusing. "Suggest New Location" itself is heavily simplified: Resident Name (prefilled, read-only display) and Household Members (prefilled, editable) for context, then just Address (now a required multi-line textarea, free-text — no more Territory/Section/Block picker or Plus Code field) and Notes (now required, was optional). The submit button lost its icon, now plain "Suggest Location" text. Cascaded through `MoveRecommendFields`/`recommendMoveSchema`/`recommendMoveAction`/`recommendRecordMove` — the recommendation no longer carries territory/section/block/unit/plus-code at all; the record now always stays in its own territory/section/block, only the street address text and household count change. Added a defensive fix in `applyRecordMove`: since this path can no longer submit a new Plus Code or Unit, applying a recommendation now preserves the record's existing plus_code/unit instead of nulling them out (previously only an edge case when those optional fields were left blank — now the case every time).

2. **Correction form gains a Resident Name field**, letting a publisher recommend a corrected name (e.g. a misspelling) alongside the existing Plus Code/Territory/Section/Block/Household Members fields — admin-review-gated like everything else in that form, unlike the old direct-write "Update Current Resident" path removed in item 1. New migration `041_correction_resident_name.sql` (`territory_records.correction_recommended_resident_name`, **applied live**). Threaded through the full stack: `CorrectionFields` → `recommendCorrectionSchema` → `recommendCorrectionAction` → `recommendRecordCorrection`/`dismissCorrectionRecommendation`/`applyRecordCorrection` → `TerritoryRecord` type → Admin's Flagged for Correction page (new before/after diff line).

3. **Mobile action-row colors differentiated.** Pass/Unlocated/Correction/Add Person previously had Pass, Correction, and Add Person all sharing the same blue, making the 3-4-button row hard to scan. Now: Pass (blue, unchanged), Unlocated (amber, unchanged), Correction (violet — new), Add Person (emerald — new).

4. **Contact Card text hierarchy reordered**: Resident Name is now the card's title (bigger/bold, first), then Section/Block, then Address (its own line, only shown when it isn't already doing double duty as the title), then Plus Code (same "only if not already the title" guard) — was previously Address/Plus Code as the title with Resident Name buried in the secondary line.

5. **"Add Contact in This Territory" Cancel button fixed** — was routing to the Assigned Contact Records list (`{ name: 'list' }`) instead of back to the My Added Records tab, inconsistent with "Report Contact in Another Territory"'s Cancel (`{ name: 'addedRecords' }`). Now matches.

6. **Group Leader "Visits" tab gets an explanatory header** — previously just a bare grid of result-count stat cards with no context. New header explains these are today's combined-batch (House To House + any Auxiliary Groups) result counts, not a running history, and what the small arrow delta badge means (change since first opened today).

7. **Fixed Leaflet map pins/zoom controls rendering on top of the fixed bottom nav** on the publisher workspace's Home "Pins" panel. Root cause: Leaflet's internal panes use their own z-index scale (200-700), and `.leaflet-container` is `position: relative` with no z-index of its own — without an explicit stacking-context boundary, those values escape into the page's global stacking order and paint over the app's `z-20` bottom nav. Fixed by adding `isolate` to the map's wrapping `Card` in `HouseholdDistributionMap.tsx`, containing Leaflet's internal stacking within that card.

## Remaining Work
- Not live-verified in a real browser (no TMS credentials in this sandbox) — verified via `npx tsc --noEmit` (clean), `npx vitest run` (101/101, unchanged), `npx next build` (clean).
- Not yet committed (pending this checkpoint).

## Known Issues
- None found. (The prior batch's "two different Correction buttons" naming overlap, flagged as a known issue in `territory-management-publisher-relabel-batch-v1.md`, is resolved by this batch's item 1 — Unlocated's chooser no longer has its own separate "Correction" option.)

## Next Recommended Task
Russell live-verifies all twelve items on a real device — particularly the redesigned Suggest New Location form (Address as free text, no more territory picker) and the Correction form's new Resident Name field on both the publisher and Admin (Flagged for Correction) sides — then commit and push.
