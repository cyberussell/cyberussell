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

// Sent from the end-of-ministry screen, skippable — the form is only submitted at all when the
// publisher actually writes something, so a non-empty note is required at the schema level.
export const submitPartnershipNoteSchema = z.object({
  partnershipToken: z.string().min(1),
  note: z.string().min(1).max(1000),
})
export type SubmitPartnershipNoteInput = z.input<typeof submitPartnershipNoteSchema>

// "Mark as Moved" → "Update Contact Record" path — territory/section/block never change here,
// only the contact details (same resident-facing fields as addPublisherRecordSchema).
export const updatePublisherRecordSchema = z.object({
  partnershipToken: z.string().min(1),
  recordId: z.string().uuid(),
  address: z.string().max(200).optional().default(''),
  unit: z.string().max(40).optional().default(''),
  residentName: z.string().max(120).optional().default(''),
  plusCode: z.string().max(20).optional().default(''),
  notes: z.string().max(500).optional().default(''),
})
export type UpdatePublisherRecordInput = z.input<typeof updatePublisherRecordSchema>

// "Mark as Moved" → "Recommend for Admin Removal" path — the reason is required, never an
// optional note, per Russell's explicit instruction.
export const recommendRemovalSchema = z.object({
  partnershipToken: z.string().min(1),
  recordId: z.string().uuid(),
  reason: z.string().min(1).max(500),
})
export type RecommendRemovalInput = z.input<typeof recommendRemovalSchema>
