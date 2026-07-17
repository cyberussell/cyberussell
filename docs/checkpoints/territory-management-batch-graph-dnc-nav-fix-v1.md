# Batch-Landing Nav Fix, Locked-DNC Completion, Bible Study Copy — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Same-day follow-up to [[territory-management-batch-graph-dnc-lock-v1]]. Russell reported that on the batch-landing "Select your Partner" page, once a partnership is claimed, tapping the "Assigned Records" (List) icon in the bottom nav landed on the workspace's Home tab instead of the List tab.

## Root cause
`BatchLandingBottomMenu.tsx` has no per-partnership view state of its own — every nav item besides "All Partners" (the current page) is a plain `<Link>` into the claimed partnership's workspace URL. All three (Home, Assigned Records, My Added Records) pointed at the exact same URL, so `PublisherWorkspaceApp` always mounted fresh on its default Home view regardless of which icon was tapped.

## Fix
- `BatchLandingBottomMenu.tsx`: "Assigned Records" and "My Added Records" now link to `{workspaceHref}?view=list` and `{workspaceHref}?view=addedRecords` respectively (Home stays plain, no param).
- `assignment/[batchToken]/[partnershipToken]/page.tsx`: reads the new `view` search param, validates it against `['home', 'list', 'addedRecords']`, and passes it as a new `initialView` prop to `PublisherWorkspaceApp` (defaults to `'home'` for anything missing/invalid).
- `PublisherWorkspaceApp.tsx`: new optional `initialView` prop seeds the `view` state on first mount only — every other navigation from there on is still the existing in-memory `setView` calls, untouched.

## Same-day follow-up: locked-DNC records blocked "Sync & Finish"
Russell live-tested the Do Not Call lock ([[territory-management-batch-graph-dnc-lock-v1]]) and hit a real consequence: with every other record done, "All assigned records are done! Sync & Finish" never appeared because a locked-DNC record can never get a `completed_at` — there's structurally no visit a publisher can log against it while it's locked. `PublisherWorkspaceApp.tsx`'s `allDone` check now also accepts a record as "done" if `isDoNotCallLocked(record.do_not_call, record.do_not_call_at)` is true, alongside the existing `completed_at` check — a locked record no longer blocks finishing, same as it never blocked completion before the lock existed.

## Same-day follow-up: two copy/option reversals
- `BIBLE_STUDY_FOLLOWUP_RESULTS` reverted back to `['progressing', 'discontinued', 'moved']` — Russell asked for `'not_home'` to be added earlier this same day, then asked for it removed after seeing it live. Back to the original three.
- `VISIT_RESULT_LABELS.progressing` renamed from "Progressing" to "Progressive BS" — this is the single shared label (dropdown option, visit history badges, stat cards, bar chart all read from the same constant), so the rename is global, not just the dropdown.

## Verification
`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. Live-verified via temporary scratch routes (`/dev-scratch-tms-navfix`, `/dev-scratch-tms-alldone`, both removed before finishing): confirmed `BatchLandingBottomMenu`'s `?view=` hrefs and each `initialView` landing on the right tab; confirmed a workspace with 2 completed + 1 locked-DNC record now shows "All assigned records are done! Sync & Finish"; confirmed the Bible Study follow-up dropdown no longer offers Not At Home and now reads "Progressive BS" instead of "Progressing".

## Remaining Work
None. No migration.

## Next Recommended Task
Committed, pushed, and deployed at Russell's request. Spot-check live: (1) from the "Select your Partner" page, after claiming a partnership, tap "Assigned Records" and confirm it opens directly on the List tab; (2) a real Do Not Call record that's still the only incomplete one in the list should now let Sync & Finish appear; (3) an ongoing Bible Study's dropdown reads "Progressive BS" / Discontinued / Moved, no Not At Home.
