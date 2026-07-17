# Live-testing UX fixes: overflow QR labels, branded modal, map toggle, link removal, no auto-advance — v1

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Six fixes from Russell after live-testing the just-deployed overflow-assignment and publisher-workspace features on his own phone.

## Files Modified
- `territory-management-system/migrations/024_batch_is_overflow.sql` (new)
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/app/territory-management-system/group-leader/dashboard/page.tsx`
- `src/components/territory-management-system/GroupLeaderTabs.tsx`
- `src/components/territory-management-system/publisher/ConfirmModal.tsx` (new)
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/app/territory-management-system/assignment/[batchToken]/page.tsx`

## Summary of Changes
Russell sent screenshots from his own phone testing the app live in production and asked for six fixes:

- **Overflow QR labeling**: `assignment_batches` had no way to distinguish an overflow batch from the original — new migration `024_batch_is_overflow.sql` adds `is_overflow boolean`, set by `createAssignment` whenever `forceZeroRecords` is used. `GroupLeaderTabs.tsx`'s batch switcher now reads "Assignment" for the original and "Overflow" (or "Overflow 2", "Overflow 3"... once there's more than one) for the rest, and the Home tab's QR card heading reads "Overflow QR Code" instead of "Assignment QR Code" for an overflow batch.
- **Branded confirm dialog**: new `ConfirmModal.tsx` (centered card, amber warning icon, TMS styling) replaces the two `window.confirm()` calls in the publisher workspace — "End My Ministry Early" and "Delete this contact record?" — whose native "www.cyberussell.com says" chrome read as an unfamiliar browser warning to a publisher in the field. Also corrected the End-Ministry-Early copy itself, which still said "All unfinished records will be marked as undone" — stale wording left over from before the early-termination data fix (see the prior session's checkpoint) that no longer touches those records at all. Left every other `window.confirm()` in TMS (Admin/Group-Leader-side deletes, `AssignmentForm`'s regenerate confirm) untouched — not flagged, and used by staff already inside the dashboard rather than an unfamiliar public-facing page.
- **Map toggle**: `PublisherWorkspaceApp.tsx`'s list view previously always stacked "Territory Map(s)" above "My Assigned Records Map". Replaced with a pill toggle ("Territory Map" / "Assigned Records") showing one at a time, defaulting to Territory Map — but only when both are actually available; with just one, it renders directly with no one-option toggle.
- **Removed the "View Today's Assignment Progress" link** from the batch landing page (`assignment/[batchToken]/page.tsx`). Left the `/progress` route itself in place (just unlinked) — removing it wasn't asked.
- **Removed auto-advance-to-next-record**: after logging a visit, marking a record moved (either "Mark as Moved" outcome), or recommending removal, the publisher now returns to the card list instead of being auto-advanced into the next incomplete record's detail view. Applied to all three completion paths for consistent behavior (Russell's wording named "logged a visit" specifically, but all three shared the same `goToNextRecord` mechanism and represent the same "finished this record" UX). Deliberately left `handleMoveRecord` ("Pass to Another Partner") untouched — a different action (nothing about the record is concluded, it's just reassigned) with its own separate next-record logic, not mentioned.

`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. **Live-verified in the browser** via two temporary scratch routes (mock data, removed before finishing): confirmed the map toggle switches between the territory raster map and the assigned-records pin map; logging a visit returns to the list (record shows its checkmark, no auto-jump into the next record's detail); the branded ConfirmModal renders centered with the corrected copy and "Cancel"/"End Ministry" buttons (not the native browser confirm), and Cancel closes it without side effects; the Group Leader dashboard's batch switcher correctly reads "Assignment" / "Overflow" / "Overflow 2" and the QR heading switches to "Overflow QR Code" when an overflow batch is selected.

## Remaining Work
None outstanding for the 6 items as scoped.

## Known Issues
None found.

## Next Recommended Task
Not committed. Russell (1) applies migration `024_batch_is_overflow.sql` in the TMS Supabase SQL editor (existing batches default to `is_overflow = false`, i.e. "Assignment" — correct for anything generated before this migration), (2) on the live app, confirms the overflow batch he already generated today now reads correctly once the migration's run and the page reloads, (3) re-tests the End Ministry Early and Delete Contact Record confirmations for the new branded look, (4) confirms the map toggle and no-auto-advance behavior feel right in real field use. Then commit + deploy at Russell's request.
