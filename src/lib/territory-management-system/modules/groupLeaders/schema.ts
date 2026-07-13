import { z } from 'zod'

export const inviteGroupLeaderSchema = z.object({
  firstName: z.string().min(1).max(60),
  lastName: z.string().min(1).max(60),
  email: z.string().email(),
})
export type InviteGroupLeaderInput = z.input<typeof inviteGroupLeaderSchema>

export const requestPasswordResetSchema = z.object({
  email: z.string().email(),
})
export type RequestPasswordResetInput = z.input<typeof requestPasswordResetSchema>
