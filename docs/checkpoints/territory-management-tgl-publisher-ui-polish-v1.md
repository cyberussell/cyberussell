# TGL Home Toggle, Territory Map Lightbox Fix, Header Logout, Publisher Workspace Regrouping — v1

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Five UI polish requests from Russell after using the live app: (1) a Generate/Regenerate toggle on the Group Leader Home tab instead of always stacking both forms, hidden by default even after a refresh; (2) the territory map lightbox was rendering the image at native size (scrollable, often bigger than the screen) with its close "X" invisible behind it; (3) the Group Leader's "Log out" button moved from the bottom of the dashboard layout to the top header, right side; (4) the Publisher workspace's "End My Ministry Early" button moved up to sit as its own separate group right after the map toggle, instead of at the very bottom of the card list; (5) the redundant "+ Add a New Contact Record" button removed from the main Assigned Contact Records list (the one inside "My Added Records," reachable via the bottom nav's icon, stays — that's the only add-a-record entry point now).

## Files Modified
- `src/components/territory-management-system/GroupLeaderTabs.tsx`
- `src/components/territory-management-system/TerritoryMapViewer.tsx`
- `src/app/territory-management-system/group-leader/dashboard/layout.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes

**1. Generate/Regenerate toggle:** `GroupLeaderTabs.tsx`'s Home tab previously always rendered "Generate Overflow Assignment" (when `todaysTerritories.length > 0`) stacked directly above "Regenerate Assignment." Replaced with a pill toggle (`assignmentAction: 'generate' | 'regenerate' | null`, new state) — deliberately defaults to `null` so neither form is expanded on load/refresh, unlike the existing map-view toggles elsewhere in this codebase which auto-select the first available tab. Clicking a pill toggles it open; clicking the active one again collapses it back to `null`.

**2. Territory map lightbox fix:** `TerritoryMapViewer.tsx`'s fullscreen lightbox rendered the map `<img>` at native resolution (`max-w-none`) inside an `overflow-auto` box — a large map image could render bigger than the viewport, and since the close button (`absolute`, no `z-index`) came *before* the image in DOM order, the image could paint over it when both occupied the same top-right area, making the "X" invisible/unclickable. Fixed: the image now uses `max-h-full max-w-full object-contain` inside a `h-full w-full` flex-centered wrapper (scales to fit the viewport, no scrolling needed for the common case), and the close button now renders *after* the image in the DOM with an explicit `z-10`, so it always paints on top regardless of image size.

**3. Header logout:** `group-leader/dashboard/layout.tsx` — the `signOut` form moved from a separate footer section below `<main>` into the existing `<header>`, right-aligned via `ml-auto`. Label text (`Log out`) hidden below `sm:` (icon-only on mobile), same responsive pattern already used elsewhere in this codebase.

**4. Publisher workspace — End Ministry Early regrouped:** Previously sat alone at the very bottom of the card-list section, past the records list and the (now-removed) Add Record button. Moved to its own group directly after the Territory Map / Assigned Records / Search Area toggle section, before the "All assigned records are done!" card and the records list itself — reachable without scrolling past everything else. Still red, still hidden when `readOnly`.

**5. Publisher workspace — redundant Add Record button removed:** The "+ Add a New Contact Record" button that sat at the bottom of the main "Assigned Contact Records" list (shown whenever `editable && territoryStructures.length > 0`) was removed outright. The identical button inside the "My Added Records" view (reachable via the bottom nav's `ClipboardPlus` icon) is untouched and is now the only way to reach the add-record form — confirmed this doesn't strand the feature, since that path was already fully functional on its own.

## Remaining Work
None — this is UI-only polish, no schema/migration involved, no dependency on migrations 022–025 (already applied).

## Known Issues
None identified — `npx tsc --noEmit`, `npx vitest run` (52/52), and `npx next build` all clean. Live-verified via a temporary scratch route (mock data, removed before finishing): the Generate/Regenerate toggle starts collapsed and expands/collapses correctly on click; the territory map lightbox (tested against a deliberately oversized 2000×3000 mock image) now scales to fit the viewport with the close button clearly visible and clickable on top; "End My Ministry Early" renders directly after the map toggle as its own red group; the Assigned Contact Records list has no trailing Add Record button while "My Added Records" still has its own. The header-logout relocation (item 3) is a simple, low-risk JSX move behind Group Leader auth this sandbox can't easily authenticate into — not independently live-verified, but confirmed by reading the final file and a clean `tsc`/build.

## Next Recommended Task
Russell: click through the real Group Leader dashboard to confirm Log out now sits top-right in the header, and spot-check the other four changes in real use (Home tab toggle, a real territory map's lightbox, End Ministry Early's new position, and that adding a new contact record still works via My Added Records). No migrations pending — safe to commit/deploy whenever ready.
