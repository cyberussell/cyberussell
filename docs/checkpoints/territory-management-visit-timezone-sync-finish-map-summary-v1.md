# Visit Timezone Fix, Sync & Finish Hide, Map Button Swap, Publisher Summary Tab — v1

**Date:** 2026-07-20
**Product:** Territory Management System (TMS)
**Feature:** Fix visit-time timezone corruption, hide Sync & Finish once done, swap map buttons, add publisher results summary tab

## Files Modified
- `src/lib/territory-management-system/modules/assignment/date.ts`
- `src/lib/territory-management-system/modules/assignment/date.test.ts` (new)
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/app/territory-management-system/actions/records.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`

## Summary of Changes
Russell reported a real visit's saved date/time wasn't correct for a Philippines-based congregation, then asked for three more fixes in the same message.

1. **Timezone corruption in visit logging.** `logVisitAction` (admin) and `logPublisherVisitAction` (publisher) both parsed the `datetime-local` "Visited at" input with `new Date(str).toISOString()` — a timezone-less string parsed using the SERVER's own local time (UTC on Vercel), not the congregation's (UTC+8 for Manila). This silently shifted every logged visit 8 hours later, occasionally rolling it into the next calendar day. Fixed with a new `localDatetimeToUtcIso(dateTimeLocal, timezone)` in `assignment/date.ts` — reads the input's numeric components directly, guesses a UTC instant via `Date.UTC`, and corrects using the target zone's real offset from `Intl.DateTimeFormat(...).formatToParts()`. Deliberately avoids the common `new Date(someLocaleString)` offset trick, which depends on the runtime's own default timezone and was caught failing in this very sandbox during testing. Publisher path required exposing `congregation.timezone` on `PartnershipWorkspace` (via `getPartnershipByToken`), since it wasn't previously surfaced there.
2. **"Sync & Finish" button reappearing after already finishing.** The emerald "All assigned records are done!" box in `PublisherWorkspaceApp.tsx` showed a clickable "Sync & Finish" button unconditionally whenever `allDone` was true — including after the session had already ended (`sessionEnded`), so returning to the records list post-finish still showed a live button. Now gated on `!sessionEnded`.
3. **Map button order.** `PublisherRecordDetailView.tsx`'s two corner map buttons (territory map icon, Google Maps link) are reordered so Google Maps sits on the right of the pair.
4. **New "Summary" tab** in the publisher workspace's Home toggle, reusing `VisitResultBarChart` (the same component the Group Leader's Home tab uses) but scoped to only this partnership's own logged results (latest visit per assigned record, skipping unvisited records entirely rather than miscounting them).

## Remaining Work
None — all four items complete and deployed.

## Known Issues
- The map-button reorder is code-reviewed rather than screenshot-verified with two buttons actually visible side by side — no downloaded-map test data was available in this sandbox to get the territory-map icon rendering alongside the Google Maps link.
- The timezone fix is unit-tested (5 new tests covering the conversion math, including a negative-offset zone) rather than live-verified against a real Supabase database — no live credentials in this sandbox, a standing limitation for this product.

## Next Recommended Task
Russell spot-checks live: log a real visit and confirm the saved date/time matches Manila local time; return to the Assigned Records list after finishing and confirm no clickable "Sync & Finish" survives; check a record's map buttons show Google Maps on the right; open the new Summary tab mid-session and confirm it reflects only that partnership's own logged results.
