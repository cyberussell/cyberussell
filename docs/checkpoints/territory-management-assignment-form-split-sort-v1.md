# New Assignment Form: Split Panels + Natural Territory Sort — v1

**Date:** 2026-07-19
**Product:** Territory Management System (TMS)
**Feature:** Clean up the Group Leader's "New Assignment" form (`AssignmentForm.tsx`) — separate the Territory map(s) checklist from the publisher/partnership settings into two distinct cards, hide the second card until at least one territory is ticked, and sort the territory list naturally by territory number instead of arbitrary/DB order.

## Files Modified
- `src/components/territory-management-system/AssignmentForm.tsx`

## Summary of Changes

**Natural sort.** Added a `naturalCompare()` helper (splits each territory `name` into alternating digit/non-digit chunks, compares numeric chunks as numbers) so "M-2" sorts before "M-6" before "M-11" — a plain string sort would have put "M-11" before "M-2" since '1' < '2' lexicographically. A territory with no number in its name (e.g. "Maligaya", a legacy/unnumbered entry) needs no special-casing — it just becomes a single non-digit chunk and falls into its natural alphabetical position. Applied via `useMemo` over the incoming `territories` prop before rendering the checklist.

**Split into two cards.** The single `<Card>` wrapping the whole form (territory checklist + publisher/group-size steppers + records-per-publisher + breakdown + Generate button) is now the `<form>` itself wrapping two separate `<Card>`s: Card 1 is just "Territory map(s)". Card 2 (publishers/group size/records-per-publisher/breakdown/error/submit button) only renders when `selected.length > 0`. The Generate Assignment button's `disabled` check dropped its now-redundant `selected.length === 0` condition, since the button no longer renders at all in that state.

## Verification
- `npx tsc --noEmit`, `npx next build`, and `npx vitest run` (56/56) all clean.
- Live-verified via a temporary scratch route (removed before finishing) using the exact 7-territory list from Russell's own screenshot: confirmed sort order (M-2, M-6, M-11, Maligaya, Q-4, Q-9, Q-11), confirmed the second card is fully hidden with nothing selected, and confirmed it appears cleanly the instant a territory is ticked and disappears again when unticked.
- **Not live-tested against a real Supabase database** — pure client-side presentational change, no data dependency beyond the existing `territories` prop shape (unchanged).

## Remaining Work
None — no migration, no schema change, no new server action.

## Known Issues
None identified this pass.
