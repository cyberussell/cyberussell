# Correction form: Household Members + validation/prefill/dirty-check, record detail card redesign — v1

**Date:** 2026-07-19
**Product:** Territory Management System (TMS)
**Feature:** Two requests in one message — extend "Recommend a Correction" with a Household Members field plus real validation/prefill/dirty-checking, and redesign the record detail card's header per a reference mockup.

## Files Modified
- `territory-management-system/migrations/031_correction_household_members.sql` (new)
- `src/lib/territory-management-system/modules/records/types.ts` — `correction_recommended_household_members`
- `src/lib/territory-management-system/modules/records/queries.ts` — `recommendRecordCorrection`, `dismissCorrectionRecommendation`, `applyRecordCorrection`, new `sectionBlockBelongsToTerritory`
- `src/lib/territory-management-system/modules/assignment/schema.ts` — real Plus Code format validation, `householdMembers` on both correction schemas
- `src/app/territory-management-system/actions/publisher.ts` — both correction actions: household members + server-side Section/Block ownership check
- `src/components/territory-management-system/publisher/RecommendCorrectionForm.tsx` — Household Members field, prefill, live Plus Code validation, dirty-check gating Send
- `src/components/territory-management-system/publisher/SearchScopeRecordDetailView.tsx` — thread `currentHouseholdMembers`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx` — forward `householdMembers` in both correction enqueue payloads, wire `onBack`, add missing field to the optimistic added-record object
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx` — header/card redesign, `onBack` prop
- `src/components/territory-management-system/TerritoryMapViewer.tsx` — new `variant="icon"`
- `src/app/territory-management-system/dashboard/records/flagged/page.tsx` — shows the Household Members recommendation too

## Summary of Changes

### 1. Correction form: Household Members + real validation

**Database.** New migration adds `territory_records.correction_recommended_household_members` — same review-gated shape as the existing Plus Code/Section/Block recommendation columns (020, 030). `recommendRecordCorrection` takes it as an optional param; `applyRecordCorrection` copies it onto the real `household_members` column when the Admin applies; `dismissCorrectionRecommendation` clears it.

**Validation.** Two things were previously unvalidated and are real gaps this closes:
- The Plus Code field only checked "non-empty" — now runs through `open-location-code`'s `isValid()`, both client-side (live error text as you type) and server-side (a zod `.refine()`), rejecting a typo'd code before it ever reaches the Admin's one-click "Apply Correction."
- **Section/Block ownership was never re-verified server-side** — a client-tampered `sectionId`/`blockId` could previously have been written straight onto a record without confirming it actually belongs to that record's own territory (the same "don't trust a client-supplied parent id" class of gap this codebase has closed elsewhere — createAssignment's territory check, lockPartnershipSearchBlocks' block check). New `sectionBlockBelongsToTerritory()` in `records/queries.ts`, called from both correction actions before any write.
- Household Members reuses the existing shared `householdMembersField` (optional, non-negative integer, blank coerces to unset) — same validation rule already used everywhere else in this product for this exact field.

**Prefill.** `RecommendCorrectionForm` already prefilled Plus Code/Section/Block from the record's current values — Household Members now does too (`currentHouseholdMembers` prop, threaded from both call sites: the assigned-record detail view and the search-scope detail view).

**Dirty-check.** The Send button is now disabled unless at least one real field (Plus Code, Section, Block, or Household Members) actually differs from the record's current value — typing only a reason no longer enables submission, since a correction that changes nothing isn't actionable for the Admin.

### 2. Record detail card redesign

Adopted the reference layout: a back-arrow + title + result-badge header row above the card (new `onBack` prop, wired to the same "return to assigned records list" destination as everywhere else in the workspace); a home-icon badge + address as the card's lead line; Section/Block and resident name combined onto one line; household member count and the linked-contacts disclosure combined onto one line with icons; the record's own `notes` field removed from this card entirely (a visit's own notes still show per-entry in Visit History below, unchanged); and the Google Maps / Territory Map buttons replaced with two larger (56px), well-separated, icon-only circular buttons in the card's bottom-right corner, instead of two full-width labeled buttons — easier to tap accurately for a less phone-dexterous publisher. `TerritoryMapViewer` gained a new `variant="icon"` for this (its existing `thumbnail`/`button` variants are unchanged, still used elsewhere).

**One judgment call worth flagging:** a prior session deliberately made this exact card the *only* place status coloring shows in the whole publisher workspace ("card list stays all-white, this single-record detail card is where it only changes" — Russell's own words in that session's comment). The reference mockup shown this session was a clean white card with no such tinting. Rather than silently dropping that earlier explicit decision, this pass kept the same tone signal but rescoped it from the whole card's background down to just the address icon badge's fill color — the card itself is now white/clean like the mockup, but a Do Not Call / Bible Study / etc. status still reads at a glance via the badge color. Flagging this in case the intent was actually to remove status coloring entirely, not just relocate it.

`npx tsc --noEmit` and `npx vitest run` (56/56) clean.

## Remaining Work
None requested beyond what's built.

## Known Issues
- **Migration 031 confirmed applied by Russell, 2026-07-19.**
- Live-verified via a temporary scratch route (removed before finishing): the redesigned card matches the reference mockup closely (screenshot-compared side by side), the back arrow fires `onBack`, Household Members correctly prefills from the record and the Send button stays disabled until a real field changes, and the live Plus Code format validation shows/hides its error text correctly. Russell confirmed the icon-badge-only status-color rescoping (kept the color signal, per his prior explicit decision, but moved it off the whole card since the reference mockup was plain white) was the right read — "you are right in maintaining the colors, i was only after the layout." **Still not click-tested end-to-end against the real database**: a real Household Members correction submitted → shows on Flagged for Correction → Apply Correction actually updates the record (no live Supabase credentials in this sandbox — standing limitation).

## Next Recommended Task
Russell live-verifies the actual database round trip: recommend a Household Members correction from a real assigned record, confirm it shows correctly on the Admin's Flagged for Correction page, and that "Apply Correction" actually updates the record's real Household Members count.
