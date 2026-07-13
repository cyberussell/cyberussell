import { z } from 'zod'

// Shared by actions/congregation.ts and CongregationSettingsForm's zodResolver.

export const updateCongregationSchema = z.object({
  name: z.string().min(2).max(120),
  congregationNumber: z.string().min(1).max(20),
  timezone: z.string().min(1).max(60),
})
export type UpdateCongregationInput = z.input<typeof updateCongregationSchema>
