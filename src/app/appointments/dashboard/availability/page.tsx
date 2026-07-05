import { requireBusiness } from '@/lib/appointment-system/auth'
import { addAvailability, deleteAvailability } from '../../actions'

export const dynamic = 'force-dynamic'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default async function AvailabilityPage() {
  const { supabase, business } = await requireBusiness()
  const [staffRes, availRes] = await Promise.all([
    supabase.from('staff').select('*').eq('business_id', business.id).eq('active', true).order('created_at'),
    supabase.from('availability').select('*, staff(name)').eq('business_id', business.id),
  ])
  const staff = staffRes.data ?? []
  const availability = (availRes.data ?? []).sort(
    (a, b) => a.day_of_week - b.day_of_week || a.start_time.localeCompare(b.start_time)
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Weekly availability</h1>
        <p className="text-slate-400 text-sm mt-1">
          Open slots are generated from these working hours minus booked appointments.
        </p>
      </div>

      {staff.length === 0 ? (
        <p className="text-slate-400 text-sm">Add staff first, then set their working hours here.</p>
      ) : (
        <form
          action={addAvailability}
          className="rounded-xl border border-slate-800 bg-slate-900 p-4 grid gap-3 sm:grid-cols-[1fr_1fr_120px_120px_auto]"
        >
          <select
            name="staff_id"
            required
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
          >
            {staff.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <select
            name="day_of_week"
            required
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
          >
            {DAYS.map((d, i) => (
              <option key={d} value={i}>
                {d}
              </option>
            ))}
          </select>
          <input
            name="start_time"
            type="time"
            required
            defaultValue="09:00"
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
          />
          <input
            name="end_time"
            type="time"
            required
            defaultValue="17:00"
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
          />
          <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">
            Add hours
          </button>
        </form>
      )}

      <ul className="space-y-2">
        {availability.map((w) => (
          <li
            key={w.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex items-center justify-between gap-3"
          >
            <p className="text-sm">
              <span className="font-medium">{w.staff?.name}</span>
              <span className="text-slate-400">
                {' '}
                · {DAYS[w.day_of_week]} · {w.start_time.slice(0, 5)}–{w.end_time.slice(0, 5)}
              </span>
            </p>
            <form action={deleteAvailability}>
              <input type="hidden" name="id" value={w.id} />
              <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-red-400 hover:border-red-400 transition">
                Remove
              </button>
            </form>
          </li>
        ))}
        {availability.length === 0 && staff.length > 0 && (
          <li className="text-slate-500 text-sm">No working hours yet — add the first window above.</li>
        )}
      </ul>
    </div>
  )
}
