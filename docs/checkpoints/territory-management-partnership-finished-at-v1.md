# Partnership finished_at Signal + 6 UX Fixes — v1

**Date:** 2026-07-15
**Product:** Territory Management System (TMS)
**Feature:** 6 issues Russell reported after live-testing the previous audit-remediation pass, plus a follow-up requirement added mid-request.

## Files Modified
- `territory-management-system/migrations/018_partnership_finished_at.sql` — **run by Russell**
- `src/lib/territory-management-system/modules/assignment/types.ts` — `Partnership.finished_at`
- `src/lib/territory-management-system/modules/assignment/queries.ts` — `finishPartnership()`, `getBatchSummary`'s explicit partnerships select gained `finished_at`
- `src/lib/territory-management-system/modules/assignment/schema.ts` — `finishPartnershipSchema`
- `src/app/territory-management-system/actions/publisher.ts` — `finishPartnershipAction`
- `src/lib/territory-management-system/modules/offline/db.ts`, `sync.ts` — new `'finish'` queue item type
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx` — `handleFinish`, `handleSkipNote`, `sessionEnded`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx` — `sessionEnded` prop, `editable` gate
- `src/components/territory-management-system/publisher/PartnershipRenameForm.tsx` — placeholder text
- `src/components/territory-management-system/GroupLeaderTabs.tsx` — `allPartnersDone` formula

## Summary of Changes

**Root cause (items 1 and 3).** No partnership had a real "genuinely done" signal independent of record math. `completedCount >= recordCount` is vacuously true for a zero-record ("searching a fresh territory") partnership from the instant its batch is created — before anyone has even claimed it — so the previous pass's `allPartnersDone` check treated it as immediately done and the Group Leader's Home tab skipped straight to the results summary, never showing the QR at all. The same missing signal is the most likely explanation for Russell's report that moving a record to another partnership seemed to block finishing — the Group Leader's overall "all done" state correctly needs every partnership to finish, including whichever one now holds a moved record, but there was no reliable way to know when a partnership had actually finished versus just satisfying record-count math.

**Fix:** new `partnerships.finished_at` (migration 018), set only when a publisher reaches Sync & Finish (`finishPartnershipAction`, called from both the note screen's Skip and Send handlers — both already funnel through that screen from either the normal finish path or End Early). `GroupLeaderTabs.tsx`'s `allPartnersDone` now checks `finished_at || ended_early_at || (recordCount > 0 && completedCount >= recordCount)` per partnership instead of record math alone.

**Item 6 (mid-conversation follow-up):** previously, clicking Skip or Send on the note screen only advanced the local view to a "Thank you" screen — nothing was persisted. Both now call `finishPartnershipAction`, which is what actually sets `finished_at`.

**Item 4:** `PublisherRecordDetailView` now takes a `sessionEnded` prop (`Boolean(workspace.finished_at || workspace.ended_early_at)`) and hides Record a Visit, Mark as Moved, and Pass to Another Partner once true — the record header, "Open in Google Maps" link, and Visit History stay visible regardless.

**Item 2:** partner-name placeholder changed to "Put your names".

**Item 5:** confirmed with Russell via `AskUserQuestion` — no new code. "Delete Assignment" already fully blocks all future access to a batch's QR/link (cascade delete removes the partnership row, so the publisher page hits a real 404). No auto-lock-on-all-done or non-destructive "End Today's Ministry" action was requested.

`npx tsc --noEmit`, `npx next build`, `npx vitest run` all clean.

## Remaining Work
None planned.

## Known Issues
Not live-verified — same standing limitation as every TMS pass this multi-session effort (no live Supabase credentials in this environment).

## Next Recommended Task
Russell live-verifies: generating an assignment against a zero-record territory shows the QR (not the results summary) until a publisher actually finishes; a publisher moving a record away and then finishing via either Skip or Send on the note screen is no longer blocked and correctly hides their own editing panel afterward; revisiting a finished record still shows its details, map, and history but not the visit-log/move/mark-moved controls.
