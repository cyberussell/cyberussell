# Mobile record-detail action row — grouped 4-button panel — v1

**Date:** 2026-07-19
**Product:** Territory Management System (TMS)
**Feature:** Russell asked for "Add Another Person Here" to move into the mobile Pass/Unlocated/Correction row as a 4th "Add Person" button, all grouped into one visual panel instead of a separate floating button above three separate ones.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`

## Summary of Changes
Mobile-only (`sm:hidden`) collapsed action row went from a bare `grid grid-cols-3 gap-3` of 3 individually-bordered white/amber buttons — with "Add Another Person Here" as a separate full-width bordered button sitting above it — to one `Card` containing a `grid grid-cols-4 divide-x` of 4 plain (no individual border, just a hover background) icon-on-top/label-below buttons: Pass, Unlocated, Correction, and the relocated "Add Person" (shortened from "Add Another Person Here" to fit 4-up). Add Person keeps calling `onAddSibling` directly, same as before — it jumps straight to the add-record view rather than toggling `mobileAction` like the other three, which expand an inline form in place.

The desktop/tablet (`sm:block`) layout is unaffected: "Add Another Person Here" (full label, its own bordered button) still renders above the three always-expanded forms — there's no button-row to fold it into there, since nothing is collapsed behind buttons at that breakpoint. Made that existing button `hidden sm:flex` (previously visible at all sizes) so it doesn't double up with the new mobile panel.

`npx tsc --noEmit` and `npx vitest run` (56/56) clean.

## Remaining Work
None requested beyond what's built.

## Known Issues
- Live-verified via a temporary scratch route (removed before finishing): the 4-button panel renders correctly at a 375px mobile width (matches Russell's own screenshot width), and clicking "Pass" still correctly opens the inline Move form with last session's red-X close button intact — confirmed this restructuring didn't regress that. "Add Person"'s label sits close to its cell edge at this width; legible and not clipped, but the narrowest real devices (e.g. iPhone SE) weren't tested.

## Next Recommended Task
Russell spot-checks live on his phone: the 4-button panel look matches what he asked for, and tapping "Add Person" still opens the add-record form correctly.
