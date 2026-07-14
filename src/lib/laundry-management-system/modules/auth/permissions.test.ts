import { describe, it, expect } from 'vitest'
import { hasPermission } from './permissions'

describe('hasPermission', () => {
  it('owner can do everything', () => {
    expect(hasPermission('owner', 'manage_staff')).toBe(true)
    expect(hasPermission('owner', 'delete_orders')).toBe(true)
    expect(hasPermission('owner', 'view_financial_reports')).toBe(true)
  })

  it('staff can only do what is on the explicit allow-list', () => {
    expect(hasPermission('staff', 'create_orders')).toBe(true)
    expect(hasPermission('staff', 'update_order_status')).toBe(true)
    expect(hasPermission('staff', 'view_priority_queue')).toBe(true)
  })

  it('staff is denied owner-only actions', () => {
    expect(hasPermission('staff', 'manage_staff')).toBe(false)
    expect(hasPermission('staff', 'delete_orders')).toBe(false)
    expect(hasPermission('staff', 'view_financial_reports')).toBe(false)
    expect(hasPermission('staff', 'assign_order_staff')).toBe(false)
    expect(hasPermission('staff', 'manage_subscription')).toBe(false)
  })

  it('customer role is denied every permission (no allow-list exists for it)', () => {
    expect(hasPermission('customer', 'view_dashboard')).toBe(false)
    expect(hasPermission('customer', 'create_orders')).toBe(false)
  })
})
