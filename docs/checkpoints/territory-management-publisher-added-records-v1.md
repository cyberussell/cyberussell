# Territory Management System — Publisher-Added Records Get Their Own Visible/Editable List — v1

**Date:** 2026-07-15
**Product:** Territory Management System (TMS)
**Feature:** Publisher workspace — "My Added Records"

## Files Modified
- `territory-management-system/migrations/019_publisher_added_record_ownership.sql` (new — Russell has run this)
- `src/lib/territory-management-system/modules/records/types.ts`
- `src/lib/territory-management-system/modules/records/queries.ts`
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/assignment/schema.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/lib/territory-management-system/modules/offline/db.ts`
- `src/lib/territory-management-system/modules/offline/sync.ts`
- `src/components/territory-management-system/publisher/PublisherRecordForm.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/PublisherBottomMenu.tsx`
- `src/components/territory-management-system/publisher/AddedRecordsList.tsx` (new)
- `src/components/territory-management-system/publisher/PublisherAddedRecordDetailView.tsx` (new)

## Summary of Changes
Russell asked: when a publisher adds a record via "Add a New Contact Record," they should be able to see it in their own workspace and edit/delete it until their ministry session ends — after which they can't touch it at all. Previously the record was created (`status: 'pending'`, `source: 'publisher'`) but never surfaced anywhere in the publisher's own UI — it just went straight into Admin's pending-review queue, same as a CSV import row, and vanished from the screen. There was also no edit/delete path for a publisher-added record anywhere in the code.

Two explicit decisions from Russell shaped the design:
1. **Keep the Admin pending-review gate as-is.** The publisher's own edit/delete access doesn't replace or shortcut Admin's separate approval step before a record counts as real territory data for future assignments.
2. **A separate list, never mixed with Assigned Records.** The new records must not appear in the "today's assignment" list — they get their own section.

Implementation:
- **New DB column** `territory_records.created_by_partnership_id` (migration 019, nullable, `on delete set null`) tracks which partnership added a record, independent of `partnership_records` (which the record is deliberately never linked into — that's what keeps it out of Assigned Records).
- **`addPublisherRecordAction`** now stamps `created_by_partnership_id` and inserts under a **client-generated UUID** (new required `recordId` field on the form payload/schema) instead of letting Postgres default it — this lets the offline-first UI optimistically render the new record under its real, final id immediately, so it's editable/deletable right away even before the add has synced.
- **New "My Added Records" section** in the publisher workspace (`AddedRecordsList` + `PublisherAddedRecordDetailView`), reached via a new bottom-nav item, backed by a new `listRecordsAddedByPartnership` query.
- **Two new publisher-scoped Server Actions**, `deletePublisherAddedRecordAction` and `editPublisherAddedRecordAction`, both re-resolving the partnership from its token (no trust in client-supplied ids) and gated by a new `recordAddedByPartnership` ownership check (`created_by_partnership_id` + `source: 'publisher'`). Both **hard-block server-side** — not just hide the button — the moment `partnerships.finished_at` or `ended_early_at` is set, mirroring the existing `editable = !readOnly && !sessionEnded` client-side pattern already used for assigned records. `addPublisherRecordAction` got the same finished/ended check added too, so a publisher can't add new records after ending ministry either.
- **`PublisherRecordForm`** gained a `mode: 'add' | 'edit'` + `initialValues` prop so the same form serves both Add and Edit (edit mode hides the initial-visit-status section, which doesn't apply to editing an already-added record).
- **Two new offline sync-queue item types** (`deleteAddedRecord`, `editAddedRecord`), dispatched through the same `flushQueue`/Server Action replay pattern as every other publisher mutation — this feature works fully offline like the rest of the workspace.
- Editing an added record allows correcting territory/section/block too (unlike the existing "Mark as Moved" → "Update Contact Record" path, which deliberately keeps location fixed) — reasonable here since it's the publisher's own not-yet-approved submission.

`npx tsc --noEmit` clean, `npx next build` clean (confirmed the publisher assignment route compiles), TMS engine test suite 10/10 passing. **Not live-verified** — no live Supabase credentials in this environment, same standing limitation as every TMS session.

## Remaining Work
None identified — this was a single, fully-scoped feature request.

## Known Issues
None identified in code review. Genuinely unverified against a live browser/Supabase session.

## Next Recommended Task
Russell live-verifies: add a contact record from the publisher workspace, confirm it appears immediately under the new "My Added Records" nav item (and not in Assigned Records); edit it and confirm the change sticks; delete it and confirm it's gone; then end the ministry session (normally or early) and confirm both the Edit/Delete buttons on any remaining added record disappear and a direct retry is rejected server-side. Also confirm the record still shows up in Admin's existing pending-review queue exactly as before.
