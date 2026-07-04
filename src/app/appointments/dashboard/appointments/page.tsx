import Link from 'next/link'
import { requireClinic } from '@/lib/appointment-system/auth'
import { formatSlotLabel, wallTimeToUtc } from '@/lib/appointment-system/slots'
import type { Service, Staff } from '@/lib/appointment-system/types'
import ManualAppointmentForm from '@/components/appointment-system/ManualAppointmentForm'
import RecordPaymentForm from '@/components/appointment-system/RecordPaymentForm'
import RescheduleForm from '@/components/appointment-system/RescheduleForm'
import { updateAppointmentStatus } from '../../actions'

export const dynamic = 'force-dynamic'

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  completed: 'bg-slate-500/15 text-slate-400 border-slate-600/30',
  cancelled: 'bg-red-500/10 text-red-400/70 border-red-500/20',
  no_show: 'bg-red-500/15 text-red-300 border-red-500/30',
}

interface ApptRow {
  id: string
  starts_at: string
  status: string
  source: string
  intake_note: string
  amount_paid: number
  paid_at: string | null
  patients: { full_name: string; phone: string } | null
  services: { name: string; price: number } | null
  staff: { name: string } | null
}

function dateKeyInTz(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso))
}

function timeInTz(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ w?: string }>
}) {
  const { supabase, clinic } = await requireClinic()
  const { w } = await searchParams
  const weekOffset = Number(w ?? 0) || 0

  // Monday of the target week, in the clinic's timezone.
  const todayKey = dateKeyInTz(new Date().toISOString(), clinic.timezone)
  const [ty, tm, td] = todayKey.split('-').map(Number)
  const todayUtcNoon = new Date(Date.UTC(ty, tm - 1, td, 12))
  const dow = todayUtcNoon.getUTCDay() // 0 = Sunday
  const monday = new Date(todayUtcNoon.getTime() - ((dow + 6) % 7) * 86400_000 + weekOffset * 7 * 86400_000)

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday.getTime() + i * 86400_000)
    const key = d.toISOString().slice(0, 10)
    return {
      key,
      label: d.toLocaleDateString('en-PH', { weekday: 'short', timeZone: 'UTC' }),
      dayNum: d.getUTCDate(),
      isToday: key === todayKey,
    }
  })

  const weekStart = wallTimeToUtc(`${days[0].key}T00:00`, clinic.timezone)!
  const weekEnd = new Date(weekStart.getTime() + 7 * 86400_000)

  const [apptRes, svcRes, staffRes] = await Promise.all([
    supabase
      .from('appointments')
      .select('id, starts_at, status, source, intake_note, amount_paid, paid_at, patients(full_name, phone), services(name, price), staff(name)')
      .eq('clinic_id', clinic.id)
      .gte('starts_at', weekStart.toISOString())
      .lt('starts_at', weekEnd.toISOString())
      .order('starts_at'),
    supabase.from('services').select('*').eq('clinic_id', clinic.id).eq('active', true).order('created_at'),
    supabase.from('staff').select('*').eq('clinic_id', clinic.id).eq('active', true).order('created_at'),
  ])
  const appointments = (apptRes.data ?? []) as unknown as ApptRow[]

  const byDay = new Map<string, ApptRow[]>(days.map((d) => [d.key, []]))
  for (const a of appointments) {
    byDay.get(dateKeyInTz(a.starts_at, clinic.timezone))?.push(a)
  }

  const monthLabel = new Date(monday.getTime() + 3 * 86400_000).toLocaleDateString('en-PH', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-slate-400 text-sm mt-1">{monthLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/appointments/dashboard/appointments?w=${weekOffset - 1}`}
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:border-emerald-400 transition"
          >
            ← Prev
          </Link>
          <Link
            href="/appointments/dashboard/appointments"
            className={`rounded-lg border px-3 py-1.5 text-sm transition ${
              weekOffset === 0
                ? 'border-emerald-400 text-emerald-300'
                : 'border-slate-700 text-slate-300 hover:border-emerald-400'
            }`}
          >
            This week
          </Link>
          <Link
            href={`/appointments/dashboard/appointments?w=${weekOffset + 1}`}
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:border-emerald-400 transition"
          >
            Next →
          </Link>
        </div>
      </div>

      {/* Week calendar */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 overflow-x-auto">
        {days.map((d) => (
          <div key={d.key} className="min-w-[90px]">
            <div
              className={`rounded-t-lg px-2 py-1.5 text-center text-xs font-semibold ${
                d.isToday ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-900 text-slate-400'
              }`}
            >
              {d.label} {d.dayNum}
            </div>
            <div
              className={`min-h-[140px] space-y-1 rounded-b-lg border border-t-0 p-1 ${
                d.isToday ? 'border-emerald-500/30 bg-emerald-500/[0.03]' : 'border-slate-800 bg-slate-900/40'
              }`}
            >
              {(byDay.get(d.key) ?? []).map((a) => (
                <div
                  key={a.id}
                  className={`rounded border px-1.5 py-1 text-[11px] leading-tight ${STATUS_STYLES[a.status] ?? ''}`}
                  title={`${a.patients?.full_name} · ${a.services?.name} · ${a.staff?.name} (${a.status})`}
                >
                  <span className="font-semibold">{timeInTz(a.starts_at, clinic.timezone)}</span>
                  <span className="block truncate">{a.patients?.full_name || '—'}</span>
                  <span className="block truncate opacity-75">{a.services?.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Manual booking */}
      <ManualAppointmentForm
        services={(svcRes.data ?? []) as Service[]}
        staff={(staffRes.data ?? []) as Staff[]}
      />

      {/* Week list with actions */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
          This week&apos;s appointments
        </h2>
        {appointments.length === 0 && (
          <p className="text-slate-500 text-sm">No appointments this week.</p>
        )}
        {appointments.map((a) => (
          <div
            key={a.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <p className="font-medium">
                {formatSlotLabel(a.starts_at, clinic.timezone)}{' '}
                <span
                  className={`ml-2 rounded-full border px-2 py-0.5 text-xs ${STATUS_STYLES[a.status] ?? ''}`}
                >
                  {a.status}
                </span>
              </p>
              <p className="text-sm text-slate-400">
                {a.patients?.full_name || 'Unknown'} · {a.services?.name} · {a.staff?.name} ·{' '}
                {a.source === 'messenger' ? 'Messenger 💬' : a.source}
              </p>
              {a.intake_note && <p className="text-sm text-emerald-300/80 mt-1">📝 {a.intake_note}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {a.status !== 'cancelled' && (
                <RecordPaymentForm
                  appointmentId={a.id}
                  defaultAmount={Number(a.services?.price ?? 0)}
                  paidAmount={Number(a.amount_paid ?? 0)}
                  paidLabel={
                    a.paid_at
                      ? new Date(a.paid_at).toLocaleDateString('en-PH', {
                          timeZone: clinic.timezone,
                          month: 'short',
                          day: 'numeric',
                        })
                      : null
                  }
                  today={todayKey}
                />
              )}
              {(a.status === 'confirmed' || a.status === 'pending') && (
                <>
                  <RescheduleForm appointmentId={a.id} />
                  {['completed', 'no_show', 'cancelled'].map((s) => (
                    <form key={s} action={updateAppointmentStatus}>
                      <input type="hidden" name="id" value={a.id} />
                      <input type="hidden" name="status" value={s} />
                      <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-emerald-400 transition">
                        {s === 'no_show' ? 'No-show' : s[0].toUpperCase() + s.slice(1)}
                      </button>
                    </form>
                  ))}
                </>
              )}
              {(a.status === 'cancelled' || a.status === 'no_show') && <RescheduleForm appointmentId={a.id} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
