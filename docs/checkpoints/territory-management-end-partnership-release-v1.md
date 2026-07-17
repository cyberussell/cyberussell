# Group Leader Force-End Any Partnership + Publisher Self-Release — v1

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Two related asks: (1) the Group Leader can end any Ministry Partner's session directly from the Partners tab — ensures the whole day's ministry can be wrapped up even if a pair goes quiet or doesn't respond; (2) a Ministry Partner can "release" their own claimed partnership (a change of mind, not ending the ministry) as long as they haven't logged a single visit yet, freeing it up for anyone (including themselves) to claim fresh.

## Files Modified
- `src/app/territory-management-system/actions/group-leader.ts`
- `src/components/territory-management-system/{PartnershipList,GroupLeaderTabs}.tsx`
- `src/lib/territory-management-system/modules/assignment/{queries,schema}.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/lib/territory-management-system/modules/offline/claim.ts`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes

**1. Group Leader force-ends any partnership:** New `endPartnershipAction(partnershipId)` in `actions/group-leader.ts` — re-verifies the partnership traces back to a batch this Group Leader created (or a legacy, creator-less batch), then calls the existing `terminatePartnershipEarly()` (same function a publisher's own "End My Ministry Early" already uses — no new termination semantics). Deliberately no `redirect()` (unlike the batch actions in this same file) — `revalidatePath` alone refreshes the data without resetting `GroupLeaderTabs`' client-side tab selection. `PartnershipList.tsx` (shared with the public, unauthenticated `/assignment/[batchToken]/progress` page) gained an optional `onEndPartnership` prop — when provided (only by `GroupLeaderTabs`), each non-done partnership card shows an "End Ministry" button behind a native confirm; the public Progress page doesn't pass the prop, so the button never renders there, and the real enforcement is server-side (`requireGroupLeader()` + ownership check) regardless.

**2. Publisher self-release:** New `releasePartnership()` query resets a partnership back to its pristine unclaimed state (`claimed_at = null`, `name` back to the auto-generated `Ministry Partner {sequence}` default) so it reappears as available on the batch landing page. New `releasePartnershipAction` — only allowed while `partnership.records.every(r => !r.completed_at)` (zero visits logged; publisher-added records don't block it, per the literal ask about "visits"), and blocked once the session is already ended/finished. Called directly (not through the offline sync queue), same reasoning as `chooseSearchScopeAction` — needs a live, current answer. New `clearClaimedPartnershipToken()` in `offline/claim.ts` un-binds the device's local claim so it isn't stuck read-only afterward. `PublisherWorkspaceApp.tsx` shows a new "Release This Partnership" button (blue, not red — distinct from "End My Ministry Early") in the same button group, gated on `canRelease` (not read-only, claimed, session not ended, zero completed records); on success it clears the local claim and `router.push`es back to the batch landing page (`/assignment/{batchToken}`) so a different (or the same) partnership can be picked.

## Remaining Work
None — no new migration needed (both features only touch existing `partnerships` columns).

## Known Issues
None identified. `npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. Live-verified via a temporary scratch route (mock data, removed before finishing): the Partners tab correctly showed "End Ministry" for both a Claimed and an Unclaimed partnership, and correctly hid it for an already-Done one; the Publisher workspace correctly showed "Release This Partnership" for a partnership with zero completed records and correctly hid it once one record had a `completed_at` set.

## Next Recommended Task
No migration to run — this is deployable as soon as committed. Russell: (1) as a Group Leader, confirm ending a partner's ministry from the Partners tab actually stops their session (they can no longer log visits), (2) as a Ministry Partner, claim a partnership, confirm "Release This Partnership" is available, release it, and confirm it shows back up as "Unclaimed" on the batch landing page for re-claiming, (3) confirm the Release option disappears the moment a visit is logged.
