'use client'

import { useActionState } from 'react'
import { updateBranchDetails } from '@/app/lms/actions/settings'
import type { ActionResult } from '@/app/lms/actions/shared'
import type { Branch } from '@/lib/laundry-management-system/modules/tenant/types'
import BusinessHoursInput from '@/components/laundry-management-system/BusinessHoursInput'
import Card from './Card'

const fieldClass =
  'mt-1 w-full rounded-lg border border-teal-100 bg-[#F0FDFA] px-3 py-2 text-[#0B1B33] focus:border-[#22D3EE] focus:outline-none'

export default function BranchDetailsForm({ branch }: { branch: Branch }) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(updateBranchDetails, {})
  const saved = state.error === 'SAVED'

  return (
    <Card className="p-6">
      <h2 className="mb-4 font-semibold text-[#0B1B33]">{branch.name}</h2>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="branchId" value={branch.id} />
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Branch name</span>
          <input name="name" type="text" required defaultValue={branch.name} className={fieldClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Address</span>
          <input name="address" type="text" required defaultValue={branch.address} className={fieldClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Phone</span>
          <input name="phone" type="text" required defaultValue={branch.phone} className={fieldClass} />
        </label>
        <BusinessHoursInput name="businessHours" initialValue={branch.business_hours} light />
        {state.error && !saved && <p className="text-sm text-red-500">{state.error}</p>}
        {saved && <p className="text-sm text-emerald-600">Saved.</p>}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-gradient-to-r from-[#0D9488] to-[#22D3EE] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Saving…' : 'Save branch'}
        </button>
      </form>
    </Card>
  )
}
