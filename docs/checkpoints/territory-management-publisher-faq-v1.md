# Publisher FAQ, surfaced to Group Leader and Admin — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** New general FAQ for publishers (separate from the existing per-Status help), reused as-is in the Group Leader and Admin dashboards.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherFAQ.tsx` (new)
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx` — Home tab's pill toggle: "Help" renamed to "Status", new "FAQ" tab added after it
- `src/components/territory-management-system/GroupLeaderTabs.tsx` — new "FAQ" tab added to the Home/Dashboard/Visits/Partners bar (desktop nav + mobile bottom bar)
- `src/components/territory-management-system/dashboard/DashboardSidebar.tsx` — new "FAQ" nav entry
- `src/app/territory-management-system/dashboard/faq/page.tsx` (new) — admin-only page, `requireAdmin()` + `PageHeader` + `PublisherFAQ`

## Summary of Changes
Russell asked for a simple FAQ for TMS. Landed on the publisher workspace first (18 Q&As in plain English, covering claiming, offline sync, ending early, adding a household member, Moved records, knowing when you're done, releasing before starting, Search Area, read-only viewing, sync failures, Ministry Partner meaning, the no-screenshot privacy note, Do Not Call locking, merged household cards, why publishers can't undo a visit, adding an off-list address, and leaving a note for Admin). The publisher workspace's existing "Help" tab (per-Status explanations, in Tagalog) was renamed to "Status" to make room for the new "FAQ" tab alongside it.

Russell then asked for the same FAQ to be reachable from the Group Leader ("TGL") and Admin dashboards too — same content, no per-role variants. `PublisherFAQ` is a plain presentational component with no publisher-specific state, so it's reused directly in both: a new "FAQ" tab in `GroupLeaderTabs.tsx`, and a new `/territory-management-system/dashboard/faq` admin page + sidebar entry.

## Remaining Work
None requested. Content could later be split by role if Admin/Group Leader-specific questions come up, but that wasn't asked for.

## Known Issues
- The Admin `/dashboard/faq` page was code-reviewed against the identical `notes`/`settings` page pattern (`requireAdmin()` + `PageHeader`) but not click-tested live — this sandbox has no live Supabase credentials, a standing limitation noted throughout this product's checkpoint history. The Publisher workspace and Group Leader dashboard tabs were both screenshot-verified live via temporary scratch routes (removed before finishing).

## Next Recommended Task
Russell spot-checks live: the Admin sidebar's new "FAQ" page loads correctly and matches what's shown in the publisher/Group Leader FAQ tabs.
