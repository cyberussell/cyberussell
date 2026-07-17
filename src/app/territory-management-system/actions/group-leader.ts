'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { requireGroupLeader } from '@/lib/territory-management-system/modules/auth/queries'
import { createAssignmentSchema } from '@/lib/territory-management-system/modules/assignment/schema'
import {
  createAssignment,
  deleteBatch,
  getBatchesForGroupLeaderAndDate,
} from '@/lib/territory-management-system/modules/assignment/queries'
import { todayInTimezone } from '@/lib/territory-management-system/modules/assignment/date'
import { isAssignmentError } from '@/lib/territory-management-system/modules/assignment/engine'
import { type ActionResult } from './shared'

// Assignment generation moved from Admin to Group Leader (Russell's call — the "campaign day,
// many publishers, decide fast" scenario belongs to whoever's coordinating the field ministry
// that day, not whoever configures territories). RLS backs this up independently (migration
// 004): the admin session client can no longer write to these 4 tables even if some old UI
// path tried to.
//
// Multiple Group Leaders can each run their own concurrent batch the same day
// (013_group_leader_assignment_ownership.sql) — "existing batch" below means MY existing batch,
// never another Group Leader's, and createAssignment independently rejects any territory
// another Group Leader's active batch already covers today.

// If a batch already exists for today, the client-side form asks the Group Leader to confirm
// before ever submitting — by the time this runs, that confirmation has already happened, so
// it's safe to just replace it. "Replace" now means deleting EVERY one of today's batches for
// this Group Leader (not just one) — a Group Leader can have more than one today via the
// overflow-assignment path below, and this form's own copy ("generating a new one replaces it")
// still means "start completely fresh," not "replace one of several arbitrarily."
export async function createGroupLeaderAssignmentAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = createAssignmentSchema.safeParse({
    territoryIds: formData.getAll('territoryIds'),
    partnershipCount: formData.get('partnershipCount'),
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Please fill in the form correctly.' }

  const { supabase, congregation, userId } = await requireGroupLeader()
  const assignmentDate = todayInTimezone(congregation.timezone)

  const existing = await getBatchesForGroupLeaderAndDate(supabase, congregation.id, userId, assignmentDate)
  for (const batch of existing) await deleteBatch(supabase, batch.id)

  const result = await createAssignment(supabase, congregation.id, {
    territoryIds: parsed.data.territoryIds,
    partnershipCount: parsed.data.partnershipCount,
    assignmentDate,
    createdBy: userId,
  })
  if (isAssignmentError(result)) return { error: result.error }

  revalidatePath('/territory-management-system/group-leader/dashboard')
  redirect('/territory-management-system/group-leader/dashboard')
}

// Generates an additional, independent batch for a Group Leader who already has one today —
// the "too many publishers for one territory" scenario. Never deletes anything (unlike the
// regenerate action above): the original batch and every partnership already claimed under it
// stays exactly as-is. Every partnership here is created with zero records regardless of what's
// technically still unassigned in the territory (createAssignment's forceZeroRecords) — this is
// deliberately a "go canvass/search" batch, not a second bite at the same eligible-record pool,
// so it can never end up double-assigning an address someone else is already working today.
export async function createOverflowAssignmentAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = createAssignmentSchema.safeParse({
    territoryIds: formData.getAll('territoryIds'),
    partnershipCount: formData.get('partnershipCount'),
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Please fill in the form correctly.' }

  const { supabase, congregation, userId } = await requireGroupLeader()
  const assignmentDate = todayInTimezone(congregation.timezone)

  // The client-side picker only ever shows territories this Group Leader already has an active
  // batch on today, but this is a public-facing mutation reached from ordinary form fields —
  // re-verify server-side rather than trusting the submitted territoryIds outright, same rule
  // this codebase applies everywhere a client picks from a constrained list.
  const existingBatches = await getBatchesForGroupLeaderAndDate(supabase, congregation.id, userId, assignmentDate)
  if (existingBatches.length === 0) return { error: 'Generate today’s first assignment before adding an overflow one.' }
  const { data: territoryLinks } = await supabase
    .from('assignment_batch_territories')
    .select('territory_id')
    .in(
      'batch_id',
      existingBatches.map((b) => b.id)
    )
  const todaysTerritoryIds = new Set((territoryLinks ?? []).map((l) => l.territory_id as string))
  const invalid = parsed.data.territoryIds.filter((id) => !todaysTerritoryIds.has(id))
  if (invalid.length > 0) return { error: 'Choose a territory already assigned today.' }

  const result = await createAssignment(supabase, congregation.id, {
    territoryIds: parsed.data.territoryIds,
    partnershipCount: parsed.data.partnershipCount,
    assignmentDate,
    createdBy: userId,
    forceZeroRecords: true,
  })
  if (isAssignmentError(result)) return { error: result.error }

  revalidatePath('/territory-management-system/group-leader/dashboard')
  redirect('/territory-management-system/group-leader/dashboard')
}

export async function deleteGroupLeaderAssignmentAction(batchId: string): Promise<void> {
  const { supabase, userId } = await requireGroupLeader()
  // RLS already blocks deleting a batch created_by someone else — this app-side check is
  // defense in depth (same "always independently re-verify, don't rely on RLS alone" rule this
  // codebase follows everywhere else) and avoids a silent, unexplained no-op if it's ever hit.
  // A batch created before 013_group_leader_assignment_ownership.sql has created_by = null
  // (no way to know who made it retroactively) — treated as legacy/unowned, manageable by any
  // Group Leader, same as 014_legacy_batch_ownership_fix.sql's matching RLS carve-out.
  const { data: batch } = await supabase.from('assignment_batches').select('created_by').eq('id', batchId).maybeSingle()
  if (batch && (batch.created_by === userId || batch.created_by === null)) await deleteBatch(supabase, batchId)
  revalidatePath('/territory-management-system/group-leader/dashboard')
  redirect('/territory-management-system/group-leader/dashboard')
}
