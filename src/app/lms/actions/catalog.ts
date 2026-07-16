'use server'

import { z } from 'zod'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { logActivity } from '@/lib/laundry-management-system/modules/audit/queries'
import type { ActionResult } from './shared'

const itemSchema = z.object({
  name: z.string().min(1).max(80),
  price: z.coerce.number().min(0),
})

export async function createCatalogItem(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = itemSchema.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
  })
  if (!parsed.success) return { error: 'Enter a valid item name and price.' }
  const { name, price } = parsed.data

  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase.from('service_catalog_items').insert({
    business_id: business.id,
    name,
    price,
  })
  if (error) return { error: error.message }

  return {}
}

const updateItemSchema = itemSchema.extend({ itemId: z.string().uuid() })

export async function updateCatalogItem(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = updateItemSchema.safeParse({
    itemId: formData.get('itemId'),
    name: formData.get('name'),
    price: formData.get('price'),
  })
  if (!parsed.success) return { error: 'Enter a valid item name and price.' }
  const { itemId, name, price } = parsed.data

  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase
    .from('service_catalog_items')
    .update({ name, price, updated_at: new Date().toISOString() })
    .eq('id', itemId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return {}
}

// Soft delete (active=false) rather than a hard row delete — order_items
// already snapshot name/unit_price at creation time and set catalog_item_id
// null on delete, so history stays intact either way; deactivating instead
// lets an owner bring a seasonal item back without re-typing it.
export async function deleteCatalogItem(itemId: string): Promise<ActionResult> {
  const { supabase, user, business } = await requireOwnerBusiness()
  const { data: existing } = await supabase.from('service_catalog_items').select('name').eq('id', itemId).maybeSingle()
  const { error } = await supabase
    .from('service_catalog_items')
    .update({ active: false, updated_at: new Date().toISOString() })
    .eq('id', itemId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  await logActivity(supabase, {
    businessId: business.id,
    actorId: user.id,
    actorRole: 'owner',
    action: 'catalog_item_deactivated',
    entityType: 'catalog_item',
    entityId: itemId,
    details: { name: existing?.name ?? null },
  })

  return {}
}

export async function reactivateCatalogItem(itemId: string): Promise<ActionResult> {
  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase
    .from('service_catalog_items')
    .update({ active: true, updated_at: new Date().toISOString() })
    .eq('id', itemId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return {}
}
