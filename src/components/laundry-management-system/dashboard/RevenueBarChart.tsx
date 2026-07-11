import type { SeriesPoint } from '@/lib/laundry-management-system/modules/reports/queries'

export default function RevenueBarChart({ series, currency }: { series: SeriesPoint[]; currency: string }) {
  const max = Math.max(...series.map((p) => p.revenue), 1)

  return (
    <div className="flex h-40 items-end gap-1">
      {series.map((point) => {
        const heightPct = Math.max((point.revenue / max) * 100, point.revenue > 0 ? 4 : 1)
        return (
          <div key={point.date} className="group relative flex-1">
            <div
              className="w-full rounded-t-sm bg-gradient-to-t from-[#2563EB] to-[#38BDF8] transition-opacity group-hover:opacity-80"
              style={{ height: `${heightPct}%` }}
            />
            <div className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0B1B33] px-2 py-1 text-xs text-white group-hover:block">
              {point.label}: {new Intl.NumberFormat('en-PH', { style: 'currency', currency, maximumFractionDigits: 0 }).format(point.revenue)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
