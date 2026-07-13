'use server'

import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/territory-management-system/supabase-server'
import type { UserRole } from '@/lib/territory-management-system/modules/auth/types'
import { type ActionResult } from './shared'

// No signup action this pass — congregations + their first admin/group leader are provisioned
// manually (see territory-management-system/SETUP.md §3).

const ROLE_REDIRECT: Record<UserRole, string> = {
  admin: '/territory-management-system/dashboard',
  group_leader: '/territory-management-system/group-leader/dashboard',
}

export async function signIn(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: 'Invalid email or password.' }

  const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', data.user.id).maybeSingle()
  if (profileError || !profile) return { error: 'Could not load your account. Please try again.' }

  const role = profile.role as UserRole
  redirect(ROLE_REDIRECT[role])
}

export async function signOut(): Promise<void> {
  const supabase = await createServerSupabase()
  await supabase.auth.signOut()
  redirect('/territory-management-system/login')
}
