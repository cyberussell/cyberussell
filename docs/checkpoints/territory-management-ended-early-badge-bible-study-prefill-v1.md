# Territory Management System — Ended-Early Badge + Bible Study Conductor Pre-fill — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Two small fixes from Russell's live screenshot review.

## Files Modified
- `src/components/territory-management-system/publisher/PartnershipCard.tsx`
- `src/components/territory-management-system/PartnershipList.tsx`
- `src/components/territory-management-system/publisher/PublisherVisitLogForm.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/lib/territory-management-system/modules/records/schema.ts`

## Summary of Changes
1. **Ended-early distinction.** Russell's screenshot showed a partnership ("Russell And Daddy") on the publisher-facing batch-landing page (`/assignment/[batchToken]`) reading a plain green "Done" badge even though only 2 of 6 records were completed — because `done` was `Boolean(finished_at || ended_early_at)`, collapsing a normal finish and an "End My Ministry Early" termination into an identical badge. Both `PartnershipCard.tsx` (publisher-facing "Select your Partner" list — the exact screen in the screenshot) and `PartnershipList.tsx` (Group Leader's own Partners tab, same underlying bug) now show a distinct amber "Ended Early" badge plus a note — "Ended early — the remaining records weren't visited this session" — instead of the plain "Done" state. No DB fields needed; `ended_early_at` was already fetched and typed, just never surfaced distinctly. There's no per-partnership reason/note field for *why* a session ended early (that's a separate, admin-only end-of-ministry `admin_note` — deliberately excluded from Group Leader-facing queries), so the note is a generic explanation rather than a specific reason.
2. **Bible Study conductor pre-fill.** `PublisherVisitLogForm`'s "Who is conducting the Bible Study?" input (shown for `bible_study`/`progressing`/`started_bible_study`) always started blank, requiring the publisher to retype the same name every follow-up visit. Added `extractConductorFromNotes()` in `schema.ts` (inverse of the existing `mergeConductorIntoNotes()`, parsing the `"Conducted by: X — ..."` prefix back out) and wired `PublisherRecordDetailView` to pass the latest visit's raw `notes` down as a new `latestVisitNotes` prop. The result `<select>`'s `onChange` now pre-fills `conductorName` from the prior visit's notes when the newly selected result is `bible_study` or `progressing` — editable afterward, not locked. `started_bible_study` is untouched and stays blank, since `getSelectableResults()` guarantees it's never selectable at the same time as `bible_study`/`progressing` (mutually exclusive funnel branches), and it's the initial status change with nothing to carry over.

## Remaining Work
None — both items were fully scoped fixes from Russell's screenshot, no follow-up requested.

## Known Issues
None found. `npx tsc --noEmit` and `npx vitest run` (52/52) clean. Live-verified via a temporary scratch route (`territory-management-system/scratch-verify-temp`, removed before finishing): "Ended Early" badge + note render only for an early-ended partnership, not a normally-finished one; selecting "Progressive BS" pre-filled the conductor field from mock prior notes ("Juan Dela Cruz"), still editable; selecting "Started Bible Study" (cold-start funnel) left the field blank.

## Next Recommended Task
Deployed at Russell's request — no code changes pending. Russell spot-checks live: a real "End Ministry Early" session shows the amber "Ended Early" badge + note (both on the publisher's own "Select your Partner" screen and the Group Leader's Partners tab), and a real in-progress Bible Study follow-up visit pre-fills the conductor name correctly.
