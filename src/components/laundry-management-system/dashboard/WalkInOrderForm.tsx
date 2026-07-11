'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { createWalkInOrder } from '@/app/laundry-management-system/actions/orders'
import type { ActionResult } from '@/app/laundry-management-system/actions/shared'
import type { Branch } from '@/lib/laundry-management-system/modules/tenant/types'
import type { Customer } from '@/lib/laundry-management-system/modules/customer/types'
import type { StaffMember } from '@/lib/laundry-management-system/modules/staff/types'
import Card from './Card'
import AssignedStaffSelect from './AssignedStaffSelect'

const SERVICE_PRESETS = ['Wash & Fold', 'Dry Clean', 'Wash & Iron', 'Iron Only', 'Comforter/Bulky']

export default function WalkInOrderForm({
  branches,
  customers = [],
  staff = [],
  enablePickupRequest = false,
}: {
  branches: Branch[]
  customers?: Customer[]
  staff?: (StaffMember & { profile: { full_name: string } | null })[]
  enablePickupRequest?: boolean
}) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(createWalkInOrder, {})
  const [pickupRequested, setPickupRequested] = useState(false)

  return (
    <Card className="max-w-xl p-6">
      <form action={formAction} className="space-y-4">
        {branches.length > 1 ? (
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Branch</span>
            <select
              name="branchId"
              required
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <input type="hidden" name="branchId" value={branches[0]?.id ?? ''} />
        )}

        <label className="block">
          <span className="text-sm font-medium text-slate-600">Service Type</span>
          <input
            name="serviceLabel"
            list="service-presets"
            required
            placeholder="Wash & Fold"
            className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] placeholder:text-slate-400 focus:border-[#38BDF8] focus:outline-none"
          />
          <datalist id="service-presets">
            {SERVICE_PRESETS.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </label>

        {customers.length > 0 && (
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Link to existing customer (optional)</span>
            <select
              name="customerId"
              defaultValue=""
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
            >
              <option value="">None — anonymous walk-in</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.full_name}
                  {c.phone ? ` (${c.phone})` : ''}
                </option>
              ))}
            </select>
            <span className="mt-1 block text-xs text-slate-400">
              Linking lets this customer track the order in their own account.
            </span>
          </label>
        )}

        {staff.length > 0 && <AssignedStaffSelect staff={staff} />}

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Amount</span>
            <input
              name="amount"
              type="number"
              min="0"
              step="0.01"
              required
              placeholder="0.00"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] placeholder:text-slate-400 focus:border-[#38BDF8] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Weight (kg, optional)</span>
            <input
              name="weightKg"
              type="number"
              min="0"
              step="0.1"
              placeholder="0.0"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] placeholder:text-slate-400 focus:border-[#38BDF8] focus:outline-none"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Expected Completion (optional)</span>
            <input
              name="expectedCompletionAt"
              type="date"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Payment Status</span>
            <select
              name="paymentStatus"
              defaultValue="unpaid"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Customer name (optional)</span>
            <input
              name="walkInName"
              type="text"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Phone (optional)</span>
            <input
              name="walkInPhone"
              type="text"
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
            />
          </label>
        </div>

        {enablePickupRequest && (
          <div className="rounded-lg border border-blue-100 bg-[#F8FBFF] p-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <input
                type="checkbox"
                name="pickupRequested"
                value="true"
                checked={pickupRequested}
                onChange={(e) => setPickupRequested(e.target.checked)}
                className="h-4 w-4 rounded border-blue-200 text-[#2563EB] focus:ring-[#38BDF8]"
              />
              Customer needs pickup
            </label>
            {pickupRequested && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm font-medium text-slate-600">Pickup address</span>
                  <input
                    name="pickupAddress"
                    type="text"
                    className="mt-1 w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-600">Scheduled pickup</span>
                  <input
                    name="pickupScheduledAt"
                    type="datetime-local"
                    className="mt-1 w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
                  />
                </label>
              </div>
            )}
          </div>
        )}

        <label className="block">
          <span className="text-sm font-medium text-slate-600">Notes (optional)</span>
          <textarea
            name="notes"
            rows={2}
            className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
          />
        </label>

        {state.error && <p className="text-sm text-red-500">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Creating order…' : 'Create order'}
        </button>
      </form>
    </Card>
  )
}
