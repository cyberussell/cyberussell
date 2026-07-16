import { z } from 'zod'

// Shared by actions/orders.ts (createWalkInOrder, updateOrderDetails) and their
// client forms (React Hook Form's zodResolver) — one set of rules, never two
// copies to drift. Lives here rather than in the 'use server' actions file
// because that file may only export async functions.

export const PAYMENT_STATUSES = ['unpaid', 'paid'] as const

// One cart line as sent up from WalkInOrderForm's tile grid — deliberately
// just catalogItemId + quantity, never a name or price. The server (RPC
// create_walk_in_order_with_items) looks those up authoritatively from the
// catalog by id, so a tampered/forged price in this payload is never trusted.
export const cartLineSchema = z.object({
  catalogItemId: z.string().uuid(),
  quantity: z.coerce.number().int().min(1).max(999),
})

// FormData can't carry a nested array, so the cart travels as a JSON string
// and is parsed+validated here rather than at the call site.
const cartItemsField = z
  .string()
  .transform((value, ctx) => {
    try {
      return JSON.parse(value) as unknown
    } catch {
      ctx.addIssue({ code: 'custom', message: 'Invalid items payload.' })
      return z.NEVER
    }
  })
  .pipe(z.array(cartLineSchema).min(1, 'Add at least one item to the order.'))

export const createOrderSchema = z.object({
  branchId: z.string().uuid(),
  customerId: z.string().uuid().optional().or(z.literal('')),
  assignedStaffId: z.string().uuid().optional().or(z.literal('')),
  walkInName: z.string().max(80).optional().default(''),
  walkInPhone: z.string().max(30).optional().default(''),
  items: cartItemsField,
  weightKg: z.coerce.number().min(0).optional().or(z.literal('')),
  expectedCompletionAt: z.string().optional().or(z.literal('')),
  paymentStatus: z.enum(PAYMENT_STATUSES).optional().default('unpaid'),
  notes: z.string().max(500).optional().default(''),
  pickupRequested: z.coerce.boolean().optional().default(false),
  pickupAddress: z.string().max(200).optional().default(''),
  pickupScheduledAt: z.string().optional().or(z.literal('')),
})

export type CreateOrderInput = z.input<typeof createOrderSchema>
// items' .transform() means input (a JSON string) and output (a parsed
// array) genuinely differ — react-hook-form's zodResolver types against the
// output, so useForm needs both generics (see WalkInOrderForm.tsx) or its
// handleSubmit callback type stops lining up with what zodResolver produces.
export type CreateOrderOutput = z.output<typeof createOrderSchema>

export const updateDetailsSchema = z.object({
  orderId: z.string().uuid(),
  weightKg: z.coerce.number().min(0).optional().or(z.literal('')),
  expectedCompletionAt: z.string().optional().or(z.literal('')),
  paymentStatus: z.enum(PAYMENT_STATUSES),
  notes: z.string().max(500).optional().default(''),
})

export type UpdateDetailsInput = z.input<typeof updateDetailsSchema>
