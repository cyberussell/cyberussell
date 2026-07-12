'use client'

import { useOptimistic, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updateOrderStatus } from '@/app/laundry-management-system/actions/orders'
import type { OrderStatus } from '@/lib/laundry-management-system/modules/orders/types'
import { getNextStatuses, isTerminalStatus } from '@/lib/laundry-management-system/modules/orders/stateMachine'
import { ORDER_STATUS_LABELS } from './StatusBadge'
import StatusBadge from './StatusBadge'

export default function OrderStatusControl({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  // Reverts to the real `status` prop on its own once the transition below
  // settles and router.refresh() delivers the server's actual value — no
  // manual "previous status" bookkeeping needed on error.
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(status, (_current, next: OrderStatus) => next)
  const nextStatuses = getNextStatuses(optimisticStatus)

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as OrderStatus
    if (next === optimisticStatus) return
    const formData = new FormData()
    formData.set('orderId', orderId)
    formData.set('status', next)
    startTransition(async () => {
      setOptimisticStatus(next)
      const result = await updateOrderStatus({}, formData)
      if (result.error) toast.error(result.error)
      router.refresh()
    })
  }

  return (
    <div className="flex items-center gap-2">
      <StatusBadge status={optimisticStatus} />
      {!isTerminalStatus(optimisticStatus) && (
        <select
          value=""
          onChange={handleChange}
          disabled={pending}
          aria-label="Change order status"
          className="rounded-md border border-blue-100 bg-white px-1.5 py-1 text-xs text-slate-600 focus:border-[#38BDF8] focus:outline-none disabled:opacity-50"
        >
          <option value="" disabled>
            Move to…
          </option>
          {nextStatuses.map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
