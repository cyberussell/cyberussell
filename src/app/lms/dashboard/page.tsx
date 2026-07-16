import Link from 'next/link'
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
import { listStaff } from '@/lib/laundry-management-system/modules/staff/queries'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import StatCard, { HeroStatCard } from '@/components/laundry-management-system/dashboard/StatCard'
import RecentListCard from '@/components/laundry-management-system/dashboard/RecentListCard'
import QuickActionsGrid from '@/components/laundry-management-system/dashboard/QuickActionsGrid'
import StatusBadge from '@/components/laundry-management-system/dashboard/StatusBadge'
import DonutChart from '@/components/laundry-management-system/dashboard/DonutChart'
import Avatar from '@/components/laundry-management-system/dashboard/Avatar'
import Card from '@/components/laundry-management-system/dashboard/Card'

export const dynamic = 'force-dynamic'

const QUICK_ACTIONS = [
  { label: 'New Walk-in Order', href: '/lms/dashboard/orders/new', icon: PlusCircle },
  { label: 'Add Customer', href: '/lms/dashboard/customers/new', icon: UserPlus },
  { label: 'Manage Inventory', href: '/lms/dashboard/inventory', icon: Boxes },
  { label: 'Invite Staff', href: '/lms/dashboard/staff', icon: Mail },
]

export default async function DashboardPage() {
  const { supabase, business } = await requireOwnerBusiness()
  const [stats, recentOrders, recentCustomers, staff] = await Promise.all([
    getDashboardStats(supabase, business.id),
    listRecentOrders(supabase, business.id, 5),
    listRecentCustomers(supabase, business.id, 5),
    listStaff(supabase, business.id),
  ])
  const onDuty = staff.filter((m) => m.active).slice(0, 4)
  const completionRate = stats.todayOrders > 0 ? (stats.completedToday / stats.todayOrders) * 100 : 0

  return (
    <div>
      <PageHeader title="Dashboard" subtitle={`Welcome back — here's how ${business.name} is doing today.`} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <HeroStatCard icon={Wallet} label="Today's Revenue" value={formatCurrency(stats.todayRevenue, business.currency)} />
            <HeroStatCard icon={TrendingUp} label="Monthly Revenue" value={formatCurrency(stats.monthlyRevenue, business.currency)} />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <StatCard icon={ClipboardList} label="Today's Orders" value={stats.todayOrders} />
            <StatCard icon={Clock} label="Orders in Progress" value={stats.ordersInProgress} />
            <StatCard icon={PackageCheck} label="Ready for Pickup" value={stats.readyForPickup} />
            <StatCard icon={CheckCircle2} label="Completed Today" value={stats.completedToday} />
            <StatCard icon={Users} label="Customers" value={stats.customersCount} />
            <StatCard icon={UserCog} label="Active Staff" value={stats.activeStaffCount} />
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-slate-500">Quick Actions</h2>
            <QuickActionsGrid actions={QUICK_ACTIONS} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <RecentListCard
              title="Recent Orders"
              items={recentOrders}
              emptyMessage="No orders yet — create your first walk-in order."
              renderItem={(order) => {
                const customerName = order.customer?.full_name || order.walk_in_name || 'Walk-in customer'
                return (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar name={customerName} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#0B1B33]">{order.service_label}</p>
                        <p className="truncate text-xs text-slate-400">{customerName}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-sm font-medium text-[#0B1B33]">{formatCurrency(order.amount, business.currency)}</span>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                )
              }}
            />
            <RecentListCard
              title="Recent Customers"
              items={recentCustomers}
              emptyMessage="No customers yet — add your first customer."
              renderItem={(customer) => (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar name={customer.full_name} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#0B1B33]">{customer.full_name}</p>
                      <p className="truncate text-xs text-slate-400">{customer.phone}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">
                    {new Date(customer.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <Card className="flex flex-col items-center p-6">
            <DonutChart percent={completionRate} label="Completed today" />
          </Card>

          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-[#0B1B33]">Team on duty</h2>
              <Link href="/lms/dashboard/staff" className="text-xs font-medium text-[#0D9488] hover:underline">
                View all
              </Link>
            </div>
            {onDuty.length === 0 ? (
              <p className="text-sm text-slate-400">No active staff yet — invite your first team member.</p>
            ) : (
              <ul className="space-y-3">
                {onDuty.map((member) => {
                  const name = member.profile?.full_name || member.email
                  return (
                    <li key={member.id} className="flex items-center gap-3">
                      <Avatar name={name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#0B1B33]">{name}</p>
                        <p className="truncate text-xs text-slate-400">{member.title || 'Staff'}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
