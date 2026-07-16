# Laundry Management System — Staff Invite Link PKCE/Implicit Flow Fix — v1

**Date:** 2026-07-16
**Product:** Laundry Management System (LMS)
**Feature:** Ports the exact invite-link root-cause fix already diagnosed and applied in the Territory Management System's `set-password/page.tsx` (see `docs/checkpoints/territory-management-invite-flow-map-recovery-field-rename-v1.md` for the full investigation) to LMS's `src/app/lms/staff/accept-invite/page.tsx`, which had the identical bug.

## Root cause (already proven in TMS, confirmed to apply identically here)
`src/lib/laundry-management-system/supabase.ts`'s `createBrowserSupabase()` is a bare `createBrowserClient(url, anonKey)` call with no `flowType` override — identical shape to TMS's now-fixed client. `@supabase/ssr@0.12.0` hardcodes `flowType: 'pkce'` internally with no way to override it. Supabase's own SDK documents PKCE as unsupported for `admin.inviteUserByEmail()` (the inviting and accepting browsers are different, breaking PKCE's security guarantees), so every LMS staff invite link is guaranteed to be an implicit-flow link (`#access_token=...&refresh_token=...&type=invite`). A PKCE-forced client throws internally (`GoTrueClient.js`'s `_initialize()` mismatch guard) when it tries to auto-process that hash on page load — the error is caught and swallowed, so neither `PASSWORD_RECOVERY` nor `SIGNED_IN` ever fires, and the page shows "invalid or expired" no matter how long you wait, since there was nothing pending to eventually resolve.

## Files Modified
- `src/app/lms/staff/accept-invite/page.tsx` — added a manual hash-parsing fallback: reads `window.location.hash` for `access_token`/`refresh_token` *before* the Supabase client is created (so the client's own failed auto-detection attempt can't be relied on to leave the URL untouched), then calls `supabase.auth.setSession({ access_token, refresh_token })` directly if both are present — this bypasses the broken auto-detection path entirely, since `setSession()` is a direct API call, not the URL-parsing code path with the flow-type mismatch guard. On success, clears the tokens from the visible URL via `window.history.replaceState`. The existing `onAuthStateChange` listener (for `PASSWORD_RECOVERY`/`SIGNED_IN`) and 8-second timeout are unchanged and kept as a secondary path.

## Summary of Changes
- Unlike TMS's `set-password/page.tsx` (shared between password-reset and invite-acceptance, requiring both a hash-based fix and a separate `?code=` PKCE fallback), LMS's `accept-invite/page.tsx` is invite-only — no separate password-reset flow shares this page — so only the hash-based `setSession()` fix was needed here, not the `exchangeCodeForSession()` addition TMS also got for its Admin forgot-password case.
- No LMS-side temp-password redesign was made (unlike TMS, which moved Group Leader accounts off email-link invites entirely this session) — this fix keeps LMS's existing `inviteUserByEmail()`-based flow, just makes the resulting link actually work. Whether LMS should also move to a temp-password model is a separate, bigger product decision not requested here.
- `npx tsc --noEmit` clean, `npx vitest run` 52/52 passing (existing suite untouched — no LMS-specific tests exist for this page), `npx next build` clean across all routes.

## Remaining Work
None for this specific fix.

## Known Issues
- **Not live-verified against a real Supabase invite link** — same standing limitation as TMS: no live `NEXT_PUBLIC_LMS_SUPABASE_URL`/`NEXT_PUBLIC_LMS_SUPABASE_ANON_KEY` credentials in this environment, and this page calls `createBrowserSupabase()` directly on mount, which throws immediately without them. Verified via direct comparison against the TMS fix (same library versions, same bug mechanism, confirmed via reading `@supabase/ssr`/`@supabase/auth-js` source in the prior session) rather than live testing.

## Next Recommended Task
Ready to deploy at Russell's request. After deploying: send a real staff invite and confirm the accept-invite link now works (previously always showed "invalid or expired" regardless of wait time). Separately, worth deciding whether LMS should also move to the temp-password model TMS adopted this session for Group Leader accounts, given both products share this exact fragility class for invite links.
