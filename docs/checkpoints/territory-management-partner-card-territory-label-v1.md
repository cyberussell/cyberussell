# Ministry Partner Card Territory/Barangay Label — v1

**Date:** 2026-07-19
**Product:** Territory Management System (TMS)
**Feature:** For a multi-territory assignment batch, each Ministry Partner card (public partner-selection page, public progress page, and Group Leader's own Partners tab) now shows a small fine-print line identifying which territory/barangay that partner's records actually belong to.

## Files Modified
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/components/territory-management-system/publisher/PartnershipCard.tsx`
- `src/components/territory-management-system/PartnershipList.tsx`
- `src/app/territory-management-system/assignment/[batchToken]/page.tsx`
- `src/app/territory-management-system/assignment/[batchToken]/progress/page.tsx`
- `src/components/territory-management-system/GroupLeaderTabs.tsx`

## Summary of Changes

Researched first (via a background agent) whether a single partnership's assigned records can span more than one territory in a multi-territory batch — confirmed yes: `fetchEligibleRecordIds` concatenates all selected territories' eligible records into one flat, ordered list, and `calculateAssignment` slices it into fixed-size chunks with zero territory-boundary awareness. If a territory's record count isn't an exact multiple of `maxPerPartnership`, the boundary partnership gets the tail of one territory plus the head of the next. So the label had to support a *list* of territories per partnership, not a single value.

`getBatchSummary` now also selects `territory_id` (a plain scalar column on the embedded record — no new FK-disambiguation hint needed, unlike the recent Move/Correction embeds) alongside its existing `partnership_records` fetch, and builds each partnership's distinct touched-territories list by mapping those ids against the batch's own already-fetched `territories` array (no new query — every record in a batch necessarily belongs to one of the batch's selected territories). Added `territories: { id, name, description }[]` to `PartnershipWithProgress`.

`PartnershipCard.tsx` (public partner-selection page) and `PartnershipList.tsx` (shared by the public progress page and the Group Leader's Partners tab) both render `{name} — {description}` per territory (comma-joined if a partner spans more than one), shown only when the batch itself covers more than one territory — a new `multiTerritoryBatch` prop computed at each of the 3 call sites from `batch.territories.length > 1` / `stats.territories.length > 1`. A single-territory batch shows nothing extra, since it'd just repeat what the page header already says.

## Verification
- `npx tsc --noEmit`, `npx next build`, and `npx vitest run` (56/56) all clean.
- Live-verified via a temporary scratch route (removed before finishing) covering 4 scenarios: single-territory batch (no fine print), multi-territory batch with a single-territory partner ("Q-4 — Maligaya"), multi-territory batch with a partner spanning 2 territories ("Q-4 — Maligaya, M-6 — Olango"), and a zero-record partner in a multi-territory batch (correctly shows nothing). Screenshot-confirmed all 4.
- **Not live-tested against a real Supabase database.**

## Remaining Work
None — no migration needed, this is a pure read/display change with no schema impact.

## Known Issues
None identified this pass.

## Note on session hygiene
A background research agent was accidentally spawned twice via a fresh `Agent` call instead of `SendMessage` to resume the original — the stray duplicate created a git worktree at `.claude/worktrees/agent-a22cdbc5d82057a40` that was doubling `vitest run`'s test count (112 instead of 56) by picking up a frozen copy of the whole repo, including unrelated products. Removed via `git worktree remove --force` + `git branch -D` before finishing; confirmed test count back to 56/56 clean afterward. Not left in the repo, no cleanup needed from Russell.
