# Record Plus Code/Name/Address Formatting + Admin Add/Edit Audit Note — v1

**Date:** 2026-07-23
**Product:** Territory Management System (TMS)
**Feature:** (1) Plus Code always saved as UPPERCASE; Resident Name and Address always saved in Title/Proper Case, across the Group Leader (no record-editing surface exists for that role — confirmed via `AskUserQuestion`), Publisher, and Admin entry points. (2) A small note on the Admin's record detail page showing who added or last edited a record and when, admin-only.

## Files Modified
- `src/lib/territory-management-system/modules/records/format.ts` (new) — `formatPlusCode` (trim + uppercase), `formatProperCase` (title-case, skips the Unit field on purpose)
- `src/lib/territory-management-system/modules/records/format.test.ts` (new) — 8 unit tests
- `src/lib/territory-management-system/modules/records/queries.ts` — `createRecord`, `updateRecord`, `recommendRecordCorrection`, `recommendRecordMove`, `importRecords` all now format Plus Code/Resident Name/Address before writing; `RECORD_WITH_LOCATION_SELECT` embeds `added_by_profile`/`edited_by_profile`; `createRecord`/`updateRecord` accept optional `addedByAdminId`/`editedByAdminId`
- `src/lib/territory-management-system/modules/records/types.ts` — added `admin_added_by/_at`, `admin_edited_by/_at` to `TerritoryRecord`; `added_by_profile`/`edited_by_profile` to `TerritoryRecordWithLocation`
- `src/app/territory-management-system/actions/records.ts` — `createRecordAction`/`updateRecordAction` now pass the signed-in admin's `userId` through
- `src/app/territory-management-system/dashboard/records/[recordId]/page.tsx` — renders the "Added by X on Y" / "Last edited by X on Y" note
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx` — optimistic record object updated with the 6 new fields (all `null` — publisher-added, not admin)
- `territory-management-system/migrations/038_record_admin_audit.sql` (new)

## Summary of Changes
Formatting is applied in one place — the shared query functions in `records/queries.ts` — rather than per-form, so it's consistent regardless of whether a record comes from the Admin's Add/Edit forms, a publisher's field-added record, a publisher's Move/Correction recommendation, or CSV import. The Unit field is deliberately left untouched (title-casing would mangle things like "Apt 3B").

The audit note is scoped narrowly: only `createRecordAction`/`updateRecordAction` (the Admin's own "Add a Contact Record"/"Edit Contact Record" forms) stamp `admin_added_by`/`admin_edited_by` — CSV import, publisher's own add/edit, and the Admin's other record-mutating actions (approve, apply correction/move, override visit) do not. Confirmed this scope with Russell via `AskUserQuestion` before building, including that "TGL" (Group Leader) has no actual record-add/edit surface in the current codebase.

`npx tsc --noEmit -p .` clean, `npx vitest run src/lib/territory-management-system` 53/53 clean (includes the new format.test.ts), `npx next build` clean. Not live-verified in a browser (no live TMS credentials in this session) — code-reviewed only.

## Remaining Work
None planned — this was a fully scoped, single-batch request.

## Known Issues
- **Push blocked:** `git push` failed — `origin`'s HTTPS remote has a plaintext GitHub PAT embedded in the URL that GitHub is rejecting ("could not read Password... terminal prompts disabled"). This is the same pre-existing issue already tracked as a TODO (see memory `project_git_remote_token.md` — origin URL needs to move to SSH or a proper credential helper). The commit (`644b8d2`) is made locally on `main`; Russell needs to either fix the remote credential or push manually.
- CSV-imported records get formatting (uppercase Plus Code, title-cased Name/Address) but no audit-note attribution, by design/scope decision above.

## Next Recommended Task
Russell: fix the `origin` remote credential (SSH key or `gh` credential helper) and push commit `644b8d2`, then live-verify the two changes on a real record (Add, Edit, and a publisher-submitted Move/Correction) before considering this fully done.
