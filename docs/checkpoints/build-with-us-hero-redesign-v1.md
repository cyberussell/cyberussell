# Build With Us — Hero Redesign — v1

**Date:** 2026-08-22
**Product:** Services (Build With Us) — `/build-with-us`
**Feature:** Hero section redesign, removing the portrait picture

## Files Modified
- `src/components/marketing/Hero/index.tsx`
- `src/components/marketing/Hero/PortraitFrame.tsx` (deleted)
- `src/components/marketing/FloatingServiceCards/index.tsx`
- `src/components/marketing/FloatingServiceCard/index.tsx`
- `public/hero-portrait.png` (deleted)

## Summary of Changes
Russell asked to remodel the `/build-with-us` hero and remove the picture (the portrait photo). Confirmed scope via AskUserQuestion: Hero section only, direct code iteration (no Claude Design canvas mockup step).

Removed the portrait entirely (`PortraitFrame.tsx` + `public/hero-portrait.png`, both unused elsewhere — deleted rather than left dead). The 6 service cards previously flanked the portrait in two columns (3 left / 3 right) with a 3D tilt (`rotateY`/`rotateZ`) angled toward it. With the portrait gone, redesigned `FloatingServiceCards` into a single unified, centered grid (1 col mobile → 2 col tablet → 3 col desktop) and simplified `FloatingServiceCard` to drop the now-meaningless tilt/outer-edge-glow logic (`rotateY`, `rotateZ`, `floatXDrift` props and the tilt-dependent shadow/glow removed) — cards now sit flat with just a gentle vertical float. `Hero/index.tsx`'s card container simplified from a 3-track `perspective`-based grid built around the portrait to a plain centered max-width block.

Left `GlowBackground` untouched (still reads fine as ambient background without the portrait) and `ParallaxProvider` untouched (still used by `GlowBackground` and `FloatingServiceCard`).

## Remaining Work
None for the Hero section itself. Russell scoped this session to Hero only — `FeaturedProjects` (project logo images), `OurProcess`, `Pricing`, `PricingPromoBanner`, `FAQ`, `FinalCTA` were explicitly out of scope and not touched.

## Known Issues
None found. `npx tsc --noEmit` clean; live-verified in browser preview at mobile (690px, 1-col), tablet (~690-1024px, 2-col), and desktop (1440px, 3-col) — no console errors, no broken images.

## Next Recommended Task
Russell reviews the live page and decides on committing. If he later wants the rest of the page (Featured Projects images, etc.) redesigned too, scope that as a separate task.
