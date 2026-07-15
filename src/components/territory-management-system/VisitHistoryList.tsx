import type { RecordVisitWithAuthor } from '@/lib/territory-management-system/modules/records/types'
import Card from '@/components/territory-management-system/dashboard/Card'
import VisitResultBadge from '@/components/territory-management-system/VisitResultBadge'

export default function VisitHistoryList({ visits }: { visits: RecordVisitWithAuthor[] }) {
  if (visits.length === 0) {
    return <Card className="p-6 text-center text-sm text-slate-400">No visits logged yet.</Card>
  }

  return (
    <div className="space-y-3">
      {visits.map((visit) => (
        <Card key={visit.id} className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <VisitResultBadge result={visit.result} />
            <span className="text-xs text-slate-400">
              {new Date(visit.visited_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>
          {visit.notes && <p className="mt-2 text-sm text-slate-600">{visit.notes}</p>}
          {(visit.created_by_name || visit.partner_name) && (
            <p className="mt-2 text-xs text-slate-400">Visited by {visit.created_by_name ?? visit.partner_name}</p>
          )}
        </Card>
      ))}
    </div>
  )
}
