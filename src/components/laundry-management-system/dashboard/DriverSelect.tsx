import type { Driver } from '@/lib/laundry-management-system/modules/drivers/types'
import { selectAppearance } from './FormField'

export default function DriverSelect({
  drivers,
  name = 'driverId',
  defaultValue = '',
  label = 'Driver',
}: {
  drivers: Driver[]
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
        {drivers.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
            {d.phone ? ` — ${d.phone}` : ''}
          </option>
        ))}
      </select>
    </label>
  )
}
