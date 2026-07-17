# Publisher Workspace Home/List Nav Split — v2 (live-test fixes)

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Follow-up fixes after Russell live-tested [[territory-management-publisher-home-list-nav-v1]] on his phone and sent 2 screenshots: (1) fold "Share with Partner" into the Home tab's map toggle as a fourth pill instead of a separate card below, and center that toggle; put "Release This Partnership"/"End My Ministry Early" on one line instead of stacked, renamed to "Release Assignment"/"Early Out"; (2) the batch-landing "Select your Partner" page (reached straight from the QR scan, both normal and overflow) had its own placeholder bottom nav bar that should not be there at all; (3) the Download/Sync top bar (added in v1) should only appear on the Home tab, not on every tab.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`:
  - Top Download/Sync bar's condition narrowed from `showSessionChrome` to `showSessionChrome && view.name === 'home'`.
  - `mapView` state widened to include `'share'`; the Home tab's map-toggle `tabs` array gained `{ key: 'share', label: 'Share', available: !readOnly }`; a new `activeView === 'share'` branch renders `<SharePartnershipCard />` in place of a map. The old standalone `{!readOnly && <SharePartnershipCard .../>}` block after the Release/End buttons was removed.
  - Toggle pill row wrapped in an extra `flex justify-center` div (was `inline-flex`, which sat flush left).
  - Release/End buttons container changed from `space-y-3` (stacked, `w-full`) to `flex gap-3` (side-by-side, `flex-1`); labels changed to "Release Assignment" and "Early Out" (confirm-dialog copy left as-is — only the two button labels were called out).
- `src/app/territory-management-system/assignment/[batchToken]/page.tsx` — removed the `<BatchLandingBottomMenu>` import/usage; `pb-24` (space reserved for a fixed bottom nav) reduced to `pb-8` since there's no longer one to clear.
- `src/components/territory-management-system/publisher/BatchLandingBottomMenu.tsx` — deleted (confirmed via grep it was only ever referenced from the one page above; it was a placeholder nav with mostly-inert icons — only "All Partners" was ever genuinely active on that page since nothing is claimed yet).

## Why "Area To Search"/"Assigned Contact Records" stacking wasn't touched
Not part of this round's asks — v1's List-tab behavior (showing both sections if a search-scope partner also picked up a passed record) is unchanged.

## Verification
`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean (the build would have failed outright on the now-missing `BatchLandingBottomMenu` import if the page hadn't been updated in the same change). Live-verified via a temporary scratch route (`/dev-scratch-tms-nav2`, mock claimed workspace, removed before finishing):
- Home tab: toggle now reads "Assigned Records | Share" (or "Territory Map | Assigned Records | Share" etc. depending on availability), centered under the Partner Name card; tapping "Share" swaps the map area for the QR/Copy Link card in place; Release Assignment/Early Out render side-by-side.
- List tab: confirmed the Download/Sync bar is completely absent (it only showed on Home).
- Batch-landing page: confirmed via `grep` that no file references `BatchLandingBottomMenu` anymore and the build (which resolves every import) is clean — couldn't drive this specific page in the browser without a real DB-backed batch token, but a broken import would have failed the build, which it didn't.

## Remaining Work
None — scoped to the 2 screenshots' asks. No migrations.

## Next Recommended Task
Not committed. Russell live-verifies on a real batch: confirms the Home tab's Share pill, the centered toggle, the one-line Release/Early Out buttons, and — importantly, since it couldn't be driven in this session's browser check — that the batch-landing "Select your Partner" page (both a normal and an overflow batch's QR) now shows no bottom nav bar at all. Then commit + deploy at Russell's request.
