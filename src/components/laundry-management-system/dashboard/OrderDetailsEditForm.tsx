'use client'

import { useActionState } from 'react'
import { updateOrderDetails } from '@/app/laundry-management-system/actions/orders'
import type { ActionResult } from '@/app/laundry-management-system/actions/shared'
import type { Order } from '@/lib/laundry-management-system/modules/orders/types'
import Card from './Card'

function toDateInputValue(iso: string | null): string {
  if (!iso) return ''
  return iso.slice(0, 10)
}

export default function OrderDetailsEditForm({ order }: { order: Order }) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(updateOrderDetails, {})
  const saved = state.error === 'SAVED'

  return (
    <Card className="p-5">
      <h2 className="mb-3 font-semibold text-[#0B1B33]">Order Details</h2>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="orderId" value={order.id} />

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Weight (kg)</span>
            <input
              name="weightKg"
              type="number"
              min="0"
              step="0.1"
              defaultValue={order.weight_kg ?? ''}
              placeholder="0.0"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] placeholder:text-slate-400 focus:border-[#38BDF8] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Expected Completion</span>
            <input
              name="expectedCompletionAt"
              type="date"
              defaultValue={toDateInputValue(order.expected_completion_at)}
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-slate-600">Payment Status</span>
          <select
            name="paymentStatus"
            defaultValue={order.payment_status}
            className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
          >
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-600">Notes</span>
          <textarea
            name="notes"
            rows={3}
            defaultValue={order.notes}
            className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
          />
        </label>

        {state.error && !saved && <p className="text-sm text-red-500">{state.error}</p>}
        {saved && <p className="text-sm text-emerald-600">Saved!</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </Card>
  )
}
