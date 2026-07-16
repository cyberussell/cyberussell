# Laundry Management System — Categorized Service Catalog + Promos + Icons + Test Accounts — v1

**Date:** 2026-07-17
**Product:** Laundry Management System (LMS)
**Feature:** Split the flat service catalog into real categories, add scheduled promos and per-item icons, and seed fake test accounts + a full catalog for end-to-end testing.

## Files Modified
- `laundry-management-system/migrations/020_catalog_categories_promos_icons.sql` (new)
- `laundry-management-system/scripts/seed-test-accounts.mjs` (new)
- `src/components/laundry-management-system/dashboard/CatalogItemIcon.tsx` (new)
- `src/lib/laundry-management-system/modules/catalog/types.ts`
- `src/app/lms/actions/catalog.ts`
- `src/components/laundry-management-system/dashboard/ServiceCatalogManager.tsx`
- `src/components/laundry-management-system/dashboard/ServiceItemTileGrid.tsx`
- `src/components/laundry-management-system/dashboard/WalkInOrderForm.tsx`

## Summary of Changes

Russell asked for the LMS service catalog (previously just `name` + `price`, added in migration 018 for the POS cart) to reflect real laundry categories — Washing, Drying, Wash & Dry, Fold priced per load; Dry Cleaning priced per individual clothing piece (Shirt, Pants, Dress, Suit/Blazer, Jacket, Blanket, Curtain); Add-ons (Detergent, Fabric Softener, Plastic Bag) priced per piece — plus a simple scheduled promo ("less price this week"), a seeded default icon per category with the option to upload a custom one under a size limit, and fake owner/staff/customer test accounts (password `123456789` for all three) with the catalog pre-seeded.

Followed this repo's AGENTS.md process fully: read `project-map.md`/`working-on.md` first, ran two `Explore`-agent research passes (catalog schema/storage pattern/auth trigger, then the business/branch onboarding flow) plus direct reads of the exact migration/action/trigger SQL before proposing anything, then used `EnterPlanMode`/`ExitPlanMode` for explicit sign-off before touching any file. Three `AskUserQuestion` rounds resolved: test accounts live under a brand-new fake business, not an existing one; Dry Cleaning becomes a real per-piece item list rather than one flat price; promos are a percent-or-fixed discount with an optional date range, auto-applied within that window (not a manual toggle).

**Schema** (migration 020): `service_catalog_items` gains `category` (`wash`/`dry`/`wash_dry`/`fold`/`dry_clean`/`addon`), `unit` (`load`/`piece`, derived from category server-side, never a free user choice), `icon_key`/`icon_url`, and `promo_type`/`promo_value`/`promo_starts_at`/`promo_ends_at` with a check constraint keeping promo_type/promo_value paired. New public `service-icons` Storage bucket + owner-only RLS, an exact mirror of `013_business_logo.sql`'s bucket/policy pattern (`storage.foldername(name)`-scoped). `create_walk_in_order_with_items` (018) is re-defined to compute the effective price from any active promo window when looking up each line item — this is what actually charges the discount at order time, not just a cosmetic POS display; a null `promo_starts_at`/`promo_ends_at` means "already started"/"never ends" respectively, and fixed discounts are floored at 0.

**Types/helpers**: `catalog/types.ts` gained `CATEGORY_META` (label + unit + a seeded default lucide icon name per category: `WashingMachine`/`Wind`/`Waves`/`Shirt`/`Shirt`/`Package`) and `isPromoActive()`/`effectivePrice()` — shared by the catalog manager, the POS tile grid, and `WalkInOrderForm`'s running-total calculation, so all three agree on what a promo item actually costs (the RPC remains the sole authority on what's actually charged).

