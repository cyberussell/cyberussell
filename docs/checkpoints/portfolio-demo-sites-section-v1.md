# Portfolio — Sample & Demo Websites Section — v1

**Date:** 2026-08-20
**Product:** Services (Portfolio)
**Feature:** Added a new "Sample & Demo Websites" section to `/portfolio`, below the existing case-study grid, linking directly to the three fictional demo sites already built in the repo — previously these were only reachable indirectly (buried as a `liveUrl` link inside another project's case-study page).

## Files Modified

- `src/app/portfolio/page.tsx` — added a `DEMO_SITES` array and a new section rendering it as a card grid (thumbnail, title, tagline, "View demo →" link opening in a new tab)

## Summary of Changes

Russell asked for a demo-sites section including Ganda Beauty Salon. Confirmed scope first (just Ganda Beauty Salon vs. all three existing demos) — he chose all three, since Luma Dental and LaundryFlow were sitting in the codebase but not surfaced anywhere on `/portfolio` directly. New section reuses the existing card visual language (dark card, gold hover accent) but is intentionally simpler than the full case-study cards — no tech-stack chips, no category badge, just image/title/tagline/link — since these are quick concept demos, not full case studies with problem/solution/results write-ups.

Demo entries added, each linking straight to its live demo route (no new `/portfolio/[slug]` detail page — these link out directly, same pattern as the `liveUrl` field on existing case studies):
- **Ganda Beauty Salon** (`/demo/ganda-beauty-salon`) — thumbnail: `/demo/ganda-beauty-salon/photos/hero.png`
- **Bright Smiles Dental Studio** (`/demo/luma-dental`) — thumbnail: `/portfolio/luma-dental/hero-clinic.jpg`
- **Aling Maria Laundry Shop** (`/demo/laundryflow`) — thumbnail: `/demo/laundryflow/photos/hero-pile.png`

No changes to `Navbar.tsx`, `Footer.tsx`, `src/lib/portfolio/data.ts`, or any portfolio JSON files — the existing case-study grid and `/portfolio/[slug]` pages are untouched.

## Remaining Work

None — the ask is complete as scoped.

## Known Issues

- None in the new code. `npx tsc --noEmit` clean.
- Pre-existing, unrelated: on first paint the top case-study grid's icon images (Appointment System, HireWorkers, Cyberussell) sometimes render as empty rounded squares in the dev preview before the icon loads in — not touched by this change, not reproduced as a persistent bug.

## Next Recommended Task

Russell to review the new section live, then decide on committing.
