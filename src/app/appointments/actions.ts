'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerSupabase, createAdminSupabase } from '@/lib/appointment-system/supabase-server'
import { requireBusiness } from '@/lib/appointment-system/auth'
import { logEvent } from '@/lib/appointment-system/events'
import { bookAppointment, wallTimeToUtc } from '@/lib/appointment-system/slots'
import { canCreateAppointment, canAddProvider, hasFeature, PLANS } from '@/lib/appointment-system/entitlements'
import { createBillingCheckout } from '@/lib/appointment-system/paymongo'
import { DAY_KEYS, type BusinessHours } from '@/lib/appointment-system/types'

export interface ActionResult {
  error?: string
}

export interface BillingActionResult extends ActionResult {
  checkoutUrl?: string
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
  businessName: z.string().min(2).max(80),
  businessTypes: z.array(z.enum(['medical', 'dental', 'spa', 'salon', 'law', 'veterinary', 'other'])).min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function signUp(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse({
    fullName: formData.get('fullName'),
    businessName: formData.get('businessName'),
    businessTypes: formData.getAll('businessTypes'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) return { error: 'Please fill in all fields (password: 8+ characters) and pick at least one business type.' }
  const { fullName, businessName, businessTypes, email, password } = parsed.data

  const planRaw = formData.get('plan')
  const selectedPlanTier = planRaw === 'free' || planRaw === 'basic' || planRaw === 'pro' ? planRaw : null

  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })
  if (error) return { error: error.message }
  if (!data.user) return { error: 'Signup failed — please try again.' }

  // Supabase returns a fake user (empty identities) instead of an error when
  // the email is already registered, to prevent account enumeration.
  if (data.user.identities && data.user.identities.length === 0) {
    return { error: 'An account with this email already exists — please log in instead.' }
  }

  // Business row is created with the service role so signup works even when
  // email confirmation is enabled (no session yet → RLS would block it).
  const admin = createAdminSupabase()
  let slug = slugify(businessName)
  if (slug.length < 3) slug = `business-${slug}`
  const { count } = await admin.from('businesses').select('id', { count: 'exact', head: true }).eq('slug', slug)
  if (count && count > 0) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`

  const { error: businessError } = await admin
    .from('businesses')
    .insert({ owner_id: data.user.id, name: businessName, slug, business_types: businessTypes, selected_plan_tier: selectedPlanTier })
  if (businessError) return { error: businessError.message }

  await logEvent(admin, null, 'business_signed_up', { business_name: businessName, slug })

  if (!data.session) {
    return { error: 'CONFIRM_EMAIL' } // handled as info, not error, in the UI
  }
  redirect('/appointments/dashboard')
}

export async function signIn(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: 'Invalid email or password.' }

  const admin = createAdminSupabase()
  const { data: business } = await admin
    .from('businesses')
    .select('id, first_login_at, selected_plan_tier')
    .eq('owner_id', data.user.id)
    .maybeSingle()

  if (business && !business.first_login_at) {
    await admin.from('businesses').update({ first_login_at: new Date().toISOString() }).eq('id', business.id)
    if (business.selected_plan_tier) redirect('/appointments/dashboard/billing')
  }

  redirect('/appointments/dashboard')
}

export async function signOut(): Promise<void> {
  const supabase = await createServerSupabase()
  await supabase.auth.signOut()
  redirect('/appointments/login')
}

// ── Services ─────────────────────────────────────────────────────────────────

export async function createService(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const name = String(formData.get('name') ?? '').trim()
  const duration = Number(formData.get('duration_min'))
  const price = Number(formData.get('price'))
  if (!name || !Number.isFinite(duration) || duration < 5) return
  await supabase.from('services').insert({
    business_id: business.id,
    name,
    duration_min: Math.round(duration),
    price: Number.isFinite(price) ? price : 0,
  })
  revalidatePath('/appointments/dashboard/services')
}

export async function toggleService(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const id = String(formData.get('id'))
  const active = formData.get('active') === 'true'
  await supabase.from('services').update({ active: !active }).eq('id', id).eq('business_id', business.id)
  revalidatePath('/appointments/dashboard/services')
}

export async function deleteService(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  await supabase.from('services').delete().eq('id', String(formData.get('id'))).eq('business_id', business.id)
  revalidatePath('/appointments/dashboard/services')
}

// ── Staff ────────────────────────────────────────────────────────────────────

export async function createStaff(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const name = String(formData.get('name') ?? '').trim()
  if (!name) return
  const seats = await canAddProvider(supabase, business)
  if (!seats.allowed) return
  await supabase.from('staff').insert({
    business_id: business.id,
    name,
    title: String(formData.get('title') ?? '').trim(),
  })
  revalidatePath('/appointments/dashboard/staff')
}

export async function toggleStaff(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const id = String(formData.get('id'))
  const active = formData.get('active') === 'true'
  await supabase.from('staff').update({ active: !active }).eq('id', id).eq('business_id', business.id)
  revalidatePath('/appointments/dashboard/staff')
}

export async function deleteStaff(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  await supabase.from('staff').delete().eq('id', String(formData.get('id'))).eq('business_id', business.id)
  revalidatePath('/appointments/dashboard/staff')
}

// ── Availability ─────────────────────────────────────────────────────────────

export async function addAvailability(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const staffId = String(formData.get('staff_id'))
  const day = Number(formData.get('day_of_week'))
  const start = String(formData.get('start_time'))
  const end = String(formData.get('end_time'))
  if (!staffId || !(day >= 0 && day <= 6) || !start || !end || start >= end) return
  await supabase.from('availability').insert({
    business_id: business.id,
    staff_id: staffId,
    day_of_week: day,
    start_time: start,
    end_time: end,
  })
  revalidatePath('/appointments/dashboard/availability')
}

export async function deleteAvailability(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  await supabase
    .from('availability')
    .delete()
    .eq('id', String(formData.get('id')))
    .eq('business_id', business.id)
  revalidatePath('/appointments/dashboard/availability')
}

// ── Appointments ─────────────────────────────────────────────────────────────

export async function updateAppointmentStatus(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const id = String(formData.get('id'))
  const status = String(formData.get('status'))
  if (!['confirmed', 'completed', 'cancelled', 'no_show'].includes(status)) return
  await supabase.from('appointments').update({ status }).eq('id', id).eq('business_id', business.id)
  const admin = createAdminSupabase()
  await logEvent(admin, business.id, `appointment_${status}`, { appointment_id: id })
  revalidatePath('/appointments/dashboard')
  revalidatePath('/appointments/dashboard/appointments')
}

export async function createManualAppointment(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { supabase, business } = await requireBusiness()
  const fullName = String(formData.get('fullName') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const serviceId = String(formData.get('service_id') ?? '')
  const staffId = String(formData.get('staff_id') ?? '')
  const when = String(formData.get('starts_at') ?? '')
  const note = String(formData.get('note') ?? '').trim()

  if (fullName.length < 2 || !serviceId || !staffId || !when) {
    return { error: 'Please fill in name, service, staff, and date/time.' }
  }
  const startsAt = wallTimeToUtc(when, business.timezone)
  if (!startsAt) return { error: 'Invalid date/time.' }

  const quota = await canCreateAppointment(supabase, business)
  if (!quota.allowed) {
    return {
      error: `You've reached your monthly limit of ${quota.limit} appointments on the ${PLANS[business.plan_tier].name} plan. Upgrade to accept more bookings.`,
    }
  }

  const result = await bookAppointment(supabase, {
    businessId: business.id,
    serviceId,
    staffId,
    startsAt: startsAt.toISOString(),
    client: { fullName, phone },
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
  await logEvent(admin, business.id, 'booking_created', {
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
  const { supabase, business } = await requireBusiness()
  const id = String(formData.get('id') ?? '')
  const when = String(formData.get('starts_at') ?? '')

  const startsAt = wallTimeToUtc(when, business.timezone)
  if (!id || !startsAt) return { error: 'Invalid date/time.' }

  const { data: appt } = await supabase
    .from('appointments')
    .select('id, services(duration_min)')
    .eq('id', id)
    .eq('business_id', business.id)
    .single()
  const duration = (appt?.services as { duration_min?: number } | null)?.duration_min
  if (!appt || !duration) return { error: 'Appointment not found.' }

  const endsAt = new Date(startsAt.getTime() + duration * 60_000)
  const { error } = await supabase
    .from('appointments')
    .update({ starts_at: startsAt.toISOString(), ends_at: endsAt.toISOString(), status: 'confirmed' })
    .eq('id', id)
    .eq('business_id', business.id)
  if (error) {
    return {
      error:
        error.code === '23P01'
          ? 'That staff member already has an appointment at that time.'
          : error.message,
    }
  }
  const admin = createAdminSupabase()
  await logEvent(admin, business.id, 'appointment_rescheduled', { appointment_id: id })
  revalidatePath('/appointments/dashboard/appointments')
  revalidatePath('/appointments/dashboard')
  return {}
}

export async function recordPayment(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const { supabase, business } = await requireBusiness()
  const id = String(formData.get('id') ?? '')
  const amount = Number(formData.get('amount'))
  const dateStr = String(formData.get('paid_date') ?? '')

  if (!id || !Number.isFinite(amount) || amount < 0) return { error: 'Enter a valid amount.' }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return { error: 'Enter a valid date.' }
  // Midday business time keeps the date stable across timezones.
  const paidAt = wallTimeToUtc(`${dateStr}T12:00`, business.timezone)
  if (!paidAt) return { error: 'Enter a valid date.' }

  const { error } = await supabase
    .from('appointments')
    .update({
      amount_paid: amount,
      paid_at: amount > 0 ? paidAt.toISOString() : null,
    })
    .eq('id', id)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  const admin = createAdminSupabase()
  await logEvent(admin, business.id, 'payment_recorded', { appointment_id: id, amount })
  revalidatePath('/appointments/dashboard')
  revalidatePath('/appointments/dashboard/appointments')
  revalidatePath('/appointments/dashboard/clients')
  return {}
}

// ── Conversations ────────────────────────────────────────────────────────────

export async function resumeBot(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  await supabase
    .from('conversations')
    .update({ mode: 'bot' })
    .eq('id', String(formData.get('id')))
    .eq('business_id', business.id)
  revalidatePath('/appointments/dashboard/conversations')
}

// ── Settings ─────────────────────────────────────────────────────────────────

export async function updateBusinessProfile(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const name = String(formData.get('name') ?? '').trim()
  if (!name) return
  await supabase
    .from('businesses')
    .update({
      name,
      phone: String(formData.get('phone') ?? '').trim(),
      address: String(formData.get('address') ?? '').trim(),
    })
    .eq('id', business.id)
  revalidatePath('/appointments/dashboard/settings')
}

// ── Billing (PayMongo "Pay Now" checkout — see docs/checkpoints for why this
// isn't PayMongo's native Subscriptions API) ────────────────────────────────

export async function initiateBillingCheckout(
  _prev: BillingActionResult,
  formData: FormData
): Promise<BillingActionResult> {
  const { business } = await requireBusiness()
  const tier = String(formData.get('tier') ?? '')
  const plan = (PLANS as Record<string, (typeof PLANS)[keyof typeof PLANS]>)[tier]
  if (!plan || plan.priceMonthly <= 0) return { error: 'Pick a paid plan to continue.' }

  let checkout
  try {
    checkout = await createBillingCheckout({
      businessId: business.id,
      tier: plan.tier,
      planName: plan.name,
      amountCentavos: Math.round(plan.priceMonthly * 100),
      successUrl: 'https://www.cyberussell.com/appointments/dashboard/billing?paid=1',
      cancelUrl: 'https://www.cyberussell.com/appointments/dashboard/billing?cancelled=1',
    })
  } catch {
    return { error: 'Could not start checkout — please try again.' }
  }

  const admin = createAdminSupabase()
  await admin.from('businesses').update({ paymongo_checkout_session_id: checkout.sessionId }).eq('id', business.id)
  // Returned to the client instead of calling redirect() here — Next.js Server
  // Actions driven by useActionState don't reliably navigate the browser to an
  // external origin; the client does `window.location.href = checkoutUrl` instead.
  return { checkoutUrl: checkout.checkoutUrl }
}

// Temporarily-closed notice: pauses Messenger + web booking with a message.
export async function updateClosedNotice(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const closed = formData.get('closed') === 'on'
  const message = String(formData.get('closed_message') ?? '').trim().slice(0, 300)
  await supabase
    .from('businesses')
    .update({ settings: { ...business.settings, closed, closed_message: message } })
    .eq('id', business.id)
  revalidatePath('/appointments/dashboard/settings')
  revalidatePath('/appointments/dashboard')
}

// Manually hides the dashboard's setup checklist even if not all steps are done.
export async function dismissSetupChecklist(): Promise<void> {
  const { supabase, business } = await requireBusiness()
  await supabase
    .from('businesses')
    .update({ settings: { ...business.settings, setup_checklist_hidden: true } })
    .eq('id', business.id)
  revalidatePath('/appointments/dashboard')
}

// Business-wide operating hours — gates whether the business accepts any
// online bookings at all. Does not constrain per-staff Availability.
export async function updateBusinessHours(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const hours: BusinessHours = DAY_KEYS.map((key) => {
    if (formData.get(`${key}_open`) !== 'on') return null
    const open = String(formData.get(`${key}_start`) ?? '')
    const close = String(formData.get(`${key}_end`) ?? '')
    if (!/^\d{2}:\d{2}$/.test(open) || !/^\d{2}:\d{2}$/.test(close) || open >= close) return null
    return { open, close }
  })
  await supabase
    .from('businesses')
    .update({ settings: { ...business.settings, hours } })
    .eq('id', business.id)
  revalidatePath('/appointments/dashboard/settings')
  revalidatePath(`/appointments/${business.slug}`)
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

export async function updateClientNotes(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const id = String(formData.get('id'))
  await supabase
    .from('clients')
    .update({ notes: String(formData.get('notes') ?? '').slice(0, 2000) })
    .eq('id', id)
    .eq('business_id', business.id)
  revalidatePath(`/appointments/dashboard/clients/${id}`)
  revalidatePath('/appointments/dashboard/clients')
}

// Facebook Page connection. v1: owner pastes Page ID + Page Access Token from
// the Meta developer console (dev-mode testers). OAuth flow comes with app review.
export async function saveFbConnection(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  if (!hasFeature(business, 'messenger_booking_bot')) return
  const pageId = String(formData.get('fb_page_id') ?? '').trim()
  const pageToken = String(formData.get('fb_page_token') ?? '').trim()
  if (!pageId || !pageToken) return

  const { error } = await supabase.from('businesses').update({ fb_page_id: pageId }).eq('id', business.id)
  if (error) return

  // Token goes into the service-role-only table.
  const admin = createAdminSupabase()
  await admin
    .from('business_secrets')
    .upsert({ business_id: business.id, fb_page_token: pageToken, updated_at: new Date().toISOString() })
  await logEvent(admin, business.id, 'fb_page_connected', { page_id: pageId })
  revalidatePath('/appointments/dashboard/settings')
}
