# Publisher card details, pass tracking, finished-partner block, assigned-records map — v1

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Five publisher-workflow asks from Russell in one message.

## Files Modified
- `territory-management-system/migrations/022_partnership_pass_tracking.sql` (new)
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/app/territory-management-system/dashboard/records/[recordId]/page.tsx`
- `src/components/territory-management-system/publisher/AssignedRecordsList.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes
Russell gave 5 asks in one message. Confirmed 3 real ambiguities via `AskUserQuestion` before touching anything: (1) whether the "7 not 6" progress ask meant a new publisher-facing progress bar or verifying the existing GL/Admin display — he chose verify-only; (2) whether the passer's name should also be written into visit history — chosen, but investigation found a real risk in doing that literally (see below), so implemented an adjusted, safer version instead; (3) card color scheme — rose for Do Not Call, green for Bible Study, confirmed.

- **Card list details + coloring**: `AssignedRecordsList.tsx` now shows the contact's resident name and "Territory No. — Barangay Name" (`territory.name`/`territory.description`) under each card. Cards tint rose (`border-red-300 bg-red-50`) if `do_not_call`, green (`border-emerald-300 bg-emerald-50`) if the latest visit result is an active Bible Study (`started_bible_study`/`bible_study`/`progressing`) — Do Not Call wins if both, mirroring the exact tone convention `PublisherRecordDetailView.tsx`'s `cardToneClass` already used for the detail view. Required widening `PartnershipRecordDetail.record.territory` (types.ts) and `getPartnershipByToken`'s territory join (queries.ts) to include `description`, which wasn't previously selected.
- **Passer's name — adjusted from the literal ask.** Traced `logVisit()`: it collapses same-day visit entries into an UPDATE, and `getLatestVisitResult()` reads only the single most-recent row to decide the next selectable Status options. Writing a synthetic "passed" visit row would risk silently overwriting a real visit already logged that day, or masking an active Bible Study's true latest status for the receiving partner. Instead: new migration `022_partnership_pass_tracking.sql` adds `partnership_records.passed_from_name`/`passed_from_at`, stamped by `movePartnershipRecord()` at move time (a snapshot of the source partnership's name, not a live reference). Shown as an amber "Passed by [Name]" line on the receiving partner's card (`AssignedRecordsList`) and detail view (`PublisherRecordDetailView`), and as a plain read-only line on the Admin's record detail page via a new `getPassedFromForRecord()` query — deliberately not injected into `territory_record_visits`.
- **Progress denominator — verified, not a bug.** `getBatchSummary()` computes `recordCount`/`completedCount` fresh per request from live `partnership_records` rows (not a frozen snapshot from generation time), and every page that displays it (Admin dashboard, Group Leader dashboard, batch landing page) is already `export const dynamic = 'force-dynamic'`. A partner who receives a passed record already shows the correct new total on next load. No code change made for this item.
- **Block passing to a finished partner**: `movePartnershipRecordAction` (`publisher.ts`) previously only rejected `destination.ended_early_at`; now also rejects `destination.finished_at` (normal completion). `getBatchSiblingPartnerships()` (queries.ts) now also excludes `finished_at` partnerships from the "Move to" dropdown entirely, not just `ended_early_at` ones.
- **Assigned-only pin map in the publisher workspace**: `PublisherWorkspaceApp.tsx` now renders the existing `HouseholdDistributionMap` (dynamic-imported, `ssr:false`, same pattern already used on the Admin Reports page) fed only by this partnership's own currently-assigned records' Plus Codes — not the territory's full approved-record pool the Admin map shows.

`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. **Live-verified in the browser** via a temporary scratch route (`/dev-scratch-tms-verify`, mock data, removed before finishing) rendering the real `PublisherWorkspaceApp` with 4 mock records: confirmed resident names, "M-11 — Sample Barangay" territory/barangay label, rose tint on the Do Not Call card, green tint on the Bible Study card, "Passed by Ministry Partner 2" badge on both the card and detail view, the assigned-records map rendering a pin, and the "Pass to Another Partner" dropdown listing both sibling partners.

## Remaining Work
None outstanding for the 5 items as scoped.

## Known Issues
None found. The one real risk identified (passer name via visit history) was designed around rather than shipped as originally worded — see Summary above.

## Next Recommended Task
Not committed. Russell (1) applies migration `022_partnership_pass_tracking.sql` in the TMS Supabase SQL editor, (2) generates a real assignment batch, claims two Ministry Partner slots, and passes a record between them to confirm the "Passed by" badge appears correctly on the receiving side and cannot be passed to a partner who already finished, (3) confirms a Do Not Call and a Bible Study record show the right card tint on a real device. Then commit + deploy at Russell's request.
