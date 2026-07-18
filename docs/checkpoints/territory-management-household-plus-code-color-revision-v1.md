# Custom Card-Tone Palette, Multi-Record Households, Sync Copy-for-Admin — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** 3-part batch: revised the card-tone colors to Russell's exact hex spec (list reverted to plain white, only the single-record detail card is tinted), added support for multiple contact records sharing one Plus Code (a household with more than one person), and a cheap client-side fallback for stuck offline-sync items.

## 1. Card-tone color revision
Previous round used solid Tailwind reds/greens/yellows on *both* the list and the detail card. Russell's follow-up: strip all status coloring from the scrolling list entirely (always plain white, "so nothing competes for attention while skimming"), and change the detail card's palette to exact custom hex values:
- Bible Study family (Started Bible Study/Bible Study/Progressive BS): `#4a6da7`
- Potential BS: `#799fcc`
- Do Not Call: `#e59797`
- Default (no special status): `#dadad9`

Text color per tone picked by actual WCAG contrast ratio, not eyeballed — computed by hand: `#4a6da7` is dark enough for white text (5.2:1 vs. white, 4.0:1 vs. black — white wins). `#799fcc`, `#e59797`, and `#dadad9` are all too light for white text (2.3–2.8:1, fails AA) and use dark navy (`#0B1B33`) instead (7.6–15:1). Border colors are each background darkened ~20% for edge definition. `AssignedRecordsList.tsx`'s `cardTone()` function removed outright (no more `getRecordCardTone` import); `PublisherRecordDetailView.tsx` keeps it with the new values.

## 2. Multiple contact records at one Plus Code
No schema/migration needed — there was never a uniqueness constraint on `plus_code`, and every existing stat/graph already counts individual `territory_records` rows, not addresses, so this was purely a missing UX layer:
- **Household detection**: client-side only, in `PublisherWorkspaceApp.tsx` — `householdRecords` derives from records already loaded into the workspace (`workspace.records`) sharing the selected record's non-empty Plus Code. Won't catch a sibling assigned to a *different* partner — an accepted offline-first tradeoff, not worth a server round-trip.
- **Quick-add-sibling**: new "Add Another Person Here" button on `PublisherRecordDetailView.tsx`, gated on `editable`. Opens the existing `PublisherRecordForm` "add" flow (same one "My Added Records" uses) via a new `prefill` payload on the `'addRecord'` view state, carrying the current record's territory/section/block/address/Plus Code so the new entry doesn't need retyping. No new backend — reuses the existing `addRecord` offline-queue action.
- **Grouping badge**: `AssignedRecordsList.tsx` and the Admin's `RecordsTable.tsx` both compute a Plus-Code → count map from their already-loaded record arrays and show a small "N" badge next to any address that has siblings.
- **Moved → removal picker**: `MarkMovedForm.tsx`'s "Recommend for Admin Removal" step gained a record picker (radio list: current record + each household sibling) that only renders when `householdRecords` is non-empty. `onRecommend`'s signature changed from `(reason: string)` to `(reason: string, recordId: string)`. No new authorization logic needed — `recommendRemovalAction` already validates the submitted `recordId` belongs to the calling partnership (`partnershipHasRecord`), and every household candidate is by definition already in that partnership's own assigned set.

## 3. Sync failure — cheap admin-visibility fallback
Confirmed with Russell: sync failures happen specifically from poor field connectivity, not a systemic bug — doesn't yet justify a full server-side "Sync Issues" table/admin page. Added a "Copy for Admin" button to the existing failed-sync screen in `PublisherWorkspaceApp.tsx` — formats every failed item (type + captured error) as plain text via `buildFailedSyncReport()` and copies it to the clipboard (`navigator.clipboard.writeText`), so the publisher can paste it to their Group Leader (Messenger, etc.) instead of just describing it verbally. The Group Leader/Admin still applies it manually through existing pages — this doesn't close the loop automatically, just removes the "how do I even explain what broke" friction.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/AssignedRecordsList.tsx`
- `src/components/territory-management-system/publisher/MarkMovedForm.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/RecordsTable.tsx`

## Verification
`npx tsc --noEmit` and `npx vitest run` (52/52) clean throughout. Live-verified via a temporary scratch route (`/dev-scratch-household`, removed before finishing) with mock data — two records sharing a Plus Code and one unrelated record:
- List: plain white cards, "2" badge on both shared-address cards, none on the unrelated one.
- Detail card: `#dadad9` default tone rendered correctly (dark navy text, readable), "2 contact records at this address" line, "Add Another Person Here" button present.
- Moved → Recommend for Admin Removal: record picker correctly showed both household members as radio options, defaulting to the currently-viewed one.
- Admin `RecordsTable`: same "2" badge confirmed in the Address column for both shared rows.

"Copy for Admin" was not separately screenshot-verified (small addition reusing an already-verified JSX section's exact styling conventions) — confirmed via clean `tsc`/build only.

## Remaining Work
None identified. No migration.

## Known Issues
`householdRecords` only catches siblings already assigned to the *same* partnership — a household split across two different Ministry Partners' assignments won't show a connection for either of them. Acceptable given the offline-first constraint; revisit only if this turns out to matter in practice.

## Next Recommended Task
Committed and pushed at Russell's request ("fix or finish all open items then deploy"). Russell spot-checks live: the new detail-card colors read correctly on a real Do Not Call / Bible Study / Potential BS / default record, "Add Another Person Here" successfully creates a second record at the same address, the Moved flow's record picker appears correctly once a real household has 2+ records, and — if a sync ever actually fails in the field — "Copy for Admin" produces something legible to paste into Messenger.
