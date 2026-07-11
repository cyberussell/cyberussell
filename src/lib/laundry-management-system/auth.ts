import 'server-only'
import { redirect } from 'next/navigation'
import { createServerSupabase } from './supabase-server'
import type { Business, StaffMember } from './types'

export async function getSessionUser() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return { supabase, user }
}

// Owner dashboard pages call this: resolves the signed-in owner + their business,
// or redirects to the right onboarding step.
export async function requireOwnerBusiness() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/laundry-management-system/login')

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', user.id)
    .maybeSingle()
  if (!business) redirect('/laundry-management-system/onboarding/business')

  return { supabase, user, business: business as Business }
}

// Staff dashboard pages call this: resolves the signed-in staff member + the
// business they're linked to, or redirects if they're not staff anywhere yet.
export async function requireStaffAccess() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/laundry-management-system/login')

  const { data: staffMember } = await supabase
    .from('staff_members')
    .select('*, business:businesses(*)')
    .eq('profile_id', user.id)
    .eq('active', true)
    .maybeSingle()
  if (!staffMember) redirect('/laundry-management-system/login')

  const { business, ...staff } = staffMember as StaffMember & { business: Business }
  return { supabase, user, staff: staff as StaffMember, business }
}
