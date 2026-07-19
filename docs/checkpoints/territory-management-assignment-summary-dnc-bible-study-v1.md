# Assignment summary reformat + DNC/Bible Study card indicators — v1

**Date:** 2026-07-19
**Product:** Territory Management System (TMS)
**Feature:** Three small live-bug/polish items Russell reported from real screenshots of the Group Leader ("TGL") workspace.

## Files Modified
- `src/components/territory-management-system/AssignmentForm.tsx`
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/components/territory-management-system/PartnershipList.tsx`
- `src/components/territory-management-system/publisher/PartnershipCard.tsx`

## Summary of Changes
1. **Investigated the reported "partnershipwere" typo** in `GroupLeaderTabs.tsx`'s shortfall warning — confirmed via git blame the source already has correct spacing (`partnership{s} were created`, unchanged since 2026-07-16's `7209072`). No code change; the screenshot likely reflects a production deploy that predates that fix. Confirmed with Russell to skip.
2. **New Assignment form summary box reformatted** (`AssignmentForm.tsx`): deleted the first sentence ("N publishers in groups of N → N partnerships."). Replaced the single breakdown sentence with three rows: bold-centered "N approved records available", "N Records Per Ministry Partner" (hidden if no full-capacity partnership exists), and — only when there's a leftover partnership — "1 Ministry Partner will only have N Records to work on" as its own row. Removed the now-unused `breakdownText` computation.
3. **DNC count + Bible Study indicator added to partnership cards**: `PartnershipWithProgress` gained `dncCount` (household-grouped count of assigned records flagged Do Not Call) and `hasBibleStudy` (true if any assigned record's latest visit result is in the Bible Study family). Computed in `getBatchSummary` — added one query against `territory_record_visits` for latest-result-per-record (same de-dup pattern as `getReportStats`), and a DNC count re-using the same household plus-code grouping as the existing record/completed counts (but over the full record list, not just the DNC-lock-excluded "countable" subset). Both `PartnershipCard.tsx` (public selection page) and `PartnershipList.tsx` (GL Partners tab + public progress page) now show "· N Do Not Call" in red next to the completion line, and a small blue (`#4a6da7` — the existing Bible Study record-card color) accent bar in the card's top-right corner when `hasBibleStudy` is true.

## Verification
`npx tsc --noEmit` and `npx vitest run` (56/56) clean; no errors in touched files (two unrelated pre-existing `.next` generated-type errors ignored). `npx next build` succeeds. Live-verified via a temporary scratch route (created under `src/app/territory-management-system/`, screenshotted, then fully removed before finishing) with mock data matching Russell's exact screenshot numbers (33 approved, 6 per partner, 1 partner with 3) — summary box, red DNC text, and blue corner accent all rendered correctly on both card components; the accent correctly did not appear on a partnership with `hasBibleStudy: false`.

## Remaining Work
None for these three items.

## Known Issues
None identified.

## Next Recommended Task
Russell spot-checks live: the New Assignment summary box shows the new three-row format, a partnership card with a Do Not Call record shows the red count, and a partnership with a Bible Study result shows the blue corner accent.

## Addendum — separate, more serious bug found and fixed via live reproduction (2026-07-19)
Russell reported (with fresh live screenshots) that a regular, non-overflow assignment on a territory with non-zero approved records still put **every** Ministry Partner into "Choose Your Search Area" instead of their real assigned-records list. Traced to `getPartnershipByToken()` (`assignment/queries.ts`) embedding `move_recommended_territory_id`/`move_recommended_section_id`/`move_recommended_block_id` (migration 033) and `correction_recommended_territory_id` (migration 034) — columns that were never applied to the live TMS Supabase project (flagged as pending in an earlier session's `working-on.md` entry but not acted on). With those columns missing, the query fails and `records` silently comes back `[]`, which trips `PublisherWorkspaceApp`'s `needsSearchScope = ... || workspace.records.length === 0` for every partnership regardless of `is_overflow`. **Not a code bug** — no source changes were needed. Fix was purely applying migrations `032_move_recommendation.sql`, `033_move_recommendation_location.sql`, and `034_correction_recommendation_territory.sql` to the live project, which Russell did via the Supabase SQL editor. Confirmed resolved.
