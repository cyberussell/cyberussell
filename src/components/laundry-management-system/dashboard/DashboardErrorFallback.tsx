'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import Card from './Card'

export default function DashboardErrorFallback({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Card className="flex flex-col items-center gap-3 p-10 text-center">
      <AlertTriangle className="h-8 w-8 text-amber-500" />
      <h2 className="font-semibold text-[#0B1B33]">Something went wrong</h2>
      <p className="max-w-sm text-sm text-slate-400">
        This page hit an unexpected error. You can try again, or head back if it keeps happening.
      </p>
      <button
        onClick={reset}
        className="mt-2 rounded-lg bg-gradient-to-r from-[#0D9488] to-[#22D3EE] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
      >
        Try again
      </button>
    </Card>
  )
}
