# Laundry Management System — Public (No-Login) Customer Order Tracking — v1

**Date:** 2026-07-17
**Product:** Laundry Management System (LMS)
**Feature:** Let customers see their order status without a customer account — fixes the receipt QR code (which actually required an owner/staff login) and adds a manual, phone-verified "Track my order" page.

## Files Modified
- `laundry-management-system/migrations/023_order_public_tracking_token.sql` (new)
- `src/app/lms/actions/tracking.ts` (new)
- `src/app/lms/track/page.tsx`, `src/app/lms/track/[token]/page.tsx` (new)
- `src/lib/laundry-management-system/modules/orders/types.ts`
- `src/lib/laundry-management-system/modules/orders/queries.ts`
- `src/lib/laundry-management-system/modules/orders/qr.ts`
- `src/app/lms/orders/[orderId]/receipt/page.tsx`, `src/app/lms/orders/[orderId]/receipt/pdf/route.tsx`

## Summary of Changes

Russell asked that customers be able to see their orders without logging into a customer account. Followed this repo's AGENTS.md process: read `project-map.md`/`working-on.md`, investigated the current customer-facing order-viewing flow directly (the subagent launcher was temporarily unavailable, so this was done with direct `Read`/`Bash`/`Grep` instead), then used `EnterPlanMode`/`ExitPlanMode` for sign-off before editing.

**Root cause found**: the receipt's QR code ("Scan to track your order") links to `getOrderLookupUrl()` → `/lms/orders/lookup/[orderNumber]`, which calls `requirePagePermission('view_dashboard')` — an owner/staff-only gate — and redirects into the internal dashboard. A customer scanning their own receipt today hits a login wall, not a tracking page. The only working no-login-free path was the separate customer-account dashboard (signup required). One `AskUserQuestion` confirmed scope: also add a manual "Track my order" form (order number + phone), not just fix the QR link — `orders.order_number` (`ORD-000001`) is a plain global `bigserial` (confirmed in migration 008: `order_seq bigserial` + a generated column), so a bare "type in an order number" page would let anyone enumerate other customers' orders by incrementing the number.

**Schema** (migration 023): `orders.public_token text unique default encode(gen_random_bytes(16), 'hex')` — a 128-bit opaque token, same sizing/approach as Territory Management System's existing public assignment/partnership tokens. The volatile default means Postgres evaluates it per-row on the `ALTER TABLE` itself (not a fast metadata-only add), so every existing order got backfilled with a real token in the same statement; a defensive `update ... where public_token is null` follows as a no-op safety net.

**Queries**: `getOrderByPublicToken(token)` — admin-client lookup (no session exists on a public page, so there's no RLS to scope by; the token itself, being unguessable, *is* the access check) — returns a curated join (`items`, and `business:businesses(name, logo_url, currency, address, phone)` for branding) rather than the full internal `OrderWithRelations` shape. `findOrderForTracking(orderNumber, phone)` — the manual-form lookup — resolves by the global `order_number`, then verifies the supplied phone (digits-only normalized to tolerate formatting differences) against either `orders.walk_in_phone` or the linked `customers.phone`, returning `null` for both "no such order" and "phone doesn't match" so the error message never discloses which — same enumeration-avoidance style already established in `customerSignUp`/`resendConfirmation`.

**QR code**: `orders/qr.ts` gained `getOrderTrackingQrDataUrl(token)` pointing at `/lms/track/{token}`. The two **customer-facing** receipt surfaces — the HTML receipt page and the PDF route — switched to it. The existing `getOrderQrDataUrl(orderNumber)` and the internal `/lms/orders/lookup/[orderNumber]` route are both left completely untouched: that QR/route pair is legitimately for staff/owner scanning their own printed order slips to jump around the internal dashboard, a different use case from what was broken.

**New public surface** (zero auth anywhere in this path): `src/app/lms/actions/tracking.ts`'s `trackOrder` action is rate-limited via the existing `checkRateLimit`/`clientIp` helpers (same pattern as `signUp`/`signIn`, `laundry-management-system/rateLimit.ts`) and redirects to `/lms/track/{public_token}` on a successful phone match. `/lms/track/page.tsx` is the manual form (dark auth-chrome styling matching the login/signup pages). `/lms/track/[token]/page.tsx` is the actual tracking view: business name/logo/address/phone, the existing customer-safe `StatusCard` component, the Services/Add-ons item split (reusing `groupOrderItems` from the earlier receipt-splitting work), amount, expected completion, pickup info if requested, and the existing `OrderTimeline` component (whose own doc comment, written during an earlier session, already anticipated "the customer tracking page" as a future consumer). Deliberately excludes every internal-only field already present on the row: `assigned_staff_id`, `driver_id`, `notes`, `created_by`.

`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean — both new routes (`/lms/track`, `/lms/track/[token]`) confirmed present in the build's route list. Live-verified via a temporary scratch route (mock data, no Supabase — removed before finishing) reproducing the tracking page's exact render logic: business branding, the Services/Add-ons split, status badge, timeline, and total all rendered correctly; specifically checked that the mock order's internal `notes` field never appeared anywhere in the rendered output. Also screenshotted the manual `/lms/track` form page directly (real route, no DB dependency) and confirmed it renders correctly.

## Remaining Work
- Migration 023 has not been run against the live LMS Supabase project yet.
- Not committed or deployed.

## Known Issues
- Not live-verified against the real Supabase project (the `public_token` backfill behavior on real existing rows, `findOrderForTracking`'s phone-matching against real `customers`/`orders` data, rate limiting under real traffic) — only verified via a mock-data scratch route and direct reasoning about the migration SQL, same standing limitation noted across every prior LMS session in this environment (no live credentials available here).
- The manual tracking form's phone-normalization strategy (strip all non-digits, compare the remainder) is intentionally permissive about formatting (spaces, dashes, leading `0` vs `+63`) but does mean a phone number entered with a genuinely different country code prefix that happens to share the same trailing digits could theoretically match — an accepted, low-probability tradeoff for usability over strict formatting, not flagged as a fix-now issue.

## Next Recommended Task
Russell: (1) applies migration 023 in the LMS Supabase SQL editor; (2) spot-checks that existing orders got backfilled with a `public_token` (`select order_number, public_token from orders limit 5`); (3) prints/reprints a real receipt and scans its QR code while logged out, confirming it opens the tracking page with zero login prompt; (4) tries the `/lms/track` manual form with both a correct and an incorrect phone number for the same order. Then commit + deploy at Russell's request.
