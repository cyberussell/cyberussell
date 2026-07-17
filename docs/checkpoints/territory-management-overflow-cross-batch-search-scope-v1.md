# Overflow QR Color, Cross-Batch Passing, Search-Scope Overflow Assignments, Pin Popup Fallback — v1

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Five follow-ups from Russell's live phone testing of the overflow-assignment feature: (1) navy QR for overflow batches, (2) cross-batch record passing to any of the same Group Leader's batches today, (3) an overflow batch can narrow to a specific section + blocks to search, with a read-only view of whatever records already exist there, (4) that search area gets its own pin map, (5) map pin popups fall back through resident name and Plus Code before "No address on file". Plus a same-session follow-up round: (6) generic empty-state copy for a zero-assigned-records partnership (no longer falsely claims the whole territory has no records), (7) a login honeypot for basic brute-force/credential-stuffing bots on the shared Admin/Group Leader login, (8) confirmed the overflow search-scope feature already allows two different overflow batches to independently pick the same section/blocks (no code change needed — see Remaining Work/Known Issues).

## Files Modified
- `territory-management-system/migrations/025_overflow_search_scope.sql` (new)
- `src/lib/territory-management-system/modules/assignment/qr.ts`
- `src/app/territory-management-system/group-leader/dashboard/page.tsx`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/lib/territory-management-system/modules/assignment/schema.ts`
- `src/app/territory-management-system/actions/group-leader.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/lib/territory-management-system/modules/territory/queries.ts`
- `src/lib/territory-management-system/modules/records/queries.ts`
- `src/lib/territory-management-system/modules/reports/queries.ts`
- `src/lib/territory-management-system/modules/offline/db.ts`
- `src/lib/territory-management-system/modules/offline/sync.ts`
- `src/components/territory-management-system/GroupLeaderTabs.tsx`
- `src/components/territory-management-system/OverflowAssignmentForm.tsx`
- `src/components/territory-management-system/HouseholdDistributionMap.tsx`
- `src/components/territory-management-system/publisher/MoveRecordForm.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/PublisherBottomMenu.tsx`
- `src/components/territory-management-system/publisher/SearchScopeRecordsList.tsx` (new)
- `src/components/territory-management-system/publisher/SearchScopeRecordDetailView.tsx` (new)
- `src/components/territory-management-system/LoginForm.tsx`
- `src/app/territory-management-system/actions/auth.ts`

## Summary of Changes

**1. Overflow QR color (navy):** `getAssignmentBatchQrDataUrl()` takes an optional `darkColor` param; the Group Leader dashboard page passes `#1E3A8A` for `is_overflow` batches, plain black (default) otherwise.

**2. Cross-batch record passing:** New `getGroupLeaderPartnershipsForDate()` (assignment/queries.ts) returns every other Ministry Partner across ALL of the same Group Leader's batches today (original + overflow), not just the caller's own batch — each tagged with a `batchLabel` ("Assignment"/"Overflow"/"Overflow 2"...) computed the same way `GroupLeaderTabs`'s own switcher does. `movePartnershipRecordAction` now allows a destination in any batch owned by the same Group Leader on the same day (checked via a new `getBatchById()` lookup + congregation/date/creator comparison), not just the same `batch_id`. `MoveRecordForm` shows the batch label next to each option. Confirmed with Russell: scope is "same Group Leader, any batch today," not narrowed to the same territory.

