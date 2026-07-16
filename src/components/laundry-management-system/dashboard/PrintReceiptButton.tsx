'use client'

import { Printer } from 'lucide-react'

export default function PrintReceiptButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0D9488] to-[#22D3EE] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
    >
      <Printer className="h-4 w-4" />
      Print
    </button>
  )
}
