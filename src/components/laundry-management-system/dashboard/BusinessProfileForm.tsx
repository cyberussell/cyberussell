'use client'

import { useActionState } from 'react'
import { updateBusinessProfile } from '@/app/lms/actions/settings'
import { CURRENCIES } from '@/app/lms/actions/shared'
import type { ActionResult } from '@/app/lms/actions/shared'
import type { Business } from '@/lib/laundry-management-system/modules/tenant/types'
import Card from './Card'
import { selectAppearance } from './FormField'

const fieldClass =
  'mt-1 w-full rounded-lg border border-teal-100 bg-[#F0FDFA] px-3 py-2 text-[#0B1B33] focus:border-[#22D3EE] focus:outline-none'
const selectClass = `${fieldClass} ${selectAppearance}`

export default function BusinessProfileForm({ business }: { business: Business }) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(updateBusinessProfile, {})
  const saved = state.error === 'SAVED'

  return (
    <Card className="p-6">
      <h2 className="mb-4 font-semibold text-[#0B1B33]">Business profile</h2>
      <form action={formAction} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Business name</span>
          <input name="name" type="text" required defaultValue={business.name} className={fieldClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Contact number</span>
          <input name="phone" type="text" required defaultValue={business.phone} className={fieldClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Address</span>
          <input name="address" type="text" required defaultValue={business.address} className={fieldClass} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Currency</span>
            <select name="currency" defaultValue={business.currency} className={selectClass}>
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Timezone</span>
            <input name="timezone" type="text" required defaultValue={business.timezone} className={fieldClass} />
          </label>
        </div>
        {state.error && !saved && <p className="text-sm text-red-500">{state.error}</p>}
        {saved && <p className="text-sm text-emerald-600">Saved.</p>}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-gradient-to-r from-[#0D9488] to-[#22D3EE] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </Card>
  )
}
