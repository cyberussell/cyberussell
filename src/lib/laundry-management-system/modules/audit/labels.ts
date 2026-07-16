import type { AuditAction } from './types'

export const AUDIT_ACTION_LABELS: Record<AuditAction, string> = {
  order_status_changed: 'Order status changed',
  order_staff_assigned: 'Order assigned to staff',
  order_driver_assigned: 'Order assigned to driver',
  order_priority_changed: 'Order priority changed',
  inventory_item_deleted: 'Inventory item deleted',
  catalog_item_deactivated: 'Catalog item deactivated',
  driver_deleted: 'Driver deleted',
  staff_invited: 'Staff invited',
  business_profile_updated: 'Business profile updated',
  branch_details_updated: 'Branch details updated',
}
