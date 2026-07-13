'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { createAdminSupabase } from '@/lib/territory-management-system/supabase-server'
import { inviteGroupLeaderSchema } from '@/lib/territory-management-system/modules/groupLeaders/schema'
import {
  deleteGroupLeader,
  getGroupLeader,
  inviteGroupLeader,
  restoreGroupLeaderAccess,
  revokeGroupLeaderAccess,
} from '@/lib/territory-management-system/modules/groupLeaders/queries'
import { type ActionResult } from './shared'

const GROUP_LEADERS_PATH = '/territory-management-system/dashboard/group-leaders'
const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6

export async function inviteGroupLeaderAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const { congregation } = await requireAdmin()
  const parsed = inviteGroupLeaderSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
  })
  if (!parsed.success) return { error: 'Please fill in first name, last name, and a valid email.' }

  const admin = createAdminSupabase()
  const result = await inviteGroupLeader(admin, congregation.id, parsed.data)
  if (result.error) return { error: result.error }

  revalidatePath(GROUP_LEADERS_PATH)
  return { error: 'SAVED' }
}

export async function revokeGroupLeaderAccessAction(profileId: string): Promise<{ error?: string }> {
  const { congregation } = await requireAdmin()
  const admin = createAdminSupabase()
  const groupLeader = await getGroupLeader(admin, congregation.id, profileId)
  if (!groupLeader) return { error: 'Group Leader not found.' }

  const result = await revokeGroupLeaderAccess(admin, profileId)
  if (result.error) return result
  revalidatePath(GROUP_LEADERS_PATH)
  return {}
}

export async function restoreGroupLeaderAccessAction(profileId: string): Promise<{ error?: string }> {
  const { congregation } = await requireAdmin()
  const admin = createAdminSupabase()
  const groupLeader = await getGroupLeader(admin, congregation.id, profileId)
  if (!groupLeader) return { error: 'Group Leader not found.' }

  const result = await restoreGroupLeaderAccess(admin, profileId)
  if (result.error) return result
  revalidatePath(GROUP_LEADERS_PATH)
  return {}
}

export async function deleteGroupLeaderAction(profileId: string): Promise<{ error?: string }> {
  const { congregation } = await requireAdmin()
  const admin = createAdminSupabase()
  const groupLeader = await getGroupLeader(admin, congregation.id, profileId)
  if (!groupLeader) return { error: 'Group Leader not found.' }

  const ageMs = Date.now() - new Date(groupLeader.created_at).getTime()
  if (ageMs < SIX_MONTHS_MS) return { error: 'This entry is not yet 6 months old and cannot be deleted.' }

  const result = await deleteGroupLeader(admin, profileId)
  if (result.error) return result
  revalidatePath(GROUP_LEADERS_PATH)
  return {}
}
