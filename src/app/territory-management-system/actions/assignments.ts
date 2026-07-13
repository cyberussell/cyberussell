'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { createAssignmentSchema } from '@/lib/territory-management-system/modules/assignment/schema'
import { createAssignment, deleteBatch, getBatchForDate } from '@/lib/territory-management-system/modules/assignment/queries'
import { todayInTimezone } from '@/lib/territory-management-system/modules/assignment/date'
import { isAssignmentError } from '@/lib/territory-management-system/modules/assignment/engine'
import { type ActionResult } from './shared'

// If a batch already exists for today, the client-side form asks the admin to confirm
// before ever submitting (AssignmentForm) — by the time this runs, that confirmation has
// already happened, so it's safe to just replace it.
export async function createAssignmentAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = createAssignmentSchema.safeParse({
    territoryIds: formData.getAll('territoryIds'),
    partnershipCount: formData.get('partnershipCount'),
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Please fill in the form correctly.' }

  const { supabase, congregation } = await requireAdmin()
  const assignmentDate = todayInTimezone(congregation.timezone)

  const existing = await getBatchForDate(supabase, congregation.id, assignmentDate)
  if (existing) await deleteBatch(supabase, existing.id)

  const result = await createAssignment(supabase, congregation.id, {
    territoryIds: parsed.data.territoryIds,
    partnershipCount: parsed.data.partnershipCount,
    assignmentDate,
  })
  if (isAssignmentError(result)) return { error: result.error }

  revalidatePath('/territory-management-system/dashboard/assignments')
  redirect(`/territory-management-system/dashboard/assignments/${result.batchId}`)
}

export async function deleteAssignmentAction(batchId: string): Promise<void> {
  const { supabase } = await requireAdmin()
  await deleteBatch(supabase, batchId)
  revalidatePath('/territory-management-system/dashboard/assignments')
  redirect('/territory-management-system/dashboard/assignments')
}
