import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import { listInventory, getLowStockItems } from '../inventory/queries'
import { monthKey } from './utc'

export type ReportPeriod = 'daily' | 'weekly' | 'monthly'

export interface SeriesPoint {
  date: string // ISO date string for the bucket's start (day/week) or YYYY-MM (month)
  label: string
  revenue: number
  orders: number
}

export interface ServiceBreakdown {
  serviceLabel: string
  count: number
}

const DAILY_WINDOW_DAYS = 30
const WEEKLY_WINDOW_WEEKS = 12
const MONTHLY_WINDOW_MONTHS = 12

// All bucket math below uses UTC (setUTCDate/getUTCDay/etc.) rather than the
// server process's local timezone. Mixing local-midnight Date mutation with
// toISOString() would shift every bucket by a day whenever the server runs
// outside UTC (e.g. Asia/Manila, this product's actual market) — order rows
// would then never match any bucket and revenue would silently read as zero.

function dayKey(iso: string): string {
  return iso.slice(0, 10)
}

function mondayOfUtc(d: Date): Date {
  const day = d.getUTCDay()
  const diff = (day === 0 ? -6 : 1) - day
  const monday = new Date(d)
  monday.setUTCDate(d.getUTCDate() + diff)
  monday.setUTCHours(0, 0, 0, 0)
  return monday
}

export async function getReportsData(supabase: SupabaseClient, businessId: string, period: ReportPeriod = 'daily') {
  const now = new Date()
  let windowStart: Date

  if (period === 'daily') {
    windowStart = new Date(now)
    windowStart.setUTCDate(windowStart.getUTCDate() - (DAILY_WINDOW_DAYS - 1))
    windowStart.setUTCHours(0, 0, 0, 0)
  } else if (period === 'weekly') {
    windowStart = mondayOfUtc(now)
    windowStart.setUTCDate(windowStart.getUTCDate() - 7 * (WEEKLY_WINDOW_WEEKS - 1))
  } else {
    windowStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (MONTHLY_WINDOW_MONTHS - 1), 1))
  }

  const [{ data: orders }, inventory] = await Promise.all([
    supabase
      .from('orders')
      .select('amount, status, service_label, created_at')
      .eq('business_id', businessId)
      .neq('status', 'cancelled')
      .gte('created_at', windowStart.toISOString()),
    listInventory(supabase, businessId),
  ])

  const buckets = new Map<string, SeriesPoint>()

  if (period === 'daily') {
    for (let i = 0; i < DAILY_WINDOW_DAYS; i++) {
      const d = new Date(windowStart)
      d.setUTCDate(d.getUTCDate() + i)
      const key = dayKey(d.toISOString())
      buckets.set(key, { date: key, label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }), revenue: 0, orders: 0 })
    }
  } else if (period === 'weekly') {
    for (let i = 0; i < WEEKLY_WINDOW_WEEKS; i++) {
      const d = new Date(windowStart)
      d.setUTCDate(d.getUTCDate() + i * 7)
      const key = dayKey(d.toISOString())
      buckets.set(key, { date: key, label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }), revenue: 0, orders: 0 })
    }
  } else {
    for (let i = 0; i < MONTHLY_WINDOW_MONTHS; i++) {
      const d = new Date(Date.UTC(windowStart.getUTCFullYear(), windowStart.getUTCMonth() + i, 1))
      const key = monthKey(d)
      buckets.set(key, { date: key, label: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }), revenue: 0, orders: 0 })
    }
  }

  const serviceCounts = new Map<string, number>()
  for (const order of orders ?? []) {
    const createdAt = new Date(order.created_at)
    const key =
      period === 'daily'
        ? dayKey(order.created_at)
        : period === 'weekly'
          ? dayKey(mondayOfUtc(createdAt).toISOString())
          : monthKey(createdAt)

    const point = buckets.get(key)
    if (point) {
      point.revenue += Number(order.amount)
      point.orders += 1
    }
    serviceCounts.set(order.service_label, (serviceCounts.get(order.service_label) ?? 0) + 1)
  }

  const topServices: ServiceBreakdown[] = [...serviceCounts.entries()]
    .map(([serviceLabel, count]) => ({ serviceLabel, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return {
    revenueSeries: [...buckets.values()],
    topServices,
    lowStockItems: getLowStockItems(inventory),
  }
}
