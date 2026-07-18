# Ambiguous FK embed fix — assignment generation returning 0 records — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Bug fix. Russell reported "cannot generate records, 0 records for ministry partners," reproduced against a real territory ("Maligay") with 17 approved records — ruling out the pending-approval explanation offered earlier in this session, since these were confirmed approved.

## Files Modified
- `src/lib/territory-management-system/modules/records/queries.ts` — `RECORD_WITH_LOCATION_SELECT`
- `src/lib/territory-management-system/modules/assignment/queries.ts` — `fetchEligibleRecordIds`, `getPartnershipByToken`

## Summary of Changes

Root cause: migration `030_correction_section_block.sql` added a second foreign key from `territory_records` to each of `territory_sections` and `territory_blocks` (`correction_recommended_section_id`/`correction_recommended_block_id`, alongside the original `section_id`/`block_id`). PostgREST requires every embed between two tables that have more than one FK relationship between them to be disambiguated with a `!column_name` hint — the session that added migration 030 correctly hinted the two *new* `correction_section`/`correction_block` embeds, but didn't realize this made the *existing*, unhinted `section:territory_sections(...)`/`block:territory_blocks(...)` embeds ambiguous too. An ambiguous embed causes PostgREST to reject the whole query; every affected call site here destructures only `{ data }` and ignores `error`, so the failure was silent — `data` came back `null`, coerced to `[]`, and read everywhere as "no rows" rather than surfacing as an error.

This had a wider blast radius than the one symptom Russell hit:
- `RECORD_WITH_LOCATION_SELECT` (records/queries.ts) — feeds `listRecords` (Admin's Contact Records page), `getRecordsInBlocks`, `getRecordById`, and 3 more call sites. Broken since migration 030 landed.
- `fetchEligibleRecordIds` (assignment/queries.ts) — feeds assignment generation's eligible-record pool. This is the exact bug Russell hit: `getApprovedRecordCounts` (the New Assignment form's per-territory "17 approved" hint) has no section/block embed and was unaffected, so the count looked right while the real generation query silently came back empty — explaining the "17 approved but 0 assigned" discrepancy.
- `getPartnershipByToken`'s `record:territory_records(...)` embed — feeds the publisher workspace's own assigned-records fetch. Not yet hit live only because generation itself was already producing empty partnerships; would have broken next, the moment a real record actually got assigned.

Fix: added `!section_id`/`!block_id` hints to all three unhinted embeds, matching the pattern already used correctly for the correction-recommendation fields.

`npx tsc --noEmit` and `npx vitest run` (56/56) clean.

## Remaining Work
None beyond live verification (see below).

## Known Issues
**Not live-verified — no Supabase credentials available in this session** (same standing limitation as every other TMS session; this session additionally confirmed all three Supabase MCP servers configured for this environment return "Unauthorized," so live DB state couldn't be queried directly either). The fix is a well-understood, standard PostgREST disambiguation pattern already proven working elsewhere in this same file (the correction_section/correction_block embeds), and both `tsc`/`vitest` are clean, but the actual live query against the real "Maligay" territory has not been re-run.

## Next Recommended Task
Russell deploys this fix and regenerates an assignment against the "Maligay" territory (or any territory with approved records): confirm partnerships now get real records assigned (not 0), the Admin Contact Records page shows records again if it was also silently empty, and a publisher opening their assignment link sees their assigned records. If any of those still come back empty, the next step is inspecting the actual PostgREST error (currently swallowed) rather than assuming this was the only cause.
