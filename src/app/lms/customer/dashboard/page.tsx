import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { requireCustomerAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import { listOrdersForCustomer, ACTIVE_ORDER_STATUSES } from '@/lib/laundry-management-system/modules/orders/queries'
import { buildNotifications } from '@/lib/laundry-management-system/modules/orders/notifications'
import BusinessSwitcher from '@/components/laundry-management-system/customer/BusinessSwitcher'
import StatusCard from '@/components/laundry-management-system/customer/StatusCard'
import NotificationsPanel from '@/components/laundry-management-system/customer/NotificationsPanel'

export const dynamic = 'force-dynamic'

const BASE_PATH = '/lms/customer/dashboard'

export default async function CustomerHomePage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string }>
}) {
  const { customer: customerParam } = await searchParams
  const { supabase, customers } = await requireCustomerAccess()
  const active = customers.find((c) => c.id === customerParam) ?? customers[0]

  const orders = await listOrdersForCustomer(supabase, active.id)
  const activeOrders = orders.filter((o) => ACTIVE_ORDER_STATUSES.includes(o.status))
  const notifications = buildNotifications(orders)

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Welcome back,</p>
          <h1 className="text-xl font-bold text-[#0B1B33]">{active.full_name.split(' ')[0] || 'there'}</h1>
        </div>
        <NotificationsPanel events={notifications} />
      </div>

      <BusinessSwitcher customers={customers} activeId={active.id} basePath={BASE_PATH} />

      <p className="mb-3 mt-5 text-sm font-semibold text-slate-500">
        {activeOrders.length > 0
          ? `${activeOrders.length} active order${activeOrders.length > 1 ? 's' : ''}`
          : 'Active orders'}
      </p>

      {activeOrders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-blue-200 bg-white/60 p-8 text-center">
          <Sparkles className="mx-auto mb-2 h-6 w-6 text-[#38BDF8]" />
          <p className="text-sm text-slate-500">No active orders right now at {active.business.name}.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeOrders.map((order, i) => (
            <StatusCard key={order.id} order={order} currency={active.business.currency} index={i} showTimeline />
          ))}
        </div>
      )}

      <Link
        href={`${BASE_PATH}/orders?customer=${active.id}`}
        className="mt-6 block text-center text-sm font-semibold text-[#2563EB]"
      >
        View order history →
      </Link>
    </div>
  )
}
