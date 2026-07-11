import Link from 'next/link'
import { PackageX } from 'lucide-react'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { getReportsData, type ReportPeriod } from '@/lib/laundry-management-system/modules/reports/queries'
import {
  getBranchPerformance,
  getCustomerPerformance,
  getRevenueByService,
  getEmployeeProductivity,
  getMonthlyServiceRequests,
} from '@/lib/laundry-management-system/modules/reports/advanced'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import Card from '@/components/laundry-management-system/dashboard/Card'
import RevenueBarChart from '@/components/laundry-management-system/dashboard/RevenueBarChart'
import UpgradePrompt from '@/components/laundry-management-system/dashboard/UpgradePrompt'

export const dynamic = 'force-dynamic'

const PERIODS: { key: ReportPeriod; label: string; windowLabel: string }[] = [
  { key: 'daily', label: 'Daily', windowLabel: 'Last 30 days' },
  { key: 'weekly', label: 'Weekly', windowLabel: 'Last 12 weeks' },
  { key: 'monthly', label: 'Monthly', windowLabel: 'Last 12 months' },
]

const ADVANCED_TABS = [
  { key: 'branch-performance', label: 'Branch Performance' },
  { key: 'top-customers', label: 'Top Customers' },
  { key: 'lifetime-value', label: 'Customer Lifetime Value' },
  { key: 'revenue-charts', label: 'Revenue Charts' },
  { key: 'employee-productivity', label: 'Employee Productivity' },
  { key: 'monthly-service-requests', label: 'Monthly Service Requests' },
] as const

type AdvancedTab = (typeof ADVANCED_TABS)[number]['key']

function tabHref(tab: string) {
  return `/laundry-management-system/dashboard/reports?tab=${tab}`
}

