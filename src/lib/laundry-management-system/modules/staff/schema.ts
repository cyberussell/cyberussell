import { z } from 'zod'

// Shared by the invite-staff Server Action and the client form (React Hook
// Form's zodResolver) — one set of rules, never two copies to drift. Lives
// here rather than in actions/staff.ts because a 'use server' file may only
// export async functions.
export const inviteStaffSchema = z.object({
  email: z.string().email(),
  title: z.string().max(60).optional().default(''),
  branchId: z.string().uuid().optional().or(z.literal('')),
  // Blank auto-generates a secure random temp password (the default) — an
  // owner can override it with something easier to relay verbally. Same
  // 8-character minimum as every other password in this product either way.
  tempPassword: z.preprocess(
    (v) => (v === '' || v === null || v === undefined ? undefined : v),
    z.string().min(8, 'Temporary password must be at least 8 characters.').max(72).optional()
  ),
})

export type InviteStaffInput = z.input<typeof inviteStaffSchema>
