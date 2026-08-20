# Portfolio OG Image — v1

**Date:** 2026-08-20
**Product:** Services (Portfolio)
**Feature:** Custom Open Graph / Twitter card image for `/portfolio`

## Files Modified
- `src/app/portfolio/page.tsx`
- `public/portfolio/og-image.png` (new)

## Summary of Changes
Russell supplied a branded graphic — black background, gold "RP" monogram watermark, "Russell A Parayno" name treatment, role/tagline lines, and a tech-stack row (Next.js, React, TypeScript, Supabase, Tailwind CSS) — to use as the social-share preview image for `www.cyberussell.com/portfolio`.

The `/portfolio` index page had no `openGraph`/`twitter` fields at all before this change (only `title`/`description`/`alternates.canonical`), so link previews had no explicit image to show. Saved the supplied image to `public/portfolio/og-image.png` and added `openGraph` (`title`, `description`, `url`, `siteName`, `images: [{ url, width, height, alt }]`, `type: "website"`) and `twitter` (`card: "summary_large_image"`, `title`, `description`, `images`) blocks to the page's existing `metadata` export, matching the shape already used in `src/app/layout.tsx` (root/default OG) and `src/app/portfolio/[slug]/page.tsx` (per-project OG).

The image is 1536×1024 as supplied (a 1.5:1 ratio) rather than the platform-standard 1200×630 (1.91:1) — this environment had no ImageMagick/`sharp` available to crop it, and `node_modules` had to be installed fresh (`npm install`) before any tooling could even run. Used the actual dimensions in the `width`/`height` OG tags rather than lying about them.

## Remaining Work
None for this task as scoped. Optional follow-up: crop/resize the image to a clean 1200×630 for stricter spec conformance across all platforms (some crawlers may letterbox or crop the current ratio unpredictably).

## Known Issues
None found. `npx tsc --noEmit` is clean project-wide (aside from pre-existing, unrelated test-file/`vitest` type errors that predate this change and are unrelated to `/portfolio`).

## Next Recommended Task
Russell spot-checks the real share preview on Facebook's Sharing Debugger, Twitter/X Card Validator, and/or a Slack unfurl (these cache aggressively and may need a manual re-scrape to pick up the new image), and decides whether the current 1536×1024 image is fine as-is or should be cropped to 1200×630.
