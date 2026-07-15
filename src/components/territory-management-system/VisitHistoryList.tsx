import type { RecordVisitWithAuthor } from '@/lib/territory-management-system/modules/records/types'
import Card from '@/components/territory-management-system/dashboard/Card'
import VisitResultBadge from '@/components/territory-management-system/VisitResultBadge'
import ConfirmDeleteButton from '@/components/territory-management-system/dashboard/ConfirmDeleteButton'

// onUndoLast is only ever passed from the admin record detail page (bound to
// undoLastVisitAction) — the publisher-facing usage of this same list passes nothing, so the
// button never renders there. Only offered on the single most recent entry, since that's the
// only one deleteLatestVisit can actually remove.
export default function VisitHistoryList({
  visits,
  onUndoLast,
}: {
  visits: RecordVisitWithAuthor[]
  onUndoLast?: () => Promise<void>
}) {
  if (visits.length === 0) {
    return <Card className="p-6 text-center text-sm text-slate-400">No visits logged yet.</Card>
  }

  return (
    <div className="space-y-3">
      {visits.map((visit, index) => (
        <Card key={visit.id} className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <VisitResultBadge result={visit.result} />
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">
                {new Date(visit.visited_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
              {index === 0 && onUndoLast && (
                <ConfirmDeleteButton
                  action={onUndoLast}
                  confirmMessage="Undo this visit? The record will revert to its previous status."
                  label="Undo"
                  ariaLabel="Undo last visit"
                  className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700"
                />
              )}
            </div>
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
