import { RefreshCw } from 'lucide-react'
import type { TerritoryRecordWithLocation } from '@/lib/territory-management-system/modules/records/types'
import Card from '@/components/territory-management-system/dashboard/Card'

// Whatever records already exist in an overflow batch's chosen search area (see
// getRecordsInBlocks/025_overflow_search_scope.sql) — read-only by design (these were never
// assigned to this partnership, and someone else did the original data entry), shown so a
// publisher searching the area can check "has someone already logged this address" before
// adding a new one. The manual Refresh button re-fetches live rather than relying on the
// initial page load, since the whole point is catching a record added moments ago by someone
// else still working the same area.
export default function SearchScopeRecordsList({
  sectionLabel,
  blockLabels,
  records,
  refreshing,
  onRefresh,
  onSelect,
  showAreaLabel = true,
}: {
  sectionLabel: string
  blockLabels: string[]
  records: TerritoryRecordWithLocation[]
  refreshing: boolean
  onRefresh: () => void
  onSelect: (recordId: string) => void
  // The caller may already show the Section/Block line as part of a page-level "Area To
  // Search" header (see PublisherWorkspaceApp's List tab) — set false there to avoid repeating
  // it right underneath.
  showAreaLabel?: boolean
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold text-[#0B1B33]">Existing Records in This Area</h2>
          {showAreaLabel && (
            <p className="text-xs text-slate-500">
              Section {sectionLabel} — Block{blockLabels.length === 1 ? '' : 's'} {blockLabels.join(', ')}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-[#2563EB] transition hover:border-[#38BDF8]/40 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {records.length === 0 ? (
        <Card className="p-6 text-center text-sm text-slate-600">
          No records here yet — search the area and add any households you find.
        </Card>
      ) : (
        <div className="space-y-2">
          {records.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => onSelect(r.id)}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-blue-100/60 bg-white p-3 text-left shadow-sm transition hover:border-[#38BDF8]/40"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-[#0B1B33]">
                  {r.address || r.resident_name || r.plus_code || 'Unlabeled record'}
                  {r.unit ? `, ${r.unit}` : ''}
                </p>
                <p className="truncate text-xs text-slate-400">Blk {r.block?.label ?? '—'}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
