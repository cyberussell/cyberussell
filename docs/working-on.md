# Current Work

Current Product: Appointment System

Current Feature: 5-part feature batch — (1) business type multi-select ✅ done, (2) booking page staff-name/phone validation, (3) month-view calendar, (4) Google Maps address, (5) PayMongo (SaaS billing + end-customer payments incl. subscriptions)

Current Goal: Ship all 5 in order; #1, #2, #3 complete and verified live. #4 (Google Maps) paused, deferred by Russell. #5 (PayMongo) in progress — SaaS billing "Pay Now" checkout built and verified end-to-end in a real browser; webhook auto-sync is the one remaining piece, blocked on a public URL.

Current Status: Feature #1 done — migration `006_multi_business_type.sql` applied live, code updated (types.ts, terminology.ts, signup/page.tsx, actions.ts, 12 read-sites), verified end-to-end (multi-type signup succeeded against production DB). Feature #2 done — [businessSlug]/page.tsx, BookingWidget.tsx, api/book/route.ts updated for conditional staff-name display + strict PH phone validation, verified live on the "Bright Bright" test business (single-staff hides name, 2-staff shows name, invalid phone blocked, valid phone booked successfully). Feature #3 done — AppointmentsMonthGrid.tsx (new) + dashboard/appointments/page.tsx updated with Week/Month toggle, verified live (correct grid, count badges, day-click drill-down to the right week). Feature #4 paused — Russell said "not now for the map," holding until requested again. Feature #5 in progress: PayMongo Subscriptions API turned out to be disabled on the account (confirmed via API test — `resource_not_found` on `/v1/plans`) and requires PayMongo support to enable it; Russell chose to build a custom "Pay Now" checkout instead (Checkout Sessions API, confirmed working) rather than wait. Built: migration `007_paymongo_billing.sql` (paymongo_checkout_session_id, plan_renews_at on businesses), `src/lib/appointment-system/paymongo.ts` (checkout session creation + webhook signature verification), `dashboard/billing/page.tsx` + `BillingPlanCard.tsx` (tier picker, "Pay Now" buttons), `initiateBillingCheckout` action in actions.ts, lazy overdue-suspend check added to `requireBusiness()` in auth.ts, "Billing" added to NavTabs.tsx, and the webhook route `api/paymongo/webhook/route.ts` (listens for `checkout_session.payment.paid`). Verified live in Russell's real browser: clicking "Pay Now" correctly redirects to PayMongo's hosted checkout page with the right plan/price/business metadata.

**Next step for Feature #5:** the webhook needs a public URL to register with PayMongo (localhost isn't reachable by PayMongo's servers) — waiting on Russell to provide either a live Vercel deployment URL or a tunnel (e.g. ngrok) for local testing, then register the webhook in the PayMongo dashboard and share the resulting `whsk_...` secret so it can be added as `APPOINTMENTS_PAYMONGO_WEBHOOK_SECRET`. Until then, "Pay Now" checkout works but plan_tier/plan_status won't auto-update on successful payment.

**Latest batch — mobile dashboard nav + week-view fix + Messenger staff choice (not yet verified live, built on branch `claude/appointments-mobile-dropdown-staff-zpcy2j`):**
- **`NavTabs.tsx`**: on mobile (`<sm`) the 10-tab horizontal scroller is replaced with a native `<select>` dropdown (same active-tab detection, same `clientsLabel` override); desktop/tablet keeps the existing tab strip (`sm:flex`), unchanged.
- **Week-view calendar mobile fix** (`dashboard/appointments/page.tsx`): the 7-day grid used `grid grid-cols-7` + per-cell `min-w-[90px]` inside `overflow-x-auto`, which rendered with overlapping day columns on mobile Safari (confirmed via screenshot — days/appointment cards visually overlapping). Replaced with a `flex` row of `w-[104px] shrink-0` cells inside a `-mx-4 overflow-x-auto` wrapper on mobile, switching back to `sm:grid sm:grid-cols-7` (no horizontal scroll) at `sm:` and up. Desktop/tablet layout unchanged.
- **Messenger booking: optional staff choice** (`flow.ts`, `types.ts`): previously `showSlots` sent one quick-reply per (staff, time) slot with only the time as the title — if 2+ staff were free at the same time, the customer saw duplicate-looking buttons with no way to tell them apart or choose. Now mirrors the web `BookingWidget` pattern: slots are de-duped by start time first (`TIME_{epochMs}` payload); picking a time re-checks candidates for that exact time, and only if 2+ staff are actually free does the bot ask "Sino po ang gusto ninyong puntahan?" with a staff-name quick-reply (`STAFF_{staffId}_{epochMs}`) — single-staff businesses or slots never see the extra step. Added `choosing_staff` to `FlowStep`. Replaced the old combined `SLOT_{staffId}_{epochMs}` payload entirely (no back-compat shim — in-flight conversations mid-pick are a negligible edge case).
- Verified: `npx tsc --noEmit` clean and `npx next build` succeeds for all three changes. Not yet manually verified in a real browser/Messenger thread — pending Russell's review.

