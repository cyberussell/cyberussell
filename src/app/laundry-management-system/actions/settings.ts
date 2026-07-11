'use server'

import { z } from 'zod'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { CURRENCIES, type ActionResult } from './shared'

const businessProfileSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(1).max(30),
  address: z.string().min(1).max(200),
  timezone: z.string().min(1).max(60),
  currency: z.enum(CURRENCIES),
})

export async function updateBusinessProfile(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = businessProfileSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    timezone: formData.get('timezone'),
    currency: formData.get('currency'),
  })
  if (!parsed.success) return { error: 'Please fill in all fields correctly.' }

  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase.from('businesses').update(parsed.data).eq('id', business.id)
  if (error) return { error: error.message }

  return { error: 'SAVED' } // handled as info, not error, in the UI
}

const dayHoursSchema = z.object({ closed: z.boolean(), open: z.string(), close: z.string() })
const businessHoursSchema = z.record(z.string(), dayHoursSchema)

const branchDetailsSchema = z.object({
  branchId: z.string().uuid(),
  name: z.string().min(1).max(80),
  address: z.string().min(1).max(200),
  phone: z.string().min(1).max(30),
  businessHours: z.string().transform((v, ctx) => {
    try {
      return businessHoursSchema.parse(JSON.parse(v))
    } catch {
      ctx.addIssue({ code: 'custom', message: 'Invalid business hours.' })
      return z.NEVER
    }
  }),
})

export async function updateBranchDetails(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = branchDetailsSchema.safeParse({
    branchId: formData.get('branchId'),
    name: formData.get('name'),
    address: formData.get('address'),
    phone: formData.get('phone'),
    businessHours: formData.get('businessHours'),
  })
  if (!parsed.success) return { error: 'Please fill in all branch fields correctly.' }
  const { branchId, name, address, phone, businessHours } = parsed.data

  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase
    .from('branches')
    .update({ name, address, phone, business_hours: businessHours })
    .eq('id', branchId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return { error: 'SAVED' } // handled as info, not error, in the UI
}
