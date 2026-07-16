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
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0D9488] to-[#22D3EE] text-white shadow-[0_4px_12px_-2px_rgba(13,148,136,0.4)]">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm text-slate-500">{label}</p>
          <p className="text-xl font-bold text-[#0B1B33]">{value}</p>
        </div>
      </div>
      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </Card>
  )
}

// Large gradient "hero" variant for the 1-2 headline KPIs on a dashboard —
// same data shape as StatCard, just visually promoted.
export function HeroStatCard({
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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D9488] to-[#22D3EE] p-6 text-white shadow-[0_20px_40px_-16px_rgba(13,148,136,0.5)]">
      <div className="pointer-events-none absolute -right-6 -top-10 h-32 w-32 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/10" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          {hint && <p className="mt-2 text-xs text-white/70">{hint}</p>}
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
