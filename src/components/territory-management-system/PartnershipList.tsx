'use client'

import { useTransition } from 'react'
import type { PartnershipWithProgress } from '@/lib/territory-management-system/modules/assignment/types'
import Card from '@/components/territory-management-system/dashboard/Card'
import { useConfirm } from '@/lib/territory-management-system/hooks/useConfirm'

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
  const { confirm, ConfirmDialog } = useConfirm()

  if (partnerships.length === 0) {
    return <Card className="p-8 text-center text-sm text-slate-600">No Partners yet.</Card>
  }

  async function handleEnd(id: string, name: string) {
    const ok = await confirm({
      title: 'End ministry for today?',
      message: `End ${name}'s ministry for today? Any records they haven't gotten to will simply stay assigned as-is.`,
      confirmLabel: 'End Ministry',
      variant: 'caution',
    })
    if (!ok) return
    startTransition(() => {
      onEndPartnership?.(id)
    })
  }

  return (
    <>
      {ConfirmDialog}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partnerships.map((p) => {
          const pct = p.recordCount > 0 ? Math.round((p.completedCount / p.recordCount) * 100) : 0
          // finished_at/ended_early_at (see 018_partnership_finished_at.sql) both mean "genuinely
          // done" — a publisher can end their ministry any time, whether they've searched zero or
          // many records, so ending early isn't a distinct/lesser status worth flagging on its own.
          const done = Boolean(p.finished_at || p.ended_early_at)
          const status = done ? 'Done' : p.claimed_at ? 'Claimed' : 'Unclaimed'
          const statusClass = done
            ? 'bg-emerald-50 text-emerald-600'
            : p.claimed_at
              ? 'bg-blue-50 text-[#2563EB]'
              : 'bg-slate-100 text-slate-500'
          return (
            <Card key={p.id} className="relative overflow-hidden p-4">
              {p.hasBibleStudy && (
                <span className="absolute right-4 top-0 h-1.5 w-12 rounded-b-full bg-[#4a6da7]" aria-label="Bible Study included" />
              )}
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
                {p.completedCount > 0
                  ? `${p.completedCount} contact recorded. Note: For admin's approval`
                  : 'No contact record has been added'}
                {p.recordCount - p.completedCount > 0 ? ` · ${p.recordCount - p.completedCount} remaining` : ''}
                {p.dncCount > 0 && <span className="text-red-600"> · {p.dncCount} Do Not Call</span>}
              </p>
              {p.territories.length > 0 && (
                <p className="mt-0.5 text-xs text-slate-400">
                  {p.territories.map((t) => `${t.name} — ${t.description}`).join(', ')}
                  {p.sections.length > 0 ? ` · Section ${p.sections.map((s) => s.label).join(', ')}` : ''}
                </p>
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
    </>
  )
}
