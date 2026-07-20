# Territory Management System — Partner attribution on admin visits, optimistic Summary chart fix, publisher status panel — v1

**Date:** 2026-07-20
**Product:** Territory Management System (TMS)
**Feature:** Three bugs/requests from screenshots

## Files Modified
- src/lib/territory-management-system/modules/records/schema.ts
- src/app/territory-management-system/actions/records.ts
- src/components/territory-management-system/VisitLogForm.tsx
- src/components/territory-management-system/RecordForm.tsx
- src/components/territory-management-system/VisitHistoryList.tsx
- src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx
- src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx

## Summary of Changes

1. **Admin can now name the Ministry Partner who actually made a visit.** Root cause of the
   reported bug ("Visited by Manoah Lance Rojo" when he's the Admin, not the visitor): admin-logged
   visits always attributed `created_by_name` (the logged-in Admin's own profile name); the
   `partner_name` column already existed and worked correctly for publisher-submitted visits, but
   the Admin's own Log Visit form / add-record form never exposed a way to set it. Added an
   optional "Ministry Partner" text field to both `VisitLogForm.tsx` (Log a Visit) and
   `RecordForm.tsx` (initial visit when adding a new record), threaded through
   `logVisitSchema`/`createRecordSchema` (new `partnerName`/`initialPartnerName` fields) and
   `logVisitAction`/`createRecordAction`. `VisitHistoryList.tsx`'s "Visited by" line now prefers
   `partner_name` over `created_by_name` — safe flip, since publisher-submitted visits already
   have `created_by_name: null`, so this only changes admin-logged entries, and only when the new
   field is actually filled in (falls back to the Admin's name exactly as before when left blank).

2. **Fixed: publisher's own Summary chart missing a just-logged result (e.g. "Busy") that
   correctly showed in the Group Leader's dashboard.** Root cause: `PublisherWorkspaceApp.tsx`'s
   `handleLogVisit` only updated `completed_at` locally after logging a visit, never pushed the
   new visit into `r.visits` — and `handleSync` never refetches the workspace from the server (it
   only flushes the offline queue), so `myResultCounts` (which reads `r.visits[0]`, feeding the
   `VisitResultPieChart` on the publisher's own Home > Summary tab) stayed stale until a full page
   reload. The Group Leader's dashboard is unaffected because it queries the DB fresh. Fixed by
   optimistically prepending a constructed visit row to `r.visits` in `handleLogVisit`, matching
   the shape `RecordVisitWithAuthor` expects.

3. **Read-only yellow panel on the publisher's record detail page.** Added a
   "What you submitted" panel (amber/yellow, non-editable) showing the latest visit's status and
   notes, placed directly above the "Visit History" heading in `PublisherRecordDetailView.tsx`, so
   a publisher can immediately see what they logged for a record without scrolling into Visit
   History and reading each entry.

**Explicitly declined:** the fourth ask (change the Group Leader dashboard's Home chart from a
bar chart to a solid pie chart) was walked back by Russell after I flagged that the bar chart was
originally introduced specifically to replace an earlier donut chart, per his own past feedback
that it was hard to read on mobile with many zero-count categories (see
`VisitResultBarChart.tsx`'s own code comment). He confirmed via `AskUserQuestion` he actually
wants to keep the existing bar chart as-is (values along the x-axis, category names down the
y-axis) — no change made to `GroupLeaderTabs.tsx`'s chart or `VisitResultBarChart.tsx`.

## Remaining Work
None outstanding for the three items actually implemented.

## Known Issues
None found. The same "local state never gets refreshed with server-confirmed visit data until a
full reload" pattern that caused bug #2 also exists in `handleUpdateMoved`/`handleRecommendMove`
(the "Mark as Moved" paths, which also log a `moved` visit server-side) — not fixed here since it
wasn't the reported bug and those paths always complete/advance the record immediately rather than
feeding a summary chart, but worth knowing if a similar report comes in for those paths.

## Next Recommended Task
`npx tsc --noEmit`, `npx vitest run` (87/87), and `npx next build` all clean. Live-verified via a
temporary scratch route (mock data, removed before finishing) — screenshotted both the admin
"Ministry Partner" field and the yellow "What you submitted" panel rendering correctly with real
mock visit data, zero console errors. Could not live-verify against the real TMS Supabase project
(no `supabase-ldc` credentials in this sandbox, the standing limitation for this product).
Committed and pushed at Russell's request (deploy explicitly asked for in the same message).
Russell should spot-check live: (1) log a visit as Admin with a Ministry Partner name filled in,
confirm Visit History shows that name instead of his own; (2) as a publisher, log a "Busy" result
and confirm it immediately appears in the Home > Summary donut without reloading the page; (3)
open a completed record from the Assigned Records list and confirm the new yellow panel shows the
correct status/notes above Visit History.
