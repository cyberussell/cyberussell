import { Check } from 'lucide-react'
import type { PartnershipRecordDetail } from '@/lib/territory-management-system/modules/assignment/types'
import Card from '@/components/territory-management-system/dashboard/Card'

// Selecting a record is an in-memory view-state change (onSelect), not a route navigation —
// the whole point of the offline-first workspace is that nothing after the initial load needs
// the network to render.
export default function AssignedRecordsList({
  records,
  onSelect,
}: {
  records: PartnershipRecordDetail[]
  onSelect: (recordId: string) => void
}) {
  if (records.length === 0) {
    return <Card className="p-6 text-center text-sm text-slate-400">No records assigned.</Card>
  }

  return (
    <div className="space-y-2">
      {records.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => onSelect(r.record.id)}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-blue-100/60 bg-white p-3 text-left shadow-sm transition hover:border-[#38BDF8]/40"
        >
          <div className="min-w-0">
            <p className="truncate font-medium text-[#0B1B33]">
              {r.sequence}. {r.record.address}
              {r.record.unit ? `, ${r.record.unit}` : ''}
            </p>
            <p className="truncate text-xs text-slate-400">
              Sec {r.record.section?.label ?? '—'} / Blk {r.record.block?.label ?? '—'}
              {r.record.do_not_call ? ' · Do Not Call' : ''}
            </p>
          </div>
          {r.completed_at ? (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check className="h-4 w-4" />
            </span>
          ) : (
            <span className="h-6 w-6 shrink-0 rounded-full border-2 border-blue-100" />
          )}
        </button>
      ))}
    </div>
  )
}
