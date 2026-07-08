# Email Confirmation UX — v1

**Date:** 2026-07-08
**Product:** Appointment System
**Feature:** Clear messaging + a resend option when a user tries to log in before confirming their email

## Files Modified
- `src/app/appointments/actions.ts`
- `src/app/appointments/login/page.tsx`
- `src/app/appointments/signup/page.tsx`

## Summary of Changes
Russell asked: after signup, tell the user they must confirm their email before logging in, and handle the case where they try to log in without having confirmed yet. Previously `signIn()` returned a generic "Invalid email or password" for an unconfirmed account, which was misleading and gave no path forward.

1. **`signIn()` (`actions.ts`)**: now inspects `error.code` from Supabase's `signInWithPassword` response — `'email_not_confirmed'` (confirmed as the reliable field via the installed `@supabase/auth-js@2.108.2` SDK's own doc comments, more reliable than string-matching `error.message`) returns a distinct `{ error: 'EMAIL_NOT_CONFIRMED' }` sentinel instead of the generic message.
2. **New `resendConfirmation(email: string)` action**: calls `supabase.auth.resend({ type: 'signup', email })`.
3. **`login/page.tsx`**: when `state.error === 'EMAIL_NOT_CONFIRMED'`, shows a distinct amber banner ("Please confirm your email before logging in...") with a "Resend confirmation email" button, and a success/error message after clicking it.
4. **`signup/page.tsx`**: tightened the post-signup "Check your email" copy to explicitly state confirmation is required before login, and points to the login page's resend option if the email never arrived.

**Implementation detour worth recording:** the first version wired `resendConfirmation` through a second `useActionState` hook, with its dispatcher attached via `formAction={resendAction}` on a `<button>` nested inside the main login `<form action={formAction}>` (the documented "nested form elements / multiple Server Actions" pattern — confirmed against `node_modules/next/dist/docs/01-app/02-guides/forms.md`, since this project's `AGENTS.md` requires checking this repo's actual Next.js docs before assuming standard-library behavior). This did not work in practice: live-testing in the browser preview showed the resend button's click submitted the form's *default* action (`signIn`) instead of its own `formAction` override — confirmed by inspecting the actual server-action response payload via `preview_network`, which came back as `{"error":"EMAIL_NOT_CONFIRMED"}` (signIn's shape, not resendConfirmation's). Two separate `useActionState` hooks bound to the same physical `<form>` element appears to be the trigger; the fix was to stop using `useActionState`/a form action for the resend path entirely and instead call `resendConfirmation` directly from an `onClick` handler wrapped in `useTransition` — also a documented pattern (`07-mutating-data.md`'s "useEffect"/direct-invocation section). `resendConfirmation`'s signature changed from `(_prev, formData)` to a plain `(email: string)` to match. Re-tested live after the fix and confirmed the full loop works (screenshot taken).

Verified end-to-end live: signed up a real test account (`+resendtest@gmail.com`), left it unconfirmed, attempted login → got the amber "please confirm" banner, clicked resend → confirmed via network inspection that Supabase's resend endpoint was called and the UI correctly showed "Confirmation email resent — check your inbox." `npx tsc --noEmit` clean throughout.

## Remaining Work / Open Question for Russell
Russell's original ask included "what if they forgot their email?" — this was interpreted as **"forgot to confirm the email they were sent"** (i.e., didn't complete the confirmation step, possibly because the email was lost/deleted/never arrived), which is what the resend flow above addresses. If Russell actually meant **"forgot which email address they used to sign up"** (a genuine account-recovery-by-name/business scenario, not a resend), that's a different and harder feature not built here — flagged for Russell to clarify if needed.

## Known Issues
None identified in this pass.

## Next Recommended Task
Confirm with Russell whether the "forgot their email" interpretation above matches intent, or whether a separate "I don't remember my email" recovery flow is also wanted.
