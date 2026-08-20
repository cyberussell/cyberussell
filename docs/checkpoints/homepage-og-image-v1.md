# Homepage OG Image — v1

**Date:** 2026-08-20
**Product:** Site-wide (root layout, `www.cyberussell.com` homepage)
**Feature:** Custom Open Graph / Twitter card image for the homepage

## Files Modified
- `src/app/layout.tsx`
- `public/home-og-image.png` (new)

## Summary of Changes
Russell supplied a third branded graphic ("Building Scalable Web Solutions," black/gold, with a `</> ` code-bracket motif and `www.cyberussell.com` as the URL line) to replace the homepage's Open Graph/Twitter card image.

The homepage (`src/app/page.tsx`) doesn't define its own metadata, so it inherits the root layout's — which previously pointed `openGraph.images`/`twitter.images` at the dynamically-rendered `/api/og` route (a `next/og` `ImageResponse` with different homepage copy: "You have a skill. Find out how to earn from it online."). Cropped the supplied 1536×1024 image to 1200×630 with `sharp` (same center-crop approach as the portfolio/resume OG images) and saved it to `public/home-og-image.png`, then repointed both `openGraph.images` and `twitter.images` in `src/app/layout.tsx` at the static file instead.

**Scope note:** `/api/og` itself was left in place — it's also referenced by 3 `ai-tools/*` pages (`ai-confidence-analyzer`, `computer-skills-analyzer`, `digital-literacy-checker`) as their own OG fallback, which is out of scope for "replace the OG for www.cyberussell.com" (the homepage specifically). Also left `public/og-image.jpg` untouched — that's a separate, much more widely-used static fallback referenced by ~137 other page files across the site (blog, learn tracks, about, etc.), a different and much larger-blast-radius asset than what was asked for here.

## Remaining Work
None for this task as scoped.

## Known Issues
None found. `npx tsc --noEmit` clean.

## Next Recommended Task
Russell reviews/merges the PR, then spot-checks the live share preview. If he later wants the same treatment applied to the `og-image.jpg` site-wide fallback or the 3 `ai-tools` pages, that would be a separate, explicitly-scoped follow-up given how many pages depend on it.
