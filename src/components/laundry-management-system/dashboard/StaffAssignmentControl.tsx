'use client'

import { assignOrderStaff } from '@/app/laundry-management-system/actions/orders'
import { useServerAction } from '@/lib/laundry-management-system/hooks/useServerAction'
import type { StaffMember } from '@/lib/laundry-management-system/modules/staff/types'
import AssignedStaffSelect from './AssignedStaffSelect'

export default function StaffAssignmentControl({
  orderId,
  currentStaffId,
  staff,
}: {
  orderId: string
  currentStaffId: string | null
  staff: (StaffMember & { profile: { full_name: string } | null })[]
}) {
  const { dispatch, pending, error } = useServerAction(assignOrderStaff, ['SAVED'], 'Staff assigned.')

  return (
    <form action={dispatch} className="flex items-end gap-2">
      <input type="hidden" name="orderId" value={orderId} />
      <div className="flex-1">
        <AssignedStaffSelect staff={staff} defaultValue={currentStaffId ?? ''} label="Assigned Staff" />
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
