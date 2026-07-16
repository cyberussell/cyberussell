'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { StatusHistoryEntry } from '@/lib/laundry-management-system/modules/orders/types'
import { ORDER_STATUS_LABELS } from './dashboard/StatusBadge'

// Shared across owner/staff order detail pages and the customer tracking
// page — one component renders the real, timestamped history for all three,
// fed directly by `orders.status_history` (DB-trigger-maintained, so it's
// always accurate regardless of which action changed the status).
export default function OrderTimeline({ history }: { history: StatusHistoryEntry[] }) {
  if (history.length === 0) {
    return <p className="text-sm text-slate-400">No status history yet.</p>
  }

  return (
    <ol>
      {history.map((entry, i) => {
        const isLast = i === history.length - 1
        return (
          <motion.li
            key={`${entry.status}-${entry.changed_at}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            className="relative flex gap-3 pb-5 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0D9488] text-white">
                <Check className="h-3.5 w-3.5" />
              </span>
              {!isLast && <span className="mt-1 w-0.5 flex-1 bg-teal-100" />}
            </div>
            <div className="pt-0.5">
              <p className="text-sm font-semibold text-[#0B1B33]">{ORDER_STATUS_LABELS[entry.status]}</p>
              <p className="text-xs text-slate-400">{new Date(entry.changed_at).toLocaleString('en-US')}</p>
            </div>
          </motion.li>
        )
      })}
    </ol>
  )
}
