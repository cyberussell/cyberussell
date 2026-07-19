# iOS viewport fixes — min-h-screen mis-centering, persistent input-zoom — v1

**Date:** 2026-07-19
**Product:** Territory Management System (TMS)
**Feature:** 2 mobile-viewport bugs Russell hit live, on top of the earlier (deployed, confirmed-live) 16px `inputClass` fix that turned out not to be sufficient on its own.

## Files Modified
- `src/app/territory-management-system/layout.tsx` (new) — `maximumScale: 1` viewport, scoped to TMS only
- `src/components/territory-management-system/LoginForm.tsx` — `min-h-screen` → `min-h-dvh`, `text-base` on both inputs
- `src/components/territory-management-system/ChangePasswordForm.tsx` — same two fixes
- `src/components/territory-management-system/publisher/AssignmentEndedNotice.tsx` — `min-h-screen` → `min-h-dvh`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx` — `min-h-screen` → `min-h-dvh`
- `src/app/territory-management-system/assignment/[batchToken]/error.tsx` — `min-h-screen` → `min-h-dvh`
- `src/app/territory-management-system/assignment/[batchToken]/loading.tsx` — `min-h-screen` → `min-h-dvh`
- `src/app/territory-management-system/assignment/[batchToken]/page.tsx` — `min-h-screen` → `min-h-dvh`
- `src/app/territory-management-system/assignment/[batchToken]/progress/page.tsx` — `min-h-screen` → `min-h-dvh`
- `src/app/territory-management-system/dashboard/layout.tsx` — `min-h-screen` → `min-h-dvh`
- `src/app/territory-management-system/group-leader/dashboard/layout.tsx` — `min-h-screen` → `min-h-dvh`
- `src/app/territory-management-system/forgot-password/page.tsx` — `min-h-screen` → `min-h-dvh`, `text-base` on its input
- `src/app/territory-management-system/set-password/page.tsx` — `min-h-screen` → `min-h-dvh`, `text-base` on both inputs

## Summary of Changes

**Bug 1 — Login page (and every other full-height TMS screen) wasn't vertically centered on a real phone.** `LoginForm.tsx` already used `flex min-h-screen items-center justify-center` — correct in principle, but `min-h-screen` maps to `100vh`, and iOS Safari's `100vh` is computed against the viewport height *with the address bar collapsed*, which is taller than what's actually visible while the address bar is showing (the normal state, per Russell's screenshot). The centered content ends up positioned within that taller phantom box, reading as pushed down with a lopsided empty gap at the top instead of truly centered. Fixed by switching every TMS `min-h-screen` to `min-h-dvh` (dynamic viewport height — Tailwind's built-in utility for `100dvh`, which iOS Safari 15.4+ keeps in sync with the *actual* visible viewport as the address bar shows/hides). Applied across all 12 files in TMS using `min-h-screen`, not just the login screen Russell screenshotted — same bug, same fix, everywhere it appears.

**Bug 2 — iOS still auto-zoomed on input focus after the previous 16px `inputClass` fix.** That fix was real and necessary but not sufficient on its own — confirmed live (Russell's screenshot of the already-16px "Partner Name" field still zooming). Added the standard second half of this fix: a `viewport` export (`maximumScale: 1`) on a new `src/app/territory-management-system/layout.tsx`, scoped to TMS only (verified via the dev server that `/` keeps Next's plain default viewport while every TMS route gets `maximum-scale=1` added) — this is the well-established combined fix for iOS's focus-zoom quirk (16px+ font *and* a maximum-scale cap; font-size alone doesn't reliably cover every code path that can trigger it). Also caught and fixed 3 auth-flow screens (`LoginForm`, `ChangePasswordForm`, `forgot-password`, `set-password`) whose inputs never went through the shared `inputClass` at all (hand-rolled `className` strings predating that component) — added `text-base` directly to each as defense in depth alongside the viewport-level fix.

`npx tsc --noEmit` and `npx vitest run` (56/56) clean.

## Remaining Work
None requested beyond what's built.

## Known Issues
- **Live-verified only what's provable without a real iOS device**: confirmed via the dev server that the TMS-only viewport meta now renders `maximum-scale=1` (and that `/` is unaffected), and that the previously-unfixed auth inputs now compute to 16px. The `min-h-dvh` fix and the `maximum-scale=1` fix both address real, well-documented iOS Safari behaviors, but neither the mis-centering nor the zoom-on-focus quirk can be reproduced in this sandbox's browser tooling (no real dynamic toolbar, no real iOS zoom heuristic) — both need Russell's actual device to confirm fully resolved.
- `maximum-scale=1` also disables intentional pinch-zoom for low-vision users across all of TMS, traded off deliberately for an app-like tool with its own bottom tab bar and offline workspace, same reasoning already implicit in this product's existing design — flagging it explicitly in case that trade-off should be reconsidered later.
- 3 more files with un-migrated raw input styling were found but left alone as out of scope (`OverflowAssignmentForm.tsx`, `TerritoryMapUpload.tsx`, `SectionBlockTree.tsx` — Admin/Group Leader dashboard forms, not primarily phone-driven, and not what Russell's report was about).

## Next Recommended Task
Russell reviews the diff, deploys, then confirms on a real iPhone: the login page (and a couple of other full-height screens, e.g. the publisher workspace) sit properly centered with the address bar visible; tapping any text field no longer zooms the page at all.
