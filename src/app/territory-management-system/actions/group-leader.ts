'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { requireGroupLeader } from '@/lib/territory-management-system/modules/auth/queries'
import { createAssignmentSchema } from '@/lib/territory-management-system/modules/assignment/schema'
import { createAssignment, deleteBatch, getBatchForDate } from '@/lib/territory-management-system/modules/assignment/queries'
import { todayInTimezone } from '@/lib/territory-management-system/modules/assignment/date'
import { isAssignmentError } from '@/lib/territory-management-system/modules/assignment/engine'
import { type ActionResult } from './shared'

// Assignment generation moved from Admin to Group Leader (Russell's call — the "campaign day,
// many publishers, decide fast" scenario belongs to whoever's coordinating the field ministry
// that day, not whoever configures territories). RLS backs this up independently (migration
// 004): the admin session client can no longer write to these 4 tables even if some old UI
// path tried to.

// If a batch already exists for today, the client-side form asks the Group Leader to confirm
// before ever submitting — by the time this runs, that confirmation has already happened, so
// it's safe to just replace it.
export async function createGroupLeaderAssignmentAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = createAssignmentSchema.safeParse({
    territoryIds: formData.getAll('territoryIds'),
    partnershipCount: formData.get('partnershipCount'),
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Please fill in the form correctly.' }

  const { supabase, congregation } = await requireGroupLeader()
  const assignmentDate = todayInTimezone(congregation.timezone)

  const existing = await getBatchForDate(supabase, congregation.id, assignmentDate)
  if (existing) await deleteBatch(supabase, existing.id)

  const result = await createAssignment(supabase, congregation.id, {
    territoryIds: parsed.data.territoryIds,
    partnershipCount: parsed.data.partnershipCount,
    assignmentDate,
  })
  if (isAssignmentError(result)) return { error: result.error }

  revalidatePath('/territory-management-system/group-leader/dashboard')
  redirect('/territory-management-system/group-leader/dashboard')
}

export async function deleteGroupLeaderAssignmentAction(batchId: string): Promise<void> {
  const { supabase } = await requireGroupLeader()
  await deleteBatch(supabase, batchId)
  revalidatePath('/territory-management-system/group-leader/dashboard')
  redirect('/territory-management-system/group-leader/dashboard')
}
