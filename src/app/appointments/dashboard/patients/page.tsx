import { requireClinic } from '@/lib/booklypro/auth'

export const dynamic = 'force-dynamic'

export default async function PatientsPage() {
  const { supabase, clinic } = await requireClinic()
  const { data: patients } = await supabase
    .from('patients')
    .select('*, appointments(count)')
    .eq('clinic_id', clinic.id)
    .order('created_at', { ascending: false })
    .limit(200)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Patients</h1>
        <p className="text-slate-400 text-sm mt-1">
          Everyone who has booked with you, via Messenger or the web.
        </p>
      </div>

      <ul className="space-y-2">
        {(patients ?? []).map((p) => (
          <li key={p.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="font-medium">
              {p.full_name || 'Unnamed patient'}
              {p.messenger_psid && <span className="ml-2 text-xs text-slate-400">💬 Messenger</span>}
            </p>
            <p className="text-sm text-slate-400">
              {p.phone || 'no phone'} · {p.appointments?.[0]?.count ?? 0} appointment
              {(p.appointments?.[0]?.count ?? 0) === 1 ? '' : 's'}
            </p>
            {p.notes && <p className="text-sm text-slate-300 mt-1">{p.notes}</p>}
          </li>
        ))}
        {(patients ?? []).length === 0 && <li className="text-slate-500 text-sm">No patients yet.</li>}
      </ul>
    </div>
  )
}
