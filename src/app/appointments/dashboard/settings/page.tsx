import Link from 'next/link'
import { requireClinic } from '@/lib/appointment-system/auth'
import ChangePasswordForm from '@/components/appointment-system/ChangePasswordForm'
import { updateClinicProfile, saveFbConnection, updateClosedNotice } from '../../actions'

export const dynamic = 'force-dynamic'

const TIER_PRICES: Record<string, string> = {
  basic: '₱999/mo',
  pro: '₱1,999/mo',
  premium: '₱3,499/mo',
}

export default async function SettingsPage() {
  const { clinic } = await requireClinic()
  const connected = Boolean(clinic.fb_page_id)
  const settings = clinic.settings as { closed?: boolean; closed_message?: string }
  const trialDaysLeft = Math.max(
    0,
    Math.ceil((new Date(clinic.trial_ends_at).getTime() - Date.now()) / 86400_000)
  )
  const webhookUrl = 'https://www.cyberussell.com/appointments/api/messenger/webhook'

  return (
    <div className="space-y-10 max-w-2xl">
      {/* Profile */}
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Clinic profile</h1>
        <form action={updateClinicProfile} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <Field label="Clinic name" name="name" defaultValue={clinic.name} required />
          <Field label="Phone" name="phone" defaultValue={clinic.phone} />
          <Field label="Address" name="address" defaultValue={clinic.address} />
          <p className="text-xs text-slate-500">
            Public booking page:{' '}
            <Link href={`/appointments/${clinic.slug}`} className="text-emerald-400 underline">
              cyberussell.com/appointments/{clinic.slug}
            </Link>
          </p>
          <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">
            Save profile
          </button>
        </form>
      </section>

      {/* Closed notice */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">
            Clinic status{' '}
            <span
              className={`ml-2 rounded-full px-3 py-1 text-xs align-middle ${
                settings.closed ? 'bg-amber-500/15 text-amber-300' : 'bg-emerald-500/15 text-emerald-300'
              }`}
            >
              {settings.closed ? 'Closed' : 'Open for bookings'}
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Mark the clinic closed (holiday, emergency, renovation) — the Messenger bot and web
            booking pause and show your message instead.
          </p>
        </div>
        <form action={updateClosedNotice} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              name="closed"
              defaultChecked={Boolean(settings.closed)}
              className="h-4 w-4 accent-emerald-500"
            />
            Clinic is temporarily closed
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Message shown to patients</span>
            <input
              name="closed_message"
              defaultValue={settings.closed_message ?? ''}
              placeholder="e.g. Closed po kami hanggang July 10 for renovation. See you soon!"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none"
            />
          </label>
          <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">
            Save status
          </button>
        </form>
      </section>

      {/* Billing */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Billing</h2>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold capitalize">
                {clinic.plan_tier} plan{' '}
                <span className="text-slate-400 font-normal">· {TIER_PRICES[clinic.plan_tier]}</span>
              </p>
              <p className="text-sm text-slate-400 mt-0.5">
                {clinic.plan_status === 'trial' &&
                  `Free trial — ${trialDaysLeft} day${trialDaysLeft === 1 ? '' : 's'} remaining (ends ${new Date(clinic.trial_ends_at).toLocaleDateString('en-PH', { month: 'long', day: 'numeric' })}).`}
                {clinic.plan_status === 'active' && 'Subscription active. Salamat po! 🙌'}
                {clinic.plan_status === 'suspended' &&
                  'Subscription inactive — bookings are paused until payment is settled.'}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                clinic.plan_status === 'active'
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : clinic.plan_status === 'trial'
                    ? 'bg-amber-500/15 text-amber-300'
                    : 'bg-red-500/15 text-red-300'
              }`}
            >
              {clinic.plan_status}
            </span>
          </div>
          <div className="rounded-lg bg-slate-800/60 p-4 text-sm text-slate-300 space-y-2">
            <p className="font-medium text-slate-200">How to pay</p>
            <p>
              We currently accept <strong>GCash</strong> and <strong>bank transfer</strong>. Message
              us through the{' '}
              <Link href="/contact" className="text-emerald-400 underline">
                contact page
              </Link>{' '}
              with your clinic name and we&apos;ll send payment details. Your account is activated
              within 24 hours of payment.
            </p>
            <p className="text-slate-400">
              Plans: Basic ₱999 · Pro ₱1,999 · Premium ₱3,499 per month —{' '}
              <Link href="/appointments#pricing" className="text-emerald-400 underline">
                compare plans
              </Link>
              . Automatic online payment is coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Facebook connection */}
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
            Connect your Page so patients can book by simply messaging you on Facebook.{' '}
            <Link href="/appointments/dashboard/help" className="text-emerald-400 underline">
              Step-by-step guide in Help
            </Link>
            .
          </p>
        </div>
        <form action={saveFbConnection} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <Field label="Facebook Page ID" name="fb_page_id" defaultValue={clinic.fb_page_id ?? ''} required />
          <Field label="Page Access Token" name="fb_page_token" type="password" required />
          <p className="text-xs text-slate-500 break-all">Webhook URL for the Meta app: {webhookUrl}</p>
          <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">
            Save connection
          </button>
        </form>
      </section>

      {/* Password */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Change password</h2>
        <ChangePasswordForm />
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
