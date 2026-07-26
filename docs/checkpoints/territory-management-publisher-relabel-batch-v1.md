# Publisher end-ministry actions post-completion, search-area tap target, relabels — v1

**Date:** 2026-07-26
**Product:** Territory Management System (TMS)
**Feature:** Follow-up batch from Russell's screenshots — four items, all publisher-workspace-facing.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/MarkMovedForm.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/SearchScopeRecordsList.tsx`

## Summary of Changes

1. **Search-area card is now the whole tap target.** `SearchScopeRecordsList.tsx`'s cards (added last session, deliberately non-navigating) required tapping the small "Map" pill specifically to open the ownership popup. Now the entire card is a button that opens it (only when the record has a Plus Code — otherwise it stays a plain, non-interactive row, same as before). The "Map" pill is now a decorative `<span>` inside, not a nested button.

2. **Assigned-record detail view: keep Unlocated/Correction/Add Person available after a status is already logged, drop only Pass.** Previously the whole `editable && !assigned.completed_at` block (Pass to Another Partner, Mark as Moved/Unlocated, Recommend a Correction, and mobile's "Add Person") disappeared entirely once a record had any logged status — a publisher revisiting an already-logged record (screenshot: "Progressive BS") had no way to correct, mark unlocated, or add another household member, only the "Record a Visit" re-log form (already `editable`-only, unaffected). Split the gating: the block is now just `editable`, with `MoveRecordForm` (desktop) and the mobile "Pass" grid button/panel individually gated on `!assigned.completed_at` (passing an already-worked record to someone else doesn't make sense) while `MarkMovedForm`, `RecommendCorrectionForm`, and "Add Person"/"Add Another Person Here" stay available regardless. Mobile's button grid switches from a fixed 4-column layout to 3 columns when Pass is hidden.

3. **"My Added Records" tab buttons relabeled**, reflecting what the quick-note option is actually for (a contact found in a *different* territory than the one being covered, where the full structured form's territory/section/block don't apply):
   - "Add Someone Found in Today's Territory" → **"Add Contact in This Territory"**
   - "Send a Quick Note to Admin" → **"Report Contact in Another Territory"** (heading inside the form updated to match)

4. **`MarkMovedForm`'s "Unlocated" chooser relabeled** (buttons + matching in-form headings/submit text):
   - "Update Current Resident" → **"Correction"**
   - "Recommend New Location" → **"Suggest New Location"** (submit button "Recommend Move" → "Suggest Location")
   - "Recommend for Admin Removal" → **"Request Record Removal"** (submit button "Submit Recommendation" → "Submit Request")
   - "Quick Note to Admin (no location details)" → **"Report Contact in Another Territory"** (same label as item 3's second button — same underlying form/feature, two entry points)

No migration needed — pure UI/copy changes plus a gating tweak.

## Remaining Work
- Not live-verified in a real browser (no TMS credentials in this sandbox) — verified via `npx tsc --noEmit` (clean), `npx vitest run` (101/101, unchanged), `npx next build` (clean).

## Known Issues
- Renaming "Update Current Resident" to "Correction" means the app now has two differently-behaved things both called "Correction" in the same record detail view: this one (direct write, no Admin review, for "a different person lives here now") and the pre-existing `RecommendCorrectionForm`/"Recommend a Correction" (Plus Code/Barangay/Section/Block fix, Admin-review-gated). Implemented exactly as requested; flagging the naming overlap in case it reads as confusing once live.

## Next Recommended Task
Russell live-verifies all four items on a real device, particularly re-visiting an already-logged record to confirm Unlocated/Correction/Add Person are back while Pass stays gone, and checking the new labels read naturally end-to-end.
