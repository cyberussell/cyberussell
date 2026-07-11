# Laundry Management System (LMS) Setup Guide

The Laundry Management System is a standalone multi-tenant SaaS for laundry businesses at
`/laundry-management-system`. It runs on its **own Supabase project** (separate from the main
site's and from the Appointment System's) so it can be deployed and scaled independently.
All code lives in three scoped places:

- `src/app/laundry-management-system/` — routes (landing page today; auth + dashboards next)
- `src/lib/laundry-management-system/` — core logic (auth, Supabase clients, types)
- `src/components/laundry-management-system/` — UI components
- `laundry-management-system/` — migrations + this guide

## 1. Create the dedicated Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project** → name it `laundry-management-system`.
2. Open **SQL Editor** and run every file in `laundry-management-system/migrations/` in order (001 → ...).
3. In **Authentication → Providers → Email**: keep Email enabled. Decide whether to require
   email confirmation before dashboard access (owner/staff) vs. the customer booking flow.
4. Copy the keys from **Settings → API** into `.env.local`:

```
NEXT_PUBLIC_LMS_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_LMS_SUPABASE_ANON_KEY=sb_publishable_xxxx
LMS_SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxxx   # server-only, never NEXT_PUBLIC
```

## 2. Roles

Three roles share the same `auth.users` table, distinguished by `profiles.role`:

- **owner** — creates the business (tenant) at signup, manages branches, staff, and billing.
- **staff** — invited by an owner, linked to a business (and optionally a specific branch) via
  `staff_members`, handles day-to-day order/inventory processing.
- **customer** — books/orders through the public storefront, linked to a business's `customers`
  row via `profile_id` once they create an account.

`profiles.role` defaults to `customer` on signup (see the `handle_new_user` trigger in
`001_init.sql`); the owner-signup flow should pass `role: 'owner'` in the signup metadata.

## 3. What's not built yet

- Signup/login pages, onboarding wizard, dashboard routes — not started.
- Orders, services (wash types), and inventory tables — deferred to the migration that adds
  that feature, not part of `001_init.sql`.
- Public API endpoints for a future client-facing marketing site to consume (booking, services,
  business info, QR generation) — per the product's architecture, marketing sites must never
  query the database directly.
