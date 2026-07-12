# LMS Reusable Form Foundation — v1 (Phase 8b)

**Date:** 2026-07-12
**Product:** Laundry Management System (LMS)
**Feature:** React Hook Form + Zod foundation (phase 8b of the production-readiness roadmap)

## Files Modified
- `package.json` (`react-hook-form`, `@hookform/resolvers`)
- New: `src/lib/laundry-management-system/modules/staff/schema.ts`, `modules/customer/schema.ts`, `modules/orders/schema.ts`
- `src/app/laundry-management-system/actions/{staff,customer,orders}.ts` (import shared schemas instead of defining them locally)
- New: `src/components/laundry-management-system/dashboard/FormField.tsx`
- New: `src/lib/laundry-management-system/hooks/useServerAction.ts`
- Rewritten: `src/components/laundry-management-system/StaffInviteForm.tsx`, `dashboard/AddCustomerForm.tsx`, `dashboard/OrderDetailsEditForm.tsx`, `dashboard/WalkInOrderForm.tsx`

## Summary of Changes

Phase 8a decoupled plans from features. This phase (8b, "foundation first" per the agreed roadmap) built the React Hook Form + Zod foundation everything else will sit on.

- **Shared Zod schemas**: today, each Server Action defines its own Zod schema inline, invisible to the client — forms only got HTML5 `required`/`type` validation, with real errors only surfacing after a full round-trip. Since a `'use server'` file can only export async functions (the exact wall phase 6 hit with `STAFF_ACCOUNT_LIMIT`), the schema objects couldn't be exported from the actions files directly. Extracted `inviteStaffSchema`, `addCustomerSchema`, `createOrderSchema`, and `updateDetailsSchema` into plain modules (`modules/{staff,customer,orders}/schema.ts`) that both the Server Action and the client form now import — one set of rules, server stays the source of truth (the action still calls `.safeParse` exactly as before), client gets the identical rules via `zodResolver` for instant feedback.
- **`FormField`** (`components/laundry-management-system/dashboard/FormField.tsx`): one label+error+spacing wrapper, plus the shared `inputClass` Tailwind string that was an identical copy-pasted literal across ~10 form components. Deliberately *not* a full input-kit — callers spread `{...register('field')}` onto a plain `<input>`/`<select>`/`<textarea>` inside it, since RHF's `register()` already does the real work.
- **`useServerAction`** (`lib/laundry-management-system/hooks/useServerAction.ts`): wraps `useActionState`, returning `{ dispatch, pending, error, successMessage }`. Centralizes the "is `state.error` a real error or an info sentinel like `'SAVED'`/`'INVITED'`" branching that was hand-rolled per component.
- **4 forms migrated**, spanning simple → complex to prove the pattern scales: `StaffInviteForm` (3 fields), `AddCustomerForm` (4 fields), `OrderDetailsEditForm` (4 fields incl. a select), and `WalkInOrderForm` (the flagship — ~12 fields, a conditional pickup sub-section gated on the Professional feature flag, two selects populated from server data). Each keeps its exact prior visual appearance, field set, and server behavior — this is a validation/DX upgrade, not a redesign.
- **`WalkInOrderForm`'s pickup conditional section** now uses RHF's `watch('pickupRequested')` instead of a separate `useState` — the checkbox's own registered value drives both the form data and the conditional render, one source of truth instead of two.
- **Judgment call**: `AssignedStaffSelect` (used by both `WalkInOrderForm` and the untouched `StaffAssignmentControl`) wasn't modified to accept RHF's spread props, since that's a shared component used by an out-of-scope file — `WalkInOrderForm` now inlines its own staff `<select>` with the same markup/options instead, a small (5-line) acceptable duplication versus risking a shared-component change outside this pass's scope.

## Remaining Work (explicitly deferred, not this pass)
- **Not worth migrating to RHF at all**: `DriverAssignmentControl.tsx`, `StaffAssignmentControl.tsx` (single-select + save button — no real validation need, RHF would add indirection with no benefit), and the small inline per-row scheduling forms inside `PickupQueueTable.tsx`/`DeliveryQueueTable.tsx` (each row would need its own RHF instance in a loop, for 1-2 unvalidated fields).
- **Good future candidates for a follow-up pass**: `BusinessProfileForm`, `BranchDetailsForm`, `CustomerSignupForm`, `customer/ProfileForm`, the onboarding business-creation page, the three auth pages (login/signup/forgot-password), and the table-with-inline-edit components (`InventoryManager`, `DriverManager`) — same now-proven pattern, just more files than one pass should attempt at once.
- **TypeScript cleanup** (6 remaining `as unknown as` Supabase-row casts in `orders/queries.ts` and `reports/advanced.ts`): the real fix is generating actual Supabase types (`supabase gen types typescript`) and typing the client as `SupabaseClient<Database>`, which needs CLI access to the LMS Supabase project this session doesn't have. Flagged for Russell, not worked around.

## Known Issues (found live, fixed same session)
**Real bug**: all 4 forms initially threw a React console error on every submit — "An async function with useActionState was called outside of a transition... isPending will not update correctly." `useServerAction`'s original implementation returned `useActionState`'s `dispatch` directly; that's safe when bound to a native `<form action={dispatch}>`, but every migrated form now calls `dispatch(formData)` manually from inside RHF's `handleSubmit(onSubmit)` callback, which React requires to happen inside a transition. Fixed by having the hook wrap the call itself — `useServerAction` now runs its own `useTransition()` and exposes a `submit` function (still named `dispatch` for zero call-site changes) that calls the real dispatch inside `startTransition`. One shared fix in the hook, not four per-form patches. Confirmed fixed by cross-referencing the browser console's full timeline: all 4 pre-fix error pairs were timestamped before the hook's Fast Refresh reload, and zero new errors appeared after it across a second staff invite, the full walk-in order submission, and the order-details save.

## Verification
`npx tsc --noEmit` clean. Live-verified in the browser end-to-end with a throwaway owner account (Admin API create → onboard → flip to Professional via REST → delete after, including the two staff accounts it invited — all cascade-confirmed via REST):
- **`AddCustomerForm`**: submitting empty showed instant Zod errors ("Too small: expected string to have >=1 characters") under Full name and Phone with zero network requests; a valid submission created "Maria Santos" and redirected to the Customers list, confirmed in the list.
- **`StaffInviteForm`**: an invalid email was caught client-side with zero network requests (confirmed via `read_network_requests` — no POST fired); a valid invite showed "Invite sent." and the count correctly read "1 of 3" then "2 of 3" after a second invite.
- **`WalkInOrderForm`** (the flagship, tested on a Professional-flipped account): submitting with an empty Service Type showed an instant Zod error with no round-trip; checking "Customer needs pickup" correctly revealed the address/scheduled-time fields via `watch()`; a full submission with the pickup section filled in created ORD-000011 with the correct service/amount, and a direct DB check confirmed `pickup_requested: true` and the exact address text.
- **`OrderDetailsEditForm`**: edited weight (3.5), payment status (Paid), and notes ("Handle with care"), got "Saved!", and a direct DB check confirmed all three persisted exactly as entered.
- All test data (business, orders, customer, 2 staff invites, owner account) fully deleted afterward; REST cross-check confirms only the two pre-existing unrelated businesses from other sessions remain.

## Next Recommended Task
Continue the roadmap with phase 8c (data layer: pagination, search, sorting, richer filtering) per the agreed "foundation first" ordering — or keep migrating the remaining forms listed above using the pattern this phase established.