**Since the above, additional work done (deployed live):**
- Public booking page + BookingWidget fully redesigned (premium glass UI) and flow reworked to calendar-first: service → month calendar → time → staff (only if 2+ actually free at that slot) → details. Deployed.
- Billing page cards: full feature list per tier + equal-height cards. Deployed.
- **Messenger integration set up and working**: new dedicated Meta app "Cyberussell Appointment System", test Page "Cyberussell Test Clinic" (Page ID `1202963049564774`) connected to "Bright Bright", webhook registered and verified live, full booking-via-Messenger flow tested (including human handoff via "Talk to staff" — working as designed, not a bug).
- **New booking guardrails batch** (see checkpoint `appointment-system-booking-guardrails-v1.md`): same-day booking limit (1 active appointment/day per customer, self-service channels only), reference code + QR code on every booking (migration `008_booking_reference.sql`, new `qrcode` dependency), business hours gate in Settings (blocks the booking page/API/Messenger until at least one day's hours are set — does not constrain staff Availability), and week-view "+N more" expansion in the dashboard Appointments tab. All verified live.
- Still pending from the guardrails batch: the public `/appointments/manage/[code]` self-service cancel/reschedule page, and Messenger-side self-service cancel/reschedule (currently "cancel" intent still hands off to a human).

**Latest batch (see checkpoint `appointment-system-manage-booking-plans-v1.md`), all verified live:**
- **Manage-booking page built**: `/appointments/manage/[code]` (+ `/appointments/manage` code-entry fallback) — customers can self-service reschedule (full calendar→time→staff flow, reused from booking) or cancel, no login needed (reference code is the credential). `MonthCalendar` extracted to its own shared component for this reuse.
- **Business's own booking-page QR** added to Settings (Business Profile section), server-generated via `qrcode`, downloadable.
- **Settings page compressed** to a 2-column CSS multi-column layout on desktop (`lg:columns-2`), mobile unaffected.
- **Plan restructure — AI Receptionist tier fully removed** (migration `009_remove_ai_receptionist_tier.sql`, folds any business on that tier into `pro`): now 3 tiers — Free (100 appts/mo, 1 staff), Basic (150 appts/mo, 5 staff), Pro (unlimited appts, unlimited staff). The AI free-text answering capability was deleted entirely (removed `ai.ts`, simplified `flow.ts`), not preserved anywhere. Landing page pricing cards/comparison table updated to match, but its FAQs/meta description/`AiDemo` component still reference the old AI positioning — flagged, not rewritten (separate content decision).
- **Reference code format changed to 6-digit numeric** (was an 8-char alphanumeric code from a fixed unambiguous alphabet). `generateReferenceCode()` in `slots.ts` now returns 6 random digits; the manage-page code-entry placeholder updated to match. Verified live end-to-end: booked a real test appointment on "Bright Bright" and got a 6-digit code, confirmed the `/appointments/manage/[code]` lookup and cancel flow both work with it, then cancelled the test booking.
- **All of the above (guardrails batch + manage/plans batch + reference-code format change) committed and pushed to `main` in this session** — previously sitting uncommitted in the working tree despite being marked "verified live" against the production Supabase DB. `.claude/settings.local.json` was deliberately left out of the commit (local tool permissions, not product code — also currently contains a hardcoded Supabase secret key in one of its allowlist entries, flagged to Russell separately, not rotated).

Branch: main (working directly, no feature branch)

Priority: Sequential — do not start #2 until user confirms readiness (already confirmed order, currently proceeding).

----------------------------------------

## Allowed Files

- `src/app/appointments/**`
- `src/components/appointment-system/**`
- `src/lib/appointment-system/**`
- `appointment-system/migrations/**`

----------------------------------------

## Blocked Areas

- Any other product (Start Here, AI Tools, Learn, Earn, Services, Shop)
- Mission Control (`src/app/mission-control/*`, `src/app/api/mission-control/*`)
- Shared site components (`Navbar.tsx`, main `Footer.tsx`) — Appointment System dashboard uses its own `NavTabs.tsx`

----------------------------------------

## Current Dependencies

- Feature #4 (Google Maps) needs a Google Cloud API key from Russell (Places + Maps JS/Embed API, billing enabled) — paused/deferred, not currently being worked on.
- Feature #5 (PayMongo) — SaaS billing "Pay Now" checkout is built and working using the shop's existing PayMongo account/keys (`PAYMONGO_SECRET_KEY`/`PAYMONGO_PUBLIC_KEY`, confirmed intentional reuse, same merchant "Payjobs.work Manpower Services"). **Blocked on:** a public URL (Vercel deployment or ngrok tunnel) so the webhook can be registered with PayMongo and its signing secret added as `APPOINTMENTS_PAYMONGO_WEBHOOK_SECRET`. End-customer payments/subscriptions (the other half of #5) not yet started.

----------------------------------------

## Success Criteria

- [x] Feature #1 complete (business type multi-select)
- [x] Feature #2 complete (booking page: conditional staff name display, 11-digit PH mobile phone validation client+server)
- [x] Feature #3 complete (month-view calendar in Appointments tab)
- [ ] Feature #4 complete (Google Maps address autocomplete + booking page map) — paused
- [x] Feature #5a "Pay Now" checkout UI + server action + checkout session creation — done, verified live
- [ ] Feature #5a webhook registered with PayMongo (needs public URL) + `APPOINTMENTS_PAYMONGO_WEBHOOK_SECRET` added + end-to-end payment→plan-activation test
- [ ] Feature #5b end-customer payments/subscriptions (not started)
- [ ] Mobile layout approved
- [ ] Desktop layout approved
- [ ] Accessibility reviewed
- [ ] Performance acceptable
- [ ] SEO reviewed
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Ready for testing
- [ ] Ready for deployment

----------------------------------------

## Notes

- Naming: "BooklyPro" is a retired/copyrighted name — never use it; product is "Appointment System" everywhere (UI, code, docs).
- `BOOKLYPRO_*` env var prefix in `.env.local`/`.env.example` is a known stale holdout, rename pending Russell's go-ahead (separate task, not part of this batch).
- Test signup accounts created during verification: `russell.a.parayno+multitype@gmail.com` (orphaned — auth user exists but no business row, safe to ignore/delete), `russell.a.parayno+multitype2@gmail.com` (successful, has businesses row with business_types = {medical,dental,spa}).
- Test business "Bright Bright" (slug `bright-bright`, owner `russell.a.parayno+1@gmail.com`) was bumped to `plan_tier = 'pro'` during feature #2 testing to get past the Free tier's 1-provider limit — still on `pro` now, not reverted. Has 2 staff (Dr Vonne, Dr. Maya), 2 services (Cleaning, Crowning), and a couple of test appointments booked during feature #2/#3 verification.
- **Known bug, not yet fixed (flagged, no decision from Russell yet):** plan-limit-gated server actions (`createStaff` confirmed, likely others in `actions.ts`) fail completely silently with no user-facing error when a plan limit is hit — the form just does nothing.
