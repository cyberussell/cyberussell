import type { Driver } from '@/lib/laundry-management-system/modules/drivers/types'

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
        className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
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
