import Link from 'next/link'
import type { Customer } from '@/lib/laundry-management-system/modules/customer/types'
import type { Business } from '@/lib/laundry-management-system/modules/tenant/types'

// Only renders when a customer profile belongs to more than one business —
// invisible for the common single-business case ("no complicated menus").
export default function BusinessSwitcher({
  customers,
  activeId,
  basePath,
}: {
  customers: (Customer & { business: Business })[]
  activeId: string
  basePath: string
}) {
  if (customers.length < 2) return null

  return (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
      {customers.map((c) => (
        <Link
          key={c.id}
          href={`${basePath}?customer=${c.id}`}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
            c.id === activeId ? 'bg-[#0B1B33] text-white' : 'border border-blue-100 bg-white text-slate-500'
          }`}
        >
          {c.business.name}
        </Link>
      ))}
    </div>
  )
}
