import { z } from 'zod'

// Shared by actions/records.ts and RecordForm/VisitLogForm's zodResolver.

export const VISIT_RESULTS = ['initial_visit', 'return_visit', 'bible_study', 'not_home', 'do_not_call', 'moved'] as const

export const VISIT_RESULT_LABELS: Record<(typeof VISIT_RESULTS)[number], string> = {
  initial_visit: 'Initial Visit',
  return_visit: 'Return Visit',
  bible_study: 'Bible Study',
  not_home: 'Not At Home',
  do_not_call: 'Do Not Call',
  moved: 'Moved',
}

export const createRecordSchema = z.object({
  territoryId: z.string().uuid(),
  sectionId: z.string().uuid(),
  blockId: z.string().uuid(),
  address: z.string().min(1).max(200),
  unit: z.string().max(40).optional().default(''),
  residentName: z.string().max(120).optional().default(''),
  plusCode: z.string().max(20).optional().default(''),
  notes: z.string().max(500).optional().default(''),
  doNotCall: z.coerce.boolean().optional().default(false),
})
export type CreateRecordInput = z.input<typeof createRecordSchema>

export const updateRecordSchema = z.object({
  recordId: z.string().uuid(),
  address: z.string().min(1).max(200),
  unit: z.string().max(40).optional().default(''),
  residentName: z.string().max(120).optional().default(''),
  plusCode: z.string().max(20).optional().default(''),
  notes: z.string().max(500).optional().default(''),
  doNotCall: z.coerce.boolean().optional().default(false),
})
export type UpdateRecordInput = z.input<typeof updateRecordSchema>

export const logVisitSchema = z.object({
  recordId: z.string().uuid(),
  visitedAt: z.string().min(1),
  result: z.enum(VISIT_RESULTS),
  notes: z.string().max(500).optional().default(''),
})
export type LogVisitInput = z.input<typeof logVisitSchema>
