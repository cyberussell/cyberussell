import type { PartnershipRecordDetail } from '@/lib/territory-management-system/modules/assignment/types'
import type { SyncQueueItem } from '@/lib/territory-management-system/modules/offline/db'
import { VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import VisitHistoryList from '@/components/territory-management-system/VisitHistoryList'
import Card from '@/components/territory-management-system/dashboard/Card'
import PublisherVisitLogForm from './PublisherVisitLogForm'

export default function PublisherRecordDetailView({
  assigned,
  pendingVisits,
  onBack,
  onLogVisit,
}: {
  assigned: PartnershipRecordDetail
  pendingVisits: SyncQueueItem[]
  onBack: () => void
  onLogVisit: (visitedAt: string, result: string, notes: string) => void
}) {
  const mapsUrl = assigned.record.plus_code
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(assigned.record.plus_code)}`
    : null

  return (
    <div className="space-y-6">
      <button type="button" onClick={onBack} className="text-sm text-[#2563EB] hover:underline">
        ← Back to Records
      </button>

      <Card className="p-6">
        <h1 className="font-semibold text-[#0B1B33]">
          {assigned.record.address}
          {assigned.record.unit ? `, ${assigned.record.unit}` : ''}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Sec {assigned.record.section?.label ?? '—'} / Blk {assigned.record.block?.label ?? '—'}
        </p>
        {assigned.record.resident_name && <p className="mt-2 text-sm text-slate-600">{assigned.record.resident_name}</p>}
        {assigned.record.notes && <p className="mt-2 text-sm text-slate-500">{assigned.record.notes}</p>}
        {assigned.record.do_not_call && <p className="mt-2 text-sm font-medium text-red-500">Do Not Call</p>}
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-[#2563EB] hover:underline"
          >
            Open in Google Maps →
          </a>
        )}
      </Card>

      <PublisherVisitLogForm onLogVisit={onLogVisit} />

      {pendingVisits.length > 0 && (
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
