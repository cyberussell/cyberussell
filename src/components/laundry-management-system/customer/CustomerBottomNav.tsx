'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ClipboardList, User } from 'lucide-react'

const TABS = [
  { label: 'Home', href: '/lms/customer/dashboard', icon: Home },
  { label: 'Orders', href: '/lms/customer/dashboard/orders', icon: ClipboardList },
  { label: 'Profile', href: '/lms/customer/dashboard/profile', icon: User },
]

export default function CustomerBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-teal-100/60 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-1.5">
        {TABS.map((tab) => {
          const active =
            tab.href === '/lms/customer/dashboard'
              ? pathname === tab.href
              : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 rounded-full px-5 py-2 text-xs font-medium transition ${
                active ? 'text-[#0D9488]' : 'text-slate-400 hover:text-slate-500'
              }`}
            >
              <tab.icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
