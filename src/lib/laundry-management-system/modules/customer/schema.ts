import { z } from 'zod'

// Shared by the addCustomer Server Action and the client form. The signup and
// profile-update schemas in actions/customer.ts stay inline for now — only the
// form actually migrated to React Hook Form this pass needs a shared module.
export const addCustomerSchema = z.object({
  fullName: z.string().min(1).max(80),
  phone: z.string().min(1).max(30),
  email: z.string().email().optional().or(z.literal('')),
  notes: z.string().max(500).optional().default(''),
})

export type AddCustomerInput = z.input<typeof addCustomerSchema>
