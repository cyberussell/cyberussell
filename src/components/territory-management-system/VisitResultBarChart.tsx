import { VISIT_RESULT_LABELS, VISIT_RESULTS } from '@/lib/territory-management-system/modules/records/schema'
import type { VisitResult } from '@/lib/territory-management-system/modules/records/types'

// Plain hex equivalents of VISIT_RESULT_STYLES' tailwind classes — inline bar widths/dots can't
// consume tailwind utility classes directly, so this is a deliberate, separate small mapping
// rather than trying to parse one out of the other.
const RESULT_COLORS: Record<VisitResult, string> = {
  initial_visit: '#3B82F6',
  return_visit: '#0EA5E9',
  started_bible_study: '#6366F1',
  bible_study: '#8B5CF6',
  progressing: '#10B981',
  discontinued: '#9CA3AF',
  not_home: '#64748B',
  do_not_call: '#EF4444',
  moved: '#F59E0B',
  other: '#F97316',
  undone: '#D1D5DB',
}

// Horizontal bars, highest count first — reads faster than a donut at a glance (especially on
// mobile, per Russell's feedback replacing the original pie chart) and every category stays
// individually readable regardless of how many statuses are in play.
export default function VisitResultBarChart({ resultCounts }: { resultCounts: Record<VisitResult, number> }) {
  const entries = VISIT_RESULTS.map((r) => ({ result: r, count: resultCounts[r] ?? 0 }))
    .filter((e) => e.count > 0)
    .sort((a, b) => b.count - a.count)

  if (entries.length === 0) {
    return <p className="text-center text-sm text-slate-400">No visits were logged today.</p>
  }

  const max = entries[0].count

  return (
    <div className="space-y-3">
      {entries.map((e) => (
        <div key={e.result} className="flex items-center gap-3">
          <span className="w-32 shrink-0 truncate text-sm text-slate-600 sm:w-36">{VISIT_RESULT_LABELS[e.result]}</span>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full"
              style={{ width: `${(e.count / max) * 100}%`, backgroundColor: RESULT_COLORS[e.result] }}
            />
          </div>
          <span className="w-6 shrink-0 text-right text-sm font-semibold text-[#0B1B33]">{e.count}</span>
        </div>
      ))}
    </div>
  )
}
