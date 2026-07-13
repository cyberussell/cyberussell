'use server'

import { redirect } from 'next/navigation'
import { createServerSupabase, createAdminSupabase } from '@/lib/laundry-management-system/supabase-server'
import { countActiveStaff } from '@/lib/laundry-management-system/modules/staff/queries'
import { getLimit, PLANS } from '@/lib/laundry-management-system/modules/billing/entitlements'
import { inviteStaffSchema } from '@/lib/laundry-management-system/modules/staff/schema'
import { logActivity } from '@/lib/laundry-management-system/modules/audit/queries'
import type { PlanTier } from '@/lib/laundry-management-system/modules/tenant/types'
import type { ActionResult } from './shared'

export async function inviteStaff(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = inviteStaffSchema.safeParse({
    email: formData.get('email'),
    title: formData.get('title'),
    branchId: formData.get('branchId') || undefined,
  })
  if (!parsed.success) return { error: 'Enter a valid email address.' }
  const { email, title, branchId } = parsed.data

  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/laundry-management-system/login')

  const { data: business } = await supabase
    .from('businesses')
    .select('id, plan_tier')
    .eq('owner_id', user.id)
    .maybeSingle()
  if (!business) return { error: 'Business not found.' }

  const staffLimit = getLimit(business, 'staffAccounts')
  if (staffLimit !== null) {
    const activeStaffCount = await countActiveStaff(supabase, business.id)
    if (activeStaffCount >= staffLimit) {
      const planName = PLANS[business.plan_tier as PlanTier].name
      return { error: `Staff limit reached (${staffLimit}/${staffLimit} on the ${planName} plan).` }
    }
  }

  const { error } = await createAdminSupabase().auth.admin.inviteUserByEmail(email, {
    data: {
      role: 'staff',
      business_id: business.id,
      branch_id: branchId || null,
      title,
    },
    redirectTo: 'https://www.cyberussell.com/laundry-management-system/staff/accept-invite',
  })
  if (error) return { error: error.message }

  await logActivity(supabase, {
    businessId: business.id,
    actorId: user.id,
    actorRole: 'owner',
    action: 'staff_invited',
    entityType: 'staff',
    details: { email, title },
  })

  return { error: 'INVITED' } // handled as info, not error, in the UI
}
