import { AlertTriangle, Check } from 'lucide-react'
import type { PartnershipRecordDetail } from '@/lib/territory-management-system/modules/assignment/types'
import { VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import Card from '@/components/territory-management-system/dashboard/Card'

// Card-level tone — Do Not Call (the persistent record flag, not just the latest visit result)
// takes priority over an active Bible Study, mirroring PublisherRecordDetailView's own
// cardToneClass. 'started_bible_study' counts as active here too (not just 'bible_study'/
// 'progressing') since that's the very first visit that starts one.
function cardToneClass(doNotCall: boolean, latestResult: string | undefined): string {
  if (doNotCall) return 'border-red-300 bg-red-50 hover:border-red-400'
  if (latestResult === 'started_bible_study' || latestResult === 'bible_study' || latestResult === 'progressing') {
    return 'border-emerald-300 bg-emerald-50 hover:border-emerald-400'
  }
  return 'border-blue-100/60 bg-white hover:border-[#38BDF8]/40'
}

// Selecting a record is an in-memory view-state change (onSelect), not a route navigation —
// the whole point of the offline-first workspace is that nothing after the initial load needs
// the network to render.
export default function AssignedRecordsList({
  records,
  failedRecordIds,
  onSelect,
}: {
  records: PartnershipRecordDetail[]
  // completed_at is set optimistically the moment a visit is logged, before it's actually
  // confirmed synced — if that sync later comes back rejected (not just delayed), a plain
  // checkmark would misrepresent it as done. Surface those separately so the publisher knows
  // to open the record and see what went wrong.
  failedRecordIds: Set<string>
  onSelect: (recordId: string) => void
}) {
  if (records.length === 0) {
    return <Card className="p-6 text-center text-sm text-slate-600">No contact records assigned.</Card>
  }

  return (
    <div className="space-y-2">
      {records.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => onSelect(r.record.id)}
          className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left shadow-sm transition ${cardToneClass(r.record.do_not_call, r.visits[0]?.result)}`}
        >
          <div className="min-w-0">
            <p className="truncate font-medium text-[#0B1B33]">
              {r.sequence}. {r.record.address || r.record.plus_code || 'Unlabeled record'}
              {r.record.unit ? `, ${r.record.unit}` : ''}
            </p>
            {r.record.resident_name && <p className="truncate text-xs text-slate-600">{r.record.resident_name}</p>}
            <p className="truncate text-xs text-slate-400">
              {r.record.territory ? `${r.record.territory.name} — ${r.record.territory.description}` : '—'}
              {' · '}
              Sec {r.record.section?.label ?? '—'} / Blk {r.record.block?.label ?? '—'}
              {r.record.do_not_call ? ' · Do Not Call' : ''}
            </p>
            <p className="mt-0.5 truncate text-xs text-slate-500">
              {r.visits[0] ? VISIT_RESULT_LABELS[r.visits[0].result] : VISIT_RESULT_LABELS.initial_visit}
              {r.visits[0]?.notes ? `: ${r.visits[0].notes}` : ''}
            </p>
            {r.passed_from_name && <p className="mt-0.5 truncate text-xs font-medium text-amber-600">Passed by {r.passed_from_name}</p>}
          </div>
          {failedRecordIds.has(r.record.id) ? (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500" title="Sync failed — open to see why">
              <AlertTriangle className="h-3.5 w-3.5" />
            </span>
          ) : r.completed_at ? (
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
