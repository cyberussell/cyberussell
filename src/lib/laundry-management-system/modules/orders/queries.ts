import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { DashboardStats, Order, OrderStatus, OrderWithDriver, OrderWithRelations, StaffDashboardStats } from './types'

const ORDER_WITH_RELATIONS_SELECT = '*, customer:customers(full_name, phone), assigned_staff:staff_members(id, title, profile:profiles(full_name))'
const ORDER_WITH_DRIVER_SELECT = '*, customer:customers(full_name, phone), driver:drivers(id, name, phone)'
import { ORDER_STATUS_SEQUENCE } from './stateMachine'
import { countCustomers } from '../customer/queries'
import { countActiveStaff } from '../staff/queries'

const IN_PROGRESS_STATUSES: OrderStatus[] = ['sorting', 'washing', 'drying', 'folding']

function startOfToday(): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

function startOfMonth(): string {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString()
}

function sumAmounts(rows: { amount: number }[]): number {
  return rows.reduce((total, row) => total + Number(row.amount), 0)
}

export async function getDashboardStats(supabase: SupabaseClient, businessId: string): Promise<DashboardStats> {
  const todayStart = startOfToday()
  const monthStart = startOfMonth()

  const [
    todayOrders,
    ordersInProgress,
    readyForPickup,
    completedToday,
    todayRevenueRows,
    monthlyRevenueRows,
    customersCount,
    activeStaffCount,
  ] = await Promise.all([
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('business_id', businessId).gte('created_at', todayStart),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('business_id', businessId).in('status', IN_PROGRESS_STATUSES),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('business_id', businessId).eq('status', 'ready_for_pickup'),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('business_id', businessId).eq('status', 'completed').gte('completed_at', todayStart),
    supabase.from('orders').select('amount').eq('business_id', businessId).neq('status', 'cancelled').gte('created_at', todayStart),
    supabase.from('orders').select('amount').eq('business_id', businessId).neq('status', 'cancelled').gte('created_at', monthStart),
    countCustomers(supabase, businessId),
    countActiveStaff(supabase, businessId),
  ])

  return {
    todayOrders: todayOrders.count ?? 0,
    ordersInProgress: ordersInProgress.count ?? 0,
    readyForPickup: readyForPickup.count ?? 0,
    completedToday: completedToday.count ?? 0,
    todayRevenue: sumAmounts(todayRevenueRows.data ?? []),
    monthlyRevenue: sumAmounts(monthlyRevenueRows.data ?? []),
    customersCount,
    activeStaffCount,
  }
}

export async function listOrders(
  supabase: SupabaseClient,
  businessId: string,
  status?: OrderStatus,
  assignedStaffId?: string
) {
  let query = supabase
    .from('orders')
    .select(ORDER_WITH_RELATIONS_SELECT)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
  if (status) query = query.eq('status', status)
  if (assignedStaffId) query = query.eq('assigned_staff_id', assignedStaffId)
  const { data } = await query
  return (data ?? []) as unknown as OrderWithRelations[]
}

// Staff-facing dashboard stats — deliberately excludes revenue/financial figures
// (staff don't have the view_financial_reports permission), so those numbers are never
// even queried for this role rather than just hidden in the UI. Scoped to orders
// assigned to this staff member (staff_members.id, not the auth user id), matching
// "staff only sees assigned orders."
export async function getStaffDashboardStats(
  supabase: SupabaseClient,
  businessId: string,
  staffMemberId: string
): Promise<StaffDashboardStats> {
  const todayStart = startOfToday()

  const [ordersInProgress, readyForPickup, completedToday, myOrdersToday] = await Promise.all([
    supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .eq('assigned_staff_id', staffMemberId)
      .in('status', IN_PROGRESS_STATUSES),
    supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .eq('assigned_staff_id', staffMemberId)
      .eq('status', 'ready_for_pickup'),
    supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .eq('assigned_staff_id', staffMemberId)
      .eq('status', 'completed')
      .gte('completed_at', todayStart),
    supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .eq('assigned_staff_id', staffMemberId)
      .gte('date_received', todayStart),
  ])

  return {
    ordersInProgress: ordersInProgress.count ?? 0,
    readyForPickup: readyForPickup.count ?? 0,
    completedToday: completedToday.count ?? 0,
    myOrdersToday: myOrdersToday.count ?? 0,
  }
}

