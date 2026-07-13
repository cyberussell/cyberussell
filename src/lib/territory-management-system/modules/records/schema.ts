import { z } from 'zod'

// Shared by actions/records.ts and RecordForm/VisitLogForm's zodResolver.

export const VISIT_RESULTS = [
  'initial_visit',
  'return_visit',
  'bible_study',
  'not_home',
  'do_not_call',
  'moved',
  'other',
  'undone',
] as const

// 'undone' is written only by terminatePartnershipEarly (assignment/queries.ts) for records left
// unfinished when a Ministry Partner ends their session early — never a real visit, so it's
// deliberately excluded from the dropdown both visit-log forms present to a human.
export const SELECTABLE_VISIT_RESULTS = VISIT_RESULTS.filter((r) => r !== 'undone')

export const VISIT_RESULT_LABELS: Record<(typeof VISIT_RESULTS)[number], string> = {
  initial_visit: 'Initial Visit',
  return_visit: 'Return Visit',
  bible_study: 'Bible Study',
  not_home: 'Not At Home',
  do_not_call: 'Do Not Call',
  moved: 'Moved',
  other: 'Other',
  undone: 'Undone',
}

// Shared by VisitHistoryList and VisitResultBadge — one place for the color per result, so the
// two can never drift out of sync with each other (or with VISIT_RESULTS itself) the way the
// old inline copy once did.
export const VISIT_RESULT_STYLES: Record<(typeof VISIT_RESULTS)[number], string> = {
  initial_visit: 'bg-blue-50 text-[#2563EB]',
  return_visit: 'bg-sky-50 text-sky-600',
  bible_study: 'bg-violet-50 text-violet-600',
  not_home: 'bg-slate-100 text-slate-600',
  do_not_call: 'bg-red-50 text-red-600',
  moved: 'bg-amber-50 text-amber-600',
  other: 'bg-orange-50 text-orange-600',
  undone: 'bg-gray-100 text-gray-500',
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

export const logVisitSchema = z
  .object({
    recordId: z.string().uuid(),
    visitedAt: z.string().min(1),
    result: z.enum(VISIT_RESULTS),
    notes: z.string().max(500).optional().default(''),
  })
  .refine((data) => data.result !== 'other' || data.notes.trim().length > 0, {
    message: 'Notes are required when the result is "Other".',
    path: ['notes'],
  })
export type LogVisitInput = z.input<typeof logVisitSchema>
