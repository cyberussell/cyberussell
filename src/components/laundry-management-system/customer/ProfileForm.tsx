'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import { updateCustomerProfile } from '@/app/lms/actions/customer'
import type { ActionResult } from '@/app/lms/actions/shared'
import type { Customer } from '@/lib/laundry-management-system/modules/customer/types'
import { CARD_CLASS } from '../dashboard/Card'
import Button from '../dashboard/Button'

export default function ProfileForm({ customer }: { customer: Customer }) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(updateCustomerProfile, {})
  const saved = state.error === 'SAVED'

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      action={formAction}
      className={`space-y-4 p-5 ${CARD_CLASS}`}
    >
      <input type="hidden" name="customerId" value={customer.id} />
      <Field label="Full name" name="fullName" defaultValue={customer.full_name} />
      <Field label="Phone" name="phone" defaultValue={customer.phone} />
      <Field label="Email" name="email" type="email" defaultValue={customer.email} />

      {state.error && !saved && <p className="text-sm text-red-500">{state.error}</p>}
      {saved && <p className="text-sm text-emerald-600">Saved!</p>}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Saving…' : 'Save changes'}
      </Button>
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
        className="mt-1 w-full rounded-lg border border-teal-100 bg-[#F0FDFA] px-3 py-2 text-[#0B1B33] focus:border-[#22D3EE] focus:outline-none"
      />
    </label>
  )
}
