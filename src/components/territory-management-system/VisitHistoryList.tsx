import { VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import type { RecordVisitWithAuthor } from '@/lib/territory-management-system/modules/records/types'
import Card from '@/components/territory-management-system/dashboard/Card'

const RESULT_STYLES: Record<string, string> = {
  visited: 'bg-emerald-50 text-emerald-600',
  not_home: 'bg-slate-100 text-slate-600',
  do_not_call: 'bg-red-50 text-red-600',
  return_visit: 'bg-blue-50 text-[#2563EB]',
}

export default function VisitHistoryList({ visits }: { visits: RecordVisitWithAuthor[] }) {
  if (visits.length === 0) {
    return <Card className="p-6 text-center text-sm text-slate-400">No visits logged yet.</Card>
  }

  return (
    <div className="space-y-3">
      {visits.map((visit) => (
        <Card key={visit.id} className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${RESULT_STYLES[visit.result] ?? ''}`}>
              {VISIT_RESULT_LABELS[visit.result as keyof typeof VISIT_RESULT_LABELS]}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(visit.visited_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>
          {visit.notes && <p className="mt-2 text-sm text-slate-600">{visit.notes}</p>}
          {visit.created_by_name && <p className="mt-2 text-xs text-slate-400">Logged by {visit.created_by_name}</p>}
        </Card>
      ))}
    </div>
  )
}
