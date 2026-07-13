'use server'

import { z } from 'zod'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { logActivity } from '@/lib/laundry-management-system/modules/audit/queries'
import type { ActionResult } from './shared'

// Driver roster management is owner-only (same restriction as Inventory/Staff),
// even though the Delivery Management page itself (viewing + assigning a driver
// to an order) is available to staff too.

const driverSchema = z.object({
  name: z.string().min(1).max(80),
  phone: z.string().max(30).optional().default(''),
  vehicleInfo: z.string().max(80).optional().default(''),
})

export async function createDriver(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = driverSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    vehicleInfo: formData.get('vehicleInfo'),
  })
  if (!parsed.success) return { error: 'Enter a valid driver name.' }
  const { name, phone, vehicleInfo } = parsed.data

  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase.from('drivers').insert({
    business_id: business.id,
    name,
    phone,
    vehicle_info: vehicleInfo,
  })
  if (error) return { error: error.message }

  return {}
}

const updateDriverSchema = driverSchema.extend({
  driverId: z.string().uuid(),
  active: z.coerce.boolean().optional().default(true),
})

export async function updateDriver(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = updateDriverSchema.safeParse({
    driverId: formData.get('driverId'),
    name: formData.get('name'),
    phone: formData.get('phone'),
    vehicleInfo: formData.get('vehicleInfo'),
    active: formData.get('active') === 'true',
  })
  if (!parsed.success) return { error: 'Enter a valid driver name.' }
  const { driverId, name, phone, vehicleInfo, active } = parsed.data

  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase
    .from('drivers')
    .update({ name, phone, vehicle_info: vehicleInfo, active })
    .eq('id', driverId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return {}
}

export async function deleteDriver(driverId: string): Promise<ActionResult> {
  const { supabase, user, business } = await requireOwnerBusiness()
  const { data: existing } = await supabase.from('drivers').select('name').eq('id', driverId).maybeSingle()
  const { error } = await supabase.from('drivers').delete().eq('id', driverId).eq('business_id', business.id)
  if (error) return { error: error.message }

  await logActivity(supabase, {
    businessId: business.id,
    actorId: user.id,
    actorRole: 'owner',
    action: 'driver_deleted',
    entityType: 'driver',
    entityId: driverId,
    details: { name: existing?.name ?? null },
  })

  return {}
}
