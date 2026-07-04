'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerSupabase, createAdminSupabase } from '@/lib/appointment-system/supabase-server'
import { requireClinic } from '@/lib/appointment-system/auth'
import { logEvent } from '@/lib/appointment-system/events'
import { bookAppointment, wallTimeToUtc } from '@/lib/appointment-system/slots'

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

export async function createManualAppointment(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { supabase, clinic } = await requireClinic()
  const fullName = String(formData.get('fullName') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const serviceId = String(formData.get('service_id') ?? '')
  const staffId = String(formData.get('staff_id') ?? '')
  const when = String(formData.get('starts_at') ?? '')
  const note = String(formData.get('note') ?? '').trim()

  if (fullName.length < 2 || !serviceId || !staffId || !when) {
    return { error: 'Please fill in name, service, staff, and date/time.' }
  }
  const startsAt = wallTimeToUtc(when, clinic.timezone)
  if (!startsAt) return { error: 'Invalid date/time.' }

  const result = await bookAppointment(supabase, {
    clinicId: clinic.id,
    serviceId,
    staffId,
    startsAt: startsAt.toISOString(),
    patient: { fullName, phone },
    source: 'manual',
    intakeNote: note,
  })
  if (!result.ok) {
    return {
      error:
        result.reason === 'conflict'
          ? 'That staff member already has an appointment at that time.'
          : result.message,
    }
  }
  const admin = createAdminSupabase()
  await logEvent(admin, clinic.id, 'booking_created', {
    appointment_id: result.appointmentId,
    source: 'manual',
  })
  revalidatePath('/appointments/dashboard/appointments')
  revalidatePath('/appointments/dashboard')
  return {}
}

export async function rescheduleAppointment(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { supabase, clinic } = await requireClinic()
  const id = String(formData.get('id') ?? '')
  const when = String(formData.get('starts_at') ?? '')

  const startsAt = wallTimeToUtc(when, clinic.timezone)
  if (!id || !startsAt) return { error: 'Invalid date/time.' }

  const { data: appt } = await supabase
    .from('appointments')
    .select('id, services(duration_min)')
    .eq('id', id)
    .eq('clinic_id', clinic.id)
    .single()
  const duration = (appt?.services as { duration_min?: number } | null)?.duration_min
  if (!appt || !duration) return { error: 'Appointment not found.' }

  const endsAt = new Date(startsAt.getTime() + duration * 60_000)
  const { error } = await supabase
    .from('appointments')
    .update({ starts_at: startsAt.toISOString(), ends_at: endsAt.toISOString(), status: 'confirmed' })
    .eq('id', id)
    .eq('clinic_id', clinic.id)
  if (error) {
    return {
      error:
        error.code === '23P01'
          ? 'That staff member already has an appointment at that time.'
          : error.message,
    }
  }
  const admin = createAdminSupabase()
  await logEvent(admin, clinic.id, 'appointment_rescheduled', { appointment_id: id })
  revalidatePath('/appointments/dashboard/appointments')
  revalidatePath('/appointments/dashboard')
  return {}
}

export async function recordPayment(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const { supabase, clinic } = await requireClinic()
  const id = String(formData.get('id') ?? '')
  const amount = Number(formData.get('amount'))
  const dateStr = String(formData.get('paid_date') ?? '')

  if (!id || !Number.isFinite(amount) || amount < 0) return { error: 'Enter a valid amount.' }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return { error: 'Enter a valid date.' }
  // Midday clinic time keeps the date stable across timezones.
  const paidAt = wallTimeToUtc(`${dateStr}T12:00`, clinic.timezone)
  if (!paidAt) return { error: 'Enter a valid date.' }

  const { error } = await supabase
    .from('appointments')
    .update({
      amount_paid: amount,
      paid_at: amount > 0 ? paidAt.toISOString() : null,
    })
    .eq('id', id)
    .eq('clinic_id', clinic.id)
  if (error) return { error: error.message }

  const admin = createAdminSupabase()
  await logEvent(admin, clinic.id, 'payment_recorded', { appointment_id: id, amount })
  revalidatePath('/appointments/dashboard')
  revalidatePath('/appointments/dashboard/appointments')
  revalidatePath('/appointments/dashboard/patients')
  return {}
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

// Temporarily-closed notice: pauses Messenger + web booking with a message.
export async function updateClosedNotice(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  const closed = formData.get('closed') === 'on'
  const message = String(formData.get('closed_message') ?? '').trim().slice(0, 300)
  await supabase
    .from('clinics')
    .update({ settings: { ...clinic.settings, closed, closed_message: message } })
    .eq('id', clinic.id)
  revalidatePath('/appointments/dashboard/settings')
  revalidatePath('/appointments/dashboard')
}

export async function changePassword(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirm') ?? '')
  if (password.length < 8) return { error: 'Password must be at least 8 characters.' }
  if (password !== confirm) return { error: 'Passwords do not match.' }
  const supabase = await createServerSupabase()
  const { error } = await supabase.auth.updateUser({ password })
  if (error) return { error: error.message }
  return { error: 'DONE' } // rendered as success in the UI
}

export async function updatePatientNotes(formData: FormData): Promise<void> {
  const { supabase, clinic } = await requireClinic()
  const id = String(formData.get('id'))
  await supabase
    .from('patients')
    .update({ notes: String(formData.get('notes') ?? '').slice(0, 2000) })
    .eq('id', id)
    .eq('clinic_id', clinic.id)
  revalidatePath(`/appointments/dashboard/patients/${id}`)
  revalidatePath('/appointments/dashboard/patients')
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
