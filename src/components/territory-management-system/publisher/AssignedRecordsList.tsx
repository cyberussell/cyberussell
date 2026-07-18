import { AlertTriangle, Check, Lock, Users } from 'lucide-react'
import type { PartnershipRecordDetail } from '@/lib/territory-management-system/modules/assignment/types'
import { isDoNotCallLocked, VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import Card from '@/components/territory-management-system/dashboard/Card'

// Deliberately no status-based tinting here (Russell: "Remove all the colors in the card list.
// All white.") — every card in this scrolling list gets the same plain style regardless of
// status, so nothing competes for attention while skimming. The colored full-panel treatment
// only happens on PublisherRecordDetailView (the single record you've tapped into).
const CARD_CONTAINER = 'border-blue-100/60 bg-white hover:border-[#38BDF8]/40'

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

  // "N at this address" — counts other assigned records sharing this record's (non-empty) Plus
  // Code, so multiple people at one household read as a group while skimming the list instead
  // of looking like coincidentally-separate addresses.
  const plusCodeCounts = new Map<string, number>()
  for (const r of records) {
    if (!r.record.plus_code) continue
    plusCodeCounts.set(r.record.plus_code, (plusCodeCounts.get(r.record.plus_code) ?? 0) + 1)
  }

  return (
    <div className="space-y-2">
      {records.map((r) => {
        const locked = isDoNotCallLocked(r.record.do_not_call, r.record.do_not_call_at)
        const householdCount = r.record.plus_code ? (plusCodeCounts.get(r.record.plus_code) ?? 1) : 1
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect(r.record.id)}
            className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left shadow-sm transition ${CARD_CONTAINER}`}
          >
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate font-medium text-[#0B1B33]">
                <span className="truncate">
                  {r.sequence}. {r.record.address || r.record.plus_code || 'Unlabeled record'}
                  {r.record.unit ? `, ${r.record.unit}` : ''}
                </span>
                {householdCount > 1 && (
                  <span
                    className="flex shrink-0 items-center gap-1 rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-[#2563EB]"
                    title={`${householdCount} contact records at this address`}
                  >
                    <Users className="h-3 w-3" />
                    {householdCount}
                  </span>
                )}
              </p>
              {r.record.resident_name && <p className="truncate text-xs text-slate-600">{r.record.resident_name}</p>}
              <p className="truncate text-xs text-slate-400">
                {r.record.territory ? `${r.record.territory.name} — ${r.record.territory.description}` : '—'}
                {' · '}
                Sec {r.record.section?.label ?? '—'} / Blk {r.record.block?.label ?? '—'}
                {r.record.do_not_call ? ` · Do Not Call${locked ? ' (Locked)' : ''}` : ''}
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
