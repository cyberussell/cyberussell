'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { schedulePickup, markPickedUp } from '@/app/lms/actions/orders'
import { useServerAction } from '@/lib/laundry-management-system/hooks/useServerAction'
import type { OrderWithDriver } from '@/lib/laundry-management-system/modules/orders/types'
import type { Driver } from '@/lib/laundry-management-system/modules/drivers/types'
import Card from './Card'
import DriverAssignmentControl from './DriverAssignmentControl'

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

function PickupScheduleForm({ order }: { order: OrderWithDriver }) {
  const { dispatch, pending, error } = useServerAction(schedulePickup, ['SAVED'], 'Pickup schedule saved.')

  return (
    <form action={dispatch} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="orderId" value={order.id} />
      <label className="block">
        <span className="text-xs text-slate-500">Pickup address</span>
        <input
          name="pickupAddress"
          defaultValue={order.pickup_address}
          placeholder="Address"
          className="mt-1 w-48 rounded-lg border border-blue-100 bg-[#F8FBFF] px-2.5 py-1.5 text-sm text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="text-xs text-slate-500">Scheduled</span>
        <input
          type="datetime-local"
          name="pickupScheduledAt"
          defaultValue={toDatetimeLocal(order.pickup_scheduled_at)}
          className="mt-1 rounded-lg border border-blue-100 bg-[#F8FBFF] px-2.5 py-1.5 text-sm text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg border border-blue-100 bg-white px-3 py-1.5 text-sm font-medium text-[#2563EB] transition hover:border-[#38BDF8]/40 disabled:opacity-50"
      >
        {pending ? 'Saving…' : 'Save'}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  )
}

export default function PickupQueueTable({
  orders,
  drivers,
  orderBasePath,
}: {
  orders: OrderWithDriver[]
  drivers: Driver[]
  orderBasePath: string
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [markingId, setMarkingId] = useState<string | null>(null)

  function handleMarkPickedUp(orderId: string) {
    setMarkingId(orderId)
    startTransition(async () => {
      const result = await markPickedUp(orderId)
      setMarkingId(null)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Marked as picked up.')
        router.refresh()
      }
    })
  }

  if (orders.length === 0) {
    return (
      <Card className="p-10 text-center">
        <p className="text-sm text-slate-400">No pickups waiting — nothing has been requested yet.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <Link href={`${orderBasePath}/${order.id}`} className="font-semibold text-[#2563EB] hover:underline">
                {order.order_number}
              </Link>
              <span className="ml-2 text-sm text-slate-500">
                {order.customer?.full_name || order.walk_in_name || 'Walk-in customer'}
              </span>
            </div>
            <button
              onClick={() => handleMarkPickedUp(order.id)}
              disabled={pending && markingId === order.id}
              className="rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-3 py-1.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
            >
              {pending && markingId === order.id ? 'Marking…' : 'Mark Picked Up'}
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <PickupScheduleForm order={order} />
            <DriverAssignmentControl orderId={order.id} currentDriverId={order.driver_id} drivers={drivers} />
          </div>
        </Card>
      ))}
    </div>
  )
}
