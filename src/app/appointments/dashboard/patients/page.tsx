import Link from 'next/link'
import { requireClinic } from '@/lib/appointment-system/auth'

export const dynamic = 'force-dynamic'

interface PatientRow {
  id: string
  full_name: string
  phone: string
  messenger_psid: string | null
  notes: string
  appointments: { starts_at: string; status: string }[]
}

export default async function PatientsPage() {
  const { supabase, clinic } = await requireClinic()
  const { data } = await supabase
    .from('patients')
    .select('id, full_name, phone, messenger_psid, notes, appointments(starts_at, status)')
    .eq('clinic_id', clinic.id)
    .order('created_at', { ascending: false })
    .limit(300)
  const patients = (data ?? []) as unknown as PatientRow[]
  const now = Date.now()

  const rows = patients.map((p) => {
    const done = p.appointments
      .filter((a) => a.status === 'completed')
      .sort((a, b) => b.starts_at.localeCompare(a.starts_at))
    const upcoming = p.appointments
      .filter((a) => (a.status === 'confirmed' || a.status === 'pending') && new Date(a.starts_at).getTime() > now)
      .sort((a, b) => a.starts_at.localeCompare(b.starts_at))
    return {
      ...p,
      visits: done.length,
      lastVisit: done[0]?.starts_at ?? null,
      nextVisit: upcoming[0]?.starts_at ?? null,
    }
  })

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('en-PH', {
      timeZone: clinic.timezone,
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Patients</h1>
        <p className="text-slate-400 text-sm mt-1">
          Everyone who has booked with you — click a patient for their full history.
        </p>
      </div>

      <ul className="space-y-2">
        {rows.map((p) => (
          <li key={p.id}>
            <Link
              href={`/appointments/dashboard/patients/${p.id}`}
              className="block rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-emerald-400/50 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {p.full_name || 'Unnamed patient'}
                    {p.messenger_psid && <span className="ml-2 text-xs text-slate-400">💬 Messenger</span>}
                  </p>
                  <p className="text-sm text-slate-400">{p.phone || 'no phone'}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-slate-300">
                    {p.visits} visit{p.visits === 1 ? '' : 's'}
                    {p.lastVisit && <span className="text-slate-500"> · last: {fmt(p.lastVisit)}</span>}
                  </p>
                  {p.nextVisit ? (
                    <p className="text-emerald-300/80 text-xs mt-0.5">next: {fmt(p.nextVisit)}</p>
                  ) : (
                    <p className="text-slate-600 text-xs mt-0.5">no upcoming booking</p>
                  )}
                </div>
              </div>
              {p.notes && <p className="text-sm text-slate-500 mt-2 truncate">📋 {p.notes}</p>}
            </Link>
          </li>
        ))}
        {rows.length === 0 && <li className="text-slate-500 text-sm">No patients yet.</li>}
      </ul>
    </div>
  )
}
