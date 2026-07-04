import Link from 'next/link'
import { requireClinic } from '@/lib/booklypro/auth'
import { formatSlotLabel } from '@/lib/booklypro/slots'
import { updateAppointmentStatus } from '../actions'

export const dynamic = 'force-dynamic'

export default async function TodayPage() {
  const { supabase, clinic } = await requireClinic()

  const now = new Date()
  const dayEnd = new Date(now.getTime() + 24 * 3600_000)
  const [apptRes, statsRes] = await Promise.all([
    supabase
      .from('appointments')
      .select('*, patients(full_name, phone), services(name), staff(name)')
      .eq('clinic_id', clinic.id)
      .gte('starts_at', new Date(now.getTime() - 2 * 3600_000).toISOString())
      .lte('starts_at', dayEnd.toISOString())
      .in('status', ['pending', 'confirmed'])
      .order('starts_at'),
    supabase
      .from('appointments')
      .select('id', { count: 'exact', head: true })
      .eq('clinic_id', clinic.id)
      .eq('status', 'confirmed')
      .gte('starts_at', now.toISOString()),
  ])

  const upcoming = apptRes.data ?? []
  const totalUpcoming = statsRes.count ?? 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Today &amp; next 24 hours</h1>
        <p className="text-slate-400 text-sm mt-1">
          {totalUpcoming} upcoming confirmed appointment{totalUpcoming === 1 ? '' : 's'} in total.
        </p>
      </div>

      {upcoming.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          <p>No appointments in the next 24 hours.</p>
          <p className="text-sm mt-2">
            Set up{' '}
            <Link href="/appointments/dashboard/services" className="text-emerald-400 underline">
              services
            </Link>
            ,{' '}
            <Link href="/appointments/dashboard/availability" className="text-emerald-400 underline">
              availability
            </Link>{' '}
            and connect your{' '}
            <Link href="/appointments/dashboard/settings" className="text-emerald-400 underline">
              Facebook Page
            </Link>{' '}
            so patients can start booking.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {upcoming.map((a) => (
            <li
              key={a.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <p className="font-semibold">
                  {formatSlotLabel(a.starts_at, clinic.timezone)}{' '}
                  <span className="text-slate-400 font-normal">· {a.services?.name}</span>
                </p>
                <p className="text-sm text-slate-400">
                  {a.patients?.full_name || 'Unknown patient'} · {a.patients?.phone || 'no phone'} · with{' '}
                  {a.staff?.name}
                  {a.source === 'messenger' && ' · via Messenger 💬'}
                </p>
                {a.intake_note && (
                  <p className="text-sm text-emerald-300/80 mt-1">📝 {a.intake_note}</p>
                )}
              </div>
              <div className="flex gap-2">
                <StatusButton id={a.id} status="completed" label="Done" />
                <StatusButton id={a.id} status="no_show" label="No-show" />
                <StatusButton id={a.id} status="cancelled" label="Cancel" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function StatusButton({ id, status, label }: { id: string; status: string; label: string }) {
  return (
    <form action={updateAppointmentStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-emerald-400 hover:text-emerald-300 transition">
        {label}
      </button>
    </form>
  )
}
