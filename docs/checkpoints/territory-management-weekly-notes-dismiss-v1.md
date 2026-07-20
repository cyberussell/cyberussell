# Weekly Notes — Dismiss a Note — v1

**Date:** 2026-07-20
**Product:** Territory Management System (TMS)
**Feature:** Admin can dismiss a note off the Weekly Notes list so it stops showing

## Files Modified
- `territory-management-system/migrations/035_weekly_note_dismissal.sql` (new)
- `src/lib/territory-management-system/modules/records/types.ts`
- `src/lib/territory-management-system/modules/records/queries.ts`
- `src/app/territory-management-system/actions/records.ts`
- `src/app/territory-management-system/dashboard/weekly-notes/page.tsx`

## Summary of Changes
Russell asked for a way to dismiss a Weekly Notes row so it doesn't keep showing up. Added
`territory_record_visits.weekly_note_dismissed_at` (migration 035) and a new
`dismissWeeklyNote()` query that stamps it on a single visit row. `listWeeklyVisitNotes()` now
excludes any latest-visit whose `weekly_note_dismissed_at` is set, alongside its existing
window/notes-present checks. New `dismissWeeklyNoteAction(visitId)` server action
(`actions/records.ts`) follows the exact same shape as the existing
`dismissRemovalRecommendationAction` on the Flagged for Removal page — a plain `<form>` +
submit button, no confirm dialog, since it's non-destructive to the underlying record (Visit
History, Override, and Undo on the record's own detail page are all untouched).

Scoped to the *visit row*, not the record: if a new visit gets logged for that record next week,
it's a new row with `weekly_note_dismissed_at` null, so the note isn't permanently silenced —
only this specific instance of it is.

`npx tsc --noEmit`, `npx vitest run` (84/84), and `npx next build` all clean.

## Remaining Work
None for this pass.

## Known Issues
- Migration 035 has **not** been applied to the live TMS Supabase project — the `supabase-ldc`
  MCP server in this sandbox returned "Unauthorized" (no access token configured), a standing
  limitation for this product (see prior checkpoints — no live Supabase credentials available
  here). Russell needs to run `territory-management-system/migrations/035_weekly_note_dismissal.sql`
  against the TMS project himself (Supabase SQL editor or CLI) before this feature will work in
  production — until then the code will error trying to write/read a column that doesn't exist
  yet.
- No "undo a dismiss" control was added, matching the one-way shape of the existing Flagged for
  Removal dismiss action. If Russell wants a way to un-dismiss, that's a follow-up.

## Next Recommended Task
Russell applies migration 035 to the live TMS Supabase project, then spot-checks: dismiss a
Weekly Notes row, confirm it disappears from the list, confirm the underlying record's Visit
History/Override/Undo on its detail page are unaffected, and confirm a fresh visit logged on
that record shows up again next week.
