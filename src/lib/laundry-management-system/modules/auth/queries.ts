import 'server-only'
import { redirect } from 'next/navigation'
import { createServerSupabase } from '../../supabase-server'
import type { Business } from '../tenant/types'
import type { StaffMember } from '../staff/types'
import type { Customer } from '../customer/types'
import { hasPermission, type Permission } from './permissions'

export type BusinessRole = 'owner' | 'staff'

export interface BusinessSession {
  supabase: Awaited<ReturnType<typeof createServerSupabase>>
  userId: string
  business: Business
  role: BusinessRole
  staff?: StaffMember
}

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
  if (!user) redirect('/lms/login')

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', user.id)
    .maybeSingle()
  if (!business) redirect('/lms/onboarding/business')

  return { supabase, user, business: business as Business }
}

// Staff dashboard pages call this: resolves the signed-in staff member + the
// business they're linked to, or redirects if they're not staff anywhere yet.
export async function requireStaffAccess() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/lms/login')

  const { data: staffMember } = await supabase
    .from('staff_members')
    .select('*, business:businesses(*)')
    .eq('profile_id', user.id)
    .eq('active', true)
    .maybeSingle()
  if (!staffMember) redirect('/lms/login')

  const { business, ...staff } = staffMember as StaffMember & { business: Business }
  return { supabase, user, staff: staff as StaffMember, business }
}

// Resolves the signed-in user as either the business owner or an active staff member —
// the single entry point shared by pages/actions that both roles can reach (orders,
// customers, receipts). Redirects to login if the user is neither.
export async function requireBusinessSession(): Promise<BusinessSession> {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/lms/login')

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', user.id)
    .maybeSingle()
  if (business) {
    return { supabase, userId: user.id, business: business as Business, role: 'owner' }
  }

  const { data: staffMember } = await supabase
    .from('staff_members')
    .select('*, business:businesses(*)')
    .eq('profile_id', user.id)
    .eq('active', true)
    .maybeSingle()
  if (!staffMember) redirect('/lms/login')

  const { business: staffBusiness, ...staff } = staffMember as StaffMember & { business: Business }
  return { supabase, userId: user.id, business: staffBusiness, role: 'staff', staff: staff as StaffMember }
}

// Page-level permission gate built on requireBusinessSession — redirects away instead
// of rendering a page the resolved role isn't allowed to see. Defaults to each role's
// own dashboard home rather than a fixed path, since /dashboard is owner-only.
export async function requirePagePermission(permission: Permission, fallback?: string): Promise<BusinessSession> {
  const session = await requireBusinessSession()
  if (!hasPermission(session.role, permission)) {
    redirect(
      fallback ??
        (session.role === 'owner'
          ? '/lms/dashboard'
          : '/lms/staff/dashboard')
    )
  }
  return session
}

// Customer landing page calls this: resolves the signed-in customer + every business
// they're a customer of (a profile can be a customer of more than one laundry business).
export async function requireCustomerAccess() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/lms/login')

  const { data: customerRows } = await supabase
    .from('customers')
    .select('*, business:businesses(*)')
    .eq('profile_id', user.id)
  if (!customerRows || customerRows.length === 0) redirect('/lms/login')

  const customers = customerRows as (Customer & { business: Business })[]
  return { supabase, user, customers }
}
