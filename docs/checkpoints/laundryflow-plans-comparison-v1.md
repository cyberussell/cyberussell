# Laundryflow Demo — Plans Comparison Section — v1

**Date:** 2026-07-24
**Product:** Services (Portfolio demo — `/demo/laundryflow`, the fictional "Aling Maria Laundry Shop" case study; not the real Laundry Management System SaaS product)
**Feature:** Added a 3-tier "What's Included" comparison section to the bottom of the demo page, replacing the old plain "sample website" CTA.

## Files Modified
- `src/components/demo/laundryflow/data.ts` — added `PLANS` array (Essential, Professional, System Only) with icons, and imported `Globe`/`Cpu` from lucide-react.
- `src/components/demo/laundryflow/PlansComparison.tsx` — new file. Renders the 3-plan grid plus the "A CYBERUSSELL CONCEPT" closing card (badge, copy, Contact Us Today / View More Business Websites links) that used to live in `CTA.tsx`.
- `src/app/demo/laundryflow/page.tsx` — swapped `<CTA />` for `<PlansComparison />`.
- `src/components/demo/laundryflow/CTA.tsx` — deleted (content merged into `PlansComparison.tsx`; was only referenced from `page.tsx`).

## Summary of Changes
Russell wanted the demo page to show the full "production-ready-looking" demo site as-is (Header/Hero/Pricing/Footer unchanged), then below it, a comparison of what a real client actually gets: **Essential** (₱399/mo + ₱2,999 setup, with website — feature list copied verbatim from the real LMS product's `src/components/laundry-management-system/Pricing.tsx`), **Professional** (₱699/mo + ₱4,999 setup, with website — likewise copied), and a new **System Only** tier (₱399/mo, no setup fee, no website) for clients who just want the laundry management software without a new site built — Essential's feature list minus the 3 website-specific items (Professional Website, Hosting & SSL, Custom Domain Connection), with "Website/System Change Requests" reworded to "System Change Requests". The System Only price/no-setup-fee framing and the "replace the old CTA outright" placement were both confirmed with Russell via `AskUserQuestion` before building — not assumptions.

Styled to match the existing demo's design language (blue `#2563EB` / cream `#FDF9F3`, `font-sans font-black` headings, Inter body, `framer-motion` `fadeUp`), not the real LMS product's teal/cyan palette.

**System Only is a demo-only concept** — it doesn't exist as a published tier on the real LMS marketing page (`src/components/laundry-management-system/Pricing.tsx`, which only has Essential/Professional, both bundling a website). No changes were made to the real LMS product; scope stayed confined to the Services/Portfolio demo per `docs/project-map.md`'s explicit note that `/demo/laundryflow` is unrelated to LMS work.

## Remaining Work
None — feature is complete as scoped.

## Known Issues
None found. `npx tsc --noEmit` clean. Live-verified in the dev server (localhost:3001/demo/laundryflow): page renders, no console errors, all 3 plan cards + closing CTA card render with correct copy/pricing/links.

## Next Recommended Task
If Russell wants a real "System Only" tier on the actual LMS product's live pricing page too (not just this demo), that would be a separate LMS-product task requiring its own scoping/approval per the single-product-at-a-time rule.
