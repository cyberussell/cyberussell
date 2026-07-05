import 'server-only'
import { redirect } from 'next/navigation'
import { createServerSupabase } from './supabase-server'
import type { Business } from './types'

// Every dashboard page calls this: resolves the signed-in owner + their business,
// or redirects to the right onboarding step.
export async function requireBusiness() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/appointments/login')

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', user.id)
    .maybeSingle()
  if (!business) redirect('/appointments/signup?step=business')

  return { supabase, user, business: business as Business }
}

export async function getSessionUser() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return { supabase, user }
}
