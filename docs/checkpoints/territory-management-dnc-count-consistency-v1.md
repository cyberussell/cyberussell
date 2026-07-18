# Locked-DNC Count Consistency, Note-Form Parity, StatCard Centering — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Russell sent 5 screenshots asking for a re-review of the whole locked-DNC/finishing flow from earlier the same day, plus 3 smaller UI fixes.

## Real bug found: "Send & Finish" silently did nothing on an empty note
`PublisherNoteForm.tsx`'s "Send & Finish" button was `disabled={sending || !note.trim()}` — since the note field is explicitly optional, tapping "Send & Finish" with nothing typed did nothing at all (looked broken/inconsistent next to "Skip", which always worked). Fixed: the button is only disabled while `sending`; if the note is empty when tapped, it now calls `onSkip()` directly instead of `onSend('')` — same end result as Skip, no pointless empty note created, and the button is never a dead end.

## Real bug found: "Done" next to a contradictory "N remaining"
Russell's earlier ask ("The locked DNC should not be included in the count to finish the card list") was implemented too narrowly last round — only the publisher's own `allDone`/"Sync & Finish" gate excluded locked-DNC records, not the underlying `recordCount`/`completedCount` numbers everything else reads from. Result: a partnership could genuinely finish (all *reachable* records done, locked ones excused) and correctly show "Done", while the Group Leader's Partners tab, Dashboard tab, and Visits tab all still showed the old totals including the un-visitable locked records as "remaining" — e.g. "Done" next to "4 of 6 · 2 remaining".

Fixed at the source: `assignment/queries.ts`'s `getBatchSummary` (the one place `PartnershipWithProgress.recordCount`/`completedCount` are computed — every other stat, Partnership card, and Dashboard tab derives from it) now excludes any record still `isDoNotCallLocked` from *both* the numerator and denominator entirely, not just from the "is this partnership done" check. A partnership with 6 assigned records where 2 are locked-DNC now reads as "4 total, 4 completed, 0 remaining" once the other 4 are genuinely done — consistent with "Done" everywhere it's shown.

## Two smaller UI fixes
- `StatCard.tsx`: the value + delta row is now centered (`justify-center text-center`) instead of left-aligned, on both the Group Leader's Dashboard and Visits tabs (shared component, so also affects Reports and the Admin's own dashboard).
- `GroupLeaderTabs.tsx`: the Visits tab's delta baseline (added last round) is now persisted to `localStorage` keyed by `batchId`, not just component state — a batch is a new one every day, so this still naturally resets each morning with no extra logic. Root cause of "not showing the delta": a plain page reload (as opposed to the existing in-place `router.refresh()` poll) previously reset the in-memory baseline to whatever had just loaded, so the delta read 0 the moment the page was reloaded — which is a very likely thing to happen in real use between checking on it.

## Verification
`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. Live-verified the client-only pieces via a temporary scratch route (`/dev-scratch-tms-reviewfix`, removed before finishing): confirmed tapping "Send & Finish" with an empty note fires the exact same `onSkip()` callback Skip does, and StatCard values render centered at a narrow (375px) width. The `getBatchSummary` count fix is server-only and touches live Supabase data — reviewed carefully but not round-tripped against the real database (no live TMS credentials in this dev environment, the standing limitation noted in every prior TMS checkpoint).

## Remaining Work
None. No migration — this reads the same `do_not_call`/`do_not_call_at` columns migration 027 already added.

## Next Recommended Task
Russell re-tests the exact scenario from the screenshots: a partnership with a locked-DNC record among its assigned records, all *other* records completed, taps Sync & Finish (or Skip on the note screen with nothing typed), and confirms the Partners tab now shows "Done" with a completion count that no longer contradicts it (e.g. "4 of 4" rather than "4 of 6 · 2 remaining"). Also confirm the Visits tab's delta badge survives a real page reload now, not just the 30-second auto-poll.
