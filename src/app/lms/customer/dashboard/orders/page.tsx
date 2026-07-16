import Link from 'next/link'
import { requireCustomerAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import { listOrdersForCustomer, ACTIVE_ORDER_STATUSES } from '@/lib/laundry-management-system/modules/orders/queries'
import BusinessSwitcher from '@/components/laundry-management-system/customer/BusinessSwitcher'
import StatusCard from '@/components/laundry-management-system/customer/StatusCard'

export const dynamic = 'force-dynamic'

const BASE_PATH = '/lms/customer/dashboard'

type FilterKey = 'all' | 'active' | 'completed' | 'cancelled'

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
]

export default async function CustomerOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string; filter?: string }>
}) {
  const { customer: customerParam, filter } = await searchParams
  const activeFilter = (FILTERS.some((f) => f.key === filter) ? filter : 'all') as FilterKey
  const { supabase, customers } = await requireCustomerAccess()
  const active = customers.find((c) => c.id === customerParam) ?? customers[0]

  const orders = await listOrdersForCustomer(supabase, active.id)
  const filtered = orders.filter((o) => {
    if (activeFilter === 'active') return ACTIVE_ORDER_STATUSES.includes(o.status)
    if (activeFilter === 'completed') return o.status === 'completed'
    if (activeFilter === 'cancelled') return o.status === 'cancelled'
    return true
  })

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-[#0B1B33]">Orders</h1>
      <p className="mb-4 text-sm text-slate-500">Your order history at {active.business.name}.</p>

      <BusinessSwitcher customers={customers} activeId={active.id} basePath={`${BASE_PATH}/orders`} />

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={`${BASE_PATH}/orders?customer=${active.id}${f.key === 'all' ? '' : `&filter=${f.key}`}`}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              activeFilter === f.key
                ? 'bg-gradient-to-r from-[#0D9488] to-[#22D3EE] text-white'
                : 'border border-teal-100 bg-white text-slate-500'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-teal-200 bg-white/60 p-8 text-center">
          <p className="text-sm text-slate-500">No orders match this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order, i) => (
            <StatusCard key={order.id} order={order} currency={active.business.currency} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
