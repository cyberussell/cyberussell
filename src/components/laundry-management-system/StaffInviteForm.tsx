'use client'

import { useActionState } from 'react'
import { inviteStaff } from '@/app/laundry-management-system/actions/staff'
import type { ActionResult } from '@/app/laundry-management-system/actions/shared'
import type { Branch } from '@/lib/laundry-management-system/modules/tenant/types'
import Card from '@/components/laundry-management-system/dashboard/Card'

const fieldClass =
  'mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none'

export default function StaffInviteForm({ branches }: { branches: Branch[] }) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(inviteStaff, {})
  const invited = state.error === 'INVITED'

  return (
    <Card className="p-6">
      <form action={formAction} className="space-y-3">
        <h2 className="font-semibold text-[#0B1B33]">Invite staff</h2>
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Email</span>
          <input name="email" type="email" required className={fieldClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-600">Title (optional)</span>
          <input name="title" type="text" placeholder="Front desk" className={fieldClass} />
        </label>
        {branches.length > 0 && (
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Branch (optional)</span>
            <select name="branchId" defaultValue="" className={fieldClass}>
              <option value="">Any branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
        )}
        {state.error && !invited && <p className="text-sm text-red-500">{state.error}</p>}
        {invited && <p className="text-sm text-emerald-600">Invite sent.</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Sending invite…' : 'Send invite'}
        </button>
      </form>
    </Card>
  )
}
