import Link from 'next/link'
import { PLANS, PLAN_ORDER, type PlanConfig } from '@/lib/appointment-system/entitlements'
import type { PlanTier } from '@/lib/appointment-system/types'

/** Next tier up that raises the monthly appointment limit. */
function nextTier(current: PlanTier): PlanConfig | null {
  const idx = PLAN_ORDER.indexOf(current)
  for (const tier of PLAN_ORDER.slice(idx + 1)) {
    const p = PLANS[tier]
    if (p.monthlyAppointments === null || (PLANS[current].monthlyAppointments !== null && (p.monthlyAppointments ?? Infinity) > (PLANS[current].monthlyAppointments as number))) {
      return p
    }
  }
  return null
}

// Contextual, non-blocking usage nudge. Renders nothing until 80% of the
// monthly appointment quota is used; switches to an upgrade CTA at the limit.
export default function UsageBanner({
  tier,
  used,
  limit,
}: {
  tier: PlanTier
  used: number
  limit: number | null
}) {
  if (limit === null) return null
  const atLimit = used >= limit
  if (!atLimit && used < limit * 0.8) return null

  const upgrade = nextTier(tier)

  return (
    <div
      role="status"
      className={`rounded-xl border p-4 text-sm ${
        atLimit
          ? 'border-red-400/40 bg-red-500/10 text-red-200'
          : 'border-amber-400/40 bg-amber-500/10 text-amber-200'
      }`}
    >
      {atLimit ? (
        <p>
          You&apos;ve reached your monthly limit of <strong>{limit} appointments</strong> on the{' '}
          {PLANS[tier].name} plan — new bookings are paused until next month.
        </p>
      ) : (
        <p>
          You&apos;ve used <strong>{used} of your {limit}</strong> appointments this month on the{' '}
          {PLANS[tier].name} plan.
        </p>
      )}
      {upgrade && (
        <p className="mt-1.5">
          <Link href="/appointments#pricing" className="font-semibold underline underline-offset-4 hover:opacity-80">
            Upgrade to {upgrade.name}
          </Link>{' '}
          <span className="opacity-80">
            for {upgrade.monthlyAppointments === null ? 'unlimited' : `up to ${upgrade.monthlyAppointments}`} appointments
            (₱{upgrade.priceMonthly.toLocaleString('en-PH')}/mo).
          </span>
        </p>
      )}
    </div>
  )
}
