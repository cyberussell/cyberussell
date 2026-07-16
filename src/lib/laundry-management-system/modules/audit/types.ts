import type { BusinessRole } from '../auth/queries'

export type AuditAction =
  | 'order_status_changed'
  | 'order_staff_assigned'
  | 'order_driver_assigned'
  | 'order_priority_changed'
  | 'inventory_item_deleted'
  | 'catalog_item_deactivated'
  | 'driver_deleted'
  | 'staff_invited'
  | 'business_profile_updated'
  | 'branch_details_updated'

export type AuditEntityType = 'order' | 'inventory_item' | 'catalog_item' | 'driver' | 'staff' | 'business' | 'branch'

export interface AuditLog {
  id: string
  business_id: string
  actor_id: string | null
  actor_role: BusinessRole
  action: AuditAction
  entity_type: AuditEntityType
  entity_id: string | null
  details: Record<string, unknown>
  created_at: string
}

export type AuditLogWithActor = AuditLog & {
  actor: { full_name: string } | null
}
