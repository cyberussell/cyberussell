# Ganda Beauty Salon Demo — v1

**Date:** 2026-08-19
**Product:** Appointment System (SaaS) — demo/showcase page
**Feature:** New vertical-specific marketing demo at `/demo/ganda-beauty-salon`, built from a design handoff package (`Marikit Salon Website.dc.html` + README), following the existing `/demo/luma-dental` pattern.

## Files Modified

New files only, nothing existing touched:

- `src/app/demo/ganda-beauty-salon/page.tsx`
- `src/app/demo/ganda-beauty-salon/layout.tsx`
- `src/components/demo/ganda-beauty-salon/Header.tsx`
- `src/components/demo/ganda-beauty-salon/Hero.tsx`
- `src/components/demo/ganda-beauty-salon/About.tsx`
- `src/components/demo/ganda-beauty-salon/Services.tsx`
- `src/components/demo/ganda-beauty-salon/Stylists.tsx`
- `src/components/demo/ganda-beauty-salon/Booking.tsx`
- `src/components/demo/ganda-beauty-salon/Gallery.tsx`
- `src/components/demo/ganda-beauty-salon/Testimonials.tsx`
- `src/components/demo/ganda-beauty-salon/Contact.tsx`
- `src/components/demo/ganda-beauty-salon/Footer.tsx`
- `src/components/demo/ganda-beauty-salon/data.ts`
- `src/components/demo/ganda-beauty-salon/motion.ts`
- `public/demo/ganda-beauty-salon/photos/*` — 12 images (see below)

## Summary of Changes

Reconstructed the design-handoff HTML prototype as real React/Tailwind components matching this repo's conventions (not a copy of the raw `.dc.html`/`image-slot.js` reference files, per the handoff README's own instruction). Decisions made with Russell before building:

- Brand name reconciled to **"Ganda Beauty Salon"** everywhere (source design's nav said "Ganda Beauty Salon", footer said "Marikit" — footer updated to match).
- Route: `/demo/ganda-beauty-salon`.
- Booking section is a **static mock** (service/stylist/date "filled" display, time-slot pills, QR placeholder) — same precedent as `/demo/luma-dental`'s `Booking.tsx`. No live Appointment System wiring; that's explicitly deferred to a later session per Russell.
- Fonts (Cormorant Garamond, Playfair Display, Jost) loaded via `next/font/google` in a route-scoped `layout.tsx` so they don't leak into the rest of the site (which uses Syne/Inter).
- Booking widget/QR panel visibility kept as a simple `BOOKING_DISPLAY` toggle constant in `Booking.tsx` (not deleted, not wired to real config) — mirrors the source design's `bookingDisplay` prop intent for a future real per-tenant flag.
- No `/portfolio` card added (matching `/demo/luma-dental`, which also has none).

**Images (12 total, `public/demo/ganda-beauty-salon/photos/`):**
- `about.jpg`, `gallery-2.jpg` — downloaded from the exact Unsplash URLs the handoff README specified (both genuinely show salon interiors, used as-is).
- `hero.png` — the README's specified Unsplash URL for the hero turned out to be a plain studio beauty headshot (no salon interior at all, contradicting its own "salon interior, warm ambient light" description) — flagged to Russell in-session, then **replaced with an AI-generated (Higgsfield/GPT Image 2) salon-interior image** instead of forcing a mismatched crop.
- `stylist-1.png`..`stylist-4.png`, `gallery-1.png`, `gallery-3.png`..`gallery-6.png` — AI-generated (Higgsfield/GPT Image 2) to fill the design's intentionally-unfilled placeholder slots (4 fictional stylist portraits + 5 gallery tiles), matching the placeholder hints in the source design file.

Contact section's "map" is a stylized dark panel with a pin icon rather than a real Google Maps embed (no API dependency needed for a portfolio demo).

## Remaining Work

- Live wiring of the booking widget to the real Appointment System (separate standalone repo/Supabase project) — explicitly deferred, not started.
- No `/portfolio` entry (consistent with luma-dental, but worth asking Russell if he wants one for either/both).

## Known Issues

- None in the code. `npx tsc --noEmit` clean, no console errors, all 12 images confirmed loading (200/304, no 404s) via network inspection.
- **Verification caveat:** the Browser preview pane in this session has a scroll-screenshot rendering bug — any screenshot taken after the page is scrolled past ~1 viewport renders solid black, even though the DOM/CSS is provably correct underneath (confirmed via `getBoundingClientRect`, `getComputedStyle`, and full-page text extraction) and all images load successfully. This same bug reproduces identically on the pre-existing, already-shipped `/demo/luma-dental` page, so it's a tool/environment limitation, not a defect introduced here. Hero and the top of About were visually confirmed correct via direct screenshot; the remaining sections (Services, Stylists, Booking, Gallery, Testimonials, Contact, Footer) were verified via DOM/network inspection rather than a visual screenshot, and are worth a quick human eyeball pass in a real browser before calling this fully done.

## Next Recommended Task

Have Russell open `/demo/ganda-beauty-salon` in an actual browser to eyeball the sections below the fold (Services pricing grid, Stylists, Booking mock, Gallery, Testimonials, Contact) since this session's own screenshot tool couldn't confirm them visually. If it looks good, decide whether to (a) add a `/portfolio` card for it, and (b) plan the real Appointment System wiring for the booking section.