**3. Overflow search-scope (section + blocks, read-only records, location-only fix):** New migration `025_overflow_search_scope.sql` adds `assignment_batch_search_blocks` (batch_id, section_id, block_id), RLS mirroring `assignment_batch_territories`. `OverflowAssignmentForm` gained an optional "Narrow to a search area" step (shown once exactly one territory is checked) — picks one section, then any of its blocks (checkboxes; blocks with zero records get an "Empty" tag, per Russell's choice not to restrict selection to empty-only). `createOverflowAssignmentAction`/`createAssignment` re-verify the section/blocks belong to the submitted territory server-side before writing. Publisher side: new `getRecordsInBlocks()` query, `PartnershipWorkspace.searchScope`/`searchScopeRecords` fields populated by `getPartnershipByToken` via a new `getSearchScopeForBatch()` helper. New read-only UI (`SearchScopeRecordsList.tsx`, `SearchScopeRecordDetailView.tsx`) reachable via a new "Search Area" bottom-nav item (shown only when a batch has a search scope) — records are view-only, with a manual "Refresh" button (new `getSearchScopeRecordsAction`, a plain read, not queued through the offline sync system — the point is checking live state) and a "Recommend a Location Correction" action (new `recommendSearchScopeCorrectionAction`, validated against the batch's own search-scope blocks instead of partnership ownership, queued through the existing offline sync queue as a new `recommendSearchScopeCorrection` item type, lands in the Admin's existing Flagged for Correction queue).

**4. Search-area pin map:** `PublisherWorkspaceApp`'s Territory Map / Assigned Records pill toggle extended to a third "Search Area" option (shown only when `searchScopeRecords` is non-empty), fed by the same `HouseholdDistributionMap` component via a new `searchScopeLocations` array. The toggle logic was generalized from a hardcoded two-option branch to a filtered list of up to three tabs.

**5. Pin popup fallback:** `RecordLocation` type gained `residentName`; `getApprovedRecordLocations` (admin) and both publisher-side `RecordLocation` builders (assigned + search-scope) now populate it. `HouseholdDistributionMap`'s `Pin` interface now carries `residentName`/`plusCode` through (previously decoded for positioning then discarded) and the popup's primary line falls back `address || residentName || plusCode || 'No address on file'`.

**6. Generic empty-state copy:** The "This territory has no records yet." message on a zero-assigned-records partnership was factually wrong in general (an overflow batch just means THIS partnership has zero assigned records — the territory/search-scope blocks often already have some, shown separately via feature 3's read-only list). Reworded to "No contact records assigned to you." plus a `workspace.searchScope`-conditional second line pointing to the Search Area tab when one exists, generic regardless of whether the real underlying count is zero or nonzero (`PublisherWorkspaceApp.tsx`).

**7. Login honeypot:** `LoginForm.tsx` (shared by both TMS Admin and Group Leader — one login page/action for both roles, confirmed by reading `actions/auth.ts`'s `ROLE_REDIRECT`) gained a hidden `website` field (off-screen, `aria-hidden`, `tabIndex={-1}`, `autoComplete="off"` — invisible/unreachable for a real user or screen reader, but a basic bot that blindly fills every input usually fills it). `signIn()` in `actions/auth.ts` checks it first: if non-empty, applies a strict separate rate-limit key (`tms-login-honeypot:${ip}`, limit 1) and returns the exact same "Invalid email or password." error as a real failed login — never touching Supabase auth or the profile lookup — so a bot can't distinguish "caught by the honeypot" from "wrong password" and adapt. This is in addition to, not instead of, the pre-existing `tms-login:${ip}` rate limit (10/min) already on this action.

**8. Overflow search-scope reuse — confirmed already possible, no code change:** Russell asked whether a different set of overflow Ministry Partners can choose the same section/blocks as an already-generated overflow batch. Traced the code: `assignment_batch_search_blocks` (migration 025) only has a `unique (batch_id, block_id)` constraint (prevents the same batch listing a block twice, nothing more) and `createOverflowAssignmentAction`/`createAssignment` never check a submitted block against any OTHER batch's search-scope selection. The only exclusivity check anywhere (`getTerritoryIdsInUseToday`) is at the territory level and is explicitly relaxed for this same Group Leader's own repeat batches (that's the whole point of the overflow feature) — it only blocks a *different* Group Leader from covering a territory already claimed today. So yes: this already works as asked, with no change needed.

## Remaining Work
- Migration `025_overflow_search_scope.sql` has not been run against the live Supabase project — needed before any of features 3/4 work in production (features 1/2/5/6/7 don't depend on it).
- Not committed to git yet.

## Known Issues
None identified — `npx tsc --noEmit`, `npx vitest run` (52/52), and `npx next build` all clean; live-verified via a temporary scratch route (mock data, removed before finishing) covering all five original features, including all three popup-fallback branches (address-wins, name-only, Plus-Code-only) and the read-only search-scope detail view's correction form. The honeypot was live-verified directly against the real login page in this sandbox: a normal submission (empty honeypot) reached the real Supabase auth call (confirmed by it failing on this sandbox's missing TMS env vars, an unrelated pre-existing limitation, not a honeypot bug); a simulated bot submission (honeypot field set via JS, mimicking an automated filler) returned the generic error instantly with no server error, confirming it short-circuits before ever reaching Supabase.

## Next Recommended Task
Russell: (1) run migration 025 in the TMS Supabase SQL editor, (2) as a real Group Leader, generate an overflow assignment with a search area narrowed to specific blocks and confirm the QR is navy, (3) pass a record from the original assignment to an overflow Ministry Partner and confirm the batch label shows correctly, (4) as that overflow partner, confirm the "Search Area" tab shows existing records read-only, the map renders, and a location-correction recommendation lands in the Admin's Flagged for Correction list, (5) confirm the empty-state copy on a zero-assigned-records partnership, (6) try a few real login attempts to confirm the honeypot doesn't interfere with normal logins. Then commit + deploy at Russell's request.
