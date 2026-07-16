'use client'

import { motion } from 'framer-motion'
import { Clock3 } from 'lucide-react'
import type { Branch } from '@/lib/laundry-management-system/modules/tenant/types'

const DAY_LABELS: Record<string, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
}
const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const

export default function PickupScheduleCard({ branch }: { branch: Branch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border border-teal-100/60 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
    >
      <div className="mb-3 flex items-center gap-2">
        <Clock3 className="h-5 w-5 text-[#0D9488]" />
        <h2 className="font-bold text-[#0B1B33]">Pickup Schedule</h2>
      </div>
      <p className="mb-3 text-sm text-slate-500">
        {branch.name}
        {branch.address ? ` · ${branch.address}` : ''}
      </p>
      <div className="space-y-1.5">
        {DAY_ORDER.map((day) => {
          const hours = branch.business_hours?.[day]
          return (
            <div key={day} className="flex items-center justify-between text-sm">
              <span className="font-medium text-[#0B1B33]">{DAY_LABELS[day]}</span>
              {!hours || hours.closed ? (
                <span className="text-slate-400">Closed</span>
              ) : (
                <span className="text-slate-500">
                  {hours.open} – {hours.close}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
