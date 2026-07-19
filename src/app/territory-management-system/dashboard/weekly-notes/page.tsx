import Link from 'next/link'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { listWeeklyVisitNotes } from '@/lib/territory-management-system/modules/records/queries'
import { endOfDayUtcExclusive, notesWeekRange, startOfDayUtc } from '@/lib/territory-management-system/modules/reports/date'
import { overrideLatestVisitAction, undoLastVisitAction } from '@/app/territory-management-system/actions/records'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import Card from '@/components/territory-management-system/dashboard/Card'
import VisitHistoryList from '@/components/territory-management-system/VisitHistoryList'

export const dynamic = 'force-dynamic'

function formatWeekLabel(start: string, end: string): string {
  const fmt = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
  const year = new Date(`${end}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' })
  return `${fmt(start)} – ${fmt(end)}, ${year}`
}

// Admin-only. Every record whose current latest logged visit has a note AND falls within this
// week's Monday–Sunday window — see notesWeekRange for the "still shows last week through
// Monday, only rolls over on Tuesday" rule. Each row reuses VisitHistoryList exactly as the
// per-record detail page does (badge, date, notes, Override/Undo), just scoped to one visit at a
// time instead of a record's full history, so an admin can review and act on a whole week's
// worth of notes without opening every record individually.
export default async function WeeklyNotesPage() {
  const { supabase, congregation } = await requireAdmin()
  const week = notesWeekRange(congregation.timezone)
  const rangeStartIso = startOfDayUtc(week.start, congregation.timezone)
  const rangeEndIso = endOfDayUtcExclusive(week.end, congregation.timezone)
  const rows = await listWeeklyVisitNotes(supabase, congregation.id, rangeStartIso, rangeEndIso)

  return (
    <div>
      <PageHeader
        title="Weekly Notes"
        subtitle={`Notes from visits logged ${formatWeekLabel(week.start, week.end)} · Monday–Sunday, refreshes every Tuesday`}
      />
      {rows.length === 0 ? (
        <Card className="p-6 text-center text-sm text-slate-400">No visit notes for this week yet.</Card>
      ) : (
        <div className="space-y-6">
          {rows.map(({ record, visit }) => (
            <div key={record.id}>
              <Link
                href={`/territory-management-system/dashboard/records/${record.id}`}
                className="text-sm font-medium text-[#0B1B33] hover:underline"
              >
                {record.address || record.plus_code || 'Unlabeled record'}
                {record.unit ? `, ${record.unit}` : ''}
              </Link>
              <p className="mb-2 text-xs text-slate-400">
                {record.territory?.name ?? '—'} / Sec {record.section?.label ?? '—'} / Blk {record.block?.label ?? '—'}
                {record.resident_name ? ` · ${record.resident_name}` : ''}
              </p>
              <VisitHistoryList
                visits={[visit]}
                onUndoLast={undoLastVisitAction.bind(null, record.id)}
                onOverride={overrideLatestVisitAction.bind(null, record.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
