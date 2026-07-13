'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Map, ClipboardList, BarChart3, Settings as SettingsIcon, LogOut, Menu, X } from 'lucide-react'
import { signOut } from '@/app/territory-management-system/actions/auth'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/territory-management-system/dashboard', icon: LayoutDashboard },
  { label: 'Territories', href: '/territory-management-system/dashboard/territories', icon: Map },
  { label: 'Contact Records', href: '/territory-management-system/dashboard/records', icon: ClipboardList },
  { label: 'Reports', href: '/territory-management-system/dashboard/reports', icon: BarChart3 },
  { label: 'Settings', href: '/territory-management-system/dashboard/settings', icon: SettingsIcon },
]

export default function DashboardSidebar({ congregationName }: { congregationName: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between border-b border-blue-100/60 bg-white px-4 py-3 lg:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-xs font-bold text-white">
            {congregationName.charAt(0).toUpperCase()}
          </div>
          <span className="truncate text-sm font-semibold text-[#0B1B33]">{congregationName}</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="shrink-0 rounded-lg p-2 text-slate-500 hover:bg-[#F0F6FF]"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-blue-100/60 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-blue-100/60 px-6 py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-sm font-bold text-white">
              {congregationName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#0B1B33]">{congregationName}</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-[#F0F6FF] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === '/territory-management-system/dashboard' ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white shadow-[0_4px_12px_-2px_rgba(37,99,235,0.35)]'
                    : 'text-slate-600 hover:bg-[#F0F6FF] hover:text-[#0B1B33]'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1">{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <form action={signOut} className="border-t border-blue-100/60 p-3">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-[#F0F6FF] hover:text-[#0B1B33]"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </form>
      </aside>
    </>
  )
}
