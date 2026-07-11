'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import type { ActionResult } from './shared'
import { requireActionPermission } from './permission'
import { isValidTransition } from '@/lib/laundry-management-system/modules/orders/stateMachine'
import type { OrderStatus } from '@/lib/laundry-management-system/modules/orders/types'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'

const ORDER_STATUSES = [
  'received',
  'sorting',
  'washing',
  'drying',
  'folding',
  'ready_for_pickup',
  'out_for_delivery',
  'completed',
  'cancelled',
] as const

const PAYMENT_STATUSES = ['unpaid', 'paid'] as const

const createOrderSchema = z.object({
  branchId: z.string().uuid(),
  customerId: z.string().uuid().optional().or(z.literal('')),
  assignedStaffId: z.string().uuid().optional().or(z.literal('')),
  walkInName: z.string().max(80).optional().default(''),
  walkInPhone: z.string().max(30).optional().default(''),
  serviceLabel: z.string().min(1).max(80),
  amount: z.coerce.number().min(0),
  weightKg: z.coerce.number().min(0).optional().or(z.literal('')),
  expectedCompletionAt: z.string().optional().or(z.literal('')),
  paymentStatus: z.enum(PAYMENT_STATUSES).optional().default('unpaid'),
  notes: z.string().max(500).optional().default(''),
  pickupRequested: z.coerce.boolean().optional().default(false),
  pickupAddress: z.string().max(200).optional().default(''),
  pickupScheduledAt: z.string().optional().or(z.literal('')),
})

// A row-level guard on top of the role-level permission check: staff may only
// act on orders assigned to them ("staff only sees assigned orders" extends to
// mutations too, not just what the list page shows).
function assertStaffOwnsOrder(
  role: 'owner' | 'staff',
  staffId: string | undefined,
  order: { assigned_staff_id: string | null }
): ActionResult | null {
  if (role === 'owner') return null
  if (order.assigned_staff_id && order.assigned_staff_id === staffId) return null
  return { error: 'This order is not assigned to you.' }
}

export async function createWalkInOrder(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = createOrderSchema.safeParse({
    branchId: formData.get('branchId'),
    customerId: formData.get('customerId') || undefined,
    assignedStaffId: formData.get('assignedStaffId') || undefined,
    walkInName: formData.get('walkInName'),
    walkInPhone: formData.get('walkInPhone'),
    serviceLabel: formData.get('serviceLabel'),
    amount: formData.get('amount'),
    weightKg: formData.get('weightKg') || undefined,
    expectedCompletionAt: formData.get('expectedCompletionAt') || undefined,
    paymentStatus: formData.get('paymentStatus') || undefined,
    notes: formData.get('notes'),
    pickupRequested: formData.get('pickupRequested') === 'true',
    pickupAddress: formData.get('pickupAddress') || undefined,
    pickupScheduledAt: formData.get('pickupScheduledAt') || undefined,
  })
  if (!parsed.success) return { error: 'Please fill in the service and amount correctly.' }
  const {
    branchId,
    customerId,
    assignedStaffId,
    walkInName,
    walkInPhone,
    serviceLabel,
    amount,
    weightKg,
    expectedCompletionAt,
    paymentStatus,
    notes,
    pickupRequested,
    pickupAddress,
    pickupScheduledAt,
  } = parsed.data

  const { session, denied } = await requireActionPermission('create_orders')
  if (denied) return denied
  const { supabase, business, userId, role } = session

  // Pickup request fields only take effect on Professional — silently ignored
  // (not an error) if a stale form somehow submits them on Essential, since the
  // checkbox itself is only rendered when the feature is available.
  const canRequestPickup = pickupRequested && hasFeature(business, 'pickup_management')

  const { error } = await supabase.from('orders').insert({
    business_id: business.id,
    branch_id: branchId,
    customer_id: customerId || null,
    assigned_staff_id: assignedStaffId || null,
    walk_in_name: walkInName,
    walk_in_phone: walkInPhone,
    service_label: serviceLabel,
    amount,
    weight_kg: weightKg || null,
    expected_completion_at: expectedCompletionAt ? new Date(expectedCompletionAt).toISOString() : null,
    payment_status: paymentStatus,
    notes,
    created_by: userId,
    pickup_requested: canRequestPickup,
    pickup_address: canRequestPickup ? pickupAddress : '',
    pickup_scheduled_at: canRequestPickup && pickupScheduledAt ? new Date(pickupScheduledAt).toISOString() : null,
  })
  if (error) return { error: error.message }

  redirect(
    role === 'owner'
      ? '/laundry-management-system/dashboard/orders'
      : '/laundry-management-system/staff/dashboard/orders'
  )
}

const updateStatusSchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum(ORDER_STATUSES),
})

export async function updateOrderStatus(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = updateStatusSchema.safeParse({
    orderId: formData.get('orderId'),
    status: formData.get('status'),
  })
  if (!parsed.success) return { error: 'Invalid status update.' }
  const { orderId, status } = parsed.data

  const { session, denied } = await requireActionPermission('update_order_status')
  if (denied) return denied
  const { supabase, business, role, staff } = session

  const { data: existing } = await supabase
    .from('orders')
    .select('status, assigned_staff_id')
    .eq('id', orderId)
    .eq('business_id', business.id)
    .maybeSingle()
  if (!existing) return { error: 'Order not found.' }

  const ownership = assertStaffOwnsOrder(role, staff?.id, existing)
  if (ownership) return ownership

  if (!isValidTransition(existing.status as OrderStatus, status)) {
    return { error: `Can't move an order from "${existing.status}" to "${status}".` }
  }

  const timestamps: Record<string, string> = {}
  if (status === 'ready_for_pickup') timestamps.ready_at = new Date().toISOString()
  if (status === 'completed') timestamps.completed_at = new Date().toISOString()

  const { error } = await supabase
    .from('orders')
    .update({ status, ...timestamps })
    .eq('id', orderId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return {}
}

const updateDetailsSchema = z.object({
  orderId: z.string().uuid(),
  weightKg: z.coerce.number().min(0).optional().or(z.literal('')),
  expectedCompletionAt: z.string().optional().or(z.literal('')),
  paymentStatus: z.enum(PAYMENT_STATUSES),
  notes: z.string().max(500).optional().default(''),
})

// Weight/payment/notes/ETA edits — staff can only touch orders assigned to
// them, same row-level rule as status updates.
export async function updateOrderDetails(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = updateDetailsSchema.safeParse({
    orderId: formData.get('orderId'),
    weightKg: formData.get('weightKg') || undefined,
    expectedCompletionAt: formData.get('expectedCompletionAt') || undefined,
    paymentStatus: formData.get('paymentStatus'),
    notes: formData.get('notes'),
  })
  if (!parsed.success) return { error: 'Please fill in the order details correctly.' }
  const { orderId, weightKg, expectedCompletionAt, paymentStatus, notes } = parsed.data

  const { session, denied } = await requireActionPermission('update_order_status')
  if (denied) return denied
  const { supabase, business, role, staff } = session

  const { data: existing } = await supabase
    .from('orders')
    .select('assigned_staff_id')
    .eq('id', orderId)
    .eq('business_id', business.id)
    .maybeSingle()
  if (!existing) return { error: 'Order not found.' }

  const ownership = assertStaffOwnsOrder(role, staff?.id, existing)
  if (ownership) return ownership

  const { error } = await supabase
    .from('orders')
    .update({
      weight_kg: weightKg || null,
      expected_completion_at: expectedCompletionAt ? new Date(expectedCompletionAt).toISOString() : null,
      payment_status: paymentStatus,
      notes,
    })
    .eq('id', orderId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return { error: 'SAVED' } // handled as info, not error, in the UI
}

const assignStaffSchema = z.object({
  orderId: z.string().uuid(),
  assignedStaffId: z.string().uuid().optional().or(z.literal('')),
})

// Owner-only (assign_order_staff isn't in staff's permission list) — reassigning
// who's responsible for an order is a dispatch decision, not day-to-day order work.
export async function assignOrderStaff(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = assignStaffSchema.safeParse({
    orderId: formData.get('orderId'),
    assignedStaffId: formData.get('assignedStaffId') || undefined,
  })
  if (!parsed.success) return { error: 'Invalid assignment.' }
  const { orderId, assignedStaffId } = parsed.data

  const { session, denied } = await requireActionPermission('assign_order_staff')
  if (denied) return denied
  const { supabase, business } = session

  const { error } = await supabase
    .from('orders')
    .update({ assigned_staff_id: assignedStaffId || null })
    .eq('id', orderId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return { error: 'SAVED' } // handled as info, not error, in the UI
}

// ── Professional plan: Pickup / Delivery / Priority Queue ───────────────────

const schedulePickupSchema = z.object({
  orderId: z.string().uuid(),
  pickupAddress: z.string().max(200).optional().default(''),
  pickupScheduledAt: z.string().optional().or(z.literal('')),
})

export async function schedulePickup(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = schedulePickupSchema.safeParse({
    orderId: formData.get('orderId'),
    pickupAddress: formData.get('pickupAddress'),
    pickupScheduledAt: formData.get('pickupScheduledAt') || undefined,
  })
  if (!parsed.success) return { error: 'Invalid pickup details.' }
  const { orderId, pickupAddress, pickupScheduledAt } = parsed.data

  const { session, denied } = await requireActionPermission('manage_pickup')
  if (denied) return denied
  const { supabase, business } = session
  if (!hasFeature(business, 'pickup_management')) return { error: 'Pickup Management is a Professional plan feature.' }

  const { error } = await supabase
    .from('orders')
    .update({
      pickup_address: pickupAddress,
      pickup_scheduled_at: pickupScheduledAt ? new Date(pickupScheduledAt).toISOString() : null,
    })
    .eq('id', orderId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return { error: 'SAVED' } // handled as info, not error, in the UI
}

export async function markPickedUp(orderId: string): Promise<ActionResult> {
  const { session, denied } = await requireActionPermission('manage_pickup')
  if (denied) return denied
  const { supabase, business } = session
  if (!hasFeature(business, 'pickup_management')) return { error: 'Pickup Management is a Professional plan feature.' }

  const { error } = await supabase
    .from('orders')
    .update({ pickup_completed_at: new Date().toISOString() })
    .eq('id', orderId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return {}
}

const scheduleDeliverySchema = z.object({
  orderId: z.string().uuid(),
  deliveryScheduledAt: z.string().optional().or(z.literal('')),
})

export async function scheduleDelivery(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = scheduleDeliverySchema.safeParse({
    orderId: formData.get('orderId'),
    deliveryScheduledAt: formData.get('deliveryScheduledAt') || undefined,
  })
  if (!parsed.success) return { error: 'Invalid delivery schedule.' }
  const { orderId, deliveryScheduledAt } = parsed.data

  const { session, denied } = await requireActionPermission('manage_delivery')
  if (denied) return denied
  const { supabase, business } = session
  if (!hasFeature(business, 'delivery_management')) return { error: 'Delivery Management is a Professional plan feature.' }

  const { error } = await supabase
    .from('orders')
    .update({ delivery_scheduled_at: deliveryScheduledAt ? new Date(deliveryScheduledAt).toISOString() : null })
    .eq('id', orderId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return { error: 'SAVED' } // handled as info, not error, in the UI
}

const assignDriverSchema = z.object({
  orderId: z.string().uuid(),
  driverId: z.string().uuid().optional().or(z.literal('')),
})

// Shared by both the Pickup and Delivery Management pages — one driver field on
// the order covers whichever logistics leg is currently active, rather than
// separate pickup/delivery driver columns (deliberate simplification: most
// small laundry businesses use the same driver for both legs of one order).
// Both 'manage_pickup' and 'manage_delivery' are granted identically to owner
// and staff today, so gating on 'manage_delivery' here isn't a real restriction.
export async function assignOrderDriver(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = assignDriverSchema.safeParse({
    orderId: formData.get('orderId'),
    driverId: formData.get('driverId') || undefined,
  })
  if (!parsed.success) return { error: 'Invalid driver assignment.' }
  const { orderId, driverId } = parsed.data

  const { session, denied } = await requireActionPermission('manage_delivery')
  if (denied) return denied
  const { supabase, business } = session
  if (!hasFeature(business, 'delivery_management')) return { error: 'Driver assignment is a Professional plan feature.' }

  const { error } = await supabase
    .from('orders')
    .update({ driver_id: driverId || null })
    .eq('id', orderId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return { error: 'SAVED' } // handled as info, not error, in the UI
}

const setPrioritySchema = z.object({
  orderId: z.string().uuid(),
  isPriority: z.coerce.boolean(),
})

export async function setOrderPriority(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = setPrioritySchema.safeParse({
    orderId: formData.get('orderId'),
    isPriority: formData.get('isPriority') === 'true',
  })
  if (!parsed.success) return { error: 'Invalid priority update.' }
  const { orderId, isPriority } = parsed.data

  const { session, denied } = await requireActionPermission('update_order_status')
  if (denied) return denied
  const { supabase, business } = session
  if (!hasFeature(business, 'priority_queue')) return { error: 'Priority Queue is a Professional plan feature.' }

  const { error } = await supabase
    .from('orders')
    .update({ is_priority: isPriority })
    .eq('id', orderId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return {}
}
