import type { UserRole } from './types'

export type Permission =
  | 'view_dashboard'
  | 'create_orders'
  | 'update_order_status'
  | 'view_customers'
  | 'search_customers'
  | 'print_receipts'
  | 'view_assigned_orders'
  | 'delete_orders'
  | 'manage_subscription'
  | 'manage_staff'
  | 'view_financial_reports'
  | 'change_business_settings'
  | 'manage_inventory'
  | 'assign_order_staff'
  | 'manage_pickup'
  | 'manage_delivery'
  | 'view_priority_queue'

// Everything a staff member is allowed to do. Owners always pass (see hasPermission
// below) — this list only needs to cover the staff role's explicit allow-list.
// Note: these permissions only decide who's *allowed* to use a feature if the
// business's plan includes it — the plan-tier gate itself lives in
// modules/billing/entitlements.ts, not here.
const STAFF_PERMISSIONS: readonly Permission[] = [
  'view_dashboard',
  'create_orders',
  'update_order_status',
  'view_customers',
  'search_customers',
  'print_receipts',
  'view_assigned_orders',
  'manage_pickup',
  'manage_delivery',
  'view_priority_queue',
]

export function hasPermission(role: UserRole, permission: Permission): boolean {
  if (role === 'owner') return true
  if (role === 'staff') return STAFF_PERMISSIONS.includes(permission)
  return false
}
