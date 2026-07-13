'use server'

import { z } from 'zod'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { logActivity } from '@/lib/laundry-management-system/modules/audit/queries'
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

  const { supabase, user, business } = await requireOwnerBusiness()
  const { error } = await supabase.from('businesses').update(parsed.data).eq('id', business.id)
  if (error) return { error: error.message }

  await logActivity(supabase, {
    businessId: business.id,
    actorId: user.id,
    actorRole: 'owner',
    action: 'business_profile_updated',
    entityType: 'business',
    entityId: business.id,
    details: parsed.data,
  })

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

  const { supabase, user, business } = await requireOwnerBusiness()
  const { error } = await supabase
    .from('branches')
    .update({ name, address, phone, business_hours: businessHours })
    .eq('id', branchId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  await logActivity(supabase, {
    businessId: business.id,
    actorId: user.id,
    actorRole: 'owner',
    action: 'branch_details_updated',
    entityType: 'branch',
    entityId: branchId,
    details: { name, address, phone },
  })

  return { error: 'SAVED' } // handled as info, not error, in the UI
}

const LOGO_MAX_BYTES = 2 * 1024 * 1024
const LOGO_EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
}

export async function uploadBusinessLogo(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const file = formData.get('logo')
  if (!(file instanceof File) || file.size === 0) return { error: 'Choose an image to upload.' }
  const extension = LOGO_EXTENSIONS[file.type]
  if (!extension) return { error: 'Logo must be a PNG, JPEG, or WebP image.' }
  if (file.size > LOGO_MAX_BYTES) return { error: 'Logo must be under 2MB.' }

  const { supabase, business } = await requireOwnerBusiness()

  // One logo per business — clear whatever's already in this business's
  // folder first so a format change (e.g. png -> jpg) doesn't leave the old
  // file behind under a different extension.
  const { data: existing } = await supabase.storage.from('business-logos').list(business.id)
  if (existing && existing.length > 0) {
    await supabase.storage.from('business-logos').remove(existing.map((f) => `${business.id}/${f.name}`))
  }

  const path = `${business.id}/logo.${extension}`
  const { error: uploadError } = await supabase.storage.from('business-logos').upload(path, file, { contentType: file.type })
  if (uploadError) return { error: uploadError.message }

  const { data: publicUrl } = supabase.storage.from('business-logos').getPublicUrl(path)
  // Cache-bust so the new logo shows immediately even though the path is identical to the old one.
  const logoUrl = `${publicUrl.publicUrl}?v=${Date.now()}`

  const { error: updateError } = await supabase.from('businesses').update({ logo_url: logoUrl }).eq('id', business.id)
  if (updateError) return { error: updateError.message }

  return { error: 'SAVED' } // handled as info, not error, in the UI
}
