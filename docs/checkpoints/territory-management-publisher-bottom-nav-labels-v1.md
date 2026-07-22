# Publisher Bottom Nav — Bigger Icons + Text Labels — v1

**Date:** 2026-07-22
**Product:** Territory Management System (TMS)
**Feature:** Publisher workspace bottom navigation (`PublisherBottomMenu`)

## Files Modified
- `src/components/territory-management-system/publisher/PublisherBottomMenu.tsx`

## Summary of Changes
Russell shared a screenshot of the publisher workspace's fixed bottom nav bar (Home / Partners /
Assigned Records / My Added Records, icon-only) and asked for bigger icons with the label text
below each one, scoped to the publisher workspace only.

- Icon size increased: `h-5 w-5` (inactive) / `h-6 w-6` (active) → `h-7 w-7` / `h-8 w-8`.
- Each nav button switched from a horizontal icon-only layout to a vertical `flex-col` stack with
  an 11px label under the icon.
- Renamed the visible labels to Russell's exact wording: "Home" (unchanged), "Partners" (was "All
  Partners"), "List" (was "Assigned Records"), "Record" (was "My Added Records") — these now
  double as the `aria-label`/`title` too.
- `PublisherBottomMenu` is only ever rendered from `PublisherWorkspaceApp.tsx` (the claimed
  publisher workspace) — no other nav bar in the product (e.g. `BatchLandingBottomMenu` on the
  pre-claim batch-landing page) needed touching, since the request was workspace-only.

## Verification
- `npx tsc --noEmit` — clean.
- `npx vitest run` — 79/79 passing (1 unrelated pre-existing failure in
  `src/lib/appointment-system/slots.test.ts`, missing Appointment System env vars).
- Live-verified via a temporary scratch route (`src/app/territory-management-system/dev-scratch-bottom-nav`,
  mock props) screenshotted at a 390px mobile viewport with a locally-installed `playwright-core`
  (`npm install --no-save playwright-core`, so `package.json`/lockfile stayed untouched) against
  the pre-installed Chromium binary. Confirmed both the default (Home active) and an active-tab
  (List active) state render cleanly — icons visibly larger, all four labels fit on one line with
  no wrapping/overlap, active-state highlight (blue pill + bolder label) still reads clearly.
  Scratch route removed before finishing.

## Remaining Work
None identified — scoped, single-file CSS/markup change.

## Known Issues
None identified.

## Next Recommended Task
Russell reviews the diff and, if satisfied, pushes — no migration or live TMS credentials needed,
this is a pure UI change.