function TabLink({ tab, label, active }: { tab: string; label: string; active: boolean }) {
  return (
    <Link
      href={tabHref(tab)}
      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
        active
          ? 'bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white'
          : 'border border-blue-100 bg-white text-slate-500 hover:border-[#38BDF8]/40'
      }`}
    >
      {label}
    </Link>
  )
}

export default async function ReportsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab: tabParam } = await searchParams
  const { supabase, business } = await requireOwnerBusiness()

  const isAdvancedTab = ADVANCED_TABS.some((t) => t.key === tabParam)
  const period = (PERIODS.some((p) => p.key === tabParam) ? tabParam : isAdvancedTab ? null : 'daily') as ReportPeriod | null

  return (
    <div className="space-y-4">
      <PageHeader title="Reports" subtitle="Sales, services, and business performance." />

      <div className="flex flex-wrap gap-2">
        {PERIODS.map((p) => (
          <TabLink key={p.key} tab={p.key} label={p.label} active={period === p.key} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {ADVANCED_TABS.map((t) => (
          <TabLink key={t.key} tab={t.key} label={t.label} active={tabParam === t.key} />
        ))}
      </div>

      {period ? (
        <BasicReport supabaseBusiness={business} period={period} supabase={supabase} />
      ) : hasFeature(business, 'advanced_reports') ? (
        <AdvancedReport tab={tabParam as AdvancedTab} supabase={supabase} businessId={business.id} currency={business.currency} />
      ) : (
        <UpgradePrompt feature="advanced_reports" label="Advanced Reports" />
      )}
    </div>
  )
}

async function BasicReport({
  supabase,
  supabaseBusiness: business,
  period,
}: {
  supabase: Awaited<ReturnType<typeof requireOwnerBusiness>>['supabase']
  supabaseBusiness: Awaited<ReturnType<typeof requireOwnerBusiness>>['business']
  period: ReportPeriod
}) {
  const activePeriod = PERIODS.find((p) => p.key === period)!
  const { revenueSeries, topServices, lowStockItems } = await getReportsData(supabase, business.id, period)
  const totalRevenue = revenueSeries.reduce((sum, p) => sum + p.revenue, 0)
  const totalOrders = revenueSeries.reduce((sum, p) => sum + p.orders, 0)
  const maxServiceCount = Math.max(...topServices.map((s) => s.count), 1)

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">{activePeriod.windowLabel} of activity for your business.</p>

      <Card className="p-6">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-semibold text-[#0B1B33]">Revenue ({activePeriod.label.toLowerCase()})</h2>
          <p className="text-sm text-slate-500">
            {formatCurrency(totalRevenue, business.currency)} total · {totalOrders} orders
          </p>
        </div>
        <RevenueBarChart series={revenueSeries} currency={business.currency} />
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 font-semibold text-[#0B1B33]">Top services</h2>
          {topServices.length === 0 ? (
            <p className="text-sm text-slate-400">No orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {topServices.map((s) => (
                <li key={s.serviceLabel}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-[#0B1B33]">{s.serviceLabel}</span>
                    <span className="text-slate-500">{s.count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#F0F6FF]">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8]"
                      style={{ width: `${(s.count / maxServiceCount) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 font-semibold text-[#0B1B33]">Low stock items</h2>
          {lowStockItems.length === 0 ? (
            <p className="text-sm text-slate-400">Everything is well-stocked.</p>
          ) : (
            <ul className="space-y-3">
              {lowStockItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-[#0B1B33]">
                    <PackageX className="h-4 w-4 text-red-400" />
                    {item.name}
                  </span>
                  <span className="text-red-500">
                    {item.quantity} {item.unit} left
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}

async function AdvancedReport({
  tab,
  supabase,
  businessId,
  currency,
}: {
  tab: AdvancedTab
  supabase: Awaited<ReturnType<typeof requireOwnerBusiness>>['supabase']
  businessId: string
  currency: string
}) {
  if (tab === 'branch-performance') {
    const rows = await getBranchPerformance(supabase, businessId)
    return (
      <Card className="overflow-x-auto p-6">
        <h2 className="mb-4 font-semibold text-[#0B1B33]">Branch Performance</h2>
        <SimpleTable
          columns={['Branch', 'Orders', 'Revenue']}
          rows={rows.map((r) => [r.branchName, String(r.orders), formatCurrency(r.revenue, currency)])}
          emptyMessage="No branches yet."
        />
      </Card>
    )
  }

  if (tab === 'top-customers' || tab === 'lifetime-value') {
    const customers = await getCustomerPerformance(supabase, businessId)
    const sorted =
      tab === 'top-customers'
        ? [...customers].sort((a, b) => b.orders - a.orders)
        : [...customers].sort((a, b) => b.totalSpend - a.totalSpend)
    const top = sorted.slice(0, 10)
    return (
      <Card className="overflow-x-auto p-6">
        <h2 className="mb-4 font-semibold text-[#0B1B33]">{tab === 'top-customers' ? 'Top Customers' : 'Customer Lifetime Value'}</h2>
        <SimpleTable
          columns={['Customer', 'Orders', 'Total Spend', 'Last Order']}
          rows={top.map((c) => [
            c.customerName,
            String(c.orders),
            formatCurrency(c.totalSpend, currency),
            new Date(c.lastOrderAt).toLocaleDateString('en-US'),
          ])}
          emptyMessage="No customer orders yet."
        />
      </Card>
    )
  }

  if (tab === 'revenue-charts') {
    const rows = await getRevenueByService(supabase, businessId)
    const max = Math.max(...rows.map((r) => r.revenue), 1)
    return (
      <Card className="p-6">
        <h2 className="mb-4 font-semibold text-[#0B1B33]">Revenue by Service (all time)</h2>
        {rows.length === 0 ? (
          <p className="text-sm text-slate-400">No orders yet.</p>
        ) : (
          <ul className="space-y-3">
            {rows.map((r) => (
              <li key={r.serviceLabel}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-[#0B1B33]">{r.serviceLabel}</span>
                  <span className="text-slate-500">{formatCurrency(r.revenue, currency)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#F0F6FF]">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8]"
                    style={{ width: `${(r.revenue / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    )
  }

  if (tab === 'employee-productivity') {
    const rows = await getEmployeeProductivity(supabase, businessId)
    return (
      <Card className="overflow-x-auto p-6">
        <h2 className="mb-4 font-semibold text-[#0B1B33]">Employee Productivity</h2>
        <SimpleTable
          columns={['Staff', 'Orders Handled', 'Completed', 'Revenue (completed)']}
          rows={rows.map((r) => [r.staffName, String(r.ordersHandled), String(r.ordersCompleted), formatCurrency(r.revenue, currency)])}
          emptyMessage="No orders assigned to staff yet."
        />
      </Card>
    )
  }

  // monthly-service-requests
  const { services, rows } = await getMonthlyServiceRequests(supabase, businessId)
  return (
    <Card className="overflow-x-auto p-6">
      <h2 className="mb-4 font-semibold text-[#0B1B33]">Monthly Service Requests</h2>
      {services.length === 0 ? (
        <p className="text-sm text-slate-400">No orders in the last 12 months.</p>
      ) : (
        <SimpleTable
          columns={['Month', ...services]}
          rows={rows.map((r) => [r.month, ...services.map((s) => String(r.counts[s] ?? 0))])}
          emptyMessage="No orders in the last 12 months."
        />
      )}
    </Card>
  )
}

function SimpleTable({ columns, rows, emptyMessage }: { columns: string[]; rows: string[][]; emptyMessage: string }) {
  if (rows.length === 0) return <p className="text-sm text-slate-400">{emptyMessage}</p>
  return (
    <table className="w-full text-left text-sm">
      <thead className="border-b border-blue-100/60 bg-[#F8FBFF]">
        <tr>
          {columns.map((c) => (
            <th key={c} className="whitespace-nowrap px-4 py-3 font-medium text-slate-500">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-blue-50 last:border-0">
            {row.map((cell, j) => (
              <td key={j} className="whitespace-nowrap px-4 py-3 text-[#0B1B33]">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
