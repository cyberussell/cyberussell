# Territory Management System — Status Help Copy Revision + Home Tab Toggle Rename — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Two small, independent content/copy changes to the publisher workspace.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherStatusHelp.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes
1. **Status help copy revision.** Replaced all 10 `STATUS_HELP` entries in `PublisherStatusHelp.tsx` with Russell's exact revised Tagalog copy (wording, tone, and a few substantive changes — e.g. Do Not Call's explanation now mentions a new person can still be added at the same address if someone there is interested; Progressive BS now explicitly warns not to swap in your own name as conductor unless formally handed the study). The old system-only footnote (explaining `Initial Visit`/`Undone`) was replaced outright with Russell's new closing note, directing publishers with questions to an elder/Group Leader and asking them not to screenshot or share the page on social media.
2. **Home tab toggle rename.** The publisher workspace Home tab's pill toggle — `Territory Map` / `Live Map` / `Share To` / `Help` — renamed to `Map` / `Pins` / `Share` / `Help`. Also renamed the matching single-map fallback `<h2>` headers (shown instead of the toggle when only one map is available) from "Territory Map(s)"/"Live Map" to "Map(s)"/"Pins", so the naming stays consistent whether or not the toggle itself is visible. The `Search Area` tab (a third, conditionally-shown map view not mentioned in Russell's rename list) was left untouched. Confirmed this toggle exists only in `PublisherWorkspaceApp.tsx`, not duplicated in `GroupLeaderTabs.tsx`.

## Remaining Work
None requested.

## Known Issues
None found. `npx tsc --noEmit` and `npx vitest run` (excluding the pre-existing, unrelated, live-Supabase-network-dependent `appointment-system/slots.test.ts`) clean. Live-verified via temporary scratch routes (removed before finishing): the status-help page text matches Russell's copy exactly (checked via full page-text extraction), and the renamed pill toggle renders correctly at the expected widths.

## Next Recommended Task
Deployed at Russell's request. Russell spot-checks live: the Home tab toggle reads Map/Pins/Share/Help, and the Help tab shows the revised Tagalog copy correctly.
