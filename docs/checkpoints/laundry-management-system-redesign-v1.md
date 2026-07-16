# LMS — System-wide visual redesign — v1

**Date:** 2026-07-16
**Product:** Laundry Management System (LMS)
**Feature:** Russell shared a reference dashboard screenshot (purple fintech-style: large gradient KPI cards, a circular progress donut, a floating avatar/team panel, pill-shaped nav and search, heavy rounding and soft shadows) and asked for LMS to be redesigned in that layout/design/effects direction — explicitly not copying the reference's colors, keeping LMS's existing teal-to-cyan brand. Confirmed via `AskUserQuestion`: add a new persistent top bar (search + profile), and scope is the whole product — owner dashboard, staff dashboard, customer mobile dashboard, the public marketing page, and every auth screen. Planned via `EnterPlanMode`/`ExitPlanMode` given the size (~60 files) before touching any code.

## Files Modified
**New shared primitives** (`src/components/laundry-management-system/dashboard/`): `Avatar.tsx` (initials-circle, deterministic gradient per name), `Button.tsx`/`ButtonLink` (pill primary/secondary variants), `DonutChart.tsx` (hand-rolled SVG progress ring, no chart library), `TopBar.tsx` (search pill wired to real order-number lookup + business identity), `Field.tsx` (dedup of a label/value pair previously copy-pasted in two files).

**Updated shared primitives**: `Card.tsx` (`rounded-2xl`→`rounded-3xl`, exported `CARD_CLASS` for the one non-div consumer), `StatCard.tsx` (circular icon chip + new `HeroStatCard` export), `QuickActionsGrid.tsx` (circular icon chip), `DashboardSidebar.tsx` (full-pill nav items, real `Avatar` in the header, new Upgrade-to-Pro mini-card for Essential-plan owners), `DataTable.tsx` (row/header padding bump).

**Layouts**: `src/app/lms/dashboard/layout.tsx`, `src/app/lms/staff/dashboard/layout.tsx` — render `TopBar` above page content.

**Flagship pages**: `src/app/lms/dashboard/page.tsx` (2-column: hero revenue cards + stat grid + quick actions + recent lists on the left; a real donut for today's completion rate + a "Team on duty" avatar list on the right), `src/app/lms/staff/dashboard/page.tsx` (same visual language, added avatars to Recent Orders).

**Normalized onto shared primitives**: `InventoryManager.tsx` (raw `<table>` → `DataTable`, draft-editing state lifted to support per-cell rendering), `reports/page.tsx` (local `SimpleTable` now adapts onto `DataTable`; tab pills now use `ButtonLink`), `orders/page.tsx`/`customers/page.tsx` (inline gradient CTA → `ButtonLink`), `OrderDetailView.tsx`/`CustomerDetailView.tsx` (duplicated `Field` → shared one), `StaffTable.tsx`/`CustomerSearchTable.tsx` (added `Avatar` to the Name column), `PickupQueueTable.tsx`/`DeliveryQueueTable.tsx` (added `Avatar`, swapped one raw button for `Button`).

**Customer mobile dashboard**: `PickupScheduleCard.tsx`/`ProfileForm.tsx` now use the real `Card`/`CARD_CLASS` instead of hand-rolled duplicate classNames; `CustomerBottomNav.tsx` active-item radius bumped to full pill. `StatusCard.tsx` deliberately left on its own (needs a dynamic per-status background `Card` can't cleanly express) and `NotificationsPanel.tsx` left as-is (already matched the target look).

**Marketing page** (`Hero`, `Features`, `Pricing`, `HowItWorks`, `FAQ`, `ChangeRequests`, `FinalCTA`, `LandingNav`): card radius bumped to `rounded-3xl`, icon badges bumped to full circles, every gradient/bordered CTA button bumped to a full pill. No structural or copy changes — these already had their own distinct, high-quality glass-card aesthetic that shouldn't be forced onto the dashboard's `Button` component.

**Auth screens** (`AuthChrome.tsx` + `login`/`signup`/`forgot-password`/`reset-password`/`onboarding/business`/`staff/accept-invite`/`subscription-required`/`CustomerSignupForm.tsx`): form-card radius bumped to `rounded-3xl`. Dark backdrop (`#050816`) deliberately kept — that's already on-brand.

**Site-wide button pill-ification**: found the same inline gradient-CTA and bordered-secondary-button classNames duplicated across ~20 dashboard forms/widgets beyond what the plan explicitly named (`WalkInOrderForm`, `BusinessProfileForm`, `BranchDetailsForm`, `BusinessLogoForm`, `DriverManager`, `AddCustomerForm`, `StaffInviteForm`, `OrderDetailsEditForm`, `PrintReceiptButton`, `DashboardErrorFallback`, `OrderLookupForm`, `DriverAssignmentControl`, `TableSearchInput`, `StaffAssignmentControl`, etc.) — pill-ified all of them via a scripted, string-exact `perl` pass (not a component swap, just the radius) rather than leaving half the product's buttons square and half pill.

## Summary of Changes
Extracted a small set of new shared primitives (avatar, button, donut chart, top bar) matching the reference's visual DNA — translated into LMS's existing teal/cyan brand rather than copying the reference's purple — then cascaded the look through the whole product by updating the primitives everything already depends on (`Card`, `StatCard`, `QuickActionsGrid`, `DashboardSidebar`, `DataTable`), which is why a ~60-file diff didn't require ~60 files of hand-tuned one-off styling. Also used the pass as an opportunity to fold three real pre-existing inconsistencies (a raw `<table>` in Inventory, a duplicate local table component in Reports, a duplicated `Field` helper) back onto the shared components they should have used all along, rather than just re-skinning the inconsistency in place.

`npx tsc --noEmit`, `npx next build`, `npx vitest run` (52/52) all clean throughout every phase. Live-verified in the browser: the public `/lms` marketing page (hero, features, pricing, nav — all pill buttons/circular icons/rounder cards confirmed), `/lms/login` (rounder card, pill submit button, dark backdrop preserved), and — via temporary scratch routes with mock data (removed before finishing, same pattern used earlier this session for the sticky-sidebar fix) — the owner Dashboard (2-column layout, hero revenue cards, donut, team panel, all match the reference's structure), the staff Dashboard, and the customer mobile dashboard (StatusCard, PickupScheduleCard now on the shared Card, bottom nav pill state). Zero console errors on every checked screen.

## Remaining Work
None planned as incomplete — all 10 phases from the approved plan are done. `docs/project-map.md`'s LMS section (already flagged stale as of the last regeneration) is now further out of date on the component inventory; not regenerated this pass, per the standing "don't re-scan the whole project unless asked" rule.

## Known Issues
- The stray dead file `src/app/lms/staff/accept-invite/page 2.tsx` (flagged earlier this session, not a real route) was deliberately excluded from every scripted pass in this redesign too — it still has the old blue brand colors AND the old square buttons. Still just clutter, not a live bug.
- `StatusCard.tsx`'s per-order-status color palette (`STATUS_META`) was deliberately left untouched both in the earlier brand-color pass and this redesign — it's intentionally varied (9 different colors for 9 statuses), not part of the shared brand/design system, and forcing it onto `Card`/teal would break the at-a-glance status-color signal the whole customer tracking experience depends on.

## Next Recommended Task
Not committed yet. Russell reviews the look (ideally live-clicking through the real owner/staff/customer dashboards once deployed, since this pass could only verify authenticated screens via mock scratch routes) — especially the new top-bar search (real order lookup, not decorative) and the Dashboard's new donut/team panel, since those are genuinely new UI, not just re-skinned existing UI. Then commit + deploy at Russell's request.
