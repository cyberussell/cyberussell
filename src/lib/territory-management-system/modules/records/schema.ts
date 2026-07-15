import { z } from 'zod'

// Shared by actions/records.ts and RecordForm/VisitLogForm's zodResolver.

export const VISIT_RESULTS = [
  'initial_visit',
  'return_visit',
  'started_bible_study',
  'bible_study',
  'progressing',
  'discontinued',
  'not_home',
  'do_not_call',
  'moved',
  'other',
  'undone',
] as const

// 'initial_visit' is the implicit state of any record with zero logged visits (see
// VISIT_RESULT_LABELS.initial_visit used as a display fallback in AssignedRecordsList,
// PublisherRecordDetailView, and the admin record detail page) — a publisher never chooses it
// as an outcome, so like 'undone' (written only by terminatePartnershipEarly, never picked
// manually) it's excluded from the dropdown both visit-log forms present to a human.
export const SELECTABLE_VISIT_RESULTS = VISIT_RESULTS.filter((r) => r !== 'undone' && r !== 'initial_visit')

// Once a record's most recent visit is 'bible_study' (confirmed ongoing — not the first-time
// 'started_bible_study'), the next visit's Status choices narrow to just these three follow-up
// outcomes instead of the full list — 'progressing' keeps counting as "ongoing" for this check,
// so the narrowed list stays in place across every subsequent visit until the study ends one way
// or the other.
export const BIBLE_STUDY_ONGOING_RESULTS = ['bible_study', 'progressing'] as const
export const BIBLE_STUDY_FOLLOWUP_RESULTS = ['progressing', 'discontinued', 'moved'] as const

export function getSelectableResults(
  latestResult?: string | null
): readonly (typeof SELECTABLE_VISIT_RESULTS)[number][] {
  if (latestResult && (BIBLE_STUDY_ONGOING_RESULTS as readonly string[]).includes(latestResult)) {
    return BIBLE_STUDY_FOLLOWUP_RESULTS
  }
  return SELECTABLE_VISIT_RESULTS
}

export const VISIT_RESULT_LABELS: Record<(typeof VISIT_RESULTS)[number], string> = {
  initial_visit: 'Initial Visit',
  return_visit: 'Visited Again',
  started_bible_study: 'Started Bible Study',
  bible_study: 'Bible Study',
  progressing: 'Progressing',
  discontinued: 'Discontinued',
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
  started_bible_study: 'bg-indigo-50 text-indigo-600',
  bible_study: 'bg-violet-50 text-violet-600',
  progressing: 'bg-emerald-50 text-emerald-600',
  discontinued: 'bg-gray-100 text-gray-500',
  not_home: 'bg-slate-100 text-slate-600',
  do_not_call: 'bg-red-50 text-red-600',
  moved: 'bg-amber-50 text-amber-600',
  other: 'bg-orange-50 text-orange-600',
  undone: 'bg-gray-100 text-gray-500',
}

// Both study-related results ask who's conducting it — worded differently since "started" vs.
// an already-ongoing study read differently to a publisher at the door — but land in the same
// place: folded into the visit's Notes (mergeConductorIntoNotes below), not a new DB column.
export const VISIT_RESULT_CONDUCTOR_PROMPT: Partial<Record<(typeof VISIT_RESULTS)[number], string>> = {
  started_bible_study: 'Name of the publisher',
  bible_study: 'Who is conducting the Bible Study?',
  progressing: 'Who is conducting the Bible Study?',
}

const CONDUCTOR_NAME_MAX = 80

// Folds the conductor name into the front of Notes with a fixed, greppable prefix rather than a
// new column — used by both the admin's server-side logVisitAction and the publisher's
// client-side PublisherVisitLogForm (merged before the offline queue item is even created, so
// the sync payload needs no special handling). Hard-capped at 500 to match every notes column's
// existing limit regardless of how long the name + free-text notes combine to be.
export function mergeConductorIntoNotes(conductorName: string, notes: string): string {
  const name = conductorName.trim().slice(0, CONDUCTOR_NAME_MAX)
  if (!name) return notes
  const prefix = `Conducted by: ${name}`
  const merged = notes.trim() ? `${prefix} — ${notes.trim()}` : prefix
  return merged.slice(0, 500)
}

// A blank form field arrives as '' — coerce that to undefined so householdMembers stays
// optional instead of coercing to 0 (a real headcount of "0" is different from "not recorded").
const householdMembersField = z.preprocess(
  (v) => (v === '' || v === null || v === undefined ? undefined : v),
  z.coerce.number().int().min(0).optional()
)

export const createRecordSchema = z.object({
  territoryId: z.string().uuid(),
  sectionId: z.string().uuid(),
  blockId: z.string().uuid(),
  // Optional — the new cross-territory CSV import has no address column at all (Plus Code is
  // the location identifier there instead), so address can no longer be required at the schema
  // level. Still capped the same as before.
  address: z.string().max(200).optional().default(''),
  unit: z.string().max(40).optional().default(''),
  residentName: z.string().max(120).optional().default(''),
  plusCode: z.string().max(20).optional().default(''),
  householdMembers: householdMembersField,
  notes: z.string().max(500).optional().default(''),
  doNotCall: z.coerce.boolean().optional().default(false),
})
export type CreateRecordInput = z.input<typeof createRecordSchema>

export const updateRecordSchema = z.object({
  recordId: z.string().uuid(),
  address: z.string().max(200).optional().default(''),
  unit: z.string().max(40).optional().default(''),
  residentName: z.string().max(120).optional().default(''),
  plusCode: z.string().max(20).optional().default(''),
  householdMembers: householdMembersField,
  notes: z.string().max(500).optional().default(''),
  doNotCall: z.coerce.boolean().optional().default(false),
})
export type UpdateRecordInput = z.input<typeof updateRecordSchema>

export const logVisitSchema = z
  .object({
    recordId: z.string().uuid(),
    visitedAt: z.string().min(1),
    result: z.enum(VISIT_RESULTS),
    conductorName: z.string().max(CONDUCTOR_NAME_MAX).optional().default(''),
    notes: z.string().max(500).optional().default(''),
  })
  .refine((data) => data.result !== 'other' || data.notes.trim().length > 0, {
    message: 'Notes are required when the result is "Other".',
    path: ['notes'],
  })
  .refine((data) => !VISIT_RESULT_CONDUCTOR_PROMPT[data.result] || data.conductorName.trim().length > 0, {
    message: 'Please enter who is conducting the Bible Study.',
    path: ['conductorName'],
  })
export type LogVisitInput = z.input<typeof logVisitSchema>
