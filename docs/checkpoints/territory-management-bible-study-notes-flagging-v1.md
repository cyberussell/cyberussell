# Bible Study Undo, Admin Notes, Do Not Call Narrowing, Moved-Out Flagging, Home Pie Chart, Bible Verse — v1

**Date:** 2026-07-15
**Product:** Territory Management System (TMS)
**Feature:** A real bug fix Russell reported (screenshots showed "Invalid visit result" failures for Progressing/Discontinued on Bible Study records), plus 6 requested features.

## Files Modified

**Bug fix + shared schema:**
- `src/app/territory-management-system/actions/publisher.ts` — `logPublisherVisitAction` now re-derives selectable results server-side (`getLatestVisitResult` + `getRecordDoNotCall` + `getSelectableResults`) instead of checking a static list that permanently excluded Progressing/Discontinued
- `src/app/territory-management-system/actions/records.ts` — admin's `logVisitAction` gained the same server-side re-derivation (was previously unvalidated beyond the zod enum); new `undoLastVisitAction`, `dismissRemovalRecommendationAction`; `deleteRecordAction` now also revalidates the flagged list
- `src/lib/territory-management-system/modules/records/schema.ts` — `getSelectableResults()` gained a `doNotCall` param; new `DO_NOT_CALL_RESULTS`
- `src/lib/territory-management-system/modules/records/queries.ts` — new `getLatestVisitResult`, `getRecordDoNotCall`, `deleteLatestVisit`, `recommendRecordForRemoval`, `dismissRemovalRecommendation`, `listFlaggedForRemoval`
- `src/lib/territory-management-system/modules/records/types.ts` — `TerritoryRecord` gained `removal_recommended_at/reason/by`

**Undo Last Visit (generic, admin-only):**
- `src/components/territory-management-system/VisitHistoryList.tsx` — optional `onUndoLast` prop, only rendered on the most recent entry
- `src/app/territory-management-system/dashboard/records/[recordId]/page.tsx` — wires `undoLastVisitAction.bind(null, record.id)` in; publisher's own usage of the same list passes nothing

