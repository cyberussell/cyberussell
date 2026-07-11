'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import { updateCustomerProfile } from '@/app/laundry-management-system/actions/customer'
import type { ActionResult } from '@/app/laundry-management-system/actions/shared'
import type { Customer } from '@/lib/laundry-management-system/modules/customer/types'

export default function ProfileForm({ customer }: { customer: Customer }) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(updateCustomerProfile, {})
  const saved = state.error === 'SAVED'

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      action={formAction}
      className="space-y-4 rounded-3xl border border-blue-100/60 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
    >
      <input type="hidden" name="customerId" value={customer.id} />
      <Field label="Full name" name="fullName" defaultValue={customer.full_name} />
      <Field label="Phone" name="phone" defaultValue={customer.phone} />
      <Field label="Email" name="email" type="email" defaultValue={customer.email} />

      {state.error && !saved && <p className="text-sm text-red-500">{state.error}</p>}
      {saved && <p className="text-sm text-emerald-600">Saved!</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
      >
        {pending ? 'Saving…' : 'Save changes'}
      </button>
    </motion.form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  defaultValue,
}: {
  label: string
  name: string
  type?: string
  defaultValue?: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={name !== 'email'}
        className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
      />
    </label>
  )
}
