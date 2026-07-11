import type { OrderStatus } from '@/lib/laundry-management-system/modules/orders/types'

const STYLES: Record<OrderStatus, string> = {
  received: 'bg-slate-100 text-slate-600',
  sorting: 'bg-amber-100 text-amber-700',
  washing: 'bg-blue-100 text-blue-700',
  drying: 'bg-cyan-100 text-cyan-700',
  folding: 'bg-indigo-100 text-indigo-700',
  ready_for_pickup: 'bg-sky-100 text-sky-700',
  out_for_delivery: 'bg-purple-100 text-purple-700',
  completed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-600',
}

const LABELS: Record<OrderStatus, string> = {
  received: 'Received',
  sorting: 'Sorting',
  washing: 'Washing',
  drying: 'Drying',
  folding: 'Folding',
  ready_for_pickup: 'Ready for Pickup',
  out_for_delivery: 'Out for Delivery',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STYLES[status]}`}>
      {LABELS[status]}
    </span>
  )
}

export { LABELS as ORDER_STATUS_LABELS }
