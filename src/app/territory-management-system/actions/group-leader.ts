'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { requireGroupLeader } from '@/lib/territory-management-system/modules/auth/queries'
import { createAssignmentSchema } from '@/lib/territory-management-system/modules/assignment/schema'
import { createAssignment, deleteBatch, getBatchForGroupLeaderAndDate } from '@/lib/territory-management-system/modules/assignment/queries'
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
// it's safe to just replace it.
export async function createGroupLeaderAssignmentAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = createAssignmentSchema.safeParse({
    territoryIds: formData.getAll('territoryIds'),
    partnershipCount: formData.get('partnershipCount'),
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Please fill in the form correctly.' }

  const { supabase, congregation, userId } = await requireGroupLeader()
  const assignmentDate = todayInTimezone(congregation.timezone)

  const existing = await getBatchForGroupLeaderAndDate(supabase, congregation.id, userId, assignmentDate)
  if (existing) await deleteBatch(supabase, existing.id)

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

export async function deleteGroupLeaderAssignmentAction(batchId: string): Promise<void> {
  const { supabase, userId } = await requireGroupLeader()
  // RLS already blocks deleting a batch created_by someone else — this app-side check is
  // defense in depth (same "always independently re-verify, don't rely on RLS alone" rule this
  // codebase follows everywhere else) and avoids a silent, unexplained no-op if it's ever hit.
  const { data: batch } = await supabase.from('assignment_batches').select('created_by').eq('id', batchId).maybeSingle()
  if (batch?.created_by === userId) await deleteBatch(supabase, batchId)
  revalidatePath('/territory-management-system/group-leader/dashboard')
  redirect('/territory-management-system/group-leader/dashboard')
}
