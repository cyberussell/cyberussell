import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireClinic } from '@/lib/appointment-system/auth'
import { formatSlotLabel } from '@/lib/appointment-system/slots'
import RecordPaymentForm from '@/components/appointment-system/RecordPaymentForm'
import { updatePatientNotes } from '../../../actions'

export const dynamic = 'force-dynamic'

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-emerald-500/15 text-emerald-300',
  pending: 'bg-amber-500/15 text-amber-300',
  completed: 'bg-slate-500/15 text-slate-300',
  cancelled: 'bg-red-500/10 text-red-400/70',
  no_show: 'bg-red-500/15 text-red-300',
}

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ patientId: string }>
}) {
  const { patientId } = await params
  const { supabase, clinic } = await requireClinic()

  const [patientRes, apptRes] = await Promise.all([
    supabase.from('patients').select('*').eq('id', patientId).eq('clinic_id', clinic.id).maybeSingle(),
    supabase
      .from('appointments')
      .select('*, services(name, price), staff(name)')
      .eq('patient_id', patientId)
      .eq('clinic_id', clinic.id)
      .order('starts_at', { ascending: false }),
  ])
  const patient = patientRes.data
  if (!patient) notFound()
  const appointments = apptRes.data ?? []

  const completed = appointments.filter((a) => a.status === 'completed')
  const totalPaid = appointments.reduce((sum, a) => sum + Number(a.amount_paid ?? 0), 0)
  const todayKey = new Intl.DateTimeFormat('en-CA', {
    timeZone: clinic.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <Link href="/appointments/dashboard/patients" className="text-sm text-slate-400 hover:text-white">
          ← All patients
        </Link>
        <h1 className="text-2xl font-bold mt-2">
          {patient.full_name || 'Unnamed patient'}
          {patient.messenger_psid && <span className="ml-3 text-sm font-normal text-slate-400">💬 Messenger patient</span>}
        </h1>
        <p className="text-slate-400 text-sm mt-1">{patient.phone || 'no phone on file'}</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400 uppercase">Visits</p>
          <p className="text-xl font-bold text-emerald-300 mt-1">{completed.length}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400 uppercase">Total paid</p>
          <p className="text-xl font-bold text-emerald-300 mt-1">₱{totalPaid.toLocaleString('en-PH')}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400 uppercase">No-shows</p>
          <p className="text-xl font-bold text-emerald-300 mt-1">
            {appointments.filter((a) => a.status === 'no_show').length}
          </p>
        </div>
      </div>

      {/* Clinic notes */}
      <form action={updatePatientNotes} className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
        <input type="hidden" name="id" value={patient.id} />
        <p className="text-sm font-semibold text-slate-300">Clinic notes</p>
        <textarea
          name="notes"
          rows={3}
          defaultValue={patient.notes}
          placeholder="Allergies, preferences, treatment plan, balance owed…"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">
          Save notes
        </button>
      </form>

      {/* History */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">History</h2>
        {appointments.length === 0 && <p className="text-slate-500 text-sm">No appointments yet.</p>}
        {appointments.map((a) => (
          <div
            key={a.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <p className="font-medium">
                {formatSlotLabel(a.starts_at, clinic.timezone)}
                <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${STATUS_STYLES[a.status] ?? ''}`}>
                  {a.status}
                </span>
              </p>
              <p className="text-sm text-slate-400 mt-1">
                {a.services?.name} · ₱{Number(a.services?.price ?? 0).toFixed(0)} · with {a.staff?.name} ·{' '}
                {a.source === 'messenger' ? 'Messenger 💬' : a.source}
              </p>
              {a.intake_note && <p className="text-sm text-emerald-300/80 mt-1">📝 {a.intake_note}</p>}
            </div>
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
          </div>
        ))}
      </div>
    </div>
  )
}
