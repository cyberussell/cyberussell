import { z } from 'zod'

// Shared by actions/orders.ts (createWalkInOrder, updateOrderDetails) and their
// client forms (React Hook Form's zodResolver) — one set of rules, never two
// copies to drift. Lives here rather than in the 'use server' actions file
// because that file may only export async functions.

export const PAYMENT_STATUSES = ['unpaid', 'paid'] as const

export const createOrderSchema = z.object({
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

export type CreateOrderInput = z.input<typeof createOrderSchema>

export const updateDetailsSchema = z.object({
  orderId: z.string().uuid(),
  weightKg: z.coerce.number().min(0).optional().or(z.literal('')),
  expectedCompletionAt: z.string().optional().or(z.literal('')),
  paymentStatus: z.enum(PAYMENT_STATUSES),
  notes: z.string().max(500).optional().default(''),
})

export type UpdateDetailsInput = z.input<typeof updateDetailsSchema>
