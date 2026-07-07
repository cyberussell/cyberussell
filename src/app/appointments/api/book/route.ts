import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminSupabase } from '@/lib/appointment-system/supabase-server'
import { bookAppointment, getAvailableSlots } from '@/lib/appointment-system/slots'
import { logEvent } from '@/lib/appointment-system/events'
import { canCreateAppointment } from '@/lib/appointment-system/entitlements'
import type { Business } from '@/lib/appointment-system/types'

export const dynamic = 'force-dynamic'

// GET /appointments/api/book?business=slug&service=id → available slots
export async function GET(request: NextRequest) {
  const businessSlug = request.nextUrl.searchParams.get('business')
  const serviceId = request.nextUrl.searchParams.get('service')
  if (!businessSlug || !serviceId) {
    return NextResponse.json({ error: 'business and service are required' }, { status: 400 })
  }

  const db = createAdminSupabase()
  const { data: business } = await db.from('businesses').select('*').eq('slug', businessSlug).maybeSingle()
  if (!business || (business as Business).plan_status === 'suspended') {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 })
  }

  const slots = await getAvailableSlots(db, {
    businessId: business.id,
    timezone: (business as Business).timezone,
    serviceId,
    days: 14,
    limit: 60,
  })
  return NextResponse.json({ slots })
}

const bookSchema = z.object({
  businessSlug: z.string().min(1),
  serviceId: z.string().uuid(),
  staffId: z.string().uuid(),
  startsAt: z.string().datetime(),
  fullName: z.string().min(2).max(80),
  phone: z
    .string()
    .transform((v) => v.replace(/[\s-]/g, ''))
    .refine((v) => /^09\d{9}$/.test(v), { message: 'Enter a valid 11-digit mobile number (09XXXXXXXXX)' }),
  note: z.string().max(500).optional(),
})

// POST /appointments/api/book → create a web booking
export async function POST(request: NextRequest) {
  const parsed = bookSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Invalid booking details'
    return NextResponse.json({ error: message }, { status: 400 })
  }
  const input = parsed.data

  const db = createAdminSupabase()
  const { data: business } = await db.from('businesses').select('*').eq('slug', input.businessSlug).maybeSingle()
  if (!business || (business as Business).plan_status === 'suspended') {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 })
  }

  const settings = (business as Business).settings as { closed?: boolean; closed_message?: string }
  if (settings.closed) {
    return NextResponse.json(
      { error: settings.closed_message || 'The business is temporarily closed.' },
      { status: 403 }
    )
  }

  const quota = await canCreateAppointment(db, business as Business)
  if (!quota.allowed) {
    await logEvent(db, business.id, 'booking_blocked_quota', { used: quota.used, limit: quota.limit })
    return NextResponse.json(
      { error: 'This business cannot accept more online bookings this month. Please contact them directly.' },
      { status: 403 }
    )
  }

  const result = await bookAppointment(db, {
    businessId: business.id,
    serviceId: input.serviceId,
    staffId: input.staffId,
    startsAt: input.startsAt,
    client: { fullName: input.fullName, phone: input.phone },
    source: 'web',
    intakeNote: input.note,
  })

  if (!result.ok) {
    const status = result.reason === 'conflict' ? 409 : 500
    return NextResponse.json({ error: result.message }, { status })
  }

  await logEvent(db, business.id, 'booking_created', {
    appointment_id: result.appointmentId,
    source: 'web',
  })
  return NextResponse.json({ ok: true, appointmentId: result.appointmentId })
}
