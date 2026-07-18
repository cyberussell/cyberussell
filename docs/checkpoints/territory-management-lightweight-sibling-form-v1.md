# Lightweight "Add Another Person" Form — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Replaces the full `PublisherRecordForm` behind "+ Add Another Person Here" (built in the prior household-batch round) with a dedicated, minimal form — Russell caught that showing Territory/Section/Block/Address/Unit/Plus Code as editable fields when adding a second person at an already-known address was both unnecessary clutter and a real correctness risk (an accidentally-edited Plus Code would silently break that person's grouping with the rest of their household, since siblings are matched by exact Plus Code string).

## What changed
New `AddHouseholdMemberForm.tsx` — Name (required) and Status (required, no "leave blank" option, unlike the general add-record form) plus one Notes field (optional, becomes required only when Status is "Other," reusing the existing `logVisitSchema`/`createRecordSchema` convention). No location fields shown at all.

`PublisherWorkspaceApp.tsx`:
- `'addRecord'` view state gained `returnToRecordId` alongside the existing `prefill` — when set, submitting or cancelling sends the publisher back to the record they came from instead of "My Added Records."
- Render site now branches: `view.prefill` present → `AddHouseholdMemberForm` (merges the caller-supplied prefill's territory/section/block/address/unit/Plus Code with the form's own name/status/notes into a full payload before calling `handleAddRecord`); absent → the original full `PublisherRecordForm` (still used by the plain "My Added Records" → "Add a New Contact Record" entry point, unchanged).
- `handleAddRecord` gained an optional second `redirectTo` param (defaults to the existing `{ name: 'addedRecords' }` behavior).

**Bug caught during verification, not part of the original ask:** the new form's Status dropdown initially included "Moved" as a selectable option — doesn't make sense as a brand-new person's first-ever status, and this form has no forced Update/Recommend-Removal follow-up wired up for it (unlike `PublisherVisitLogForm`, which already excludes it for the same reason). Filtered it out to match. **Flagged, not fixed:** the pre-existing general `PublisherRecordForm`'s own "Initial status" dropdown has this same gap (never filters out `'moved'`) — out of scope for this task, left as-is, worth a follow-up if Russell wants it fixed too.

## Files Modified
- `src/components/territory-management-system/publisher/AddHouseholdMemberForm.tsx` (new)
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Verification
`npx tsc --noEmit` and `npx vitest run` (52/52) clean. Live-verified via a temporary scratch route (`/dev-scratch-sibling-form`, removed before finishing): confirmed the field set matches exactly (Name/Status/Notes only), the Bible Study conductor-name prompt appears correctly, "Moved" is absent from the dropdown, and a full submit produces the correct payload shape (`residentName`/`initialResult`/`initialConductorName`/`notes`/`initialNotes`) for `handleAddRecord`'s merge logic to consume.

## Remaining Work
None for this task. Optional follow-up: filter `'moved'` out of `PublisherRecordForm`'s own Initial status dropdown for consistency (flagged above, not requested).

## Known Issues
A sibling added through this flow lands in `workspace.addedRecords` (pending Admin review), not `workspace.records` (today's assigned set) — so it won't immediately show up in the "N contact records at this address" count/badge until Admin approves it. Pre-existing behavior of the "Add a New Contact Record" flow in general, not something this task changed or was asked to change.

## Next Recommended Task
Committed and pushed. Russell spot-checks live: "+ Add Another Person Here" opens the short form, submitting returns to the original record (not "My Added Records"), and the new person shows up correctly once Admin approves it.
