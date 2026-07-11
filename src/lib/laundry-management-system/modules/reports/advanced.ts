import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import { listBranches } from '../tenant/queries'
import { listStaff } from '../staff/queries'
import { monthKey, startOfMonthsAgoUtc, monthBuckets } from './utc'

// Professional plan: Advanced Reports. Kept in a separate file from queries.ts
// (Essential's Daily/Weekly/Monthly Sales) so that file doesn't sprawl —
// these are additive breakdowns along axes Essential's reports don't cover
// (branch, customer, service revenue mix, staff, service-demand trend).

export interface BranchPerformance {
  branchId: string
  branchName: string
  orders: number
  revenue: number
}

export async function getBranchPerformance(supabase: SupabaseClient, businessId: string): Promise<BranchPerformance[]> {
  const [{ data: orders }, branches] = await Promise.all([
    supabase.from('orders').select('branch_id, amount, status').eq('business_id', businessId).neq('status', 'cancelled'),
    listBranches(supabase, businessId),
  ])

  const byBranch = new Map<string, { orders: number; revenue: number }>()
  for (const o of orders ?? []) {
    const cur = byBranch.get(o.branch_id) ?? { orders: 0, revenue: 0 }
    cur.orders += 1
    cur.revenue += Number(o.amount)
    byBranch.set(o.branch_id, cur)
  }

  return branches
    .map((b) => ({
      branchId: b.id,
      branchName: b.name,
      orders: byBranch.get(b.id)?.orders ?? 0,
      revenue: byBranch.get(b.id)?.revenue ?? 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

// Serves both the "Top Customers" and "Customer Lifetime Value" tabs — same
// underlying per-customer data, the caller just sorts by a different field
// for each tab rather than issuing two near-duplicate queries.
export interface CustomerPerformance {
  customerId: string
  customerName: string
  orders: number
  totalSpend: number
  lastOrderAt: string
}

export async function getCustomerPerformance(supabase: SupabaseClient, businessId: string): Promise<CustomerPerformance[]> {
  const { data } = await supabase
    .from('orders')
    .select('customer_id, amount, created_at, customer:customers(full_name)')
    .eq('business_id', businessId)
    .neq('status', 'cancelled')
    .not('customer_id', 'is', null)

  const byCustomer = new Map<string, CustomerPerformance>()
  for (const row of (data ?? []) as unknown as { customer_id: string; amount: number; created_at: string; customer: { full_name: string } | null }[]) {
    const id = row.customer_id
    const existing = byCustomer.get(id)
    if (existing) {
      existing.orders += 1
      existing.totalSpend += Number(row.amount)
      if (row.created_at > existing.lastOrderAt) existing.lastOrderAt = row.created_at
    } else {
      byCustomer.set(id, {
        customerId: id,
        customerName: row.customer?.full_name || 'Customer',
        orders: 1,
        totalSpend: Number(row.amount),
        lastOrderAt: row.created_at,
      })
    }
  }

  return [...byCustomer.values()]
}

export interface ServiceRevenue {
  serviceLabel: string
  revenue: number
  orders: number
}

// All-time revenue mix by service — deliberately not time-windowed like
// Essential's Daily/Weekly/Monthly chart, since this is a different axis
// (which services drive revenue, not when).
export async function getRevenueByService(supabase: SupabaseClient, businessId: string): Promise<ServiceRevenue[]> {
  const { data } = await supabase
    .from('orders')
    .select('service_label, amount')
    .eq('business_id', businessId)
    .neq('status', 'cancelled')

  const byService = new Map<string, ServiceRevenue>()
  for (const o of data ?? []) {
    const cur = byService.get(o.service_label) ?? { serviceLabel: o.service_label, revenue: 0, orders: 0 }
    cur.revenue += Number(o.amount)
    cur.orders += 1
    byService.set(o.service_label, cur)
  }

  return [...byService.values()].sort((a, b) => b.revenue - a.revenue)
}

export interface EmployeeProductivity {
  staffId: string
  staffName: string
  ordersHandled: number
  ordersCompleted: number
  revenue: number
}

export async function getEmployeeProductivity(supabase: SupabaseClient, businessId: string): Promise<EmployeeProductivity[]> {
  const [{ data: orders }, staff] = await Promise.all([
    supabase.from('orders').select('assigned_staff_id, amount, status').eq('business_id', businessId).not('assigned_staff_id', 'is', null),
    listStaff(supabase, businessId),
  ])

  const byStaff = new Map<string, { ordersHandled: number; ordersCompleted: number; revenue: number }>()
  for (const o of orders ?? []) {
    const id = o.assigned_staff_id as string
    const cur = byStaff.get(id) ?? { ordersHandled: 0, ordersCompleted: 0, revenue: 0 }
    cur.ordersHandled += 1
    if (o.status === 'completed') {
      cur.ordersCompleted += 1
      cur.revenue += Number(o.amount)
    }
    byStaff.set(id, cur)
  }

  return staff
    .map((s) => ({
      staffId: s.id,
      staffName: s.profile?.full_name || 'Staff member',
      ordersHandled: byStaff.get(s.id)?.ordersHandled ?? 0,
      ordersCompleted: byStaff.get(s.id)?.ordersCompleted ?? 0,
      revenue: byStaff.get(s.id)?.revenue ?? 0,
    }))
    .filter((s) => s.ordersHandled > 0)
    .sort((a, b) => b.ordersCompleted - a.ordersCompleted)
}

export interface MonthlyServiceRequests {
  services: string[]
  rows: { month: string; counts: Record<string, number> }[]
}

const SERVICE_REQUEST_WINDOW_MONTHS = 12

export async function getMonthlyServiceRequests(supabase: SupabaseClient, businessId: string): Promise<MonthlyServiceRequests> {
  const windowStart = startOfMonthsAgoUtc(SERVICE_REQUEST_WINDOW_MONTHS - 1)
  const { data } = await supabase
    .from('orders')
    .select('service_label, created_at')
    .eq('business_id', businessId)
    .neq('status', 'cancelled')
    .gte('created_at', windowStart.toISOString())

  const buckets = monthBuckets(windowStart, SERVICE_REQUEST_WINDOW_MONTHS)
  const table = new Map<string, Map<string, number>>()
  for (const b of buckets) table.set(b.key, new Map())

  const services = new Set<string>()
  for (const o of data ?? []) {
    services.add(o.service_label)
    const key = monthKey(new Date(o.created_at))
    const monthMap = table.get(key)
    if (monthMap) monthMap.set(o.service_label, (monthMap.get(o.service_label) ?? 0) + 1)
  }

  return {
    services: [...services].sort(),
    rows: buckets.map((b) => ({
      month: b.label,
      counts: Object.fromEntries(table.get(b.key) ?? new Map()),
    })),
  }
}
