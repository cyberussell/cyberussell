import { requireBusiness } from '@/lib/appointment-system/auth'
import { getTerms } from '@/lib/appointment-system/terminology'
import { createStaff, toggleStaff, deleteStaff } from '../../actions'

export const dynamic = 'force-dynamic'

export default async function StaffPage() {
  const { supabase, business } = await requireBusiness()
  const t = getTerms(business.business_type)
  const { data: staff } = await supabase
    .from('staff')
    .select('*')
    .eq('business_id', business.id)
    .order('created_at')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Staff</h1>
        <p className="text-slate-400 text-sm mt-1">
          Who your {t.clients} can be booked with.
        </p>
      </div>

      <form
        action={createStaff}
        className="rounded-xl border border-slate-800 bg-slate-900 p-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
      >
        <input
          name="name"
          required
          placeholder="Name (e.g. Dr. Santos)"
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <input
          name="title"
          placeholder="Title (e.g. Dentist)"
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">
          Add staff
        </button>
      </form>

      <ul className="space-y-2">
        {(staff ?? []).map((m) => (
          <li
            key={m.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex items-center justify-between gap-3"
          >
            <div>
              <p className={`font-medium ${m.active ? '' : 'text-slate-500 line-through'}`}>{m.name}</p>
              {m.title && <p className="text-sm text-slate-400">{m.title}</p>}
            </div>
            <div className="flex gap-2">
              <form action={toggleStaff}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="active" value={String(m.active)} />
                <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-emerald-400 transition">
                  {m.active ? 'Deactivate' : 'Activate'}
                </button>
              </form>
              <form action={deleteStaff}>
                <input type="hidden" name="id" value={m.id} />
                <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-red-400 hover:border-red-400 transition">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
        {(staff ?? []).length === 0 && (
          <li className="text-slate-500 text-sm">No staff yet — add your first practitioner above.</li>
        )}
      </ul>
    </div>
  )
}
