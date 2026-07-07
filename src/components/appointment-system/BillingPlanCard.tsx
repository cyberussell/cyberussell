'use client'

import { useActionState, useEffect } from 'react'
import { initiateBillingCheckout, type BillingActionResult } from '@/app/appointments/actions'
import type { PlanConfig } from '@/lib/appointment-system/entitlements'

export default function BillingPlanCard({ plan, isCurrent }: { plan: PlanConfig; isCurrent: boolean }) {
  const [state, formAction, pending] = useActionState<BillingActionResult, FormData>(initiateBillingCheckout, {})

  useEffect(() => {
    if (state.checkoutUrl) window.location.href = state.checkoutUrl
  }, [state.checkoutUrl])

  return (
    <div
      className={`rounded-xl border p-5 ${
        isCurrent ? 'border-emerald-500/40 bg-emerald-500/[0.03]' : 'border-slate-800 bg-slate-900'
      }`}
    >
      <p className="font-semibold">{plan.name}</p>
      <p className="mt-1 text-2xl font-bold">
        ₱{plan.priceMonthly.toLocaleString('en-PH')}
        <span className="text-sm font-normal text-slate-400">/mo</span>
      </p>
      <p className="mt-1 text-sm text-slate-400">{plan.tagline}</p>
      {isCurrent ? (
        <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-center text-sm font-medium text-emerald-300">
          Current plan
        </p>
      ) : plan.priceMonthly > 0 ? (
        <form action={formAction} className="mt-4">
          <input type="hidden" name="tier" value={plan.tier} />
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition"
          >
            {pending ? 'Starting checkout…' : `Pay ₱${plan.priceMonthly.toLocaleString('en-PH')} now`}
          </button>
        </form>
      ) : (
        <p className="mt-4 text-center text-xs text-slate-500">Downgrade by contacting support.</p>
      )}
      {state.error && <p className="mt-2 text-xs text-red-400">{state.error}</p>}
    </div>
  )
}
