import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

export interface QuickAction {
  label: string
  href: string
  icon: LucideIcon
}

export default function QuickActionsGrid({ actions }: { actions: QuickAction[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="flex flex-col items-center gap-2 rounded-2xl border border-blue-100/60 bg-white p-4 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#38BDF8]/40 hover:shadow-[0_10px_24px_-12px_rgba(37,99,235,0.35)]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-white">
            <action.icon className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-[#0B1B33]">{action.label}</span>
        </Link>
      ))}
    </div>
  )
}
