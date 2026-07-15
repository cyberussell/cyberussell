import type { LucideIcon } from 'lucide-react'
import Card from './Card'

export default function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon
  label: string
  value: string | number
  hint?: string
}) {
  return (
    <Card className="p-5">
      {/* Mobile: icon + label as a top row, value centered on its own row below. Desktop
          (sm and up) keeps the original icon-left / label-and-value-stacked layout. */}
      <div className="flex items-center gap-3 sm:items-start">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-white shadow-[0_4px_12px_-2px_rgba(37,99,235,0.4)]">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xl leading-tight text-slate-500 sm:text-sm">{label}</p>
          <p className="hidden text-xl font-bold text-[#0B1B33] sm:block">{value}</p>
        </div>
      </div>
      <p className="mt-3 text-center text-2xl font-bold text-[#0B1B33] sm:hidden">{value}</p>
      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </Card>
  )
}
