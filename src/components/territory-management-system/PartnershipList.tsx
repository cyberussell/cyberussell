import type { PartnershipWithProgress } from '@/lib/territory-management-system/modules/assignment/types'
import Card from '@/components/territory-management-system/dashboard/Card'

// Presentational and DB-free — reused by both the admin Assignment Summary page and the
// public Progress page ("Today's Assignment Progress"), which need the identical view.
export default function PartnershipList({ partnerships }: { partnerships: PartnershipWithProgress[] }) {
  if (partnerships.length === 0) {
    return <Card className="p-8 text-center text-sm text-slate-600">No Partners yet.</Card>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {partnerships.map((p) => {
        const pct = p.recordCount > 0 ? Math.round((p.completedCount / p.recordCount) * 100) : 0
        // finished_at/ended_early_at are the real "genuinely done" signal (see
        // 018_partnership_finished_at.sql) — this badge previously only ever distinguished
        // Claimed/Unclaimed, so a finished or early-ended partnership stayed "Claimed" forever.
        const done = Boolean(p.finished_at || p.ended_early_at)
        const status = done ? 'Done' : p.claimed_at ? 'Claimed' : 'Unclaimed'
        const statusClass = done
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
          </Card>
        )
      })}
    </div>
  )
}
