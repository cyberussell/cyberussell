import Link from 'next/link'
import { requireClinic } from '@/lib/booklypro/auth'
import NavTabs from '@/components/booklypro/NavTabs'
import { signOut } from '../actions'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { clinic } = await requireClinic()
  const trialDaysLeft = Math.max(
    0,
    Math.ceil((new Date(clinic.trial_ends_at).getTime() - Date.now()) / 86400_000)
  )
  const settings = clinic.settings as { closed?: boolean; closed_message?: string }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/appointments/dashboard" className="text-lg font-bold">
              Appointment <span className="text-emerald-400">System</span>
            </Link>
            <span className="text-slate-400 text-sm hidden sm:inline">· {clinic.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                clinic.plan_status === 'active'
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : clinic.plan_status === 'trial'
                    ? 'bg-amber-500/15 text-amber-300'
                    : 'bg-red-500/15 text-red-300'
              }`}
            >
              {clinic.plan_status === 'trial'
                ? `Trial · ${trialDaysLeft}d left`
                : clinic.plan_status === 'active'
                  ? `${clinic.plan_tier} plan`
                  : 'Suspended'}
            </span>
            <form action={signOut}>
              <button className="text-sm text-slate-400 hover:text-white transition">Log out</button>
            </form>
          </div>
        </div>
        <NavTabs />
      </header>
      {settings.closed && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-300 text-sm text-center py-2 px-4">
          🚪 Your clinic is marked as <strong>CLOSED</strong> — patients cannot book via Messenger or
          the web right now. Reopen it in{' '}
          <Link href="/appointments/dashboard/settings" className="underline">
            Settings
          </Link>
          .
        </div>
      )}
      {clinic.plan_status === 'suspended' && (
        <div className="bg-red-500/10 border-b border-red-500/30 text-red-300 text-sm text-center py-2 px-4">
          Your subscription is inactive — the Messenger bot and public booking page are paused. See{' '}
          <Link href="/appointments/dashboard/settings" className="underline">
            Settings → Billing
          </Link>{' '}
          to reactivate.
        </div>
      )}
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}
