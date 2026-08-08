# Shop Removal — v1

**Date:** 2026-08-09
**Product:** Shop
**Feature:** Total removal of the Shop product

## Files Modified

Deleted:
- `src/app/shop/page.tsx`, `src/app/shop/chatgpt-claude/page.tsx`, `src/app/shop/freelancer-kit/page.tsx`, `src/app/shop/download/page.tsx`
- `src/components/Shop.tsx`, `src/components/FreelancerKitProduct.tsx`, `src/components/ChatGptClaudeProduct.tsx`, `src/components/Downloads.tsx`, `src/components/DownloadContent.tsx`
- `src/app/api/checkout/route.ts`, `src/app/api/download/route.ts`, `src/app/api/dispute/route.ts`
- `src/lib/download-token.ts`
- `src/data/products.ts`

Edited (removing dangling references into the deleted product):
- `src/components/Navbar.tsx` — removed the "SHOP" nav item
- `next-sitemap.config.js` — removed the `/shop` entry
- `src/lib/ads-config.ts` — removed the `/shop` ad-mode rule
- `src/app/earn/digital-products/page.tsx` — removed the "Browse the Shop →" link
- `src/components/ScamScanner.tsx`, `src/components/BioGenerator.tsx`, `src/components/ClientAnalyzer.tsx`, `src/components/FreelancePricing.tsx`, `src/components/PromptForge.tsx` — removed the "Ebook CTA" block each one had linking into `/shop/*`

## Summary of Changes

Russell asked to totally remove the Shop page. Removed the entire product — routes, components, APIs, data file — plus every cross-product link into it (navbar, sitemap config, ad-mode config, and five CTA boxes embedded in AI Tools/Earn components that sold Shop products). `PAYMONGO_SECRET_KEY`/`PAYMONGO_PUBLIC_KEY` env vars were deliberately left in place since `.env.example` documents them as shared with the Appointment System's billing — confirmed via grep that no other Shop-only code depends on removing them. `public/downloads/` product files (the actual PDFs/zips) had already been deleted in an earlier commit ("remove stale downloads"), so there was nothing left to clean up there.

## Remaining Work

- `docs/project-map.md` still documents Shop as product #6 (routes, components, APIs, DB tables). Needs to be deleted or marked removed to stay accurate — not done as part of this pass since project-map.md is treated as a snapshot, regenerated separately.
- Changes are not yet committed.

## Known Issues

None found. `npx tsc --noEmit` and `npx next build` both clean after the removal; live-verified in browser preview that `/shop` 404s, the navbar no longer shows SHOP, and `/tools/scam-scanner` (one of the pages that had a Shop CTA) renders with no console/server errors.

## Next Recommended Task

Review the diff and commit. Then regenerate/edit `docs/project-map.md` to drop the Shop section.
