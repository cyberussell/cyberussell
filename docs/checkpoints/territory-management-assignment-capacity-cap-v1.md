# Territory Management System — Assignment Generation Capacity Cap — v1

**Date:** 2026-07-15
**Product:** Territory Management System (TMS)
**Feature:** Russell asked that generating an assignment consider the maximum number of partnerships that can actually be filled, given approved contact records, publishers going out, and group size — remembering the existing 6-records-per-partnership cap — and block generation with a warning instead of silently leaving records unassigned when the selected territories have more approved records than the configured group can hold.

## Files Modified
- `src/lib/territory-management-system/modules/assignment/engine.ts` — `calculateAssignment` now returns an `AssignmentError` when `eligibleRecordIds.length > partnershipCount * maxPerPartnership` (capacity = partnerships × 6 by default), instead of silently truncating the excess into `unassignedCount`.
- `src/components/territory-management-system/AssignmentForm.tsx` — added `maxCapacity`/`exceedsCapacity` derived values; the existing preview box now shows a red "Too many approved records…" warning when the selected territories' approved-record total exceeds capacity, and the Generate Assignment button is disabled in that state (in addition to the existing `pending`/no-territory-selected disables).
- `src/lib/territory-management-system/modules/assignment/engine.test.ts` — updated the pre-existing "fills partnerships sequentially… up to the max per partnership" test, which had exercised the old silent-truncation behavior as a *passing* case (10 records into 2×4 capacity, expecting `unassignedCount: 2`). That behavior is now intentionally an error, so the test was changed to exercise a within-capacity scenario (3×4 capacity for 10 records) instead. Added two new tests: one confirming the new over-capacity error fires and mentions "Too many approved records," one confirming exactly-at-capacity still succeeds with `unassignedCount: 0`.

## Summary of Changes
- Previously, `calculateAssignment` treated "more approved records than partnerships × 6 can hold" as a non-error — it just filled every partnership to its max and reported the leftover via `unassignedCount`, which the UI surfaced only as an informational "up to N will be assigned" preview line. This was a deliberate original design choice (documented by the now-updated test), but Russell explicitly asked for stricter behavior: don't generate at all in that case, warn instead.
- The cap check sits right next to the existing "insufficient records" check in `engine.ts` (same function, same error-return pattern: `{ error: string }`, no throwing) — `partnershipCount` too few records was already blocked; this adds the symmetric "too many records for this partnership count" block using the same `maxPerPartnership` parameter (defaults to `DEFAULT_MAX_PER_PARTNERSHIP = 6`, the existing single source of truth for the per-partnership cap).
- This is enforced in two places, matching the existing pattern elsewhere in this form (e.g. the "Not enough contact records" warning is also duplicated client-side and server-side): client-side in `AssignmentForm.tsx` for instant feedback (disables the submit button, shows the same wording pattern as the existing insufficient-records warning), and server-side in the pure `calculateAssignment` function so the Server Action (`createGroupLeaderAssignmentAction` → `createAssignment` in `queries.ts`) can't be bypassed by a direct submit.
- No new database migration needed — this is pure calculation logic, no schema change.
- `npx tsc --noEmit` clean. `npx vitest run` — all 50 tests pass (8/8 in the updated `engine.test.ts`, including the 2 new cases). `npx next build` succeeds with zero errors across all routes.

## Remaining Work
None identified for this specific feature — matches Russell's request as stated.

## Known Issues
- **Not live-verified in the browser.** `AssignmentForm.tsx` renders only inside the Group Leader dashboard, which sits behind Supabase auth and needs a real congregation/territory/approved-record dataset — same standing limitation as every prior TMS session in this environment (no live TMS Supabase credentials here). Verification this pass is `tsc` + `vitest` + `next build` + code review only.

## Next Recommended Task
Russell live-verifies on the deployed site: select territories whose combined approved-record count exceeds `partnershipCount × 6` for the current publisher/group-size settings — confirm the red "Too many approved records" warning appears and the Generate Assignment button is disabled; then increase publishers going out or group size (or deselect a territory) until the total drops back within capacity, and confirm the warning clears and generation works normally. Not yet committed/pushed/deployed — same as every other TMS change this session, Russell should say the word before it goes out.
