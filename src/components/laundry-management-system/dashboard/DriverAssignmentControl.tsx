'use client'

import { assignOrderDriver } from '@/app/lms/actions/orders'
import { useServerAction } from '@/lib/laundry-management-system/hooks/useServerAction'
import type { Driver } from '@/lib/laundry-management-system/modules/drivers/types'
import DriverSelect from './DriverSelect'

// Shared by the Pickup and Delivery Management pages — one driver field per
// order, assigned the same way from either page (see actions/orders.ts's
// assignOrderDriver for why there's a single driver_id rather than two).
export default function DriverAssignmentControl({
  orderId,
  currentDriverId,
  drivers,
}: {
  orderId: string
  currentDriverId: string | null
  drivers: Driver[]
}) {
  const { dispatch, pending, error } = useServerAction(assignOrderDriver, ['SAVED'], 'Driver assigned.')

  return (
    <form action={dispatch} className="flex items-end gap-2">
      <input type="hidden" name="orderId" value={orderId} />
      <div className="min-w-[10rem] flex-1">
        <DriverSelect drivers={drivers} defaultValue={currentDriverId ?? ''} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="h-fit rounded-lg border border-blue-100 bg-white px-3 py-2 text-sm font-medium text-[#2563EB] transition hover:border-[#38BDF8]/40 disabled:opacity-50"
      >
        {pending ? 'Saving…' : 'Save'}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  )
}
