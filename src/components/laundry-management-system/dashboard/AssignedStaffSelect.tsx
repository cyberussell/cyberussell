import type { StaffMember } from '@/lib/laundry-management-system/modules/staff/types'
import { selectAppearance } from './FormField'

export default function AssignedStaffSelect({
  staff,
  name = 'assignedStaffId',
  defaultValue = '',
  label = 'Assigned Staff (optional)',
}: {
  staff: (StaffMember & { profile: { full_name: string } | null })[]
  name?: string
  defaultValue?: string
  label?: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className={`mt-1 w-full rounded-lg border border-teal-100 bg-[#F0FDFA] px-3 py-2 text-[#0B1B33] focus:border-[#22D3EE] focus:outline-none ${selectAppearance}`}
      >
        <option value="">Unassigned</option>
        {staff.map((s) => (
          <option key={s.id} value={s.id}>
            {s.profile?.full_name || 'Staff member'}
            {s.title ? ` — ${s.title}` : ''}
          </option>
        ))}
      </select>
    </label>
  )
}
