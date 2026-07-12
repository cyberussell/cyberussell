# LMS Feature-Flag Architecture — v1 (Phase 8a)

**Date:** 2026-07-12
**Product:** Laundry Management System (LMS)
**Feature:** Decouple plans from features (phase 8a of a larger production-readiness effort)

## Files Modified
- `src/lib/laundry-management-system/modules/billing/entitlements.ts` (rewrite)
- `src/lib/laundry-management-system/modules/staff/queries.ts` (removed `STAFF_ACCOUNT_LIMIT`)
- `src/app/laundry-management-system/actions/staff.ts`
- `src/app/laundry-management-system/actions/orders.ts`
- `src/app/laundry-management-system/dashboard/staff/page.tsx`
- `src/app/laundry-management-system/dashboard/{pickup,delivery,priority-queue,reports}/page.tsx` + the same set under `staff/dashboard/`
- `src/app/laundry-management-system/dashboard/orders/new/page.tsx`, `dashboard/orders/[orderId]/page.tsx` + staff equivalents
- `src/components/laundry-management-system/dashboard/{DashboardSidebar,UpgradePrompt}.tsx`

## Summary of Changes

Russell handed over a large "production readiness" spec for LMS (~20 workstreams: loading skeletons, error boundaries, toasts, optimistic updates, pagination/search/filter/sort, responsive/accessibility/dark-mode, Supabase Storage + image uploads, receipt PDF, audit logs, proper TypeScript, reusable hooks/components/forms with React Hook Form + Zod, Vercel performance) plus a "Stripe/Linear/Notion-level" design bar. Given the size, we agreed (via clarifying questions) to split it into phases: this pass implements the one architectural change Russell called out as needing to happen *before* any other code gets written — decoupling plans from features — and documents everything else as a roadmap for follow-up sessions.

**Confirmed via clarifying questions before starting:**
- Feature flags: code-config, feature-first (not a DB-driven `plans`/`plan_features` table pair) — mirrors the Appointment System's `entitlements.ts` pattern (different product, read-only reference).
- Visual redesign bar applies to new components going forward, not a retroactive re-theme of the ~40 already-built dashboard pages.
- Image uploads (later phase): business logo only, first pass.
- Receipt PDF (later phase): `@react-pdf/renderer`.
- Roadmap ordering: "foundation first" (reusable hooks/forms/validation → data layer → UX polish → files/PDF/audit logs → Vercel perf).

### The architecture change
Rewrote `modules/billing/entitlements.ts` from "4 Professional-only boolean flags" to a full features↔plans model:
- **`FeatureFlag`** now enumerates the *entire* feature surface, not just the paid upsells: `feature_order_tracking`, `feature_customer_database`, `feature_inventory`, `feature_receipt_printing`, `feature_qr_lookup` (Essential baseline) plus `feature_pickup_delivery`, `feature_priority_queue`, `feature_advanced_reports` (Professional additions) — matching Russell's own example names.
- **`PlanLimits`** introduced as a separate concept from boolean flags — `staffAccounts: number | null` (`null` = unlimited) replaces what was previously a boolean `unlimited_staff` flag, since a cap is a number, not an on/off switch. This generalizes cleanly to future limits (branches, monthly orders) without inventing more booleans.
- **`PLANS: Record<PlanTier, PlanConfig>`** — Professional's feature list is built by *spreading* Essential's (`[...ESSENTIAL_FEATURES, ...]`), so the baseline feature list exists in exactly one place, never duplicated.
- Consolidated `pickup_management` + `delivery_management` (previously two separate flags) into one `feature_pickup_delivery`, matching Russell's own example — Driver Assignment and Delivery Status were never separate flags either, so this extends the same "one flag per module" reasoning up one level.
- New `getLimit(business, 'staffAccounts')` replaces the old `hasFeature(business, 'unlimited_staff')` + a hardcoded `STAFF_ACCOUNT_LIMIT = 3` constant that lived in `modules/staff/queries.ts` for no reason other than avoiding a `'use server'` export restriction — the limit now lives in exactly one place, `PLANS.essential.limits.staffAccounts`.
- `tierWithFeature` renamed to `planWithFeature` (language cleanup — "tier" implied a ranked ladder; "plan" is the more accurate word once plans are just named feature bundles).
- A comment block in the file documents how to extend it: a new plan (Enterprise, Franchise) = one migration to widen the `plan_tier` check constraint + one new `PlanConfig` entry; changing pricing or which features a plan includes = edit this file only, zero migration.

**Audited first**: confirmed via a repo-wide grep that every single gating call site already went through `hasFeature()`/`tierWithFeature()` — no code anywhere did `business.plan_tier === 'professional'` directly. This meant the rewrite was a clean, contained change to one module plus ~25 mechanical call-site renames, not a scattered refactor.

## Remaining Work
This phase is scoped to the architecture only. The full roadmap (phases 8b–8g) for the rest of Russell's production-readiness list is documented below and in `docs/working-on.md`, to be scoped and executed in follow-up sessions.

## Known Issues
None. This was a pure refactor with a "zero behavior change" bar, and that bar was met (see Verified Live below).

## Roadmap — phases 8b–8g (not built yet)
- **8b — Reusable foundation.** `react-hook-form` + `@hookform/resolvers`, shared form primitives, migrate existing ad-hoc forms (WalkInOrderForm, StaffInviteForm, DriverManager, InventoryManager, BusinessProfileForm, BranchDetailsForm, customer forms) to RHF+Zod. A `useServerAction`-style hook to de-duplicate the `useActionState` + `router.refresh()` boilerplate repeated across ~10 components. TypeScript cleanup (tighten remaining `as unknown as` Supabase casts).
- **8c — Data layer.** Pagination (extend `DataTable`), search (generalize `CustomerSearchTable` to Orders/Inventory), sorting (column-header sort), richer filtering (generalize Orders status pills / Inventory restock tab into a reusable filter bar).
- **8d — UX & reliability polish.** `loading.tsx`/`error.tsx` per route, toast notifications (`sonner`), optimistic updates (`useOptimistic`) for status/priority/driver changes, accessibility pass, dark-mode wiring for new/shared components (`next-themes`), subtle motion via the already-installed `framer-motion`.
- **8e — Files & documents.** Supabase Storage bucket + business logo upload; real downloadable receipt PDF via `@react-pdf/renderer`.
- **8f — Governance.** New `audit_logs` table + logging helper wired into key mutations; owner-only Activity History view.
- **8g — Vercel/performance.** Dynamic imports for heavy client components, revisit `force-dynamic` vs. targeted revalidation, image optimization, bundle audit.

## Verified live (2026-07-12)
Two throwaway owner accounts (Admin API create → onboard → REST plan-tier flip where needed → delete afterward, cascade-confirmed via REST; only the two pre-existing unrelated businesses from other sessions remain):
- **Essential**: sidebar still shows "PRO" badges on Pickup/Delivery/Priority Queue; those routes plus Reports' advanced tabs still render `UpgradePrompt`; Staff page still shows "0 of 3 staff accounts used."
- **Professional**: "PRO" badges gone; Staff page shows "unlimited on the Professional plan"; Pickup Management renders its real content (not the upgrade prompt); Reports' Branch Performance tab renders real data.
- `npx tsc --noEmit` clean throughout.

Confirms the refactor is behavior-neutral — identical to the phase 7 checkpoint's verified behavior, just renamed/restructured underneath.

## Next Recommended Task
Scope and execute phase 8b (reusable foundation: React Hook Form + Zod, shared form primitives, form migration) — the roadmap's own "foundation first" ordering that Russell confirmed.
