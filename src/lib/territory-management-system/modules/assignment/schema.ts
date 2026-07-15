import { z } from 'zod'
import { householdMembersField, VISIT_RESULT_CONDUCTOR_PROMPT } from '@/lib/territory-management-system/modules/records/schema'

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

// initialResult/initialConductorName/initialNotes optionally seed the new record's very first
// visit at creation time — same idea and validation rules as records/schema.ts's
// createRecordSchema, mirrored here since the publisher path runs through its own schema file.
export const addPublisherRecordSchema = z
  .object({
    partnershipToken: z.string().min(1),
    // Generated client-side (crypto.randomUUID()) the moment the publisher submits the form —
    // lets the offline-first UI optimistically render (and immediately allow editing/deleting)
    // the new record under a stable id before this write has even synced.
    recordId: z.string().uuid(),
    territoryId: z.string().uuid(),
    sectionId: z.string().uuid(),
    blockId: z.string().uuid(),
    address: z.string().min(1).max(200),
    unit: z.string().max(40).optional().default(''),
    residentName: z.string().max(120).optional().default(''),
    plusCode: z.string().max(20).optional().default(''),
    householdMembers: householdMembersField,
    notes: z.string().max(500).optional().default(''),
    initialResult: z.string().optional().default(''),
    initialConductorName: z.string().max(80).optional().default(''),
    initialNotes: z.string().max(500).optional().default(''),
  })
  .refine((data) => !data.initialResult || data.initialResult !== 'other' || data.initialNotes.trim().length > 0, {
    message: 'Notes are required when the initial status is "Other".',
    path: ['initialNotes'],
  })
  .refine(
    (data) =>
      !data.initialResult ||
      !VISIT_RESULT_CONDUCTOR_PROMPT[data.initialResult as keyof typeof VISIT_RESULT_CONDUCTOR_PROMPT] ||
      data.initialConductorName.trim().length > 0,
    { message: 'Please enter who is conducting the Bible Study.', path: ['initialConductorName'] }
  )
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

// Sent from the note screen's Skip/Send handlers — reachable from both the normal Sync &
// Finish path and the End Early path, since both route through that screen.
export const finishPartnershipSchema = z.object({
  partnershipToken: z.string().min(1),
})
export type FinishPartnershipInput = z.input<typeof finishPartnershipSchema>

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

// Deleting a record the publisher added themselves — only reachable while their own ministry
// session is still active (see deletePublisherAddedRecordAction).
export const deletePublisherAddedRecordSchema = z.object({
  partnershipToken: z.string().min(1),
  recordId: z.string().uuid(),
})
export type DeletePublisherAddedRecordInput = z.input<typeof deletePublisherAddedRecordSchema>

// Editing a record the publisher added themselves — same field set as addPublisherRecordSchema
// minus the initial-visit fields (editing a record you added isn't "logging a visit").
export const editPublisherAddedRecordSchema = z.object({
  partnershipToken: z.string().min(1),
  recordId: z.string().uuid(),
  territoryId: z.string().uuid(),
  sectionId: z.string().uuid(),
  blockId: z.string().uuid(),
  address: z.string().min(1).max(200),
  unit: z.string().max(40).optional().default(''),
  residentName: z.string().max(120).optional().default(''),
  plusCode: z.string().max(20).optional().default(''),
  householdMembers: householdMembersField,
  notes: z.string().max(500).optional().default(''),
})
export type EditPublisherAddedRecordInput = z.input<typeof editPublisherAddedRecordSchema>
