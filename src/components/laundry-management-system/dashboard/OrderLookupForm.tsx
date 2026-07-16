'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QrCode } from 'lucide-react'

// Manual fallback for "QR Order Lookup" — same destination the QR code itself
// points to (orders/lookup/[orderNumber]), for when scanning isn't convenient.
export default function OrderLookupForm() {
  const router = useRouter()
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    router.push(`/lms/orders/lookup/${encodeURIComponent(trimmed)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative">
        <QrCode className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Look up order # (ORD-000001)"
          className="w-56 rounded-full border border-teal-100 bg-white py-2 pl-9 pr-3 text-sm text-[#0B1B33] placeholder:text-slate-400 focus:border-[#22D3EE] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-full border border-teal-100 bg-white px-3 py-2 text-sm font-semibold text-[#0D9488] transition hover:border-[#22D3EE]/40"
      >
        Go
      </button>
    </form>
  )
}
