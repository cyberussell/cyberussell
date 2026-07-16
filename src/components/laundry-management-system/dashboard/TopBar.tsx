'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Menu } from 'lucide-react'
import Avatar from './Avatar'

// Persistent header above every dashboard page. The search pill is a real
// shortcut (order-number lookup, same destination as OrderLookupForm /
// the assignment QR code) — not decorative chrome with nothing behind it.
export default function TopBar({
  businessName,
  role,
  onMenuClick,
}: {
  businessName: string
  role: 'owner' | 'staff'
  onMenuClick?: () => void
}) {
  const router = useRouter()
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    router.push(`/lms/orders/lookup/${encodeURIComponent(trimmed)}`)
    setValue('')
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-teal-100/60 bg-white/80 px-6 py-4 backdrop-blur-sm sm:px-10">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-[#F0FDFA] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Look up order # (ORD-000001)"
            className="w-full rounded-full border border-teal-100 bg-[#F0FDFA] py-2.5 pl-11 pr-4 text-sm text-[#0B1B33] placeholder:text-slate-400 focus:border-[#22D3EE] focus:bg-white focus:outline-none"
          />
        </form>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden text-right sm:block">
          <span className="block text-sm font-semibold text-[#0B1B33]">{businessName}</span>
          <span className="block text-xs text-slate-400">{role === 'owner' ? 'Owner' : 'Staff'}</span>
        </span>
        <Avatar name={businessName} size="md" />
      </div>
    </header>
  )
}
