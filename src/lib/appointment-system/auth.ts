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

  let resolved = business as Business

  // Lazy overdue check: a paid plan whose billing cycle has lapsed with no new
  // payment gets suspended on next dashboard load (no cron needed for v1).
  if (
    resolved.plan_status === 'active' &&
    resolved.plan_renews_at &&
    new Date(resolved.plan_renews_at).getTime() < Date.now()
  ) {
    const { data: updated } = await supabase
      .from('businesses')
      .update({ plan_status: 'suspended' })
      .eq('id', resolved.id)
      .select('*')
      .maybeSingle()
    if (updated) resolved = updated as Business
  }

  return { supabase, user, business: resolved }
}

export async function getSessionUser() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return { supabase, user }
}