// Customer-facing: all orders tied to one of their own `customers` rows (RLS's
// "customer reads own orders" policy already scopes this to their own profile;
// filtering by customerId here further scopes it to a single business when a
// customer belongs to more than one). Callers derive "active" vs. "history"
// subsets from this single list rather than issuing a second query.
export async function listOrdersForCustomer(supabase: SupabaseClient, customerId: string) {
  const { data } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
  return (data ?? []) as Order[]
}

export const ACTIVE_ORDER_STATUSES: OrderStatus[] = ORDER_STATUS_SEQUENCE.filter((s) => s !== 'completed')

export async function getOrderById(supabase: SupabaseClient, businessId: string, orderId: string) {
  const { data } = await supabase
    .from('orders')
    .select(ORDER_WITH_RELATIONS_SELECT)
    .eq('business_id', businessId)
    .eq('id', orderId)
    .maybeSingle()
  return data as unknown as OrderWithRelations | null
}

// QR order lookup: resolves the human-readable order_number (ORD-000001) rather
// than the uuid, since that's what's encoded in the QR / typed manually.
export async function getOrderByNumber(supabase: SupabaseClient, businessId: string, orderNumber: string) {
  const { data } = await supabase
    .from('orders')
    .select('id')
    .eq('business_id', businessId)
    .eq('order_number', orderNumber)
    .maybeSingle()
  return data as { id: string } | null
}

export async function listRecentOrders(supabase: SupabaseClient, businessId: string, limit = 5) {
  const { data } = await supabase
    .from('orders')
    .select('*, customer:customers(full_name, phone)')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data ?? []) as (Order & { customer: { full_name: string; phone: string } | null })[]
}

// ── Professional plan: Pickup / Delivery / Priority Queue ───────────────────

// Orders whose pickup hasn't happened yet — disappears from this queue once
// pickup_completed_at is set, at which point the order proceeds through the
// normal (unchanged) status workflow starting at 'received'.
export async function getPickupQueue(supabase: SupabaseClient, businessId: string) {
  const { data } = await supabase
    .from('orders')
    .select(ORDER_WITH_DRIVER_SELECT)
    .eq('business_id', businessId)
    .eq('pickup_requested', true)
    .is('pickup_completed_at', null)
    .order('pickup_scheduled_at', { ascending: true, nullsFirst: false })
  return (data ?? []) as unknown as OrderWithDriver[]
}

// Every order ready to go out — both ones not yet scheduled (so staff has
// somewhere to set the first delivery time/driver from) and ones already
// dispatched. "Delivery Status" is just order.status here — out_for_delivery/
// completed already exist in the state machine, no new column.
export async function getDeliveryQueue(supabase: SupabaseClient, businessId: string) {
  const { data } = await supabase
    .from('orders')
    .select(ORDER_WITH_DRIVER_SELECT)
    .eq('business_id', businessId)
    .in('status', ['ready_for_pickup', 'out_for_delivery'])
    .order('delivery_scheduled_at', { ascending: true, nullsFirst: false })
  return (data ?? []) as unknown as OrderWithDriver[]
}

// All active (non-terminal) orders, priority first.
export async function getPriorityQueue(supabase: SupabaseClient, businessId: string) {
  const { data } = await supabase
    .from('orders')
    .select(ORDER_WITH_RELATIONS_SELECT)
    .eq('business_id', businessId)
    .not('status', 'in', '(completed,cancelled)')
    .order('is_priority', { ascending: false })
    .order('date_received', { ascending: true })
  return (data ?? []) as unknown as OrderWithRelations[]
}
