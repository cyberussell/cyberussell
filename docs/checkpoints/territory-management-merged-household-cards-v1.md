# Territory Management System — Merged Household Cards on Assigned Contact Records — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Follow-up to the household-single-record counting change — Russell caught that the publisher's own "Assigned Contact Records" list still rendered one card per raw record, so a household of 2+ people still showed as duplicate/triplicate adjacent cards even though the assignment engine and Group Leader stats now treat them as one unit.

## Files Modified
- `src/components/territory-management-system/publisher/AssignedRecordsList.tsx`

## Summary of Changes
Groups `records` by Plus Code before rendering (a blank/null Plus Code never merges with another blank one — same rule as `engine.ts`/`getBatchSummary`), rendering exactly one card per group instead of one per raw record. Since the server always returns `records` sorted by `sequence`, and the assignment engine keeps a household's records adjacent, the first record encountered per Plus Code is always the correct lowest-sequence "primary" — its address/name/status/notes drive the card's copy, same as before. Tapping the card opens the primary record's own detail view, where the household disclosure (built in the prior round) surfaces the other resident(s).

The card's checkmark/circle now reflects the whole group: **any one** member completed marks it done (confirmed with Russell — same rule as the Group Leader's "X of 6" stat, for consistency). The "sync failed" alert shows if **any** member failed to sync. The Do Not Call lock icon only shows once **every** member of the household is locked — a deliberate asymmetry from the other two rules: unlike a Group-Leader-facing completion stat, this circle is the publisher's own personal to-do signal, so a single locked resident must never visually hide that a co-resident at the same address still needs a visit.

## Remaining Work
None requested.

## Known Issues
None found. `npx tsc --noEmit` and `npx vitest run` (excluding the pre-existing, unrelated, live-Supabase-network-dependent `appointment-system/slots.test.ts`) clean. Live-verified via a temporary scratch route (removed before finishing) with a 4-record mock set (2 sharing a Plus Code, 2 standalone) — confirmed exactly 3 cards render, the merged card carries the correct 👥2 badge and the lowest-sequence record's copy, and the other two records stay untouched as their own singleton cards.

## Next Recommended Task
Deployed at Russell's request. Russell spot-checks live: a real multi-person household now shows as one card (not two) on the Assigned Contact Records list, with the correct household badge, and tapping it still reaches the same record-detail household disclosure to log each person's own visit.
