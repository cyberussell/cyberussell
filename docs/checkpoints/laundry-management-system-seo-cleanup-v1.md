# Laundry Management System — SEO Cleanup — v1

**Date:** 2026-07-11
**Product:** Laundry Management System (LMS)
**Feature:** On-page SEO fixes for the `/laundry-management-system` marketing landing page

## Files Modified
- `src/app/laundry-management-system/page.tsx`
- `src/components/laundry-management-system/Hero.tsx`
- `src/components/laundry-management-system/FinalCTA.tsx`

## Summary of Changes
- **Missing OG/Twitter image fixed**: same issue as the Appointment System page — verified via `curl` against the live production page that no `og:image`/`twitter:image` was rendered despite `twitter:card: summary_large_image`. Added `/og-image.jpg?v=2` to both `openGraph.images` and `twitter.images`.
- **Added JSON-LD structured data**: the page previously had zero structured data (the Appointment System's landing page already had `SoftwareApplication` + `FAQPage` schema; this one didn't). Added a matching `@graph` with `SoftwareApplication` (Essential ₱399/mo, Professional ₱699/mo offers) and `FAQPage` (mirroring the 5 FAQ entries already rendered by `FAQ.tsx`). Note: the FAQ array is duplicated as a page-level `const` in `page.tsx` rather than imported from `FAQ.tsx`, because `FAQ.tsx` is a client component (`"use client"`) — importing a named export from a client-component module into a server component turns it into an opaque client reference at runtime (confirmed live: `FAQS.map is not a function`, a real 500 error caught during verification), not the actual array. Keep both in sync if the FAQ content changes.
- **Fixed 2 broken CTA links**: both `Hero.tsx` and `FinalCTA.tsx` linked to `https://www.cyberussell.com/portfolio/laundryflow`, which 404s — a prior session renamed that portfolio entry's slug to `laundry-management-system` but never updated these two links back on the LMS landing page itself. Both of the page's primary CTAs were dead links. Updated both to `/portfolio/laundry-management-system`.

## Remaining Work
None for this pass.

## Known Issues
The FAQ content is now duplicated (once in `FAQ.tsx` for rendering, once in `page.tsx` for the JSON-LD) since it can't be safely imported across the client/server boundary. Low risk (5 short Q&A pairs, rarely edited) but flagged in case a future session wants a cleaner single-source solution (e.g. moving the FAQ data to a plain `.ts` data file imported by both).

## Next Recommended Task
Consider a custom OG image per landing page (currently reusing the generic site-wide `/og-image.jpg`) if Russell wants a more on-brand social preview later — not required, just an enhancement opportunity.
