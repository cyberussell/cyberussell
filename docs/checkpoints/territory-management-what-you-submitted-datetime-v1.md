# Publisher "What You Submitted" — Date/Time + Today-Only Visibility — v1

**Date:** 2026-07-21
**Product:** Territory Management System (TMS)
**Feature:** Publisher record detail view — "What you submitted" box

## Files Modified
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`

## Summary of Changes
Russell flagged two screenshots: on a normal record (Progressive Bible Study), the amber
"What you submitted" box showed the result and notes but no date/time, so a publisher couldn't
tell whether it was confirming today's visit or an old one. On a locked Do Not Call record
(locked until Jan 18, 2027), the box still showed "Visited Again" from 3 days earlier even
though nothing was submitted that day — misleading, since the record can't even be visited
while locked.

Root cause: the box rendered unconditionally from `assigned.visits[0]` (the most recent visit in
history), with no check for whether that visit happened today.

Fix:
- Added `isSameCalendarDay(a, b)` (device-local `toDateString()` comparison — consistent with how
  every other date in this component and `VisitHistoryList` is already formatted; no
  congregation-timezone value is plumbed through to the publisher workspace).
- The box now only renders when `assigned.visits[0].visited_at` is today (device-local date).
- When it renders, it now shows the visit's date/time (`toLocaleString` with `dateStyle: medium,
  timeStyle: short`) next to the "What you submitted" label.

Net effect: a record with today's visit shows the box with its timestamp; a locked/no-visit-today
record (like the DNC example) shows no box at all.

Verified: `npx tsc --noEmit` clean across the whole project after `npm install` (node_modules was
missing at session start). Not live-clicked in a browser this session — no live TMS credentials
available; change is small and isolated to a conditional render + one new date line, reviewed
against the two screenshots directly.

## Remaining Work
None identified — scoped fix, single file.

## Known Issues
- The "today" check uses the publisher's own device clock/timezone, not the congregation's
  configured timezone (`todayInTimezone()` exists in `assignment/date.ts` but isn't wired into
  the publisher workspace). Not expected to matter in practice (publisher's device is where the
  visit was logged from), but worth knowing if a future bug report mentions the box appearing/
  disappearing right at day boundary for a congregation whose timezone differs from the
  publisher's device.

## Next Recommended Task
Russell spot-checks live: open a record just visited today (box should show with today's
date/time) and a locked DNC record with an older visit (box should not show at all).
