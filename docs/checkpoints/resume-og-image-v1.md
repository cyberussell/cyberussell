# Resume OG Image — v1

**Date:** 2026-08-20
**Product:** Services (Resume page, `/resume`)
**Feature:** Custom Open Graph / Twitter card image for `/resume`

## Files Modified
- `src/app/resume/page.tsx`
- `public/resume/og-image.png` (new)

## Summary of Changes
Russell supplied a second branded graphic (same black/gold "RP" monogram treatment as the `/portfolio` OG image, but with `www.cyberussell.com/resume` as the URL line) to use as the social-share image for the resume page.

The resume page previously pointed its `openGraph`/`twitter` images at the site-wide default (`/og-image.jpg?v=2`). Cropped the supplied 1536×1024 image to 1200×630 with `sharp` (same center-crop approach as the portfolio OG image — trimmed 109px off top/bottom, kept full width), saved it to `public/resume/og-image.png`, and pointed both the `openGraph.images` and `twitter.images` fields at it instead, adding an explicit `alt` text.

Also audited the whole page for any place "Cyberussell" might be used to refer to Russell personally (per his request that his name is Russell Parayno, not Cyberussell) — found none. Every "Cyberussell"/"cyberussell" occurrence on the page is a legitimate brand/product/URL/handle reference (`siteName: "Cyberussell"`, `cyberussell.com` URLs, "Cyberussell Academy" product name, `@cyberussell` GitHub handle) — the page already correctly refers to the person as "Russell Parayno" throughout (hero, About Me, contact section, QR alt text). No text changes needed.

## Remaining Work
None for this task as scoped.

## Known Issues
None found. `npx tsc --noEmit` clean.

## Next Recommended Task
Russell spot-checks the live share preview on Facebook/Twitter/Slack after this ships (cache re-scrape may be needed).
