# Group Leader Dashboard StatCard Redesign + Delta Badges — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Russell gave 3 asks from screenshots of the Group Leader dashboard's "Visits" tab and a publisher record-detail screen: (1) each result StatCard should show a pinned baseline count plus a colored up/down delta badge for what's changed since the page was opened; (2) `StatCard` should drop its colored icon background, wrap its label text, and shrink the font to avoid overflow on any screen size, with the icon color itself contrasting the (now plain) card background; (3) the publisher's record-detail bottom nav had a redundant "Record a Visit" icon — the form it jumps to is already directly on the page.

## StatCard redesign
`dashboard/StatCard.tsx` — rewritten to one unified layout at every screen size (previously had divergent mobile/desktop variants, which was part of what let long labels like "Started Bible Study" overflow a narrow 2-column mobile card). Icon no longer sits in a gradient chip — it's now a plain `text-[#2563EB]` icon directly beside the label, contrasting the white `Card` background. Label is `text-xs` and wraps (`break-words`, `min-w-0 flex-1`) instead of the old `text-xl`. New optional `delta?: number` prop renders a small green up-arrow (`+N`) or red down-arrow (`N`) badge beside the value; omitted or `0` renders nothing. `StatCard` is shared by `GroupLeaderTabs.tsx`, `ReportsView.tsx`, and the Admin's own `dashboard/page.tsx` — all three get the visual redesign, only `GroupLeaderTabs.tsx`'s "Visits" tab uses the new `delta` prop.

## Delta tracking
`GroupLeaderTabs.tsx` — new `resultBaseline` state, a snapshot of `stats.resultCounts` captured once per selected batch (reset only when `batchId` changes, never on the existing 30-second `router.refresh()` poll or a tab visibility refresh). The "Visits" tab's `value` now reads from this pinned baseline instead of the live `stats.resultCounts`, with `delta={stats.resultCounts[key] - resultBaseline[key]}` passed alongside — so a Group Leader watching the tab sees the number they opened with stay put, plus a live badge for what's changed since. A result's count can legitimately go negative here: only the most recent visit per record counts (`getBatchVisitResultCounts`'s de-dup), so a revisit that changes a record's result moves it out of its old bucket into a new one.

## Redundant nav icon removed
`PublisherBottomMenu.tsx` — the `view === 'detail'` branch that added a "Record a Visit" (`ClipboardCheck`) item calling `scrollToVisitForm` is gone entirely, along with the now-unused `onGoToVisitForm` prop and `PublisherWorkspaceApp.tsx`'s `scrollToVisitForm` function. To avoid leaving nothing highlighted while viewing a record's detail, `'detail'` now maps to `'list'` in the `view` prop passed down (same pattern already used for `'searchScopeDetail'`) — "Assigned Records" stays the active icon on that screen, same as before.

## Verification
`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. Live-verified via a temporary scratch route (`/dev-scratch-tms-statcard`, removed before finishing) at a 375px mobile width: confirmed a long label ("Total Contact Records Longer Label Test") wraps cleanly with no overflow, icons have no background chip and read clearly against the white card, delta badges render correctly in both directions (green ↑3, red ↓2), and the bottom nav on a `'detail'`-mapped view shows exactly 4 icons (Home/Partners/Records/Added Records) with Assigned Records active and no fifth "Record a Visit" icon.

## Remaining Work
None. No migration.

## Next Recommended Task
Not committed yet — Russell to confirm and request commit/deploy. Once live, spot-check: open the Group Leader "Visits" tab, have a publisher log a few visits, and confirm the baseline number stays put while a green delta badge appears next to it (and that switching batches resets the baseline for the newly selected one).
