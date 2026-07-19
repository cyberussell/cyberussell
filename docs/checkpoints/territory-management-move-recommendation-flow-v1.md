# Move Recommendation Flow + Publisher Recommendation Banner — v1

**Date:** 2026-07-19
**Product:** Territory Management System (TMS)
**Feature:** Split the "Unlocated" → "Update Contact Record" form into two distinct paths, added a new Admin-approval-gated "Move" recommendation, and surfaced pending recommendations to the publisher.

## Files Modified
- `territory-management-system/migrations/032_move_recommendation.sql` (new)
- `src/lib/territory-management-system/modules/records/types.ts`
- `src/lib/territory-management-system/modules/records/queries.ts`
- `src/lib/territory-management-system/modules/assignment/schema.ts`
- `src/lib/territory-management-system/modules/offline/db.ts`
- `src/lib/territory-management-system/modules/offline/sync.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/app/territory-management-system/actions/records.ts`
- `src/components/territory-management-system/publisher/MarkMovedForm.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/app/territory-management-system/dashboard/records/flagged/page.tsx`

## Summary of Changes

**Problem:** "Update Contact Record" was previously a single form used for two different real-world scenarios, conflated into one instant, non-reviewed write: (1) a genuinely different person now lives at the address, and (2) the current resident tells the publisher where the *previous* resident moved to. The second case was being written directly to the record with no Admin review, which Russell wanted gated.

**Split into two forms in the same "Unlocated" choose step** (`MarkMovedForm.tsx`, now a 3-way choice: Update Current Resident / Recommend New Location / Recommend for Admin Removal):
- **"Update Current Resident"** — unchanged trust level (instant, no Admin review, same as before). Fields: Unit, Address, Resident name (editable), **Household Members (new)**, Notes. No Plus Code field (location hasn't changed) — the existing Plus Code is silently carried through unmodified in the payload rather than shown/edited.
- **"Recommend New Location"** — new, Admin-approval-gated, following the exact same review pattern already used by Correction/Removal recommendations (`move_recommended_*` columns, migration 032, mirroring 012/020/031). Fields: Unit, **New Address**, **Resident name (disabled/read-only — same person, name never changes)**, Plus Code (optional), **Household Members (new)**, Notes. Nothing on the real record changes until an Admin applies it from a new "Flagged for Move" section.

**New Admin review queue** (`dashboard/records/flagged/page.tsx`): "Flagged for Move" section between the existing "Flagged for Removal" and "Flagged for Correction" sections — same Apply/Dismiss pattern, plus a new **"Mark as Pending"** button (only shown while the record's `status` is still `'approved'`) that flips it to `status: 'pending'` via the already-existing `setRecordStatus` query — `fetchEligibleRecordIds` already filters assignment generation to `status = 'approved'` only, so this pulls the record out of circulation while the Admin investigates, independent of applying/dismissing the recommendation itself.

**Publisher-facing "your update" banner**, added just above Visit History in `PublisherRecordDetailView.tsx` — previously none of Correction/Removal/Move recommendations showed anything to the publisher after submitting (confirmed via code read: no existing indicator). Now shows a small card per pending recommendation type (Move/Correction/Removal, all three independently, since nothing prevents more than one being open on the same record) with a summary of what was recommended and "pending Admin approval."

## Verification
- `npx tsc --noEmit`, `npx next build`, and `npx vitest run` (56/56) all clean.
- Live-verified via a temporary scratch route (removed before finishing), mobile viewport (375px):
  - 3-way choose step renders correctly.
  - "Recommend New Location": Resident name field visually disabled/grayed and pre-filled; submitting fired `onRecommendMove` with the correct payload (address/unit/plusCode/householdMembers/notes, no residentName).
  - "Update Current Resident": Resident name editable (typed a new name, took it); no Plus Code field shown; submitting fired `onUpdateMoved` with the edited resident name AND the original Plus Code silently carried through unchanged (`"7Q934J8F+MJ"`) — confirms the "don't blank it out" behavior works.
  - Both the Move and Correction pending banners render correctly above Visit History with the right summary text.
- **Not live-tested against a real Supabase database** (no live credentials in this sandbox, standing limitation for this product) — the full round trip (submit → Flagged for Move → Apply Move / Mark as Pending / Dismiss → assignment generation actually excluding a pending record) has not been confirmed against production data.

## Remaining Work
- **Migration 032 has not been applied to the live Supabase project yet** — must run before this ships, same as every other TMS migration in this project's workflow.
- **Not committed or pushed** — this is a substantial schema + admin-flow change; holding for Russell's explicit go-ahead before committing, per this session's established practice of not auto-deploying schema changes.
- Real end-to-end verification still needed once migration 032 is applied: submit a real "Recommend New Location," confirm it lands on Flagged for Move, test Apply Move / Mark as Pending / Dismiss against real data, and confirm a pending-marked record is actually excluded from the next assignment generation.

## Known Issues
None identified this pass.
