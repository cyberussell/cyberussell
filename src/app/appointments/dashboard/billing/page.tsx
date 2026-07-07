import { requireBusiness } from '@/lib/appointment-system/auth'
import { PLANS, PLAN_ORDER } from '@/lib/appointment-system/entitlements'
import BillingPlanCard from '@/components/appointment-system/BillingPlanCard'

export const dynamic = 'force-dynamic'

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ paid?: string; cancelled?: string }>
}) {
  const { business } = await requireBusiness()
  const { paid, cancelled } = await searchParams
  const currentPlan = PLANS[business.plan_tier]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-slate-400 text-sm mt-1">
          Current plan: <span className="text-white font-medium">{currentPlan.name}</span>
          {' · '}
          <span
            className={
              business.plan_status === 'active'
                ? 'text-emerald-300'
                : business.plan_status === 'suspended'
                  ? 'text-red-400'
                  : 'text-amber-300'
            }
          >
            {business.plan_status}
          </span>
          {business.plan_renews_at && business.plan_status === 'active' && (
            <>
              {' · renews '}
              {new Date(business.plan_renews_at).toLocaleDateString('en-PH', {
                timeZone: business.timezone,
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </>
          )}
        </p>
      </div>

      {paid && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          Payment received — your plan will update automatically within a few moments.
        </p>
      )}
      {cancelled && (
        <p className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-400">
          Checkout was cancelled — no charge was made.
        </p>
      )}
      {business.plan_status === 'suspended' && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          Your plan payment is overdue and online booking is currently paused. Pay below to reactivate.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLAN_ORDER.map((tier) => (
          <BillingPlanCard key={tier} plan={PLANS[tier]} isCurrent={tier === business.plan_tier} />
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Prefer GCash or bank transfer? Message us directly and we&apos;ll flip your plan manually after payment.
      </p>
    </div>
  )
}
