'use client'

import { useActionState } from 'react'
import { addCustomer } from '@/app/laundry-management-system/actions/customer'
import type { ActionResult } from '@/app/laundry-management-system/actions/shared'
import Card from './Card'

export default function AddCustomerForm() {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(addCustomer, {})

  return (
    <Card className="max-w-xl p-6">
      <form action={formAction} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Full name</span>
          <input
            name="fullName"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Phone</span>
          <input
            name="phone"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Email (optional)</span>
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
          />
        </label>
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
          {pending ? 'Adding…' : 'Add customer'}
        </button>
      </form>
    </Card>
  )
}
