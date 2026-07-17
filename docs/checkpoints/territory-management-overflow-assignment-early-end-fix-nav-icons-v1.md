# Overflow assignment batches, early-end data fix, nav icon highlighting — v1

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Three asks from Russell in one message.

## Files Modified
- `territory-management-system/migrations/023_multiple_batches_per_group_leader.sql` (new)
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/app/territory-management-system/actions/group-leader.ts`
- `src/app/territory-management-system/group-leader/dashboard/page.tsx`
- `src/components/territory-management-system/GroupLeaderTabs.tsx`
- `src/components/territory-management-system/AssignmentForm.tsx`
- `src/components/territory-management-system/OverflowAssignmentForm.tsx` (new)
- `src/components/territory-management-system/publisher/PublisherBottomMenu.tsx`

## Summary of Changes
Three asks in one message. Analyzed the new overflow-batch feature before writing any code (per Russell's explicit ask) — ran two rounds of `AskUserQuestion` to pin down the architecture, since it turned out to conflict with an existing hard constraint.

- **Early-termination data fix**: `terminatePartnershipEarly()` previously logged a synthetic `'undone'` visit and force-completed every unfinished record when a Ministry Partner ended their session early. Removed both — it now only sets `ended_early_at`, touching nothing else. This fixes two real problems: (1) it no longer corrupts a record's true last-visited date, which `fetchEligibleRecordIds`' staleness tiebreak relies on to put a record left undone today at the front of the list next generation; (2) the existing "Remaining Contact Records" stat on the Group Leader's dashboard (a live count from `partnership_records`, not a snapshot) now automatically becomes the correct "not worked on today" figure with no new UI needed. Removed the now-permanently-zero "Undone" stat tile from `GroupLeaderTabs.tsx` (its only remaining data source, the synthetic visits, no longer exist). Also simplified `terminatePartnershipEarly`'s signature (dropped now-unused `congregationId`/`partnershipName` params) and updated its one call site.
- **Nav bar icons — Publisher bottom bar + Group Leader tab bar**: both `PublisherBottomMenu.tsx` and `GroupLeaderTabs.tsx`'s mobile bottom tab bar now render the active icon larger (`h-6 w-6` vs `h-5 w-5`), bolder (`strokeWidth 2.75` vs `2`), inside a filled pill background (`bg-blue-50`) — on top of the color highlighting already there. Confirmed via `AskUserQuestion` these were the two intended targets (not the Admin sidebar, which already has a strong active-page treatment via gradient background).
- **Overflow QR for extra publishers** — the new feature. Traced the existing "too many publishers" handling first: `AssignmentForm.tsx` already tells a shortfall of publishers to "do another form of ministry instead." Found the real blocker before writing anything: `assignment_batches` has a real unique constraint (`assignment_batches_congregation_date_creator_key`, from migration 013) making a second same-day batch for one Group Leader impossible at the DB level, and `createGroupLeaderAssignmentAction` deletes the existing batch before creating a new one. Confirmed via two `AskUserQuestion` rounds: a genuinely separate, coexisting batch (not added partnerships on the existing one); always zero-record by design (never recomputes against the territory's eligible pool, to avoid double-assigning an address someone else already has open today); territory picker limited to only territories already covered by one of today's batches; and a switcher between batches on the Group Leader's dashboard (each batch keeps independent progress).
  - New migration `023_multiple_batches_per_group_leader.sql` drops that unique constraint.
  - `assignment/queries.ts`: `getBatchForGroupLeaderAndDate` → `getBatchesForGroupLeaderAndDate` (returns all of today's batches for a Group Leader, not `.maybeSingle()`). `getTerritoryIdsInUseToday` gained an `excludeCreatedBy` param so a Group Leader's own already-covered territory doesn't block their own overflow batch, while another Group Leader's still does. `createAssignment` gained `forceZeroRecords?: boolean` — skips `fetchEligibleRecordIds` entirely (always `[]`) and excludes the caller's own batches from the territory-conflict check when true.
  - `actions/group-leader.ts`: `createGroupLeaderAssignmentAction` ("Regenerate") now deletes *every* one of today's batches for this Group Leader first (previously just "the" one) — preserves its existing "start over clean" meaning now that more than one can exist. New `createOverflowAssignmentAction`: never deletes anything; re-verifies server-side that every submitted territory is already covered by one of this Group Leader's own batches today (never trusts the client-side-constrained picker alone); calls `createAssignment(..., { forceZeroRecords: true })`.
  - `group-leader/dashboard/page.tsx`: fetches all of today's batches + per-batch stats (`Promise.all`), derives the "already covered today" territory list (union across all batches) for the overflow picker.
  - `GroupLeaderTabs.tsx`: restructured from single-batch props to a `batches: BatchView[]` array with a pill-row switcher (only rendered when there's more than one) — each batch keeps its own independent QR/stats/progress, matching the confirmed "switcher, not combined" design. Home tab gained a new "Generate Overflow Assignment" section (additive, clearly separated from the existing destructive "Regenerate Assignment").
  - New `OverflowAssignmentForm.tsx`: publisher count + group size only (no eligible-record math, since it's always zero by design), territory picker limited to today's already-covered territories. Reuses `AssignmentForm.tsx`'s `NumberStepper` (now exported) rather than duplicating it.

`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. **Live-verified in the browser** via two temporary scratch routes (mock data, removed before finishing): confirmed the batch switcher correctly swaps the QR/public-URL/stats between two mock batches with independent progress, the "Undone" stat tile is gone, the Overflow Assignment form renders with the territory picker correctly narrowed, and both target nav bars (Publisher bottom bar, Group Leader mobile tab bar) show the active icon visibly larger with a filled pill background.

## Remaining Work
None outstanding for the 3 items as scoped.

## Known Issues
None found. One pre-existing edge case noted but not touched: a legacy batch with `created_by = null` (predates migration 013) won't be correctly excluded by the new `excludeCreatedBy` filter on `getTerritoryIdsInUseToday` (SQL's `<> NULL` never matches) — same class of legacy-batch quirk migration `014` already carved out elsewhere, not introduced by this session, and increasingly unlikely to matter as those batches age out.

## Next Recommended Task
Not committed. Russell (1) applies migration `023_multiple_batches_per_group_leader.sql` in the TMS Supabase SQL editor, (2) on a real Group Leader account, generates a normal assignment, then generates an overflow assignment for the same territory and confirms both QR codes work independently and the switcher shows both, (3) confirms ending a Ministry Partner's session early no longer marks their remaining records as visited (check the record's own visit history stays untouched) and that "Remaining Contact Records" reflects it. Then commit + deploy at Russell's request.
