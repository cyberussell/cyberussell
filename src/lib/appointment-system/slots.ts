import type { SupabaseClient } from '@supabase/supabase-js'
import type { Availability, Service, Slot, Staff } from './types'

// Minutes of lead time required before a slot can be booked.
const MIN_LEAD_MINUTES = 30

function tzOffsetMs(timeZone: string, utcDate: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(utcDate)
  const map: Record<string, string> = {}
  for (const p of parts) map[p.type] = p.value
  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    map.hour === '24' ? 0 : Number(map.hour),
    Number(map.minute),
    Number(map.second)
  )
  return asUtc - utcDate.getTime()
}

// Convert a wall-clock time in the business's timezone to a UTC Date.
function zonedToUtc(
  y: number,
  m: number,
  d: number,
  hh: number,
  mm: number,
  timeZone: string
): Date {
  const guess = new Date(Date.UTC(y, m - 1, d, hh, mm))
  return new Date(guess.getTime() - tzOffsetMs(timeZone, guess))
}

function dateInTz(date: Date, timeZone: string): { y: number; m: number; d: number; weekday: number } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).formatToParts(date)
  const map: Record<string, string> = {}
  for (const p of parts) map[p.type] = p.value
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return {
    y: Number(map.year),
    m: Number(map.month),
    d: Number(map.day),
    weekday: weekdays.indexOf(map.weekday),
  }
}

// Convert a datetime-local value ("2026-07-06T14:00") entered as business wall
// time into a UTC Date.
export function wallTimeToUtc(value: string, timeZone: string): Date | null {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/)
  if (!m) return null
  return zonedToUtc(Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4]), Number(m[5]), timeZone)
}

export function formatSlotLabel(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

interface SlotQuery {
  businessId: string
  timezone: string
  serviceId: string
  days?: number
  limit?: number
}

// Generate open slots: staff weekly availability minus booked appointments.
export async function getAvailableSlots(
  db: SupabaseClient,
  { businessId, timezone, serviceId, days = 7, limit = 30 }: SlotQuery
): Promise<Slot[]> {
  const now = new Date()
  const windowEnd = new Date(now.getTime() + days * 86400_000)

  const [svcRes, staffRes, availRes, apptRes] = await Promise.all([
    db.from('services').select('*').eq('id', serviceId).single(),
    db.from('staff').select('*').eq('business_id', businessId).eq('active', true),
    db.from('availability').select('*').eq('business_id', businessId),
    db
      .from('appointments')
      .select('staff_id, starts_at, ends_at')
      .eq('business_id', businessId)
      .in('status', ['pending', 'confirmed'])
      .gte('ends_at', now.toISOString())
      .lte('starts_at', windowEnd.toISOString()),
  ])

  const service = svcRes.data as Service | null
  if (!service) return []
  const staff = (staffRes.data ?? []) as Staff[]
  const availability = (availRes.data ?? []) as Availability[]
  const booked = (apptRes.data ?? []) as { staff_id: string; starts_at: string; ends_at: string }[]

  const staffById = new Map(staff.map((s) => [s.id, s]))
  const durationMs = service.duration_min * 60_000
  const earliest = now.getTime() + MIN_LEAD_MINUTES * 60_000
  const slots: Slot[] = []

  for (let dayOffset = 0; dayOffset <= days; dayOffset++) {
    const day = new Date(now.getTime() + dayOffset * 86400_000)
    const { y, m, d, weekday } = dateInTz(day, timezone)

    for (const window of availability) {
      if (window.day_of_week !== weekday) continue
      const member = staffById.get(window.staff_id)
      if (!member) continue

      const [sh, sm] = window.start_time.split(':').map(Number)
      const [eh, em] = window.end_time.split(':').map(Number)
      const windowStart = zonedToUtc(y, m, d, sh, sm, timezone).getTime()
      const windowClose = zonedToUtc(y, m, d, eh, em, timezone).getTime()

      for (let t = windowStart; t + durationMs <= windowClose; t += durationMs) {
        if (t < earliest) continue
        const tEnd = t + durationMs
        const clash = booked.some(
          (b) =>
            b.staff_id === member.id &&
            t < new Date(b.ends_at).getTime() &&
            tEnd > new Date(b.starts_at).getTime()
        )
        if (clash) continue
        const startsAt = new Date(t).toISOString()
        slots.push({
          startsAt,
          endsAt: new Date(tEnd).toISOString(),
          staffId: member.id,
          staffName: member.name,
          label: formatSlotLabel(startsAt, timezone),
        })
      }
    }
  }

  slots.sort((a, b) => a.startsAt.localeCompare(b.startsAt))
  return slots.slice(0, limit)
}

export interface BookingInput {
  businessId: string
  serviceId: string
  staffId: string
  startsAt: string
  client: { fullName: string; phone: string; messengerPsid?: string }
  source: 'messenger' | 'web' | 'manual'
  intakeNote?: string
}

export type BookingResult =
  | { ok: true; appointmentId: string }
  | { ok: false; reason: 'conflict' | 'error'; message: string }

// Insert an appointment; the DB exclusion constraint is the final guard
// against double-booking under concurrency.
export async function bookAppointment(db: SupabaseClient, input: BookingInput): Promise<BookingResult> {
  const { data: service } = await db
    .from('services')
    .select('duration_min')
    .eq('id', input.serviceId)
    .single()
  if (!service) return { ok: false, reason: 'error', message: 'Service not found' }

  // Find or create the client (by PSID for Messenger, by phone for web).
  let clientId: string | null = null
  if (input.client.messengerPsid) {
    const { data } = await db
      .from('clients')
      .select('id')
      .eq('business_id', input.businessId)
      .eq('messenger_psid', input.client.messengerPsid)
      .maybeSingle()
    clientId = data?.id ?? null
  } else if (input.client.phone) {
    const { data } = await db
      .from('clients')
      .select('id')
      .eq('business_id', input.businessId)
      .eq('phone', input.client.phone)
      .is('messenger_psid', null)
      .maybeSingle()
    clientId = data?.id ?? null
  }

  if (clientId) {
    await db
      .from('clients')
      .update({ full_name: input.client.fullName, phone: input.client.phone })
      .eq('id', clientId)
  } else {
    const { data, error } = await db
      .from('clients')
      .insert({
        business_id: input.businessId,
        full_name: input.client.fullName,
        phone: input.client.phone,
        messenger_psid: input.client.messengerPsid ?? null,
      })
      .select('id')
      .single()
    if (error || !data) return { ok: false, reason: 'error', message: error?.message ?? 'Client insert failed' }
    clientId = data.id
  }

  const startsAt = new Date(input.startsAt)
  const endsAt = new Date(startsAt.getTime() + service.duration_min * 60_000)
  const { data: appt, error } = await db
    .from('appointments')
    .insert({
      business_id: input.businessId,
      client_id: clientId,
      staff_id: input.staffId,
      service_id: input.serviceId,
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      status: 'confirmed',
      source: input.source,
      intake_note: input.intakeNote ?? '',
    })
    .select('id')
    .single()

  if (error) {
    // 23P01 = exclusion constraint violation → slot was taken concurrently
    if (error.code === '23P01') {
      return { ok: false, reason: 'conflict', message: 'That slot was just taken.' }
    }
    return { ok: false, reason: 'error', message: error.message }
  }
  return { ok: true, appointmentId: appt.id }
}
