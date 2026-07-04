import Link from 'next/link'
import { requireClinic } from '@/lib/booklypro/auth'
import { signOut } from '../actions'

const NAV = [
  { href: '/appointments/dashboard', label: 'Today' },
  { href: '/appointments/dashboard/appointments', label: 'Appointments' },
  { href: '/appointments/dashboard/services', label: 'Services' },
  { href: '/appointments/dashboard/staff', label: 'Staff' },
  { href: '/appointments/dashboard/availability', label: 'Availability' },
  { href: '/appointments/dashboard/patients', label: 'Patients' },
  { href: '/appointments/dashboard/conversations', label: 'Conversations' },
  { href: '/appointments/dashboard/settings', label: 'Settings' },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { clinic } = await requireClinic()
  const trialDaysLeft = Math.max(
    0,
    Math.ceil((new Date(clinic.trial_ends_at).getTime() - Date.now()) / 86400_000)
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/appointments/dashboard" className="text-lg font-bold">
              Bookly<span className="text-emerald-400">Pro</span>
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
        <nav className="mx-auto max-w-6xl px-4 flex gap-1 overflow-x-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap px-3 py-2 text-sm text-slate-300 hover:text-emerald-300 border-b-2 border-transparent hover:border-emerald-400 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {clinic.plan_status === 'suspended' && (
        <div className="bg-red-500/10 border-b border-red-500/30 text-red-300 text-sm text-center py-2 px-4">
          Your subscription is inactive — the Messenger bot and public booking page are paused. Contact us to reactivate.
        </div>
      )}
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}
