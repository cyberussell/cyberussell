'use client'

import { useTransition } from 'react'
import type { PartnershipWithProgress } from '@/lib/territory-management-system/modules/assignment/types'
import Card from '@/components/territory-management-system/dashboard/Card'

// Presentational — reused by both the Group Leader's own Partners tab (GroupLeaderTabs, which
// passes onEndPartnership) and the public, unauthenticated Progress page ("Today's Assignment
// Progress", which doesn't). onEndPartnership being optional is what keeps the End Ministry
// action off that public page — the real enforcement is server-side in endPartnershipAction
// itself (requireGroupLeader() + ownership check), this is just what keeps the button from
// rendering somewhere it could never work anyway.
export default function PartnershipList({
  partnerships,
  onEndPartnership,
}: {
  partnerships: PartnershipWithProgress[]
  onEndPartnership?: (partnershipId: string) => Promise<void>
}) {
  const [pending, startTransition] = useTransition()

  if (partnerships.length === 0) {
    return <Card className="p-8 text-center text-sm text-slate-600">No Partners yet.</Card>
  }

  function handleEnd(id: string, name: string) {
    if (!window.confirm(`End ${name}'s ministry for today? Any records they haven't gotten to will simply stay assigned as-is.`)) return
    startTransition(() => {
      onEndPartnership?.(id)
    })
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {partnerships.map((p) => {
        const pct = p.recordCount > 0 ? Math.round((p.completedCount / p.recordCount) * 100) : 0
        // finished_at/ended_early_at are the real "genuinely done" signal (see
        // 018_partnership_finished_at.sql) — this badge previously only ever distinguished
        // Claimed/Unclaimed, so a finished or early-ended partnership stayed "Claimed" forever.
        const endedEarly = Boolean(p.ended_early_at)
        const done = Boolean(p.finished_at || endedEarly)
        const status = endedEarly ? 'Ended Early' : done ? 'Done' : p.claimed_at ? 'Claimed' : 'Unclaimed'
        const statusClass = endedEarly
          ? 'bg-amber-50 text-amber-600'
          : done
            ? 'bg-emerald-50 text-emerald-600'
            : p.claimed_at
              ? 'bg-blue-50 text-[#2563EB]'
              : 'bg-slate-100 text-slate-500'
        return (
          <Card key={p.id} className="p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-semibold text-[#0B1B33]">{p.name}</p>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${statusClass}`}>{status}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-blue-50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-600">
              {p.completedCount} of {p.recordCount} contact records completed
              {p.recordCount - p.completedCount > 0 ? ` · ${p.recordCount - p.completedCount} remaining` : ''}
            </p>
            {endedEarly && (
              <p className="mt-1 text-xs text-amber-600">Ended early — the remaining records weren&apos;t visited this session.</p>
            )}
            {onEndPartnership && !done && (
              <button
                type="button"
                disabled={pending}
                onClick={() => handleEnd(p.id, p.name)}
                className="mt-3 w-full rounded-lg border border-red-200 bg-white py-1.5 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
              >
                End Ministry
              </button>
            )}
          </Card>
        )
      })}
    </div>
  )
}
