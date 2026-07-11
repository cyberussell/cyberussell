# LMS Owner Dashboard — v1

**Date:** 2026-07-11
**Product:** Laundry Management System (LMS)
**Feature:** Real, premium owner dashboard (sidebar, 8 KPI widgets, quick actions, recent activity) plus the Orders/Inventory foundation it depends on

## Files Modified

**New DB migrations:**
- `laundry-management-system/migrations/003_orders_inventory.sql` — `orders`, `inventory_items` tables + RLS
- `laundry-management-system/migrations/003b_orders_inventory_rls_fix.sql` — repair migration, see Known Issues

**New `src/lib/laundry-management-system/modules/`:**
- `orders/types.ts`, `orders/queries.ts` (`getDashboardStats`, `listOrders`, `listRecentOrders`)
- `inventory/types.ts`, `inventory/queries.ts` (`listInventory`, `getLowStockItems`)
- `customer/queries.ts` (recreated — `countCustomers`, `listCustomers`, `listRecentCustomers`)
- `staff/queries.ts` — added `countActiveStaff`
- `reports/queries.ts` (`getReportsData` — revenue series, top services, low-stock, all from one query pass)
- `format.ts` — `formatCurrency()`

**New `src/app/laundry-management-system/actions/`:**
- `orders.ts` (`createWalkInOrder`, `updateOrderStatus`)
- `inventory.ts` (`createInventoryItem`, `updateInventoryItem`, `deleteInventoryItem`)
- `settings.ts` (`updateBusinessProfile`, `updateBranchDetails`)
- `customer.ts` — added `addCustomer` (owner-side manual add)
- `shared.ts` — moved `CURRENCIES` here (was in `tenant.ts`; a `'use server'` file can only export async functions, so a plain const had to live elsewhere)

**New reusable dashboard components** (`src/components/laundry-management-system/dashboard/`): `Card`, `PageHeader`, `StatCard`, `StatusBadge`, `DataTable`, `RecentListCard`, `QuickActionsGrid`, `DashboardSidebar`, plus feature-specific ones (`WalkInOrderForm`, `OrderStatusControl`, `AddCustomerForm`, `InventoryManager`, `RevenueBarChart`, `BusinessProfileForm`, `BranchDetailsForm`). `BusinessHoursInput` extended with `initialValue`/`light` props for reuse in Settings.

**New pages** (`src/app/laundry-management-system/dashboard/`): `layout.tsx` (sidebar shell, `requireOwnerBusiness()` once), rewritten `page.tsx`, `orders/page.tsx` + `orders/new/page.tsx`, `customers/page.tsx` + `customers/new/page.tsx`, `inventory/page.tsx`, `reports/page.tsx`, `settings/page.tsx`. `staff/page.tsx` restyled into the new shell (invite logic untouched).

## Summary of Changes

Russell asked for a real, "no dummy code" owner dashboard matching a specific spec (sidebar sections, 8 widgets, quick actions, light blue/white premium theme). Several widgets needed real order data that didn't exist yet, so — per his answers to clarifying questions — this phase also built the Orders/Inventory foundation: a simple order model (free-text service + manual amount, no services catalog), fully anonymous walk-in orders (no forced customer link), and full CRUD for all 7 sidebar sections rather than stubs.

All data is genuinely live-queried (`getDashboardStats`, `listOrders`, `listInventory`, `getReportsData`) — zero hardcoded/mock values anywhere. `DashboardLayout` centralizes the owner auth check + sidebar so every subpage is just content. `DataTable`/`StatCard`/`Card`/`RecentListCard` are generic and reused across Orders/Customers/Inventory/Staff rather than each page rolling its own markup.

## Remaining Work / Required Action

None — Russell ran `003b_orders_inventory_rls_fix.sql` and it's been verified live (see Known Issues below). Orders and Inventory both work end-to-end now.

## Known Issues

- **Real bug found and fixed during verification: `createWalkInOrder`'s zod schema rejected every submission.** `formData.get('customerId')` returns `null` when a field is absent from the form (the walk-in form has no customer picker, per the "fully anonymous" decision), but `z.string().uuid().optional()` only accepts `undefined`, not `null` — so validation failed 100% of the time with a generic "Please fill in the service and amount correctly" error, regardless of what was actually filled in. Fixed by removing the unused `customerId` field from the schema and insert entirely (the form never sent it). Found the same latent bug shape in `inviteStaff`'s `branchId` (only reachable if a business somehow has zero branches, currently impossible post-onboarding, but fixed defensively too: `formData.get('branchId') || undefined`).
- **Real bug found and fixed: KPI widget labels ("Today's Orders", etc.) truncated to 2-3 characters at viewport widths under ~1024px.** The stat-card grid switched to 4 columns at Tailwind's `sm:` (640px) breakpoint, which is too narrow once the 256px sidebar is subtracted. Changed both the dashboard's KPI grid and `QuickActionsGrid` from `sm:grid-cols-4` to `lg:grid-cols-4`. Verified fixed at 904px (2-col, full labels) and 1280px (4-col, full labels).
- **Real bug found, NOT fixable by me: `orders` and `inventory_items` reject every owner-initiated INSERT with "new row violates row-level security policy," even though the code and RLS policy definitions are correct and match the exact working pattern used by `customers`/`branches`/`staff_members` (migration 001).** Diagnosed by comparing: `addCustomer` (owner insert into `customers`, migration 001 policy) succeeded live against the real DB; `createWalkInOrder`/`createInventoryItem` (migration 003 policies) both failed with the identical RLS error. This strongly indicates migration 003's `orders`/`inventory_items` policies only partially applied when Russell first ran it (e.g., an error partway through the SQL Editor run). I cannot inspect or repair Postgres policies directly — the LMS Supabase project isn't connected to this session's Supabase MCP tools (only the main cyberussell.com project and an unrelated "payjobs" project are). Wrote `003b_orders_inventory_rls_fix.sql` (idempotent — `drop policy if exists` before every `create policy`) for Russell to run; this should resolve it without needing to touch the tables/data.
- All test data created during verification (one throwaway pre-confirmed owner account, one test customer "Maria Santos," zero orders/inventory rows since those inserts correctly failed) — the owner account and customer row are cleaned up via the Admin API; nothing left behind in the production LMS database beyond what's explicitly noted here.
- **Follow-up (2026-07-11): RLS fix confirmed working.** Russell ran `003b_orders_inventory_rls_fix.sql`. Re-verified live with a fresh throwaway owner account: created a real walk-in order and a real inventory item, both succeeded (previously blocked), and the dashboard's Today's Orders/Today's Revenue/Monthly Revenue/Recent Orders widgets all reflected the new data correctly. All test rows (order, inventory item, branch, business, auth user) deleted afterward — nothing left in production.

## Next Recommended Task

Phase 2 is fully closed out, no known bugs. Decide phase 3 scope (staff/customer dashboards are still stubs from phase 1 — could get order visibility now that orders exist; or address the sidebar's mobile responsiveness, which isn't collapsible yet) — waiting on Russell's prompt.
