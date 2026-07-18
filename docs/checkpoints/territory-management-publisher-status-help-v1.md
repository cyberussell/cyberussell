# Publisher Workspace Status Help (Tagalog) — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Collapsible help card on the publisher workspace Home tab explaining what each visit "Status" means and when to choose it — content drafted, reviewed, and edited (word choices) by Russell before implementation, per his explicit "I need to see and approve that first."

## Files Modified
- `src/components/territory-management-system/publisher/PublisherStatusHelp.tsx` (new)
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes
New `PublisherStatusHelp.tsx` — collapsed by default, tap-to-expand card (same `useState`/`ChevronDown`/`ChevronRight` pattern already used in `SectionBlockTree.tsx`). Lists every selectable `VISIT_RESULT_LABELS` status (English label, matching the actual "Status" dropdown in `PublisherVisitLogForm.tsx`) with a Tagalog explanation of what it means and when to use it, plus a footnote covering the two system-only states (`Initial Visit`, `Undone`) a publisher never picks manually. Copy content is local to the component (presentational, not business logic) rather than folded into `records/schema.ts`.

Wired into `PublisherWorkspaceApp.tsx`'s Home tab, placed after the map/toggle section and before the Early Out slider — visible but out of the way of primary actions.

## Verification
`npx tsc --noEmit` and `npx vitest run` (52/52) clean. Live-verified via a temporary scratch route (`/dev-scratch-tms-help`, removed before finishing): collapsed and expanded states both screenshot-confirmed, all Tagalog copy renders correctly including the final Russell-requested wording edits ("susunod na pagbisita", "Kakasimula lang ng unang", "mula sa anumang pagbisita", "Hihilingin sa iyo na itama", plain "No Positive Response" without the Tagalog parenthetical).

## Remaining Work
None. No migration needed (pure UI/copy addition).

## Known Issues
None identified.

## Next Recommended Task
Committed (`f55e71d`, bundled with the Bible Study funnel batch — see `territory-management-bible-study-funnel-sync-reasons-qr-panel-v1.md`). Russell spot-checks the real Home tab on a claimed partnership to confirm the card renders/expands correctly on an actual phone.
