# Laundry Management System Landing Page — v1

**Date:** 2026-07-11
**Product:** Cross-cutting marketing page (not one of the 7 core products, same category as Get Started)
**Feature:** Standalone SaaS landing page for the Cyberussell Laundry Management System product

## Files Modified

New:
- `src/app/laundry-management-system/page.tsx`
- `src/components/laundry-management-system/Hero.tsx`
- `src/components/laundry-management-system/Features.tsx`
- `src/components/laundry-management-system/HowItWorks.tsx`
- `src/components/laundry-management-system/Pricing.tsx`
- `src/components/laundry-management-system/ChangeRequests.tsx`
- `src/components/laundry-management-system/FAQ.tsx`
- `src/components/laundry-management-system/FinalCTA.tsx`

Renamed (portfolio slug, small scoped change approved by Russell):
- `src/data/portfolio/laundryflow.json` → `src/data/portfolio/laundry-management-system.json` (`slug`, `coverImage`, `icon` fields updated)
- `public/portfolio/laundryflow/` → `public/portfolio/laundry-management-system/`
- `src/lib/portfolio/data.ts` — updated import

Untouched, deliberately out of scope: `src/app/demo/laundryflow/**`, `src/components/demo/laundryflow/**` (the separate portfolio demo showcase, `liveUrl` still points there).

## Summary of Changes

Built a new top-level marketing page at `/laundry-management-system` per Russell's brief: hero with pricing badge and portfolio CTA, 12-feature icon grid, 4-step "how it works" timeline, two pricing cards (Essential ₱399/mo, Professional ₱699/mo with "Most Popular" badge), change-request scope checklist (included/not-included two-column + note), FAQ accordion (5 Q&As), and a final CTA. Matches the existing design system (`#0A0A14` bg, `#FFD23F` accent, Syne/Inter fonts, `framer-motion` fadeUp/fadeIn viewport animations) read from `src/app/services/page.tsx`. Reuses standard `Navbar`/`Footer` (not modified) and the existing `/services/inquire?service=...` + `/api/contact` infra for all "Request a Quote" CTAs — no new backend built, same pattern as the earlier Get Started page.

Also renamed the LaundryFlow portfolio entry's slug from `laundryflow` to `laundry-management-system` (Russell's explicit choice, confirmed via AskUserQuestion) so the brief's `/portfolio/laundry-management-system` CTA target resolves correctly instead of 404ing.

## Remaining Work

None — all sections from the brief are built and match the spec.

## Known Issues

None found. One testing-only note: Framer Motion's `whileInView` sections don't animate under this session's browser-automation tool when scrolled programmatically (`scrollIntoView`/`window.scrollTo` via JS) — confirmed this is a pre-existing behavior already present on the already-shipped `/services` page under the same test method, not something introduced by this page. Real user scroll is unaffected; not a code bug.

## Next Recommended Task

Russell to review the page live and confirm the pricing/plan-name convention used in the "Request a Quote" link query strings (`Laundry Management System - Essential` / `- Professional` on the pricing cards vs. plain `Laundry Management System` on the final CTA) reads correctly in the inquiry form. Optionally: add an OG/social preview image at `/laundry-management-system` (currently relies on generic site metadata, no dedicated image asset created).
