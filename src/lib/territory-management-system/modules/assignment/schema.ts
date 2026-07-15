import { z } from 'zod'

// Shared by actions/assignments.ts (admin) and actions/publisher.ts (public, token-gated).

export const createAssignmentSchema = z.object({
  territoryIds: z.array(z.string().uuid()).min(1, 'Select at least one territory.'),
  partnershipCount: z.coerce.number().int().min(1).max(50),
})
export type CreateAssignmentInput = z.input<typeof createAssignmentSchema>

export const renamePartnershipSchema = z.object({
  partnershipToken: z.string().min(1),
  name: z.string().min(1).max(60),
})
export type RenamePartnershipInput = z.input<typeof renamePartnershipSchema>

export const addPublisherRecordSchema = z.object({
  partnershipToken: z.string().min(1),
  territoryId: z.string().uuid(),
  sectionId: z.string().uuid(),
  blockId: z.string().uuid(),
  address: z.string().min(1).max(200),
  unit: z.string().max(40).optional().default(''),
  residentName: z.string().max(120).optional().default(''),
  plusCode: z.string().max(20).optional().default(''),
  notes: z.string().max(500).optional().default(''),
})
export type AddPublisherRecordInput = z.input<typeof addPublisherRecordSchema>

export const logPublisherVisitSchema = z
  .object({
    partnershipToken: z.string().min(1),
    recordId: z.string().uuid(),
    visitedAt: z.string().min(1),
    result: z.string().min(1),
    notes: z.string().max(500).optional().default(''),
  })
  .refine((data) => data.result !== 'other' || data.notes.trim().length > 0, {
    message: 'Notes are required when the result is "Other".',
    path: ['notes'],
  })
export type LogPublisherVisitInput = z.input<typeof logPublisherVisitSchema>

export const terminatePartnershipEarlySchema = z.object({
  partnershipToken: z.string().min(1),
})
export type TerminatePartnershipEarlyInput = z.input<typeof terminatePartnershipEarlySchema>

// destinationPartnershipId is a raw id, not a claim_token — the publisher picks it from a list
// of sibling partnerships in the same batch (fetched server-side), and never has the
// destination's own token.
export const movePartnershipRecordSchema = z.object({
  partnershipToken: z.string().min(1),
  recordId: z.string().uuid(),
  destinationPartnershipId: z.string().uuid(),
})
export type MovePartnershipRecordInput = z.input<typeof movePartnershipRecordSchema>
