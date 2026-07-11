# LMS SaaS Foundation — v1

**Date:** 2026-07-11
**Product:** Laundry Management System (LMS)
**Feature:** Multi-tenant SaaS foundation — modular code restructure, staff invites, customer self-registration, expanded business/branch creation fields

## Files Modified

**New DB migration (not yet applied — see Remaining Work):**
- `laundry-management-system/migrations/002_tenant_fields_and_provisioning.sql`

**New `src/lib/laundry-management-system/modules/` structure (replaces the old flat `auth.ts`/`types.ts`):**
- `modules/auth/types.ts`, `modules/auth/queries.ts` (`getSessionUser`, `requireOwnerBusiness`, `requireStaffAccess`, `requireCustomerAccess` — new)
- `modules/tenant/types.ts`, `modules/tenant/queries.ts` (`listBranches`)
- `modules/staff/types.ts`, `modules/staff/queries.ts` (`listStaff`)
- `modules/customer/types.ts`
- `modules/orders/README.md`, `modules/inventory/README.md`, `modules/reports/README.md` (reserved, empty stubs)
- Deleted: `src/lib/laundry-management-system/types.ts`, `src/lib/laundry-management-system/auth.ts`

**New `src/app/laundry-management-system/actions/` structure (replaces the old flat `actions.ts`):**
- `actions/shared.ts` (`ActionResult`, `CURRENCIES`, `slugify`)
- `actions/auth.ts` (`signUp`, `signIn` — now role-aware redirect, `resendConfirmation`, `requestPasswordReset`, `signOut`)
- `actions/tenant.ts` (`createBusiness` — now creates the business + its first branch together)
- `actions/staff.ts` (`inviteStaff` — new)
- `actions/customer.ts` (`customerSignUp` — new)
- Deleted: `src/app/laundry-management-system/actions.ts`

**New pages/components:**
- `src/app/laundry-management-system/dashboard/staff/page.tsx` + `src/components/laundry-management-system/StaffInviteForm.tsx`
- `src/app/laundry-management-system/staff/accept-invite/page.tsx`
- `src/app/laundry-management-system/staff/dashboard/page.tsx` (stub)
- `src/app/laundry-management-system/[businessSlug]/signup/page.tsx` + `src/components/laundry-management-system/CustomerSignupForm.tsx`
- `src/app/laundry-management-system/customer/dashboard/page.tsx` (stub)
- `src/components/laundry-management-system/BusinessHoursInput.tsx`

**Updated imports/behavior in existing files:**
- `login/page.tsx`, `signup/page.tsx`, `forgot-password/page.tsx`, `onboarding/business/page.tsx`, `dashboard/page.tsx` — updated to new `actions/*` paths
- `onboarding/business/page.tsx` — added Branch name, Currency select, Timezone, `BusinessHoursInput`
- `dashboard/page.tsx` — added a "Manage staff →" link

## Summary of Changes

Russell asked to build the LMS as a proper multi-tenant SaaS foundation (modular architecture, three roles, business creation with currency/hours/branch fields, staff invites, customer self-registration). A working foundation was already live (owner signup/login/onboarding/dashboard, forgot-password), so this batch extended it rather than replacing it:

1. **Restructured `src/lib/laundry-management-system/` and `src/app/laundry-management-system/actions.ts` into domain modules** (`auth`/`tenant`/`staff`/`customer`, plus empty `orders`/`inventory`/`reports` stubs prepared for future phases), per Russell's explicit choice.
2. **`signIn()` is now role-aware** — redirects owner/staff/customer to their own landing route instead of always going to `/dashboard`.
3. **`createBusiness()` now creates the business + its first branch in one step**, capturing all 7 fields from Russell's spec (Business Name, Branch Name, Address, Contact Number, Business Hours via the new `BusinessHoursInput` component, Currency, Timezone). `currency` lives on `businesses` (one per tenant); `business_hours` lives on `branches` (per physical location).
4. **Staff invite flow built**: owner-only `dashboard/staff/page.tsx` (list + invite form) calls `inviteStaff`, which uses the existing `createAdminSupabase()` service-role client's `auth.admin.inviteUserByEmail`. A new `staff/accept-invite/page.tsx` mirrors the existing `reset-password/page.tsx` pattern for setting a password from the emailed link.
5. **Customer self-registration built**: new public `[businessSlug]/signup/page.tsx` resolves the business server-side via the admin client (never trusts a client-submitted `business_id`), shows "Sign up as a customer of {business}", and calls `customerSignUp`. Customer *login* deliberately stays on the existing shared `/login` — only signup is business-scoped, since a profile can be a customer of more than one laundry business.
6. **`handle_new_user()` trigger extended** (migration 002) so staff invites and customer signups auto-provision their `staff_members`/`customers` row from `auth.users` metadata, the same way it already auto-provisions a `profiles` row for owners — no new RLS policies needed.
7. **Google login explicitly skipped this pass** — needs Russell to create Google Cloud OAuth credentials and enable the provider in Supabase's Auth settings first; not something buildable from code alone.

## Remaining Work

- **Migration `002_tenant_fields_and_provisioning.sql` has NOT been applied yet.** The LMS Supabase project isn't connected to this session's Supabase MCP tools (only the main cyberussell.com project and an unrelated "payjobs" project are). Russell needs to run it in the LMS project's SQL Editor, same as `001_init.sql` was run — until then, `createBusiness()` (currency/business_hours columns), staff invite auto-provisioning, and customer signup auto-provisioning will all fail at the DB level.
- Google login (code + Google Cloud/Supabase dashboard setup) — deferred, revisit once Russell has credentials ready.
- Any orders/inventory/reports schema or UI — deliberately out of scope, deferred to a future phase per Russell's own "prompts in phases" framing.

## Known Issues

- **Staff invite acceptance page's "valid link" detection is unverified.** `staff/accept-invite/page.tsx` listens for either `PASSWORD_RECOVERY` or `SIGNED_IN` auth events (Supabase's invite-link behavior can vary), mirroring the pattern used for password-reset — but this has not been tested against a real emailed invite link (no inbox access in this sandbox). Flag for Russell to test once migration 002 is applied and a real invite is sent.
- Full DB-writing paths (onboarding submission, staff invite → accept → `staff_members` row, customer signup → `customers` row) are code-complete and type/build-clean but **not live-verified end-to-end**, since they all depend on migration 002 being applied first. What *was* live-verified: a fresh pre-confirmed test owner account (created/deleted via the Admin API, not left behind) successfully logged in through the restructured `signIn()` action, redirected correctly via `requireOwnerBusiness()` to the new onboarding form, and the form rendered all new fields (branch name, currency, timezone, business hours picker) with zero console errors — confirming the restructure didn't break the existing live path and the new UI is wired correctly.

## Next Recommended Task

Russell runs `laundry-management-system/migrations/002_tenant_fields_and_provisioning.sql` in the LMS Supabase project's SQL Editor. After that, either he or a follow-up session should live-test: onboarding submission (business + branch creation with the new fields), a real staff invite end-to-end (including the accept-invite link), and a real customer signup at a business's `[businessSlug]/signup`. Once verified, decide what "phase 2" is — likely the orders/inventory schema design, now that the tenant/staff/customer foundation is real.
