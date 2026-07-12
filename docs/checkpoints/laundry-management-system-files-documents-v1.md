# LMS Files & Documents — v1 (Phase 8e)

**Date:** 2026-07-13
**Product:** Laundry Management System (LMS)
**Feature:** Business logo upload (Supabase Storage) and a real downloadable receipt PDF (phase 8e of the production-readiness roadmap)

## Files Modified
- New: `laundry-management-system/migrations/013_business_logo.sql` — **Russell needs to run this in the LMS Supabase project's SQL Editor before logo upload will work.**
- `src/lib/laundry-management-system/modules/tenant/types.ts` (`Business.logo_url`)
- `src/app/laundry-management-system/actions/settings.ts` (`uploadBusinessLogo`)
- New: `src/components/laundry-management-system/dashboard/BusinessLogoForm.tsx`
- `src/app/laundry-management-system/dashboard/settings/page.tsx` (renders the new form)
- `src/app/laundry-management-system/orders/[orderId]/receipt/page.tsx` (shows the logo; adds a "Download PDF" link)
- New: `src/lib/laundry-management-system/receipt-pdf.tsx` (`ReceiptDocument`, `@react-pdf/renderer`)
- New: `src/app/laundry-management-system/orders/[orderId]/receipt/pdf/route.tsx`
- `package.json` (`@react-pdf/renderer`)

## Summary of Changes

Phase 8d covered UX/reliability polish. This phase (8e) is the "files & documents" item confirmed with Russell back in phase 8a: business logo upload (first pass, logo only) and a real receipt PDF via `@react-pdf/renderer`.

- **Migration** creates a public `business-logos` Storage bucket + owner-only write RLS on `storage.objects` (scoped to each business's own `{business_id}/` folder via `storage.foldername(name)`), plus the `businesses.logo_url` column. Public reads are intentional — logos need to render on receipts/branding without a signed URL, matching how every other public asset in this app works; write access is still locked down.
- **`uploadBusinessLogo`**: validates the file is PNG/JPEG/WebP and ≤2MB, clears any existing file(s) in the business's Storage folder before uploading (so a format change, e.g. png → jpg, doesn't leave the old file behind under its old extension — "one logo per business," no accumulation), then updates `logo_url` with a cache-busted public URL (`?v=<timestamp>`) so the new logo shows immediately even though the storage path is identical to the old one.
- **`BusinessLogoForm`**: file input with an instant client-side preview (`URL.createObjectURL`) before upload, using the `useServerAction` hook from phase 8b/8d — gets a toast for free, no extra wiring.
- **Logo surfaced on the receipt page** (both the HTML view and the new PDF) above the business name, when set — the only display surface touched this pass, per the "logo only, first pass" scope from 8a. Not added to the dashboard sidebar or other branding surfaces; flagged as a natural follow-up if wanted.
- **`ReceiptDocument`** (`@react-pdf/renderer`) mirrors the existing HTML receipt's exact content (logo, business name/address/phone, order #, date, customer, service, status, total, QR code) on an A6 page size (receipt-sized, not full A4/Letter).
- **New route handler** `orders/[orderId]/receipt/pdf` renders the PDF server-side via `renderToBuffer` and streams it back with `Content-Disposition: attachment` — gated by the exact same `requirePagePermission('print_receipts')` check as the existing HTML receipt page, so the access-control story doesn't diverge between the two views. A "Download PDF" link sits next to the existing "Print" button.
- **Fixed one type error found via `tsc`**: `NextResponse` didn't accept a raw Node `Buffer` as its body in this TS lib configuration — wrapped it in `new Uint8Array(buffer)`, a `BodyInit`-compatible view over the same bytes, not a copy.

## Remaining Work (explicitly deferred, not this pass)
- Continue the roadmap: 8f (audit logs table + owner-only Activity History view), 8g (dynamic imports, bundle audit, image optimization).
- Possible follow-up (not asked for, just noted): surfacing the logo on the dashboard sidebar or the public customer-facing pages, if Russell wants the branding to show up beyond the receipt.

## Known Issues
None found.

## Verification
`npx tsc --noEmit` clean (real source files). `npx next build` succeeds with zero errors — confirmed the new `/laundry-management-system/orders/[orderId]/receipt/pdf` route builds and is correctly marked dynamic (`ƒ`, not prerendered), and that `@react-pdf/renderer` bundles without issue.

**Live/functional verification not done this pass** — logo upload cannot be tested at all until Russell runs `013_business_logo.sql` in the Supabase SQL Editor (the Storage bucket and RLS policies don't exist yet), and per the phase 8d follow-up session, further production-database writes for testing purposes trigger the safety classifier's per-action confirmation requirement. Recommend: Russell runs the migration, then a live pass covering — uploading a logo (preview shows immediately, toast confirms, logo appears on Settings/receipt after reload), a format-change upload (old file actually gets removed from Storage, not just superseded), the PDF download (correct content, matches the HTML receipt, opens in a PDF viewer without corruption), and confirming a non-owner (staff without `print_receipts`, or an unrelated business's owner) can't fetch another business's receipt PDF by guessing an order ID.

## Next Recommended Task
Russell runs the migration, then either live-verify this phase or move straight to phase 8f (audit logs).
