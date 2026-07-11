import { Clock, PackageCheck, CheckCircle2, ClipboardCheck, PlusCircle, ClipboardList } from 'lucide-react'
import { requireStaffAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import { getStaffDashboardStats, listRecentOrders } from '@/lib/laundry-management-system/modules/orders/queries'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import StatCard from '@/components/laundry-management-system/dashboard/StatCard'
import RecentListCard from '@/components/laundry-management-system/dashboard/RecentListCard'
import QuickActionsGrid from '@/components/laundry-management-system/dashboard/QuickActionsGrid'
import StatusBadge from '@/components/laundry-management-system/dashboard/StatusBadge'

export const dynamic = 'force-dynamic'

const QUICK_ACTIONS = [
  { label: 'New Walk-in Order', href: '/laundry-management-system/staff/dashboard/orders/new', icon: PlusCircle },
  { label: 'View Orders', href: '/laundry-management-system/staff/dashboard/orders', icon: ClipboardList },
]

export default async function StaffDashboardPage() {
  const { supabase, user, business, staff } = await requireStaffAccess()
  const [stats, recentOrders] = await Promise.all([
    getStaffDashboardStats(supabase, business.id, user.id),
    listRecentOrders(supabase, business.id, 5),
  ])

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back — here's what's happening at ${business.name}${staff.title ? ` (${staff.title})` : ''}.`}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Clock} label="Orders in Progress" value={stats.ordersInProgress} />
        <StatCard icon={PackageCheck} label="Ready for Pickup" value={stats.readyForPickup} />
        <StatCard icon={CheckCircle2} label="Completed Today" value={stats.completedToday} />
        <StatCard icon={ClipboardCheck} label="My Orders Today" value={stats.myOrdersToday} />
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-500">Quick Actions</h2>
        <QuickActionsGrid actions={QUICK_ACTIONS} />
      </div>

      <div className="mt-6">
        <RecentListCard
          title="Recent Orders"
          items={recentOrders}
          emptyMessage="No orders yet — create your first walk-in order."
          renderItem={(order) => (
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#0B1B33]">{order.service_label}</p>
                <p className="truncate text-xs text-slate-400">
                  {order.customer?.full_name || order.walk_in_name || 'Walk-in customer'}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-sm font-medium text-[#0B1B33]">{formatCurrency(order.amount, business.currency)}</span>
                <StatusBadge status={order.status} />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
