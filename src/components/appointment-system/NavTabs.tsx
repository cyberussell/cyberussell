'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const NAV = [
  { href: '/appointments/dashboard', label: 'Today' },
  { href: '/appointments/dashboard/appointments', label: 'Appointments' },
  { href: '/appointments/dashboard/services', label: 'Services' },
  { href: '/appointments/dashboard/staff', label: 'Staff' },
  { href: '/appointments/dashboard/availability', label: 'Availability' },
  { href: '/appointments/dashboard/clients', label: 'Clients' },
  { href: '/appointments/dashboard/conversations', label: 'Conversations' },
  { href: '/appointments/dashboard/billing', label: 'Billing' },
  { href: '/appointments/dashboard/settings', label: 'Settings' },
  { href: '/appointments/dashboard/help', label: 'Help' },
]

export default function NavTabs({ clientsLabel = 'Clients' }: { clientsLabel?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => (href === '/appointments/dashboard' ? pathname === href : pathname.startsWith(href))
  const labelFor = (item: (typeof NAV)[number]) => (item.href.endsWith('/clients') ? clientsLabel : item.label)
  const current = NAV.find((item) => isActive(item.href)) ?? NAV[0]

  return (
    <nav className="mx-auto max-w-6xl px-4">
      <div className="relative py-2 sm:hidden">
        <select
          aria-label="Dashboard section"
          value={current.href}
          onChange={(e) => router.push(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 pr-9 text-sm font-semibold text-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        >
          {NAV.map((item) => (
            <option key={item.href} value={item.href}>
              {labelFor(item)}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-6 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
      </div>

      <div className="hidden gap-1 overflow-x-auto sm:flex">
        {NAV.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-3 py-2 text-sm border-b-2 transition ${
                active
                  ? 'text-emerald-300 border-emerald-400 font-semibold'
                  : 'text-slate-300 border-transparent hover:text-emerald-300 hover:border-emerald-400/50'
              }`}
            >
              {labelFor(item)}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
