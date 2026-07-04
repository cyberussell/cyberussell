'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerSupabase, createAdminSupabase } from '@/lib/booklypro/supabase-server'
import { requireClinic } from '@/lib/booklypro/auth'
import { logEvent } from '@/lib/booklypro/events'

export interface ActionResult {
  error?: string
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50)
}

// ── Auth ─────────────────────────────────────────────────────────────────────

const signUpSchema = z.object({
  fullName: z.string().min(2).max(80),
  clinicName: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function signUp(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse({
    fullName: formData.get('fullName'),
    clinicName: formData.get('clinicName'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) return { error: 'Please fill in all fields (password: 8+ characters).' }
  const { fullName, clinicName, email, password } = parsed.data

  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })
  if (error) return { error: error.message }
  if (!data.user) return { error: 'Signup failed — please try again.' }

  // Clinic row is created with the service role so signup works even when
  // email confirmation is enabled (no session yet → RLS would block it).
  const admin = createAdminSupabase()
  let slug = slugify(clinicName)
  if (slug.length < 3) slug = `clinic-${slug}`
  const { count } = await admin.from('clinics').select('id', { count: 'exact', head: true }).eq('slug', slug)
  if (count && count > 0) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`

  const { error: clinicError } = await admin
    .from('clinics')
    .insert({ owner_id: data.user.id, name: clinicName, slug })
  if (clinicError) return { error: clinicError.message }

  await logEvent(admin, null, 'clinic_signed_up', { clinic_name: clinicName, slug })

  if (!data.session) {
    return { error: 'CONFIRM_EMAIL' } // handled as info, not error, in the UI
  }
  redirect('/appointments/dashboard')
}

export async function signIn(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const supabase = await createServerSupabase()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: 'Invalid email or password.' }
  redirect('/appointments/dashboard')
}

export async function signOut(): Promise<void> {
  const supabase = await createServerSupabase()
  await supabase.auth.signOut()
  redirect('/appointments/login')
}

// ── Services ─────────────────────────────────────────────────────────────────

export async function createService(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  const name = String(formData.get('name') ?? '').trim()
  const duration = Number(formData.get('duration_min'))
  const price = Number(formData.get('price'))
  if (!name || !Number.isFinite(duration) || duration < 5) return
  await supabase.from('services').insert({
    clinic_id: clinic.id,
    name,
    duration_min: Math.round(duration),
    price: Number.isFinite(price) ? price : 0,
  })
  revalidatePath('/appointments/dashboard/services')
}

export async function toggleService(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  const id = String(formData.get('id'))
  const active = formData.get('active') === 'true'
  await supabase.from('services').update({ active: !active }).eq('id', id).eq('clinic_id', clinic.id)
  revalidatePath('/appointments/dashboard/services')
}

export async function deleteService(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  await supabase.from('services').delete().eq('id', String(formData.get('id'))).eq('clinic_id', clinic.id)
  revalidatePath('/appointments/dashboard/services')
}

// ── Staff ────────────────────────────────────────────────────────────────────

export async function createStaff(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  const name = String(formData.get('name') ?? '').trim()
  if (!name) return
  await supabase.from('staff').insert({
    clinic_id: clinic.id,
    name,
    title: String(formData.get('title') ?? '').trim(),
  })
  revalidatePath('/appointments/dashboard/staff')
}

export async function toggleStaff(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  const id = String(formData.get('id'))
  const active = formData.get('active') === 'true'
  await supabase.from('staff').update({ active: !active }).eq('id', id).eq('clinic_id', clinic.id)
  revalidatePath('/appointments/dashboard/staff')
}

export async function deleteStaff(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  await supabase.from('staff').delete().eq('id', String(formData.get('id'))).eq('clinic_id', clinic.id)
  revalidatePath('/appointments/dashboard/staff')
}

// ── Availability ─────────────────────────────────────────────────────────────

export async function addAvailability(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  const staffId = String(formData.get('staff_id'))
  const day = Number(formData.get('day_of_week'))
  const start = String(formData.get('start_time'))
  const end = String(formData.get('end_time'))
  if (!staffId || !(day >= 0 && day <= 6) || !start || !end || start >= end) return
  await supabase.from('availability').insert({
    clinic_id: clinic.id,
    staff_id: staffId,
    day_of_week: day,
    start_time: start,
    end_time: end,
  })
  revalidatePath('/appointments/dashboard/availability')
}

export async function deleteAvailability(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  await supabase
    .from('availability')
    .delete()
    .eq('id', String(formData.get('id')))
    .eq('clinic_id', clinic.id)
  revalidatePath('/appointments/dashboard/availability')
}

// ── Appointments ─────────────────────────────────────────────────────────────

export async function updateAppointmentStatus(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  const id = String(formData.get('id'))
  const status = String(formData.get('status'))
  if (!['confirmed', 'completed', 'cancelled', 'no_show'].includes(status)) return
  await supabase.from('appointments').update({ status }).eq('id', id).eq('clinic_id', clinic.id)
  const admin = createAdminSupabase()
  await logEvent(admin, clinic.id, `appointment_${status}`, { appointment_id: id })
  revalidatePath('/appointments/dashboard')
  revalidatePath('/appointments/dashboard/appointments')
}

// ── Conversations ────────────────────────────────────────────────────────────

export async function resumeBot(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  await supabase
    .from('conversations')
    .update({ mode: 'bot' })
    .eq('id', String(formData.get('id')))
    .eq('clinic_id', clinic.id)
  revalidatePath('/appointments/dashboard/conversations')
}

// ── Settings ─────────────────────────────────────────────────────────────────

export async function updateClinicProfile(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  const name = String(formData.get('name') ?? '').trim()
  if (!name) return
  await supabase
    .from('clinics')
    .update({
      name,
      phone: String(formData.get('phone') ?? '').trim(),
      address: String(formData.get('address') ?? '').trim(),
    })
    .eq('id', clinic.id)
  revalidatePath('/appointments/dashboard/settings')
}

// Facebook Page connection. v1: owner pastes Page ID + Page Access Token from
// the Meta developer console (dev-mode testers). OAuth flow comes with app review.
export async function saveFbConnection(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  const pageId = String(formData.get('fb_page_id') ?? '').trim()
  const pageToken = String(formData.get('fb_page_token') ?? '').trim()
  if (!pageId || !pageToken) return

  const { error } = await supabase.from('clinics').update({ fb_page_id: pageId }).eq('id', clinic.id)
  if (error) return

  // Token goes into the service-role-only table.
  const admin = createAdminSupabase()
  await admin
    .from('clinic_secrets')
    .upsert({ clinic_id: clinic.id, fb_page_token: pageToken, updated_at: new Date().toISOString() })
  await logEvent(admin, clinic.id, 'fb_page_connected', { page_id: pageId })
  revalidatePath('/appointments/dashboard/settings')
}
