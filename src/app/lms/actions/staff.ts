'use server'

import { createAdminSupabase } from '@/lib/laundry-management-system/supabase-server'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { countActiveStaff, inviteStaffWithPassword, resetStaffPassword } from '@/lib/laundry-management-system/modules/staff/queries'
import { getLimit, PLANS } from '@/lib/laundry-management-system/modules/billing/entitlements'
import { inviteStaffSchema } from '@/lib/laundry-management-system/modules/staff/schema'
import { logActivity } from '@/lib/laundry-management-system/modules/audit/queries'
import type { PlanTier } from '@/lib/laundry-management-system/modules/tenant/types'
import type { ActionResult } from './shared'

// tempPassword rides alongside the usual error/'SAVED' sentinel shape — useServerAction is
// generic specifically to support this, since the owner needs to actually see the generated
// password once, not just a toast confirming success.
export interface InviteStaffResult extends ActionResult {
  tempPassword?: string
}

export async function inviteStaff(_prev: InviteStaffResult, formData: FormData): Promise<InviteStaffResult> {
  const parsed = inviteStaffSchema.safeParse({
    email: formData.get('email'),
    title: formData.get('title'),
    branchId: formData.get('branchId') || undefined,
    tempPassword: formData.get('tempPassword'),
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Enter a valid email address.' }
  const { email, title, branchId, tempPassword } = parsed.data

  const { supabase, user, business } = await requireOwnerBusiness()

  const staffLimit = getLimit(business, 'staffAccounts')
  if (staffLimit !== null) {
    const activeStaffCount = await countActiveStaff(supabase, business.id)
    if (activeStaffCount >= staffLimit) {
      const planName = PLANS[business.plan_tier as PlanTier].name
      return { error: `Staff limit reached (${staffLimit}/${staffLimit} on the ${planName} plan).` }
    }
  }

  const result = await inviteStaffWithPassword(createAdminSupabase(), {
    email,
    title,
    businessId: business.id,
    branchId: branchId || null,
    tempPassword,
  })
  if (result.error) return { error: result.error }

  await logActivity(supabase, {
    businessId: business.id,
    actorId: user.id,
    actorRole: 'owner',
    action: 'staff_invited',
    entityType: 'staff',
    details: { email, title },
  })

  return { error: 'SAVED', tempPassword: result.tempPassword }
}

// Re-resolves the staff row server-side, scoped to the calling owner's own business — never
// trusts a client-supplied staffMemberId alone without confirming it belongs to them.
export async function resetStaffPasswordAction(
  staffMemberId: string,
  customPassword?: string
): Promise<{ error?: string; tempPassword?: string }> {
  const { supabase, business } = await requireOwnerBusiness()
  // Re-validated server-side even though StaffManager's window.prompt already checks this
  // client-side — never trust a client-supplied value alone.
  if (customPassword && customPassword.length < 8) return { error: 'Temporary password must be at least 8 characters.' }

  const { data: staffRow } = await supabase
    .from('staff_members')
    .select('profile_id')
    .eq('id', staffMemberId)
    .eq('business_id', business.id)
    .maybeSingle()
  if (!staffRow) return { error: 'Staff member not found.' }

  return resetStaffPassword(createAdminSupabase(), staffRow.profile_id, customPassword || undefined)
}
