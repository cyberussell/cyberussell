# LaundryFlow Header Nav Breakpoint — v1

**Date:** 2026-08-20
**Product:** Services (Portfolio) — LaundryFlow demo, shared `Header.tsx` (all `/demo/laundryflow/*` pages)
**Feature:** Fix nav overlap on tablet/narrow-desktop widths

## Files Modified
- `src/components/demo/laundryflow/Header.tsx`

## Summary of Changes

User shared a screenshot showing the main nav row cramped: "Build Your Order" and "Track Order" wrapped onto two lines and the "Book Now" button was pushed off-screen/overlapping "Contact". Reproduced exactly at 768px viewport width — the desktop nav switched on at Tailwind's `md` breakpoint (768px), but the actual content (logo + 5 nav links, one of them "Build Your Order" — the longest — + a CTA button) needed more room than that to fit in one row without wrapping.

**First pass:** raised the nav's breakpoint from `md` (768px) to `lg` (1024px), pushing the whole nav behind the hamburger for the 768–1024px range.

**Revised per Russell's follow-up** ("decrease the font size to occupy one line" instead of hiding the nav): reverted to the original `md` (768px) breakpoint, but scaled down the nav link and Book Now font sizes/spacing at that width — `text-[11.5px]` and `gap-3` from `md`, stepping up to the original `text-[13.5px]`/`gap-8` at `lg` (1024px) and above. `whitespace-nowrap` kept on both as a defensive measure. The top utility bar (hours/location + social icons) was left untouched on `md:flex` since it has far less content and was never crowded.

## Remaining Work

None known.

## Known Issues

None found.

## Next Recommended Task

Russell reviews the diff and the live page at tablet width (768px–1024px), then decides on committing (likely bundled with the other pending, uncommitted LaundryFlow mobile-responsiveness fix from this same session — see `laundryflow-build-order-table-layout-v2.md`).
