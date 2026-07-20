import { VISIT_RESULT_LABELS, VISIT_RESULTS } from '@/lib/territory-management-system/modules/records/schema'
import type { VisitResult } from '@/lib/territory-management-system/modules/records/types'

// Plain hex equivalents of VISIT_RESULT_STYLES' tailwind classes — inline bar widths/dots can't
// consume tailwind utility classes directly, so this is a deliberate, separate small mapping
// rather than trying to parse one out of the other.
const RESULT_COLORS: Record<VisitResult, string> = {
  initial_visit: '#3B82F6',
  return_visit: '#0EA5E9',
  potential_bible_study: '#06B6D4',
  started_bible_study: '#6366F1',
  bible_study: '#8B5CF6',
  progressing: '#10B981',
  discontinued: '#9CA3AF',
  study_discontinued: '#78716C',
  not_home: '#64748B',
  do_not_call: '#EF4444',
  moved: '#F59E0B',
  other: '#F97316',
  undone: '#D1D5DB',
}

// Rounds a chart's highest value up to a "nice" 1/2/5-times-a-power-of-ten number (89 -> 100,
// 37 -> 50, 6 -> 10, ...) so the axis reads as a real scale with headroom, matching Russell's
// reference chart (Depict Data Studio) where the top bar doesn't quite reach the right edge.
function niceMax(max: number): number {
  if (max <= 0) return 10
  const magnitude = 10 ** Math.floor(Math.log10(max))
  const residual = max / magnitude
  const step = residual <= 1 ? 1 : residual <= 2 ? 2 : residual <= 5 ? 5 : 10
  return step * magnitude
}

// Horizontal bars, highest count first, category names on the left / values on the right —
// reads faster than a donut at a glance (especially on mobile, per Russell's feedback) and every
// category stays individually readable regardless of how many statuses are in play. Every result
// type shows (even at 0), not just ones with activity — a single lonely bar for whatever's
// nonzero didn't read as "a graph" to Russell when most categories were still empty. Layout
// (axis line with 0/max ticks, flat-left rounded-right bars, bold value colored to match its
// bar) matches a reference screenshot Russell shared rather than any chart library.
export default function VisitResultBarChart({ resultCounts }: { resultCounts: Record<VisitResult, number> }) {
  const entries = VISIT_RESULTS.filter((r) => r !== 'undone')
    .map((r) => ({ result: r, count: resultCounts[r] ?? 0 }))
    .sort((a, b) => b.count - a.count)

  const scaleMax = niceMax(entries[0]?.count ?? 0)

  return (
    <div>
      <div className="space-y-3.5">
        {entries.map((e) => (
          <div key={e.result} className="flex items-center gap-3">
            <span className="w-32 shrink-0 truncate text-sm text-slate-600 sm:w-36">{VISIT_RESULT_LABELS[e.result]}</span>
            <div className="flex flex-1 items-center gap-2">
              <div
                className="h-3.5 rounded-r-full"
                style={{ width: `${(e.count / scaleMax) * 100}%`, backgroundColor: RESULT_COLORS[e.result] }}
              />
              <span className="text-sm font-bold" style={{ color: RESULT_COLORS[e.result] }}>
                {e.count}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <span aria-hidden="true" className="w-32 shrink-0 sm:w-36" />
        <div className="flex flex-1 justify-between border-t border-slate-200 pt-1 text-xs text-slate-400">
          <span>0</span>
          <span>{scaleMax}</span>
        </div>
      </div>
    </div>
  )
}
