import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminSupabase } from '@/lib/booklypro/supabase-server'
import { bookAppointment, getAvailableSlots } from '@/lib/booklypro/slots'
import { logEvent } from '@/lib/booklypro/events'
import type { Clinic } from '@/lib/booklypro/types'

export const dynamic = 'force-dynamic'

// GET /appointments/api/book?clinic=slug&service=id → available slots
export async function GET(request: NextRequest) {
  const clinicSlug = request.nextUrl.searchParams.get('clinic')
  const serviceId = request.nextUrl.searchParams.get('service')
  if (!clinicSlug || !serviceId) {
    return NextResponse.json({ error: 'clinic and service are required' }, { status: 400 })
  }

  const db = createAdminSupabase()
  const { data: clinic } = await db.from('clinics').select('*').eq('slug', clinicSlug).maybeSingle()
  if (!clinic || (clinic as Clinic).plan_status === 'suspended') {
    return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
  }

  const slots = await getAvailableSlots(db, {
    clinicId: clinic.id,
    timezone: (clinic as Clinic).timezone,
    serviceId,
    days: 14,
    limit: 60,
  })
  return NextResponse.json({ slots })
}

const bookSchema = z.object({
  clinicSlug: z.string().min(1),
  serviceId: z.string().uuid(),
  staffId: z.string().uuid(),
  startsAt: z.string().datetime(),
  fullName: z.string().min(2).max(80),
  phone: z.string().min(10).max(20),
  note: z.string().max(500).optional(),
})

// POST /appointments/api/book → create a web booking
export async function POST(request: NextRequest) {
  const parsed = bookSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid booking details' }, { status: 400 })
  }
  const input = parsed.data

  const db = createAdminSupabase()
  const { data: clinic } = await db.from('clinics').select('*').eq('slug', input.clinicSlug).maybeSingle()
  if (!clinic || (clinic as Clinic).plan_status === 'suspended') {
    return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
  }

  const result = await bookAppointment(db, {
    clinicId: clinic.id,
    serviceId: input.serviceId,
    staffId: input.staffId,
    startsAt: input.startsAt,
    patient: { fullName: input.fullName, phone: input.phone },
    source: 'web',
    intakeNote: input.note,
  })

  if (!result.ok) {
    const status = result.reason === 'conflict' ? 409 : 500
    return NextResponse.json({ error: result.message }, { status })
  }

  await logEvent(db, clinic.id, 'booking_created', {
    appointment_id: result.appointmentId,
    source: 'web',
  })
  return NextResponse.json({ ok: true, appointmentId: result.appointmentId })
}
