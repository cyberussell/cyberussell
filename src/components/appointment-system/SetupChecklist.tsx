import Link from 'next/link'
import { CheckCircle2, Circle } from 'lucide-react'
import { dismissSetupChecklist } from '@/app/appointments/actions'

interface ChecklistStep {
  label: string
  description: string
  href: string
  done: boolean
}

export default function SetupChecklist({ steps, hidden }: { steps: ChecklistStep[]; hidden: boolean }) {
  const doneCount = steps.filter((s) => s.done).length
  if (hidden || doneCount === steps.length) return null

  return (
    <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/[0.04] p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold text-white">Get your store ready to accept bookings</h2>
          <p className="mt-0.5 text-sm text-slate-400">
            {doneCount} of {steps.length} steps done
          </p>
        </div>
        <form action={dismissSetupChecklist}>
          <button className="text-xs text-slate-500 transition hover:text-slate-300">Hide this</button>
        </form>
      </div>
      <ul className="mt-4 space-y-2">
        {steps.map((s) => (
          <li key={s.label}>
            <Link
              href={s.href}
              className={`flex items-start gap-3 rounded-lg border p-3 text-sm transition ${
                s.done
                  ? 'border-slate-800 bg-slate-900/40 text-slate-500'
                  : 'border-slate-800 bg-slate-900 text-slate-200 hover:border-emerald-400'
              }`}
            >
              {s.done ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-slate-600" aria-hidden />
              )}
              <span>
                <span className={`font-medium ${s.done ? 'line-through' : ''}`}>{s.label}</span>
                <span className="mt-0.5 block text-xs text-slate-400">{s.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
