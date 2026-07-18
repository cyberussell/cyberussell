import { AlertTriangle, Check, Lock } from 'lucide-react'
import type { PartnershipRecordDetail } from '@/lib/territory-management-system/modules/assignment/types'
import { getRecordCardTone, isDoNotCallLocked, VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import Card from '@/components/territory-management-system/dashboard/Card'

// Card-level tone — shared with PublisherRecordDetailView via getRecordCardTone so the list and
// the detail card never drift out of sync with each other again. Do Not Call/Bible Study are
// solid (not pastel) so they read at a glance in a scrolling list; Potential BS gets its own
// solid yellow, split out from the confirmed-study green. Text colors are bundled alongside each
// tone's background so they stay readable against it — the two need to change together.
function cardTone(doNotCall: boolean, latestResult: string | undefined) {
  switch (getRecordCardTone(doNotCall, latestResult)) {
    case 'do_not_call':
      return { container: 'border-red-700 bg-red-600 hover:border-red-800', primary: 'text-white', secondary: 'text-red-100' }
    case 'potential_bible_study':
      return { container: 'border-yellow-500 bg-yellow-400 hover:border-yellow-600', primary: 'text-black', secondary: 'text-black/70' }
    case 'bible_study':
      return { container: 'border-emerald-700 bg-emerald-600 hover:border-emerald-800', primary: 'text-white', secondary: 'text-emerald-100' }
    case 'moved':
      return { container: 'border-amber-300 bg-amber-50 hover:border-amber-400', primary: 'text-[#0B1B33]', secondary: 'text-slate-600' }
    default:
      return { container: 'border-blue-100/60 bg-white hover:border-[#38BDF8]/40', primary: 'text-[#0B1B33]', secondary: 'text-slate-600' }
  }
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
      {records.map((r) => {
        const locked = isDoNotCallLocked(r.record.do_not_call, r.record.do_not_call_at)
        const tone = cardTone(r.record.do_not_call, r.visits[0]?.result)
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect(r.record.id)}
            className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left shadow-sm transition ${tone.container}`}
          >
            <div className="min-w-0">
              <p className={`truncate font-medium ${tone.primary}`}>
                {r.sequence}. {r.record.address || r.record.plus_code || 'Unlabeled record'}
                {r.record.unit ? `, ${r.record.unit}` : ''}
              </p>
              {r.record.resident_name && <p className={`truncate text-xs ${tone.secondary}`}>{r.record.resident_name}</p>}
              <p className={`truncate text-xs ${tone.secondary}`}>
                {r.record.territory ? `${r.record.territory.name} — ${r.record.territory.description}` : '—'}
                {' · '}
                Sec {r.record.section?.label ?? '—'} / Blk {r.record.block?.label ?? '—'}
                {r.record.do_not_call ? ` · Do Not Call${locked ? ' (Locked)' : ''}` : ''}
              </p>
              <p className={`mt-0.5 truncate text-xs ${tone.secondary}`}>
                {r.visits[0] ? VISIT_RESULT_LABELS[r.visits[0].result] : VISIT_RESULT_LABELS.initial_visit}
                {r.visits[0]?.notes ? `: ${r.visits[0].notes}` : ''}
              </p>
              {r.passed_from_name && <p className={`mt-0.5 truncate text-xs font-medium ${tone.primary}`}>Passed by {r.passed_from_name}</p>}
            </div>
            {failedRecordIds.has(r.record.id) ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500" title="Sync failed — open to see why">
                <AlertTriangle className="h-3.5 w-3.5" />
              </span>
            ) : locked ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500" title="Locked — Do Not Call cooldown">
                <Lock className="h-3.5 w-3.5" />
              </span>
            ) : r.completed_at ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Check className="h-4 w-4" />
              </span>
            ) : (
              <span className="h-6 w-6 shrink-0 rounded-full border-2 border-blue-100" />
            )}
          </button>
        )
      })}
    </div>
  )
}
