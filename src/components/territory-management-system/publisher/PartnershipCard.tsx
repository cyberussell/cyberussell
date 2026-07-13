import Link from 'next/link'
import type { PartnershipWithProgress } from '@/lib/territory-management-system/modules/assignment/types'

export default function PartnershipCard({ partnership, batchToken }: { partnership: PartnershipWithProgress; batchToken: string }) {
  const pct = partnership.recordCount > 0 ? Math.round((partnership.completedCount / partnership.recordCount) * 100) : 0

  return (
    <Link
      href={`/territory-management-system/assignment/${batchToken}/${partnership.claim_token}`}
      className="block rounded-2xl border border-blue-100/60 bg-white p-4 shadow-sm transition hover:border-[#38BDF8]/40"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-[#0B1B33]">{partnership.name}</p>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
            partnership.claimed_at ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
          }`}
        >
          {partnership.claimed_at ? 'In Progress' : 'Unclaimed'}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-blue-50">
        <div className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8]" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1.5 text-xs text-slate-400">
        {partnership.completedCount} of {partnership.recordCount} records completed
      </p>
    </Link>
  )
}
