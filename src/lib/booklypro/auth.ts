import 'server-only'
import { redirect } from 'next/navigation'
import { createServerSupabase } from './supabase-server'
import type { Clinic } from './types'

// Every dashboard page calls this: resolves the signed-in owner + their clinic,
// or redirects to the right onboarding step.
export async function requireClinic() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/appointments/login')

  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('owner_id', user.id)
    .maybeSingle()
  if (!clinic) redirect('/appointments/signup?step=clinic')

  return { supabase, user, clinic: clinic as Clinic }
}

export async function getSessionUser() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return { supabase, user }
}
