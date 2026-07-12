import { z } from 'zod'

// Shared by the invite-staff Server Action and the client form (React Hook
// Form's zodResolver) — one set of rules, never two copies to drift. Lives
// here rather than in actions/staff.ts because a 'use server' file may only
// export async functions.
export const inviteStaffSchema = z.object({
  email: z.string().email(),
  title: z.string().max(60).optional().default(''),
  branchId: z.string().uuid().optional().or(z.literal('')),
})

export type InviteStaffInput = z.input<typeof inviteStaffSchema>
