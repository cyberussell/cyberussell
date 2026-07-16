'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { z } from 'zod'
import { createServerSupabase, createAdminSupabase } from '@/lib/laundry-management-system/supabase-server'
import { checkRateLimit, clientIp } from '@/lib/laundry-management-system/rateLimit'
import type { UserRole } from '@/lib/laundry-management-system/modules/auth/types'
import { type ActionResult } from './shared'

// ── Auth ─────────────────────────────────────────────────────────────────────

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function signUp(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const ip = clientIp(await headers())
  if (!(await checkRateLimit(`lms-signup:${ip}`, 5))) {
    return { error: 'Too many signup attempts — please wait a minute and try again.' }
  }

  const parsed = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) return { error: 'Enter a valid email and a password of at least 8 characters.' }
  const { email, password } = parsed.data

  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: 'owner' },
      emailRedirectTo: 'https://www.cyberussell.com/lms/login',
    },
  })
  if (error) return { error: error.message }
  if (!data.user) return { error: 'Signup failed — please try again.' }

  // Supabase returns a fake user (empty identities) instead of an error when
  // the email is already registered, to prevent account enumeration.
  if (data.user.identities && data.user.identities.length === 0) {
    return { error: 'An account with this email already exists — please log in instead.' }
  }

  return { error: 'CONFIRM_EMAIL' } // handled as info, not error, in the UI
}

const ROLE_REDIRECT: Record<UserRole, string> = {
  owner: '/lms/dashboard',
  staff: '/lms/staff/dashboard',
  customer: '/lms/customer/dashboard',
}

export async function signIn(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const ip = clientIp(await headers())
  if (!(await checkRateLimit(`lms-login:${ip}`, 10))) {
    return { error: 'Too many login attempts — please wait a minute and try again.' }
  }

  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    if (error.code === 'email_not_confirmed') return { error: 'EMAIL_NOT_CONFIRMED' } // handled as info, not error, in the UI
    return { error: 'Invalid email or password.' }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, must_change_password')
    .eq('id', data.user.id)
    .single()

  // Set on staff invite and on an owner-triggered password reset (temp-password flow,
  // replacing the emailed invite-link flow) — blocks reaching the dashboard until a real
  // password is chosen.
  if (profile?.must_change_password) redirect('/lms/change-password')

  const role = (profile?.role as UserRole | undefined) ?? 'owner'
  redirect(ROLE_REDIRECT[role])
}

// Called directly from the login page via useTransition (not through useActionState/a
// <form> action) — it lives on the same form as signIn, and two useActionState hooks
// bound to one <form> unreliably route to the wrong action on submit.
export async function resendConfirmation(email: string): Promise<ActionResult> {
  const trimmed = email.trim()
  if (!trimmed) return { error: 'Enter your email above first, then resend.' }
  const supabase = await createServerSupabase()
  const { error } = await supabase.auth.resend({ type: 'signup', email: trimmed })
  if (error) return { error: 'Could not resend — please try again in a moment.' }
  return {}
}

export async function requestPasswordReset(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const ip = clientIp(await headers())
  if (!(await checkRateLimit(`lms-reset:${ip}`, 5))) {
    return { error: 'Too many reset attempts — please wait a minute and try again.' }
  }

  const email = String(formData.get('email') ?? '').trim()
  if (!email) return { error: 'Enter your email address.' }
  const supabase = await createServerSupabase()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://www.cyberussell.com/lms/reset-password',
  })
  if (error) return { error: 'Could not send reset link — please try again in a moment.' }
  return { error: 'SENT' } // handled as info, not error, in the UI
}

export async function signOut(): Promise<void> {
  const supabase = await createServerSupabase()
  await supabase.auth.signOut()
  redirect('/lms/login')
}

// Reached only via a forced redirect (must_change_password) — the account was just invited or
// reset with a temp password the owner relayed directly. No token/link to verify here — the
// user already has a real session by the time they land on this page, just one flagged as
// needing a real password before it can be used anywhere else. Deliberately doesn't go through
// requireOwnerBusiness()/requireStaffAccess() — those would redirect back here in a loop while
// the flag is still set.
export async function changePasswordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirm') ?? '')
  if (password.length < 8) return { error: 'Password must be at least 8 characters.' }
  if (password !== confirm) return { error: 'Passwords do not match.' }

  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Your session expired — please log in again.' }

  const { error: updateError } = await supabase.auth.updateUser({ password })
  if (updateError) return { error: updateError.message }

  const admin = createAdminSupabase()
  const { data: profile, error: profileError } = await admin
    .from('profiles')
    .update({ must_change_password: false })
    .eq('id', user.id)
    .select('role')
    .maybeSingle()
  if (profileError) return { error: 'Password updated, but could not finish setup — please contact your business owner.' }

  const role = profile?.role as UserRole | undefined
  redirect(role ? ROLE_REDIRECT[role] : '/lms/login')
}
