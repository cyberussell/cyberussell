import 'server-only'
import { redirect } from 'next/navigation'
import { createServerSupabase } from '../../supabase-server'
import type { Congregation } from '../congregation/types'
import type { UserRole } from './types'

export interface RoleSession {
  supabase: Awaited<ReturnType<typeof createServerSupabase>>
  userId: string
  congregation: Congregation
}

async function requireRole(role: UserRole): Promise<RoleSession> {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/territory-management-system/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, congregation_id, revoked_at')
    .eq('id', user.id)
    .maybeSingle()
  if (!profile || profile.role !== role) redirect('/territory-management-system/login')
  // Defense in depth: the account itself is also banned server-side the moment access is
  // revoked (see revokeGroupLeaderAccess), but a session token issued just before that could
  // otherwise still pass auth.getUser() until it naturally expires.
  if (profile.revoked_at) redirect('/territory-management-system/login?error=revoked')
  if (!profile.congregation_id) redirect('/territory-management-system/login?error=not_provisioned')

  const { data: congregation } = await supabase
    .from('congregations')
    .select('*')
    .eq('id', profile.congregation_id)
    .maybeSingle()
  if (!congregation) redirect('/territory-management-system/login?error=not_provisioned')

  return { supabase, userId: user.id, congregation: congregation as Congregation }
}

// Admin dashboard pages/actions call this: resolves the signed-in admin + their congregation.
// Redirects to login if unauthenticated, wrong role, or if provisioning is incomplete (no
// congregation linked yet — see territory-management-system/SETUP.md §3).
export async function requireAdmin(): Promise<RoleSession> {
  return requireRole('admin')
}

// Group Leader dashboard pages call this — same shape as requireAdmin, gated on the
// 'group_leader' role instead. Read-only surface, enforced at the RLS layer (003 migration),
// not just here.
export async function requireGroupLeader(): Promise<RoleSession> {
  return requireRole('group_leader')
}
