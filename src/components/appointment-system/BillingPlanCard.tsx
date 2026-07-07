'use client'

import { useActionState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { initiateBillingCheckout, type BillingActionResult } from '@/app/appointments/actions'
import type { FeatureFlag, PlanConfig } from '@/lib/appointment-system/entitlements'

const FEATURE_LABELS: Record<FeatureFlag, string> = {
  public_booking_page: 'Public booking page',
  customer_records: 'Client records',
  email_notifications: 'Email notifications',
  data_export: 'Data export',
  messenger_booking_bot: 'Messenger booking bot',
  automated_reminders: 'Automated reminders',
  no_show_tracking: 'No-show tracking',
  revenue_reports: 'Revenue reports',
}

export default function BillingPlanCard({ plan, isCurrent }: { plan: PlanConfig; isCurrent: boolean }) {
  const [state, formAction, pending] = useActionState<BillingActionResult, FormData>(initiateBillingCheckout, {})

  useEffect(() => {
    if (state.checkoutUrl) window.location.href = state.checkoutUrl
  }, [state.checkoutUrl])

  const included = [
    plan.monthlyAppointments === null ? 'Unlimited appointments' : `${plan.monthlyAppointments} appointments/mo`,
    plan.providerLimit === null ? 'Unlimited staff' : `${plan.providerLimit} staff member${plan.providerLimit === 1 ? '' : 's'}`,
    ...plan.features.map((f) => FEATURE_LABELS[f]),
  ]

  return (
    <div
      className={`relative flex h-full flex-col rounded-xl border p-5 ${
        isCurrent ? 'border-emerald-500/40 bg-emerald-500/[0.03]' : 'border-slate-800 bg-slate-900'
      }`}
    >
      {plan.tier === 'pro' && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-bold text-slate-950">
          Recommended
        </span>
      )}
      <p className="font-semibold">{plan.name}</p>
      <p className="mt-1 text-2xl font-bold">
        ₱{plan.priceMonthly.toLocaleString('en-PH')}
        <span className="text-sm font-normal text-slate-400">/mo</span>
      </p>
      <p className="mt-1 text-sm text-slate-400">{plan.tagline}</p>

      <ul className="mt-4 space-y-2">
        {included.map((label) => (
          <li key={label} className="flex items-start gap-2 text-sm text-slate-300">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden />
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex-1" />

      {isCurrent ? (
        <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-center text-sm font-medium text-emerald-300">
          Current plan
        </p>
      ) : plan.priceMonthly > 0 ? (
        <form action={formAction}>
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
        <p className="text-center text-xs text-slate-500">Downgrade by contacting support.</p>
      )}
      {state.error && <p className="mt-2 text-xs text-red-400">{state.error}</p>}
    </div>
  )
}
