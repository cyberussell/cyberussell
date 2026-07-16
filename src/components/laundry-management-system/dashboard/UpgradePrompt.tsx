import Link from 'next/link'
import { Lock } from 'lucide-react'
import { planWithFeature, type FeatureFlag } from '@/lib/laundry-management-system/modules/billing/entitlements'
import Card from './Card'

// Shown in place of a gated page's real content when the business's plan
// doesn't include the feature — one component, reused by every Professional
// page instead of each one building its own locked-state screen.
export default function UpgradePrompt({ feature, label }: { feature: FeatureFlag; label: string }) {
  const plan = planWithFeature(feature)

  return (
    <Card className="mx-auto max-w-lg p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#CCFBF1]">
        <Lock className="h-5 w-5 text-[#0D9488]" />
      </div>
      <h2 className="text-lg font-semibold text-[#0B1B33]">{label} is a {plan.name} feature</h2>
      <p className="mt-2 text-sm text-slate-500">
        Upgrade to the {plan.name} plan (₱{plan.priceMonthly.toLocaleString('en-PH')}/mo) to unlock {label.toLowerCase()}
        {' '}and everything else included at that tier.
      </p>
      <Link
        href="/lms#pricing"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0D9488] to-[#22D3EE] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
      >
        See {plan.name} plan pricing
      </Link>
    </Card>
  )
}
