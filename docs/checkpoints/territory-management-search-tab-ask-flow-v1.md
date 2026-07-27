# Publisher Search tab (Ask/request-transfer flow), Potential BS reversal, GL Partners accordion — v1

**Date:** 2026-07-27
**Product:** Territory Management System (TMS)
**Feature:** Three requests from Russell in one session, all publisher/Group-Leader-workspace-facing.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherSearchPanel.tsx` (new)
- `src/components/territory-management-system/publisher/PublisherBottomMenu.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/PartnershipList.tsx`
- `src/components/territory-management-system/GroupLeaderTabs.tsx`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/lib/territory-management-system/modules/records/schema.ts`
- `src/lib/territory-management-system/modules/records/schema.test.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/app/territory-management-system/actions/group-leader.ts`
- `territory-management-system/migrations/042_record_transfer_requests.sql` (new, **NOT yet applied live**)

## Summary of Changes

1. **New "Search" tab in the publisher workspace nav bar.** Confirmed design via clarifying questions before building: (a) "Ask" sends a pending request the current holder must approve — not an instant transfer like the existing "Pass to Another Partner"; (b) every Ministry Partner (House To House and Auxiliary/overflow alike) can search across ALL of today's batches; (c) an Auxiliary/overflow partnership can never successfully request a record currently held by a House To House one — confirmed and enforced.
   - New migration `042_record_transfer_requests.sql`: `record_transfer_requests` table (record_id, requesting/holding partnership ids, status pending/approved/declined), partial unique index preventing duplicate pending requests per record/requester.
   - New `searchTodaysAssignedRecords` query: scopes the search to territories covered by any of today's batches (not the whole congregation's all-time record database), returns each match's current holder (name + House To House/Auxiliary) or null if unassigned today.
   - New `createRecordTransferRequest`: re-verifies the current holder server-side (never trusts a client-supplied one), enforces the cross-group rule (`requestingIsOverflow && !holdingIsOverflow` → rejected).
   - New `listIncomingRecordTransferRequests` / `resolveRecordTransferRequest`: the holder's own pending-requests inbox, with Approve (re-verifies the record is still actually held by them, then reuses the existing `movePartnershipRecord`) / Decline.
   - New `PublisherSearchPanel.tsx`: search input + results (each showing holder or "Not assigned today," an "Ask" button gated the same way server-side enforcement works), plus an "Incoming Requests" section with Approve/Decline. Wired into `PublisherBottomMenu.tsx` as a 5th nav item (hidden for read-only viewers, same as "Record"), with a badge showing the pending-incoming count. `incomingRequests` fetched once at initial workspace load (`getPartnershipByToken`) so the badge has something to show without navigating there first; the tab itself always re-fetches fresh on open/refresh. Search/Ask/Approve/Decline are all live, direct calls — not offline-queued, since they depend on congregation-wide live state that an offline queue can't meaningfully hold stale.

2. **"Potential BS" reinstated as a re-selectable status.** Reverses a narrower rule from the 2026-07-20 session (Russell's own earlier request) that blocked re-confirming "Potential BS" on a record already at that status, forcing a decision (Started Bible Study or No Positive Response) every visit. Russell: "a potential BS cannot automatically be 'Started BS' on the second or third visit" — genuine interest can take several visits to actually become a study. `POTENTIAL_BIBLE_STUDY_RESULTS` now includes `potential_bible_study` itself alongside `started_bible_study`/`discontinued`. Updated the one unit test that encoded the old behavior.

3. **Group Leader Partners tab: tap-to-expand accordion.** Tapping a partnership card (in the same space, no navigation) now shows the names of records assigned to that partner, grouped by Plus Code so linked/household contacts show together under one address. Lazy-loaded per partnership on first expand (`getPartnershipAssignedRecordsAction`, RLS-scoped read, congregation-wide for the Group Leader role — no per-batch-ownership gate needed since this is a read, not a mutation). Gated off the public, unauthenticated "Today's Assignment Progress" page the same way the existing "End Ministry" button already is — both are optional props `PartnershipList.tsx` only receives from the Group Leader's own authenticated `GroupLeaderTabs.tsx`.

## Remaining Work
- **Migration 042 not yet applied to the live TMS Supabase project.** Needed before item 1 (Search tab) works in production; items 2 and 3 need no schema change.
- Not live-verified in a real browser (no TMS credentials in this sandbox) — verified via `npx tsc --noEmit` (clean), `npx vitest run` (101/101, one test updated for item 2's reversal), `npx next build` (clean).

## Known Issues
None found.

## Next Recommended Task
Russell applies migration 042 to the live TMS Supabase project, then live-verifies: (a) the Search tab end-to-end with two real partnerships — one Ask that should succeed (same group type or Aux-to-Aux/H2H-to-H2H), one that should be blocked (Aux asking H2H), and the Approve/Decline flow; (b) a record already at Potential BS can be re-logged as Potential BS again; (c) the Group Leader Partners tab accordion expands correctly and shows linked household contacts grouped together.
