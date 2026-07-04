import { requireClinic } from '@/lib/booklypro/auth'
import { formatSlotLabel } from '@/lib/booklypro/slots'
import { updateAppointmentStatus } from '../../actions'

export const dynamic = 'force-dynamic'

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-emerald-500/15 text-emerald-300',
  pending: 'bg-amber-500/15 text-amber-300',
  completed: 'bg-slate-500/15 text-slate-300',
  cancelled: 'bg-red-500/15 text-red-300',
  no_show: 'bg-red-500/15 text-red-300',
}

export default async function AppointmentsPage() {
  const { supabase, clinic } = await requireClinic()
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*, patients(full_name, phone), services(name), staff(name)')
    .eq('clinic_id', clinic.id)
    .order('starts_at', { ascending: false })
    .limit(100)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Appointments</h1>
        <p className="text-slate-400 text-sm mt-1">Latest 100, newest first.</p>
      </div>

      <ul className="space-y-2">
        {(appointments ?? []).map((a) => (
          <li
            key={a.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <p className="font-medium">
                {formatSlotLabel(a.starts_at, clinic.timezone)}{' '}
                <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${STATUS_STYLES[a.status] ?? ''}`}>
                  {a.status}
                </span>
              </p>
              <p className="text-sm text-slate-400">
                {a.patients?.full_name || 'Unknown'} · {a.services?.name} · {a.staff?.name} ·{' '}
                {a.source === 'messenger' ? 'Messenger 💬' : a.source}
              </p>
              {a.intake_note && <p className="text-sm text-emerald-300/80 mt-1">📝 {a.intake_note}</p>}
            </div>
            {(a.status === 'confirmed' || a.status === 'pending') && (
              <div className="flex gap-2">
                {['completed', 'no_show', 'cancelled'].map((s) => (
                  <form key={s} action={updateAppointmentStatus}>
                    <input type="hidden" name="id" value={a.id} />
                    <input type="hidden" name="status" value={s} />
                    <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-emerald-400 transition">
                      {s === 'no_show' ? 'No-show' : s[0].toUpperCase() + s.slice(1)}
                    </button>
                  </form>
                ))}
              </div>
            )}
          </li>
        ))}
        {(appointments ?? []).length === 0 && (
          <li className="text-slate-500 text-sm">No appointments yet.</li>
        )}
      </ul>
    </div>
  )
}
