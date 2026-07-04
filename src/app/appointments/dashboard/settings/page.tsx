import { requireClinic } from '@/lib/booklypro/auth'
import { updateClinicProfile, saveFbConnection } from '../../actions'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const { supabase, clinic } = await requireClinic()
  const { data: secret } = await supabase
    .from('clinic_secrets')
    .select('clinic_id')
    .eq('clinic_id', clinic.id)
    .maybeSingle()
  // clinic_secrets has no owner policies, so `secret` is always null here —
  // page connection status is inferred from fb_page_id instead.
  void secret
  const connected = Boolean(clinic.fb_page_id)

  const webhookUrl = 'https://www.cyberussell.com/appointments/api/messenger/webhook'

  return (
    <div className="space-y-10 max-w-2xl">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Clinic profile</h1>
        <form action={updateClinicProfile} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <Field label="Clinic name" name="name" defaultValue={clinic.name} required />
          <Field label="Phone" name="phone" defaultValue={clinic.phone} />
          <Field label="Address" name="address" defaultValue={clinic.address} />
          <p className="text-xs text-slate-500">
            Public booking page: <span className="text-slate-300">cyberussell.com/appointments/{clinic.slug}</span>
          </p>
          <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">
            Save profile
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">
            Facebook Page connection{' '}
            {connected ? (
              <span className="ml-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300 align-middle">
                Connected · Page {clinic.fb_page_id}
              </span>
            ) : (
              <span className="ml-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs text-amber-300 align-middle">
                Not connected
              </span>
            )}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Connect your Page so patients can book by simply messaging you on Facebook.
          </p>
        </div>
        <form action={saveFbConnection} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <Field label="Facebook Page ID" name="fb_page_id" defaultValue={clinic.fb_page_id ?? ''} required />
          <Field label="Page Access Token" name="fb_page_token" type="password" required />
          <p className="text-xs text-slate-500">
            Webhook URL for the Meta app: <span className="text-slate-300 break-all">{webhookUrl}</span>
            <br />
            Ask us for the step-by-step connection guide — during early access we connect pages together with you.
          </p>
          <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">
            Save connection
          </button>
        </form>
      </section>
    </div>
  )
}

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  required,
}: {
  label: string
  name: string
  defaultValue?: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none"
      />
    </label>
  )
}
