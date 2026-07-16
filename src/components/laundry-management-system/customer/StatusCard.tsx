'use client'

import { motion } from 'framer-motion'
import { Package, ListFilter, Shirt, Wind, Layers, PackageCheck, Truck, CheckCircle2, XCircle } from 'lucide-react'
import type { Order, OrderStatus } from '@/lib/laundry-management-system/modules/orders/types'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import OrderTimeline from '../OrderTimeline'

const STATUS_META: Record<OrderStatus, { icon: typeof Package; label: string; color: string; bg: string }> = {
  received: { icon: Package, label: 'Received', color: '#64748B', bg: 'from-slate-100 to-slate-50' },
  sorting: { icon: ListFilter, label: 'Sorting', color: '#B45309', bg: 'from-amber-100 to-amber-50' },
  washing: { icon: Shirt, label: 'Washing', color: '#0D9488', bg: 'from-blue-100 to-sky-50' },
  drying: { icon: Wind, label: 'Drying', color: '#0891B2', bg: 'from-cyan-100 to-cyan-50' },
  folding: { icon: Layers, label: 'Folding', color: '#4F46E5', bg: 'from-indigo-100 to-indigo-50' },
  ready_for_pickup: { icon: PackageCheck, label: 'Ready for Pickup', color: '#0EA5E9', bg: 'from-sky-100 to-cyan-50' },
  out_for_delivery: { icon: Truck, label: 'Out for Delivery', color: '#7C3AED', bg: 'from-purple-100 to-purple-50' },
  completed: { icon: CheckCircle2, label: 'Completed', color: '#059669', bg: 'from-emerald-100 to-emerald-50' },
  cancelled: { icon: XCircle, label: 'Cancelled', color: '#DC2626', bg: 'from-red-100 to-red-50' },
}

const PULSING_STATUSES: OrderStatus[] = ['sorting', 'washing', 'drying', 'folding', 'ready_for_pickup', 'out_for_delivery']

export default function StatusCard({
  order,
  currency,
  index = 0,
  showTimeline = false,
}: {
  order: Order
  currency: string
  index?: number
  showTimeline?: boolean
}) {
  const meta = STATUS_META[order.status]
  const Icon = meta.icon
  const isActive = PULSING_STATUSES.includes(order.status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${meta.bg} p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_32px_-20px_rgba(13,148,136,0.35)]`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">{order.order_number}</p>
          <p className="mt-0.5 truncate text-lg font-bold text-[#0B1B33]">{order.service_label}</p>
          <p className="mt-1 text-sm font-medium text-slate-500">{formatCurrency(order.amount, currency)}</p>
        </div>
        <motion.div
          animate={isActive ? { scale: [1, 1.08, 1] } : {}}
          transition={{ repeat: isActive ? Infinity : 0, duration: 2, ease: 'easeInOut' }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm"
          style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>

      <div
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-sm font-semibold"
        style={{ color: meta.color }}
      >
        {meta.label}
      </div>

      {showTimeline && (
        <div className="mt-5 border-t border-white/60 pt-4">
          <OrderTimeline history={order.status_history} />
        </div>
      )}
    </motion.div>
  )
}
