'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { trackOrder } from '../actions/tracking'
import type { ActionResult } from '../actions/shared'
import { AuthHeader, AuthFooter } from '@/components/laundry-management-system/AuthChrome'

export default function TrackOrderPage() {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(trackOrder, {})

  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/lms" className="mb-8 flex flex-col items-center text-center">
            <Image src="/lms-logo.png" alt="" width={56} height={56} priority className="mb-3 h-14 w-14 rounded-2xl object-cover" />
            <span className="text-2xl font-bold text-white">
              Track <span className="text-[#22D3EE]">Your Order</span>
            </span>
            <span className="mt-2 text-sm text-white/50">No account needed — just your order number and phone.</span>
          </Link>
          <form action={formAction} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <label className="block">
              <span className="text-sm text-white/60">Order number</span>
              <input
                name="orderNumber"
                type="text"
                required
                placeholder="ORD-000123"
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-[#22D3EE] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm text-white/60">Phone number</span>
              <input
                name="phone"
                type="tel"
                required
                placeholder="09171234567"
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-[#22D3EE] focus:outline-none"
              />
              <span className="mt-1 block text-xs text-white/40">The phone number given at drop-off.</span>
            </label>
            {state.error && <p className="text-sm text-red-400">{state.error}</p>}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-gradient-to-r from-[#0D9488] to-[#22D3EE] py-2.5 font-semibold text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] disabled:opacity-50 transition-all"
            >
              {pending ? 'Looking up…' : 'Track order'}
            </button>
          </form>
        </div>
      </main>
      <AuthFooter />
    </div>
  )
}
