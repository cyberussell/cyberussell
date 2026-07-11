'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerSupabase, createAdminSupabase } from '@/lib/laundry-management-system/supabase-server'
import { countActiveStaff, STAFF_ACCOUNT_LIMIT } from '@/lib/laundry-management-system/modules/staff/queries'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'
import type { ActionResult } from './shared'

const inviteStaffSchema = z.object({
  email: z.string().email(),
  title: z.string().max(60).optional().default(''),
  branchId: z.string().uuid().optional().or(z.literal('')),
})

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

  if (!hasFeature(business, 'unlimited_staff')) {
    const activeStaffCount = await countActiveStaff(supabase, business.id)
    if (activeStaffCount >= STAFF_ACCOUNT_LIMIT) {
      return { error: `Staff limit reached (${STAFF_ACCOUNT_LIMIT}/${STAFF_ACCOUNT_LIMIT} on the Essential plan).` }
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

  return { error: 'INVITED' } // handled as info, not error, in the UI
}
