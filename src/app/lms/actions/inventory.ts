'use server'

import { z } from 'zod'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { INVENTORY_CATEGORIES } from '@/lib/laundry-management-system/modules/inventory/categories'
import { logActivity } from '@/lib/laundry-management-system/modules/audit/queries'
import type { ActionResult } from './shared'

const itemSchema = z.object({
  name: z.string().min(1).max(80),
  unit: z.string().min(1).max(20),
  quantity: z.coerce.number().min(0),
  lowStockThreshold: z.coerce.number().min(0),
  category: z.enum(INVENTORY_CATEGORIES as [string, ...string[]]).default('other'),
})

export async function createInventoryItem(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = itemSchema.safeParse({
    name: formData.get('name'),
    unit: formData.get('unit'),
    quantity: formData.get('quantity'),
    lowStockThreshold: formData.get('lowStockThreshold'),
    category: formData.get('category') || undefined,
  })
  if (!parsed.success) return { error: 'Enter a valid item name, unit, and quantity.' }
  const { name, unit, quantity, lowStockThreshold, category } = parsed.data

  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase.from('inventory_items').insert({
    business_id: business.id,
    name,
    unit,
    quantity,
    low_stock_threshold: lowStockThreshold,
    category,
  })
  if (error) return { error: error.message }

  return {}
}

const updateItemSchema = itemSchema.extend({ itemId: z.string().uuid() })

export async function updateInventoryItem(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = updateItemSchema.safeParse({
    itemId: formData.get('itemId'),
    name: formData.get('name'),
    unit: formData.get('unit'),
    quantity: formData.get('quantity'),
    lowStockThreshold: formData.get('lowStockThreshold'),
    category: formData.get('category') || undefined,
  })
  if (!parsed.success) return { error: 'Enter a valid item name, unit, and quantity.' }
  const { itemId, name, unit, quantity, lowStockThreshold, category } = parsed.data

  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase
    .from('inventory_items')
    .update({ name, unit, quantity, low_stock_threshold: lowStockThreshold, category, updated_at: new Date().toISOString() })
    .eq('id', itemId)
    .eq('business_id', business.id)
  if (error) return { error: error.message }

  return {}
}

export async function deleteInventoryItem(itemId: string): Promise<ActionResult> {
  const { supabase, user, business } = await requireOwnerBusiness()
  const { data: existing } = await supabase.from('inventory_items').select('name').eq('id', itemId).maybeSingle()
  const { error } = await supabase.from('inventory_items').delete().eq('id', itemId).eq('business_id', business.id)
  if (error) return { error: error.message }

  await logActivity(supabase, {
    businessId: business.id,
    actorId: user.id,
    actorRole: 'owner',
    action: 'inventory_item_deleted',
    entityType: 'inventory_item',
    entityId: itemId,
    details: { name: existing?.name ?? null },
  })

  return {}
}
