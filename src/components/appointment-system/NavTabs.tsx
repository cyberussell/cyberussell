'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

  return (
    <nav className="mx-auto max-w-6xl px-4 flex gap-1 overflow-x-auto">
      {NAV.map((item) => {
        const active =
          item.href === '/appointments/dashboard'
            ? pathname === item.href
            : pathname.startsWith(item.href)
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
            {item.href.endsWith('/clients') ? clientsLabel : item.label}
          </Link>
        )
      })}
    </nav>
  )
}
