'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerSupabase } from '@/lib/laundry-management-system/supabase-server'

export type ActionResult = { error?: string }

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50)
}

// ── Auth ─────────────────────────────────────────────────────────────────────

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function signUp(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
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
    options: { data: { role: 'owner' } },
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

export async function signIn(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const supabase = await createServerSupabase()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    if (error.code === 'email_not_confirmed') return { error: 'EMAIL_NOT_CONFIRMED' } // handled as info, not error, in the UI
    return { error: 'Invalid email or password.' }
  }
  redirect('/laundry-management-system/dashboard')
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
  const email = String(formData.get('email') ?? '').trim()
  if (!email) return { error: 'Enter your email address.' }
  const supabase = await createServerSupabase()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://www.cyberussell.com/laundry-management-system/reset-password',
  })
  if (error) return { error: 'Could not send reset link — please try again in a moment.' }
  return { error: 'SENT' } // handled as info, not error, in the UI
}

export async function signOut(): Promise<void> {
  const supabase = await createServerSupabase()
  await supabase.auth.signOut()
  redirect('/laundry-management-system/login')
}

// ── Onboarding ───────────────────────────────────────────────────────────────

const createBusinessSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(1).max(30),
  address: z.string().min(1).max(200),
})

export async function createBusiness(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = createBusinessSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    address: formData.get('address'),
  })
  if (!parsed.success) return { error: 'Please fill in your business name, phone, and address.' }
  const { name, phone, address } = parsed.data

  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/laundry-management-system/login')

  let slug = slugify(name)
  if (slug.length < 3) slug = `laundry-${slug}`
  const { count } = await supabase.from('businesses').select('id', { count: 'exact', head: true }).eq('slug', slug)
  if (count && count > 0) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`

  const { error } = await supabase.from('businesses').insert({ owner_id: user.id, name, slug, phone, address })
  if (error) return { error: error.message }

  redirect('/laundry-management-system/dashboard')
}