**Actions** (`actions/catalog.ts`): `createCatalogItem`/`updateCatalogItem` extended to accept category + promo fields; new `uploadCatalogItemIcon`/`removeCatalogItemIcon` mirror `uploadBusinessLogo`'s exact pattern (`settings.ts`) — image-type + size check (1MB, smaller than the logo's 2MB since these are small tap-grid icons), old file cleared before a new upload, per-item storage path `service-icons/{business_id}/{item_id}.{ext}`.

**UI**: new shared `CatalogItemIcon.tsx` renders a custom `icon_url` if set, else the item's `icon_key` override, else the category's seeded default — an item never renders blank. `ServiceCatalogManager.tsx` gained a Category select on the add form, a collapsible "Add promotion" section (discount type/value/optional start-end dates) on both add and inline-edit, a category filter pill row alongside the existing Active/Inactive pills, per-row icon upload/remove buttons, and strikethrough-original + promo-price display with an "On sale" badge when a promo is currently active. `ServiceItemTileGrid.tsx` (the POS tap grid) renders `CatalogItemIcon` per tile and the same strikethrough/promo pricing. `WalkInOrderForm.tsx`'s cart-total calculation was switched from `item.price` to `effectivePrice(item)` so the displayed running total matches what the RPC will actually charge.

**Seed script** (`seed-test-accounts.mjs`, plain Node/ESM, no build step): creates a "Demo Laundry Co" business through the real `auth.admin.createUser()` → `handle_new_user()` trigger path — the same mechanism the app's own staff-invite flow already uses in production — rather than hand-inserting into `auth.users`, which risks missing `auth.identities` rows GoTrue expects. Creates one owner/staff/customer account each (password `123456789` for all three, `email_confirm: true` so no confirmation email is needed), then seeds the full 14-item categorized catalog including a live 10%-off Wash & Dry promo (7-day window) so the promo UI has something real to show immediately. Idempotent at the business level: re-running after `demo-laundry-co` already exists just reprints the credentials without touching anything.

`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. Live-verified via a temporary scratch route (mock data, no Supabase — removed before finishing): category select and promo fields render and expand correctly, category filter pills correctly narrow the list (confirmed filtering to just "Shirt" under Dry Cleaning), inline edit shows Name/Category/Price/promo fields together, and the mock Wash & Dry item correctly displayed ₱220 struck through with a ₱198 promo price (10% off) and an "On sale" badge in both the catalog manager table and the POS tile grid.

## Remaining Work
- Migration 020 has not been run against the live LMS Supabase project yet.
- `seed-test-accounts.mjs` has not been run yet — no test accounts exist yet.
- Not committed or deployed.

## Known Issues
- Not live-verified against the real Supabase project (RLS on the new `service-icons` bucket, the RPC's promo-pricing math against a real database, the seed script's actual account creation) — only verified via a mock-data scratch route in this environment, same standing limitation noted across prior LMS/TMS sessions with no live credentials available here.
- The 3 known-degraded per-service breakdown reports (Top Services, Revenue by Service, Monthly Service Requests — noted in the 018 checkpoint as a deliberately deferred limitation once orders can have multiple items) are unaffected by this pass but still worth a future cleanup.
- Pre-existing stray files noted across several prior sessions (`src/components/laundry-management-system/dashboard/DriverManager 2.tsx`, `src/app/lms/staff/accept-invite/page 2.tsx`) were left untouched — out of scope for this pass.

## Next Recommended Task
Russell: (1) applies migration 020 in the LMS Supabase SQL editor; (2) runs `node laundry-management-system/scripts/seed-test-accounts.mjs` once (needs `LMS_SUPABASE_SERVICE_ROLE_KEY` in `.env.local`); (3) logs in as all three seeded accounts (`owner@demolaundry.test`, `staff@demolaundry.test`, `customer@demolaundry.test`, password `123456789`) and confirms the catalog is split by category with the right default icons, the Wash & Dry promo shows correctly on both the catalog manager and the POS grid, and an icon upload/remove round-trips against real Storage. Then commit + deploy at Russell's request.