**Publisher end-of-ministry note to Admin:**
- `territory-management-system/migrations/011_partnership_admin_note.sql` — `partnerships.admin_note`, `admin_note_at`
- `src/lib/territory-management-system/modules/assignment/schema.ts` / `queries.ts` — `submitPartnershipNoteSchema`, `submitPartnershipNote`, `listPartnershipNotesForCongregation`
- **Security note**: `getBatchSummary`'s partnerships query was `select('*')`, which would have leaked `admin_note` into the Group Leader's `stats.partnerships` (via RLS's existing "group leader reads partnerships" policy). Pinned to an explicit column list to keep the note admin-only, matching the request that the Group Leader never sees these notes.
- `src/app/territory-management-system/actions/publisher.ts` — `submitPartnershipNoteAction`
- `src/lib/territory-management-system/modules/offline/db.ts` / `sync.ts` — new `'note'` queue item type
- `src/components/territory-management-system/publisher/PublisherNoteForm.tsx` (new), `PublisherWorkspaceApp.tsx` — new `'note'` view, routed through from both "Sync & Finish" and "End My Ministry Early" (skippable)
- `src/app/territory-management-system/dashboard/notes/page.tsx` (new) + `DashboardSidebar.tsx` nav entry

**Do Not Call → exactly 3 statuses:**
- `VisitLogForm.tsx` (admin), `PublisherVisitLogForm.tsx` (publisher) both pass `doNotCall` into `getSelectableResults()`
- `PublisherVisitLogForm.tsx` additionally always excludes `'moved'` — that result now only reaches the record via the dedicated "Mark as Moved" flow, not the plain dropdown (publisher-only; admin's dropdown is unaffected)

**Moved-out forced follow-up:**
- `territory-management-system/migrations/012_removal_recommendation.sql`
- `src/lib/territory-management-system/modules/assignment/schema.ts` — `updatePublisherRecordSchema`, `recommendRemovalSchema`
- `src/app/territory-management-system/actions/publisher.ts` — `updatePublisherRecordAction`, `recommendRemovalAction` (both also log a real `'moved'` visit underneath so stats/card-tone stay consistent regardless of which path was chosen)
- `src/lib/territory-management-system/modules/offline/db.ts` / `sync.ts` — `'updateRecord'`, `'recommendRemoval'` queue item types
- `src/components/territory-management-system/publisher/MarkMovedForm.tsx` (new) — collapsed trigger → choose path → Update Contact Record (inline edit) or Recommend for Admin Removal (required reason)
- `PublisherRecordDetailView.tsx` — wires `MarkMovedForm` in; card tone gains an amber/yellow branch for `latestResult === 'moved'`
- `src/app/territory-management-system/dashboard/records/flagged/page.tsx` (new) — Delete/Dismiss; linked from the Contact Records page header (with a count badge) rather than the main sidebar, to avoid a nav-highlight collision with "Contact Records"

**Home tab pie chart:**
- `src/components/territory-management-system/VisitResultPieChart.tsx` (new) — plain inline SVG donut (stacked `<circle>` strokes), no chart library, matches the existing no-dependency convention
- `GroupLeaderTabs.tsx` — Home tab swaps the QR card for the pie chart once every partnership's `completedCount >= recordCount`. **Confirmed with Russell: the batch is NOT deleted** (Partners tab and Reports still work); it naturally stops working the next day via the existing `isBatchExpired()` midnight-in-congregation-timezone check, which was already the "daily reset."

**Publisher done screen — Bible quote + congregation name:**
- `src/lib/territory-management-system/modules/assignment/types.ts` — `PartnershipWorkspace` gained `congregationName`
- `assignment/queries.ts` — `getPartnershipByToken` now also selects `congregations.name`
- `PublisherWorkspaceApp.tsx` — 'done' view now shows the Matthew 28:19,20 quote + citation + congregation name

**Assignment generation — oldest-visited-first rotation (same-session follow-up):**
- `src/lib/territory-management-system/modules/assignment/queries.ts` — `fetchEligibleRecordIds`'s within-block tiebreaker changed from record `created_at` (never changes, so it handed the same first N records to every generation) to each record's latest visit date, oldest/never-visited first — new `getLatestVisitDatesByRecord` helper. Confirmed with Russell via `AskUserQuestion`: staleness metric is last-visited (not created_at), and territory → section → block grouping stays the primary walking order — staleness only breaks ties within a block, doesn't reorder which block comes first.

**Home summary — bar chart instead of donut, partner-count headline, territories worked (same-session follow-up):**
- `src/components/territory-management-system/VisitResultPieChart.tsx` renamed to `VisitResultBarChart.tsx` — now a horizontal bar chart sorted highest-to-lowest (Russell's feedback: faster to compare than a donut on mobile), same status colors, count at the end of each bar.
- `src/lib/territory-management-system/modules/reports/queries.ts` — `BatchStats` gained `territories: { id, name }[]` (already fetched inside `getBatchStats` via `getBatchSummary`, just not previously exposed).
- `GroupLeaderTabs.tsx` — headline now reads "N ministry partner(s) completed today" using `stats.partnerships.length` (confirmed with Russell via `AskUserQuestion` — not the sum of visit counts, which was a different, larger number in his example), plus a "Territories worked: ..." line from `stats.territories`.

## Summary of Changes

Confirmed the reported bug's root cause by reading code (no live Supabase access this session, same standing limitation as every prior TMS pass): `logPublisherVisitAction` validated against the permanently-narrow `SELECTABLE_VISIT_RESULTS` list instead of re-deriving what the client's own form actually offers (`getSelectableResults(latestResult)`), so Progressing/Discontinued were always rejected for ongoing Bible Study records — not a missing migration. Fixed, and generalized the same re-derivation to also cover Do Not Call narrowing on both the publisher and (previously unvalidated) admin paths.

Built all 6 requested features per the plan confirmed with Russell via `AskUserQuestion` before starting: generic Undo Last Visit (not Bible-Study-scoped), a new admin-only Notes page fed by a skippable end-of-ministry note, Do Not Call narrowed to exactly 3 statuses, a forced two-path follow-up when a record is marked Moved (Update Contact Record inline or Recommend for Admin Removal with a required reason, feeding a new Flagged for Removal admin page), a Home-tab pie chart replacing the QR once every partner is done (batch kept, not deleted, per Russell's choice), and the Matthew 28:19,20 quote + congregation name on the publisher's final screen.

`npx tsc --noEmit` and `npx next build` both clean across the whole repo. Live-verified only the one DB-independent route (`/territory-management-system/login` — renders correctly, zero console errors) in the browser preview; everything else sits behind Supabase auth or real assignment-batch data, unexercisable without live credentials (same limitation noted in every prior TMS session this repo has run).

## Remaining Work

Two migrations need to be run in the TMS Supabase SQL Editor before their features work live:
- `011_partnership_admin_note.sql`
- `012_removal_recommendation.sql`

## Known Issues

None found beyond the reported bug (now fixed). Everything else is unverified against live data, not known-broken.

## Next Recommended Task

Russell runs migrations 011 and 012, then live-verifies end-to-end (including generating two successive assignment batches on the same territory/section/block to confirm records rotate — a record visited in batch 1 should sort toward the back of its block in batch 2, and a never-visited record should surface first):
1. A publisher on an ongoing Bible Study record can now log Progressing/Discontinued without the "Invalid visit result" error.
2. Admin can Undo Last Visit on any record's history and see the status revert.
3. A publisher can leave (or skip) an end-of-ministry note; it shows up on the new Admin Notes page and nowhere in the Group Leader dashboard.
4. A Do Not Call record's dropdown (both admin and publisher) shows exactly Do Not Call / Moved / Visited Again.
5. Marking a record Moved forces one of the two paths; the "Recommend for Admin Removal" path shows up on the new Flagged for Removal page (with its count badge on Contact Records) and Delete/Dismiss both work; the card turns amber/yellow.
6. Once every Ministry Partner in a batch finishes, Home shows the pie chart instead of the QR; the batch keeps working for Reports/Partners until it naturally expires the next day.
7. The publisher's final "done" screen shows the Bible quote and the real congregation name.
