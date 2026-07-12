'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerSupabase, createAdminSupabase } from '@/lib/laundry-management-system/supabase-server'
import { requireOwnerBusiness, requireCustomerAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import { addCustomerSchema } from '@/lib/laundry-management-system/modules/customer/schema'
import type { ActionResult } from './shared'

const customerSignUpSchema = z.object({
  slug: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(1).max(80),
  phone: z.string().min(1).max(30),
})

// Re-resolves the business from the slug server-side rather than trusting a
// client-submitted business_id, since this route is public.
export async function customerSignUp(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = customerSignUpSchema.safeParse({
    slug: formData.get('slug'),
    email: formData.get('email'),
    password: formData.get('password'),
    fullName: formData.get('fullName'),
    phone: formData.get('phone'),
  })
  if (!parsed.success) return { error: 'Please fill in all fields correctly.' }
  const { slug, email, password, fullName, phone } = parsed.data

  const { data: business } = await createAdminSupabase()
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()
  if (!business) return { error: 'Business not found.' }

  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: 'customer', business_id: business.id, full_name: fullName, phone },
      emailRedirectTo: 'https://www.cyberussell.com/laundry-management-system/login',
    },
  })
  if (error) return { error: error.message }
  if (!data.user) return { error: 'Signup failed — please try again.' }

  if (data.user.identities && data.user.identities.length === 0) {
    return { error: 'An account with this email already exists — please log in instead.' }
  }

  return { error: 'CONFIRM_EMAIL' } // handled as info, not error, in the UI
}

// Owner-side manual add — no auth account, just a customers row (profile_id stays null
// until/unless this person later self-registers with a matching business).
export async function addCustomer(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = addCustomerSchema.safeParse({
    fullName: formData.get('fullName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    notes: formData.get('notes'),
  })
  if (!parsed.success) return { error: 'Enter at least a name and phone number.' }
  const { fullName, phone, email, notes } = parsed.data

  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase
    .from('customers')
    .insert({ business_id: business.id, full_name: fullName, phone, email: email || '', notes })
  if (error) return { error: error.message }

  redirect('/laundry-management-system/dashboard/customers')
}

const updateCustomerProfileSchema = z.object({
  customerId: z.string().uuid(),
  fullName: z.string().min(1).max(80),
  phone: z.string().min(1).max(30),
  email: z.string().email().optional().or(z.literal('')),
})

// Customer-facing "Update Profile" — edits their own customers row for the
// business they're viewing. requireCustomerAccess() + the ownership check below
// keep this scoped to rows that are actually theirs even though a stray id
// could otherwise be submitted from a tampered form.
export async function updateCustomerProfile(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = updateCustomerProfileSchema.safeParse({
    customerId: formData.get('customerId'),
    fullName: formData.get('fullName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
  })
  if (!parsed.success) return { error: 'Please fill in your name and phone correctly.' }
  const { customerId, fullName, phone, email } = parsed.data

  const { supabase, customers } = await requireCustomerAccess()
  if (!customers.some((c) => c.id === customerId)) return { error: 'Profile not found.' }

  const { error } = await supabase
    .from('customers')
    .update({ full_name: fullName, phone, email: email || '' })
    .eq('id', customerId)
  if (error) return { error: error.message }

  return { error: 'SAVED' } // handled as info, not error, in the UI
}
