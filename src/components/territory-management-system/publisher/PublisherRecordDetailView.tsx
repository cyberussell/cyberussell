import { MapPin } from 'lucide-react'
import type { PartnershipRecordDetail } from '@/lib/territory-management-system/modules/assignment/types'
import type { SyncQueueItem } from '@/lib/territory-management-system/modules/offline/db'
import { VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import VisitHistoryList from '@/components/territory-management-system/VisitHistoryList'
import VisitResultBadge from '@/components/territory-management-system/VisitResultBadge'
import Card from '@/components/territory-management-system/dashboard/Card'
import PublisherVisitLogForm from './PublisherVisitLogForm'

// Full-card tone driven by the record's latest logged visit result — a glance-level warning
// (Do Not Call) or good-news highlight (Bible Study) that's more visible than a small badge
// alone. Deliberately its own local mapping rather than records/schema.ts's shared
// VISIT_RESULT_STYLES (that one backs badge pills everywhere else and stays violet for Bible
// Study there) — this card's full-panel treatment is a distinct, one-off UX request.
function cardToneClass(latestResult: string | undefined): string {
  if (latestResult === 'do_not_call') return 'border-red-300 bg-red-50'
  if (latestResult === 'bible_study' || latestResult === 'progressing') return 'border-emerald-300 bg-emerald-50'
  return 'border-blue-100/60 bg-white'
}

export default function PublisherRecordDetailView({
  assigned,
  pendingVisits,
  readOnly,
  saving,
  onLogVisit,
}: {
  assigned: PartnershipRecordDetail
  pendingVisits: SyncQueueItem[]
  // True while viewing another Ministry Partner's assignment from this device — address,
  // badges, and full visit history still show, but there's nothing here to log or edit.
  readOnly: boolean
  // True while a just-submitted visit is being saved/synced — disables the form and shows a
  // spinner so a slow connection doesn't look like a missed tap.
  saving: boolean
  onLogVisit: (visitedAt: string, result: string, notes: string) => void
}) {
  const mapsUrl = assigned.record.plus_code
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(assigned.record.plus_code)}`
    : null
  const latestResult = assigned.visits[0]?.result

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl border p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-16px_rgba(37,99,235,0.25)] ${cardToneClass(latestResult)}`}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h1 className="font-semibold text-[#0B1B33]">
            {assigned.record.address || assigned.record.plus_code || 'Unlabeled record'}
            {assigned.record.unit ? `, ${assigned.record.unit}` : ''}
          </h1>
          <VisitResultBadge result={assigned.visits[0]?.result ?? 'initial_visit'} />
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Sec {assigned.record.section?.label ?? '—'} / Blk {assigned.record.block?.label ?? '—'}
        </p>
        {assigned.record.resident_name && <p className="mt-2 text-sm text-slate-600">{assigned.record.resident_name}</p>}
        {assigned.record.household_members != null && (
          <p className="mt-2 text-sm text-slate-500">
            Household members: {assigned.record.household_members}
          </p>
        )}
        {assigned.record.notes && <p className="mt-2 text-sm text-slate-500">{assigned.record.notes}</p>}
        {assigned.record.do_not_call && <p className="mt-2 text-sm font-medium text-red-500">Do Not Call</p>}
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-semibold text-[#2563EB] hover:border-[#38BDF8]/40 hover:bg-blue-50"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
        )}
      </div>

      {!readOnly && (
        <div id="record-a-visit-form">
          <PublisherVisitLogForm latestResult={latestResult} saving={saving} onLogVisit={onLogVisit} />
        </div>
      )}

      {!readOnly && pendingVisits.length > 0 && (
        <div>
          <h2 className="mb-3 font-semibold text-[#0B1B33]">Pending Sync</h2>
          <div className="space-y-2">
            {pendingVisits.map((v) => (
              <Card key={v.id} className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#0B1B33]">
                    {VISIT_RESULT_LABELS[v.payload.result as keyof typeof VISIT_RESULT_LABELS] ?? v.payload.result}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      v.status === 'failed' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {v.status === 'failed' ? 'Failed' : 'Queued'}
                  </span>
                </div>
                {v.payload.notes && <p className="mt-1 text-sm text-slate-500">{v.payload.notes}</p>}
                {v.error && <p className="mt-1 text-xs text-red-500">{v.error}</p>}
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 font-semibold text-[#0B1B33]">Visit History</h2>
        <VisitHistoryList visits={assigned.visits} />
      </div>
    </div>
  )
}
