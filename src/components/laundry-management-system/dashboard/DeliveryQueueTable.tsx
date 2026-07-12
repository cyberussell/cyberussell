'use client'

import Link from 'next/link'
import { scheduleDelivery } from '@/app/laundry-management-system/actions/orders'
import { useServerAction } from '@/lib/laundry-management-system/hooks/useServerAction'
import type { OrderWithDriver } from '@/lib/laundry-management-system/modules/orders/types'
import type { Driver } from '@/lib/laundry-management-system/modules/drivers/types'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import Card from './Card'
import OrderStatusControl from './OrderStatusControl'
import DriverAssignmentControl from './DriverAssignmentControl'

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

function DeliveryScheduleForm({ orderId, deliveryScheduledAt }: { orderId: string; deliveryScheduledAt: string | null }) {
  const { dispatch, pending, error } = useServerAction(scheduleDelivery, ['SAVED'], 'Delivery schedule saved.')

  return (
    <form action={dispatch} className="flex items-end gap-2">
      <input type="hidden" name="orderId" value={orderId} />
      <label className="block">
        <span className="text-xs text-slate-500">Delivery time</span>
        <input
          type="datetime-local"
          name="deliveryScheduledAt"
          defaultValue={toDatetimeLocal(deliveryScheduledAt)}
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

export default function DeliveryQueueTable({
  orders,
  drivers,
  currency,
  orderBasePath,
}: {
  orders: OrderWithDriver[]
  drivers: Driver[]
  currency: string
  orderBasePath: string
}) {
  if (orders.length === 0) {
    return (
      <Card className="p-10 text-center">
        <p className="text-sm text-slate-400">No deliveries scheduled — orders marked ready with a delivery time will show up here.</p>
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
              <span className="ml-2 text-sm text-slate-500">{formatCurrency(order.amount, currency)}</span>
            </div>
            <OrderStatusControl orderId={order.id} status={order.status} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <DeliveryScheduleForm orderId={order.id} deliveryScheduledAt={order.delivery_scheduled_at} />
            <DriverAssignmentControl orderId={order.id} currentDriverId={order.driver_id} drivers={drivers} />
          </div>
        </Card>
      ))}
    </div>
  )
}
