# Forgot Password Flow — v1

**Date:** 2026-07-08
**Product:** Appointment System
**Feature:** Standard "forgot password" flow (Russell's earlier "what if they forgot their email" question turned out to mean forgot password, not the confirm-email resend built in the previous batch)

## Files Modified
- `src/app/appointments/actions.ts`
- `src/app/appointments/login/page.tsx`
- `src/app/appointments/forgot-password/page.tsx` (new)
- `src/app/appointments/reset-password/page.tsx` (new)

## Summary of Changes
No forgot-password flow existed at all before this — only an in-dashboard `ChangePasswordForm`/`changePassword` action for already-logged-in users (`updateUser({ password })`), nothing for a logged-out user who doesn't remember their password.

1. **`requestPasswordReset(_prev, formData)` (`actions.ts`)**: calls `supabase.auth.resetPasswordForEmail(email, { redirectTo: 'https://www.cyberussell.com/appointments/reset-password' })`. Returns a `'SENT'` sentinel on success. Deliberately doesn't reveal whether the email exists (Supabase itself doesn't leak this either) — same account-enumeration-safe pattern as `signUp`'s existing handling.
2. **`forgot-password/page.tsx`** (new route): email-entry form, shows a neutral "if an account exists, we've sent a link" success state (never confirms/denies the email is registered).
3. **`reset-password/page.tsx`** (new route): the landing page for the emailed link. Client-side, uses `createBrowserSupabase()` and listens for Supabase's `PASSWORD_RECOVERY` auth event (the SDK's own documented pattern, confirmed via `@supabase/auth-js@2.108.2`'s `GoTrueClient.d.ts` doc comments) to know the link is valid, then shows a set-new-password form that calls `supabase.auth.updateUser({ password })` directly. If the event hasn't fired within 4 seconds, shows an "invalid or expired" message with a link back to request a new one.
4. **`login/page.tsx`**: added a "Forgot password?" link under the password field.

**Two live-testing catches worth recording:**
- First cut of `reset-password/page.tsx` also checked `supabase.auth.getSession()` as a fallback in case the `PASSWORD_RECOVERY` event fired before the listener attached. Live-tested this in the browser preview and found it was a **false positive**: this same browser tab had an unrelated already-logged-in session from earlier testing in the session, and `getSession()` returned that session, incorrectly marking the page "ready" even with no real recovery link. Fixed by removing the `getSession()` fallback entirely — only the `PASSWORD_RECOVERY` event itself proves a valid reset link, matching the SDK's documented approach exactly.
- The expiry timeout also had a stale-closure bug (`setTimeout(() => setExpired(!ready && ...))` captured `ready`'s value from the initial render, not the latest one) — fixed with a `readyRef` ref instead of reading component state inside the timeout closure.

Verified live end-to-end: `/appointments/login` shows the new link; `/appointments/forgot-password` submission correctly returns the neutral "check your email" state; `/appointments/reset-password` visited directly (no valid recovery session) correctly shows "This reset link is invalid or has expired" after the fix (confirmed via screenshot). Did **not** verify the full happy path (clicking a real emailed reset link) since that requires actual email access not available in this session — the code follows the SDK's documented pattern exactly, so confidence is high, but this specific path is unverified live.

## Remaining Work
- Russell to do one real end-to-end test: request a reset, click the actual emailed link, confirm the set-new-password form appears and successfully updates the password.
- **Supabase's "Reset Password" email template is still the generic default**, same issue as the "Confirm signup" template fixed earlier this session. Not rebranded in this pass — flagged for Russell if he wants the same branded-HTML treatment applied to it via the Supabase Dashboard.

## Known Issues
None identified in this pass (both bugs found during live testing were fixed before considering this done).

## Next Recommended Task
Russell does the real-email round-trip test. If he wants it, rebrand the "Reset Password" Supabase email template next (same process as "Confirm signup" — Dashboard-only, not code).
