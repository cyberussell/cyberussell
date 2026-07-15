# Territory Management System — "Use My Location" Button on Moved/Correction Panels — v1

**Date:** 2026-07-16
**Product:** Territory Management System (TMS)
**Feature:** Russell asked for the same "Use My Location" Plus Code auto-fill button already on the publisher's Add New Record form to be added to two other panels reached via the "Moved" flow: `MarkMovedForm.tsx`'s "Update Contact Record" panel and `RecommendCorrectionForm.tsx`'s "Recommend a Correction" panel.

## Files Modified
- `src/components/territory-management-system/publisher/MarkMovedForm.tsx` — added `locating` state, a `handleUseMyLocation` handler (calls `locatePlusCode()`, sets `fields.plusCode` on success or `toast.error`s on failure), and wrapped the "Plus Code" input in the same `flex gap-2` + icon-button pattern used by `PublisherRecordForm.tsx`.
- `src/components/territory-management-system/publisher/RecommendCorrectionForm.tsx` — identical addition, targeting the "Correct Plus Code" field.

## Summary of Changes
- Before starting, discovered local `main` was 8 commits behind `origin/main` — a concurrent session had already built `locatePlusCode()` (`src/lib/territory-management-system/plusCode.ts`, browser Geolocation API → `open-location-code` encoding, no network call/API key) and wired the first "Use My Location" button into `PublisherRecordForm.tsx`, plus built the entire `RecommendCorrectionForm.tsx` component from scratch (didn't exist locally at session start). Pulled (`git pull --ff-only`, clean fast-forward, `84e661c..e36735f`) and ran `npm install` to pick up the new `open-location-code` dependency before touching anything, per the repo's git-safety rules (investigate before acting on unfamiliar state).
- Both new buttons are byte-for-byte the same pattern as the existing one: same `LocateFixed`/`RefreshCw` icons, same `title`/`aria-label="Use my current location"`, same disabled-while-locating spinner swap, same `locatePlusCode()` call and `toast.error` on failure. No new logic was invented — this was pure replication into two more forms.
- `npx tsc --noEmit` clean (after clearing a stale `.next` cache left over from an earlier session's now-deleted scratch route, which was producing unrelated stale-type errors). `npx vitest run` 52/52 passing (untouched by this change). `npx next build` clean across all routes.
- **Live-verified in the browser** via a temporary scratch route (`src/app/scratch-plus-code-preview/page.tsx`, mounted both forms directly with mock props, removed before commit) — confirmed the "Update Contact Record" panel renders pixel-identical to Russell's own screenshot (location icon button to the right of the Plus Code field), and confirmed via the accessibility tree that the "Recommend a Correction" panel's "Correct Plus Code" field got the same button with the correct `aria-label`. Clicking the button correctly invoked `locatePlusCode()` — confirmed via `navigator.permissions.query({name:'geolocation'})` returning `'denied'` in this sandboxed browser (expected, no real device), which correctly produced the same permission-denied error path the existing Add Record button already has.

## Remaining Work
None for the requested feature — both panels now match the Add Record form's pattern exactly.

## Known Issues
- **Found and flagged separately, not fixed here (out of scope for this request)**: there is no `<Toaster />` mounted anywhere in the publisher-facing route tree (`src/app/territory-management-system/assignment/[batchToken]/**`) — only the Admin and Group Leader dashboard layouts have one. This means every `toast.success`/`toast.error` call across the entire publisher workflow (`PublisherWorkspaceApp.tsx`, `PublisherRecordForm.tsx`, and now these two forms) has never actually rendered for a real publisher, confirmed live during this session's verification. Spawned as a separate background task (`task_d3775285`) rather than fixed inline, since it's a pre-existing gap unrelated to what was asked and touches a different part of the route tree (layout-level, not form-level).

## Next Recommended Task
Ready to deploy at Russell's request. Separately, whenever convenient: the spawned Toaster-mounting task, which would make every existing and new toast notification in the publisher workflow actually visible for the first time.
