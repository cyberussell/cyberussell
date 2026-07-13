import {
  ClipboardList,
  Clock,
  PackageCheck,
  CheckCircle2,
  Wallet,
  TrendingUp,
  Users,
  UserCog,
  PlusCircle,
  UserPlus,
  Boxes,
  Mail,
} from 'lucide-react'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { getDashboardStats, listRecentOrders } from '@/lib/laundry-management-system/modules/orders/queries'
import { listRecentCustomers } from '@/lib/laundry-management-system/modules/customer/queries'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import StatCard from '@/components/laundry-management-system/dashboard/StatCard'
import RecentListCard from '@/components/laundry-management-system/dashboard/RecentListCard'
import QuickActionsGrid from '@/components/laundry-management-system/dashboard/QuickActionsGrid'
import StatusBadge from '@/components/laundry-management-system/dashboard/StatusBadge'

export const dynamic = 'force-dynamic'

const QUICK_ACTIONS = [
  { label: 'New Walk-in Order', href: '/lms/dashboard/orders/new', icon: PlusCircle },
  { label: 'Add Customer', href: '/lms/dashboard/customers/new', icon: UserPlus },
  { label: 'Manage Inventory', href: '/lms/dashboard/inventory', icon: Boxes },
  { label: 'Invite Staff', href: '/lms/dashboard/staff', icon: Mail },
]

export default async function DashboardPage() {
  const { supabase, business } = await requireOwnerBusiness()
  const [stats, recentOrders, recentCustomers] = await Promise.all([
    getDashboardStats(supabase, business.id),
    listRecentOrders(supabase, business.id, 5),
    listRecentCustomers(supabase, business.id, 5),
  ])

  return (
    <div>
      <PageHeader title="Dashboard" subtitle={`Welcome back — here's how ${business.name} is doing today.`} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={ClipboardList} label="Today's Orders" value={stats.todayOrders} />
        <StatCard icon={Clock} label="Orders in Progress" value={stats.ordersInProgress} />
        <StatCard icon={PackageCheck} label="Ready for Pickup" value={stats.readyForPickup} />
        <StatCard icon={CheckCircle2} label="Completed Today" value={stats.completedToday} />
        <StatCard icon={Wallet} label="Today's Revenue" value={formatCurrency(stats.todayRevenue, business.currency)} />
        <StatCard icon={TrendingUp} label="Monthly Revenue" value={formatCurrency(stats.monthlyRevenue, business.currency)} />
        <StatCard icon={Users} label="Customers" value={stats.customersCount} />
        <StatCard icon={UserCog} label="Active Staff" value={stats.activeStaffCount} />
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-500">Quick Actions</h2>
        <QuickActionsGrid actions={QUICK_ACTIONS} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
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
        <RecentListCard
          title="Recent Customers"
          items={recentCustomers}
          emptyMessage="No customers yet — add your first customer."
          renderItem={(customer) => (
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#0B1B33]">{customer.full_name}</p>
                <p className="truncate text-xs text-slate-400">{customer.phone}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-400">
                {new Date(customer.created_at).toLocaleDateString()}
              </span>
            </div>
          )}
        />
      </div>
    </div>
  )
}
