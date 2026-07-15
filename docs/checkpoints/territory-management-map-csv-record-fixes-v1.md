# Territory Management System — Map PNG, CSV Field Mapping, Initial Visit Status, Black QR — v1

**Date:** 2026-07-15
**Product:** Territory Management System (TMS)
**Feature:** Five items Russell requested together, confirmed via `AskUserQuestion` before building on the two genuinely ambiguous ones:
1. Territory map upload accepts PNG in addition to JPG.
2. CSV import's required/optional columns changed to: required = Section, Block, Plus Code, Household Number (same field as the existing `household_members`, not renamed); optional = Name, Notes, Address. Unit and Do Not Call removed from the importer entirely (Russell's explicit choice over keeping them as extra optional columns).
3. Add Record forms (publisher especially, plus admin for parity) gain a Household Number field and an optional "Initial status" dropdown so a brand-new record can start with a real visit already logged instead of always starting blank.
4. Assignment QR code color changed from green (`#059669`) to black.
5. CSV import reworked into a 3-step flow: pick file → review/adjust an auto-guessed header-to-field mapping → accept and upload with a progress bar.

## Files Modified
- `src/lib/territory-management-system/modules/territory/queries.ts` — `MAP_EXTENSIONS` gains `image/png`
- `src/app/territory-management-system/actions/territories.ts` — `uploadTerritoryMapAction` accepts both mime types
- `src/components/territory-management-system/TerritoryMapUpload.tsx` — accept attr + copy
- `src/lib/territory-management-system/modules/assignment/qr.ts` — QR `dark` color → `#000000`
- `src/lib/territory-management-system/modules/records/csvShared.ts` — **new file**, no `'server-only'` guard (needs to be importable from the client-side mapping UI): `IMPORT_FIELDS`, `IMPORT_FIELD_LABELS`, `REQUIRED_IMPORT_FIELDS`, `OPTIONAL_IMPORT_FIELDS`, `HeaderMap` type, `guessHeaderMap()`
- `src/lib/territory-management-system/modules/records/csv.ts` — `parseRecordsCsv` rewritten around `HeaderMap` instead of hardcoded alias lists; `CsvImportRow` drops `unit`/`doNotCall`, `householdMembers` is now non-nullable/required
- `src/app/territory-management-system/actions/records.ts` — `importRecordsAction` takes and forwards an optional `headerMap`; `createRecordAction` parses new `initialResult`/`initialConductorName`/`initialNotes` fields and logs a visit right after creating the record when one is chosen
- `src/components/territory-management-system/CsvImportDialog.tsx` — rewritten with `pick` → `map` → `importing` → `done` steps, client-side header parsing via `papaparse`, and an animated progress bar
- `src/lib/territory-management-system/modules/records/schema.ts` — `householdMembersField` exported (was file-local); `createRecordSchema` gains `initialResult`/`initialConductorName`/`initialNotes` + the same two refinements `logVisitSchema` already has (notes required for "Other", conductor name required for Bible Study results)
- `src/lib/territory-management-system/modules/assignment/schema.ts` — `addPublisherRecordSchema` gains `householdMembers` + the same `initialResult`/`initialConductorName`/`initialNotes` fields and refinements
- `src/app/territory-management-system/actions/publisher.ts` — `addPublisherRecordAction` parses the new fields, passes `householdMembers` through to `createRecord`, and logs an initial visit (not marked as a completed partnership record — the new record is still pending admin review, same as before)
- `src/components/territory-management-system/RecordForm.tsx` — admin Add Record form gains the "Initial status" dropdown + conditional conductor/notes fields
- `src/components/territory-management-system/publisher/PublisherRecordForm.tsx` — publisher Add Record form gains Household Number + the same "Initial status" dropdown; `NewPublisherRecordPayload` grows the new fields (all still plain strings, so the existing offline sync queue needed no changes)

## Summary of Changes
- **PNG support was already half-built**: `uploadTerritoryMap`'s `MAP_EXTENSIONS` lookup and the storage bucket itself (no mime-type restriction at the Supabase level) were already generic — only the hardcoded `'image/jpeg'` checks in the action and the client `accept` attribute were blocking PNG.
- **CSV import**: confirmed with Russell that "Household Number" is the existing `household_members` count field (no rename), that Plus Code becomes a hard requirement, and that Unit/Do Not Call are dropped from the importer outright rather than kept as unlisted extras. `parseRecordsCsv` no longer guesses columns by alias when a `headerMap` is supplied — the new dialog always supplies one built from the user-reviewed mapping step, with alias-guessing surviving only as a fallback default (used to prefill that same mapping step, and as a safety net if `parseRecordsCsv` is ever called without a map).
- **Initial status on Add Record**: reuses `getSelectableResults()` with no arguments (a brand-new record has no prior visit and is never `do_not_call`, so the full list applies) and the exact same conductor-name/notes validation rules `logVisitSchema` already enforces, rather than inventing a new validation shape. The publisher path deliberately does **not** call `markPartnershipRecordCompleted` for the initial visit — a publisher-added record is still `pending` admin review and was never assigned to that partnership in the first place, same rule as before this change.
- **CSV mapping + progress bar**: header detection runs client-side via `papaparse` (confirmed it's a browser-safe library, not just server-only — used here for the first time on the client side in this codebase). The progress bar is honestly documented as a smooth animated approximation, not real byte-level progress — Server Actions don't expose upload progress events, so it eases toward 90% while the import runs and only completes at 100% once `importRecordsAction` actually resolves.
- `npx tsc --noEmit` and `npx next build` both clean, zero errors/warnings, all TMS routes compiled successfully.

## Remaining Work
None identified — all 5 requested items are code-complete.

## Known Issues
- **Not live-verified.** Same standing limitation as every prior TMS session — no live Supabase credentials in this environment. Every changed surface (map upload, CSV import, both Add Record forms, the QR code) sits behind Supabase-authenticated admin/Group-Leader pages or the offline-first publisher workspace, none of which are exercisable without real data.
- The CSV import's progress bar is animated/approximate, not tied to real upload bytes — flagged to Russell in-session as a Server Action limitation; he did not ask for a raw `fetch`/`XMLHttpRequest` alternative.

## Next Recommended Task
Russell live-verifies all 5 items:
1. Territory map upload accepts a real PNG file, not just JPG.
2. CSV import: pick a file, confirm the mapping step correctly auto-guesses columns (including a file using "Household Number" as a header vs. one using "Household Members"), confirm rows missing Plus Code or Household Number are rejected with a clear per-row error, confirm the progress bar shows and completes correctly.
3. Add Record (publisher workspace) shows Household Number and an Initial status dropdown; picking "Other" or a Bible Study result correctly requires notes/conductor name; the record lands as Pending with the initial visit already in its history once admin-approved. Same check on the admin dashboard's Add Record form.
4. Generate a new assignment batch and confirm the QR code renders in black, not green.
5. Not deployed — Russell deploys when ready per his explicit "don't deploy yet" instruction.
