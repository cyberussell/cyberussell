# Help Tab Fold-In, Admin Visit Override, Moved Cleanup, Dashboard Stats — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** 6-item batch from Russell's screenshot/feature list.

## 1. Help folded into the Home tab toggle
The standalone "Help — Mga Status ng Pagbisita" collapsible card (built earlier the same day) is now a 5th pill alongside Territory Map/Live Map/Search Area/Share To, not a separate card below them. `PublisherStatusHelp.tsx` rewritten to just render its content directly (no `useState`/collapse chrome — the tab switcher itself is the show/hide control now). `PublisherWorkspaceApp.tsx`'s `mapView` type widened to include `'help'`, added unconditionally (`available: true`) to the tabs array, rendered as `activeView === 'help' && <PublisherStatusHelp />`.

## 2. Admin can override a visit's result/notes
New migration `029_admin_visit_override.sql` — `territory_record_visits.overridden_by_admin_at timestamptz`, a pure audit marker. New `overrideLatestVisit()` query (`records/queries.ts`) updates the LATEST visit row's `result`/`notes` in place and stamps the marker, leaving `visited_at`/`created_by`/`partner_name` untouched (still reads as "submitted by X," just corrected). New `overrideLatestVisitAction(recordId, result, notes)` server action, server-side re-validates `result` against `getSelectableResults()`. `VisitHistoryList.tsx` gained an `onOverride` prop (admin-only, same as the existing `onUndoLast`) — an "Override" button next to "Undo" on the latest entry only, opening an inline Status+Notes edit form; once saved, the entry shows "Overridden by admin on [date]." Wired into the admin record detail page (`dashboard/records/[recordId]/page.tsx`).

Scope decision, not explicitly specified by Russell: override only applies to the **latest** visit, matching the existing "Undo Last Visit" pattern — editing arbitrary historical entries would need a much bigger UI. Also deliberately does **not** auto-toggle the record's `do_not_call` flag even when the overridden result is/was `do_not_call` — that stays a separate, explicit checkbox on `RecordEditForm` with its own 6-month-lock trigger; auto-flipping it as a side effect of a notes/status correction would be a surprising, easy-to-miss consequence.

## 3. "Moved" removed from every selectable Status list
Fixed at the single source instead of per-component: `getSelectableResults()` (`records/schema.ts`) now filters `'moved'` out of every branch it can return, unconditionally. This automatically fixed every dropdown that calls it — `PublisherRecordForm.tsx`'s "Initial status" and the Admin's own `RecordForm.tsx`/`VisitLogForm.tsx` "Initial status"/"Status" dropdowns all previously still offered "Moved" as a plain pick, which Russell flagged as a bug carried over from before this session (`PublisherVisitLogForm.tsx` and `AddHouseholdMemberForm.tsx` already had their own local `.filter((r) => r !== 'moved')` — now redundant and removed, since the base function handles it). Because server-side validation (`logVisitAction`/`logPublisherVisitAction`/`overrideLatestVisitAction`) also calls this same function, this is enforced end-to-end, not just hidden in the UI. The dedicated "Mark as Moved" flow (`MarkMovedForm`/`recommendRemovalAction`) is unaffected — it writes `result: 'moved'` directly, bypassing this validation entirely by design.

## 4. Admin dashboard: Total Records / Household / Total Houses
`dashboard/queries.ts`'s `getDashboardStats()` gained two new aggregates, fetched via a plain row select + JS reduce (no new RPC — fine at a single congregation's scale):
- **Total Records** — the existing `recordCount` (a plain `territory_records` row count) already matched Russell's definition exactly ("actual record card created... including the added multiple record in the same plus code") — just relabeled from "Contact Records" for clarity, no logic change.
- **Household** (`householdMembersTotal`) — sum of the `household_members` field across every record.
- **Total Houses** (`totalHouses`) — count of distinct non-empty `plus_code` values.

`dashboard/page.tsx` gained 2 new `StatCard`s for these.

## 5. Persons-icon badge on multi-record cards
Already built in the prior round (`AssignedRecordsList.tsx`'s blue "N" pill with a `Users` icon, shown when a card's Plus Code matches another assigned record) — confirmed still intact, no changes needed.

## 6. Counting workflow explanation (see chat — not a code change)
Confirmed via reading `getBatchVisitResultCounts()`/`getBatchSummary()` in full: every GL dashboard stat (`totalRecords`, `completedRecords`, the results graph) is already computed per `partnership_records` row — one row per assigned person/record, never deduplicated by Plus Code. A shared-address household of 2 assigned people already counts as 2 toward every GL number, with each person's own visit outcome landing in the graph independently. Nothing needed changing here; this was already correct by construction once multi-record-per-Plus-Code became possible.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/PublisherStatusHelp.tsx`
- `src/lib/territory-management-system/modules/records/schema.ts`
- `src/components/territory-management-system/publisher/PublisherVisitLogForm.tsx`
- `src/components/territory-management-system/publisher/AddHouseholdMemberForm.tsx`
- `territory-management-system/migrations/029_admin_visit_override.sql` (new)
- `src/lib/territory-management-system/modules/records/types.ts`
- `src/lib/territory-management-system/modules/records/queries.ts`
- `src/app/territory-management-system/actions/records.ts`
- `src/components/territory-management-system/VisitHistoryList.tsx`
- `src/app/territory-management-system/dashboard/records/[recordId]/page.tsx`
- `src/lib/territory-management-system/modules/dashboard/queries.ts`
- `src/app/territory-management-system/dashboard/page.tsx`

## Verification
`npx tsc --noEmit` and `npx vitest run` (52/52) clean. Live-verified via a temporary scratch route (`/dev-scratch-batch2`, removed before finishing): Help tab content renders correctly without collapse chrome; the admin override form pre-fills current status/notes, submits, and the mock save handler received the right `(result, notes)` args; both `PublisherRecordForm` and the Admin's `RecordForm`'s Initial-status dropdowns confirmed to no longer list "Moved"; the new dashboard stat row (Total Records/Total Houses/Household alongside the existing cards) renders with correct labels and hints.

## Remaining Work
None identified. Migration `029` needs to be run by Russell before the override feature works live.

## Known Issues
None identified.

## Next Recommended Task
Russell (1) runs migration `029_admin_visit_override.sql` in the TMS Supabase SQL editor, (2) spot-checks live: the Home tab's Help pill, overriding a real visit's status/notes and confirming "Overridden by admin" appears, that "Moved" is gone from every status dropdown he checks, and the new Total Records/Total Houses/Household numbers on the Admin dashboard look right against real data.
