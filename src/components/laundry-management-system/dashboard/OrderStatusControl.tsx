'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateOrderStatus } from '@/app/laundry-management-system/actions/orders'
import type { OrderStatus } from '@/lib/laundry-management-system/modules/orders/types'
import { getNextStatuses, isTerminalStatus } from '@/lib/laundry-management-system/modules/orders/stateMachine'
import { ORDER_STATUS_LABELS } from './StatusBadge'
import StatusBadge from './StatusBadge'

export default function OrderStatusControl({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const router = useRouter()
  const [current, setCurrent] = useState(status)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const nextStatuses = getNextStatuses(current)

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as OrderStatus
    if (next === current) return
    setError('')
    const previous = current
    setCurrent(next)
    const formData = new FormData()
    formData.set('orderId', orderId)
    formData.set('status', next)
    startTransition(async () => {
      const result = await updateOrderStatus({}, formData)
      if (result.error) {
        setCurrent(previous)
        setError(result.error)
      }
      router.refresh()
    })
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <StatusBadge status={current} />
        {!isTerminalStatus(current) && (
          <select
            value=""
            onChange={handleChange}
            disabled={pending}
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
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
