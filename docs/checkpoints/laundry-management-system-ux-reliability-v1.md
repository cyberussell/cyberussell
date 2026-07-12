# LMS UX & Reliability Polish — v1 (Phase 8d)

**Date:** 2026-07-12
**Product:** Laundry Management System (LMS)
**Feature:** Loading/error states, toast notifications, optimistic updates, and an accessibility pass (phase 8d of the production-readiness roadmap)

## Files Modified
- `package.json` (`sonner`)
- New: `src/components/laundry-management-system/dashboard/DashboardSkeleton.tsx`, `DashboardErrorFallback.tsx`
- New: `loading.tsx`/`error.tsx` at `dashboard/`, `staff/dashboard/`, `customer/dashboard/`
- `src/app/laundry-management-system/{dashboard,staff/dashboard,customer/dashboard}/layout.tsx` (scoped `<Toaster/>`)
- `src/lib/laundry-management-system/hooks/useServerAction.ts` (toast wiring)
- `src/components/laundry-management-system/StaffInviteForm.tsx`, `dashboard/OrderDetailsEditForm.tsx` (pass a `toastSuccessMessage`)
- `src/components/laundry-management-system/dashboard/{DriverAssignmentControl,StaffAssignmentControl}.tsx` (migrated to `useServerAction`)
- `src/components/laundry-management-system/dashboard/{PickupQueueTable,DeliveryQueueTable}.tsx` (schedule forms migrated to `useServerAction`; "Mark Picked Up" gets a manual toast)
- `src/components/laundry-management-system/dashboard/{OrderStatusControl,PriorityToggle}.tsx` (real `useOptimistic`, replacing hand-rolled revert-on-error state)
- `src/components/laundry-management-system/dashboard/{InventoryManager,DriverManager}.tsx` (toasts on add/update/delete; `aria-label`s on icon-only buttons)
- `src/components/laundry-management-system/dashboard/TableSearchInput.tsx` (`aria-label`), `OrdersTable.tsx` (`aria-label` on the receipt link)

## Summary of Changes

Phase 8c built the data layer (pagination/search/sort/filter). This phase (8d) tackled the "UX & reliability polish" item from the roadmap: loading/error states, toast notifications, optimistic updates, and an accessibility pass. Dark mode — also listed under 8d in the original roadmap — was explicitly deferred (see below).

- **Loading/error states**: a shared `DashboardSkeleton` (shimmer header + table rows) and `DashboardErrorFallback` (friendly message + "Try again" reset button, following Next's `error.tsx` contract) back one `loading.tsx`/`error.tsx` pair at each of the 3 dashboard layout levels (owner, staff, customer) rather than one per route — Next's Suspense boundary from an ancestor `loading.tsx` already covers every nested page under it that doesn't define its own, so this is the minimal set of files that gives every dashboard route real loading/error UI instead of a blank flash or an unhandled crash.
- **Toasts**: `sonner`'s `<Toaster/>` is scoped to each of the 3 LMS dashboard layouts specifically, **not** the site-wide root layout — LMS shares Next's single required root layout with the rest of cyberussell.com, so a global toaster would have leaked into the other 6 products. Toast feedback is wired into `useServerAction` itself (an added `toastSuccessMessage` param, since the hook's existing sentinel strings like `'SAVED'`/`'INVITED'` aren't fit for display) — this is a free win for every form already using the hook. Four more forms (`DriverAssignmentControl`, `StaffAssignmentControl`, and the inline pickup/delivery schedule forms) were migrated from raw `useActionState` + a hand-rolled `state.error === 'SAVED'` check onto the same hook, both to get toasts and to remove that repeated boilerplate. The remaining plain-`startTransition` handlers (`InventoryManager`, `DriverManager`, "Mark Picked Up") got manual `toast.success`/`toast.error` calls instead, since they call actions with plain arguments (not `FormData`) rather than through a form.
- **Real bug fixed as a side effect, not new scope**: `InventoryManager`'s add/edit/delete had zero error surfacing at all — flagged as a known gap back in phase 6 and never fixed. The toast wiring here fixes it directly (`toast.error(result.error)` on every mutation) rather than being a separate pass.
- **Optimistic updates, scoped to what the roadmap named** ("status/priority/driver changes"): `OrderStatusControl` and `PriorityToggle` now use real `useOptimistic` — `OrderStatusControl` replaces a hand-rolled `useState` + manual "previous status" revert-on-error with the idiomatic hook (same UX, cleaner code, and it reverts to the server's real value on its own once `router.refresh()` delivers it); `PriorityToggle` previously had a real UX gap (button didn't flip until the refresh landed) that `useOptimistic` fixes outright. Driver assignment was deliberately **not** given a `useOptimistic` treatment — after the `useServerAction` migration, its pending-disabled state already covers the only visual feedback the control has (there's no separate "currently assigned driver" display elsewhere that lags behind), so adding `useOptimistic` there would have had nothing real to optimize.
- **Accessibility pass**: `aria-label`s added to every icon-only button that had none (edit/delete/save/cancel in `InventoryManager` and `DriverManager`, the receipt print link, the order-status `<select>`) and to the search inputs (`aria-label` mirroring the placeholder, since placeholder-only inputs are a known screen-reader anti-pattern — the text disappears the moment a user starts typing). `StatusBadge` was already checked and confirmed to pair color with a text label, not color alone.

## Remaining Work (explicitly deferred, not this pass)
- **Dark mode** — confirmed with Russell before starting: all ~40 existing dashboard pages use hardcoded literal colors with zero `dark:` variants anywhere, so real dark-mode support means a full re-theme, directly reversing phase 8a's decision that the visual redesign bar applies to new components going forward, not a retroactive re-theme. Deferred as its own future initiative if Russell wants to revisit that call.
- Continue the roadmap: 8e (Supabase Storage + business logo upload, real receipt PDF via `@react-pdf/renderer`), 8f (audit logs table + owner-only Activity History view), 8g (dynamic imports, bundle audit, image optimization).

## Known Issues
None introduced by this pass.

## Verification
`npx tsc --noEmit` clean (real source files; pre-existing unrelated stale `.next/types` artifact conflicts from a concurrently running dev server excluded, same as phase 8c).

**Live browser verification was not completed this pass** — the Browser tool's model-safety classifier went down mid-session and stayed down after repeated retries. Russell chose to close this pass out on `tsc`-clean + a manual code re-read rather than wait it out. What that re-read covered: confirmed `assignOrderDriver`/`assignOrderStaff`/`schedulePickup`/`scheduleDelivery` all match `useServerAction`'s expected `(prev, formData) => Promise<ActionResult>` signature; confirmed every `startTransition` handler that gained a toast (`InventoryManager`, `DriverManager`, "Mark Picked Up") checks `result.error` before deciding success vs. failure; confirmed `OrderStatusControl`/`PriorityToggle`'s `useOptimistic` calls happen inside `startTransition` (required) and that both revert correctly once `router.refresh()` lands the server's real value. None of this substitutes for actually clicking through the flows in a browser — **recommend a live pass (loading skeletons on nav, a forced error hitting `error.tsx`, toasts firing on real mutations, optimistic status/priority flips, screen-reader spot check on the new `aria-label`s) before/along with the next phase**, once the classifier issue is confirmed clear.
