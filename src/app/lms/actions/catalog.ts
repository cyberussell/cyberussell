'use server'

import { z } from 'zod'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { logActivity } from '@/lib/laundry-management-system/modules/audit/queries'
import { CATEGORY_META, type CatalogCategory } from '@/lib/laundry-management-system/modules/catalog/types'
import type { ActionResult } from './shared'

const CATEGORIES = Object.keys(CATEGORY_META) as [CatalogCategory, ...CatalogCategory[]]

const promoInputSchema = z.object({
  promoType: z.union([z.literal('percent'), z.literal('fixed'), z.literal('')]).optional(),
  promoValue: z.string().optional(),
  promoStartsAt: z.string().optional(),
  promoEndsAt: z.string().optional(),
})

// A promo is all-or-nothing: an empty/omitted promoType clears any existing
// promo, a real one requires a non-negative value. Dates are optional on
// either side — a blank start means "already active", a blank end means
// "runs indefinitely" (mirrors the SQL side in migration 020).
function parsePromo(input: z.infer<typeof promoInputSchema>):
  | { ok: true; value: { promo_type: 'percent' | 'fixed' | null; promo_value: number | null; promo_starts_at: string | null; promo_ends_at: string | null } }
  | { ok: false; error: string } {
  if (!input.promoType) {
    return { ok: true, value: { promo_type: null, promo_value: null, promo_starts_at: null, promo_ends_at: null } }
  }
  const value = Number(input.promoValue)
  if (!Number.isFinite(value) || value < 0) return { ok: false, error: 'Enter a valid promo discount amount.' }
  return {
    ok: true,
    value: {
      promo_type: input.promoType,
      promo_value: value,
      promo_starts_at: input.promoStartsAt ? new Date(input.promoStartsAt).toISOString() : null,
      promo_ends_at: input.promoEndsAt ? new Date(input.promoEndsAt).toISOString() : null,
    },
  }
}

const itemSchema = z
  .object({
    name: z.string().min(1).max(80),
    price: z.coerce.number().min(0),
    category: z.enum(CATEGORIES),
    iconKey: z.string().max(60).optional(),
  })
  .merge(promoInputSchema)

export async function createCatalogItem(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = itemSchema.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    category: formData.get('category'),
    iconKey: formData.get('iconKey') || undefined,
    promoType: formData.get('promoType') || undefined,
    promoValue: formData.get('promoValue') || undefined,
    promoStartsAt: formData.get('promoStartsAt') || undefined,
    promoEndsAt: formData.get('promoEndsAt') || undefined,
  })
  if (!parsed.success) return { error: 'Enter a valid item name, price, and category.' }
  const { name, price, category, iconKey } = parsed.data

  const promo = parsePromo(parsed.data)
  if (!promo.ok) return { error: promo.error }

  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase.from('service_catalog_items').insert({
    business_id: business.id,
    name,
    price,
    category,
    unit: CATEGORY_META[category].unit,
    icon_key: iconKey || null,
    ...promo.value,
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
    category: formData.get('category'),
    iconKey: formData.get('iconKey') || undefined,
    promoType: formData.get('promoType') || undefined,
    promoValue: formData.get('promoValue') || undefined,
    promoStartsAt: formData.get('promoStartsAt') || undefined,
    promoEndsAt: formData.get('promoEndsAt') || undefined,
  })
  if (!parsed.success) return { error: 'Enter a valid item name, price, and category.' }
  const { itemId, name, price, category, iconKey } = parsed.data

  const promo = parsePromo(parsed.data)
  if (!promo.ok) return { error: promo.error }

  const { supabase, business } = await requireOwnerBusiness()
  const { error } = await supabase
    .from('service_catalog_items')
    .update({
      name,
      price,
      category,
      unit: CATEGORY_META[category].unit,
      icon_key: iconKey || null,
      ...promo.value,
      updated_at: new Date().toISOString(),
    })
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

// Mirrors uploadBusinessLogo's exact pattern (settings.ts) — smaller limit
// since these are tap-grid icons, not full branding assets.
const ICON_MAX_BYTES = 1 * 1024 * 1024
const ICON_EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
}

export async function uploadCatalogItemIcon(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const itemId = String(formData.get('itemId') ?? '')
  if (!z.string().uuid().safeParse(itemId).success) return { error: 'Item not found.' }

  const file = formData.get('icon')
  if (!(file instanceof File) || file.size === 0) return { error: 'Choose an image to upload.' }
  const extension = ICON_EXTENSIONS[file.type]
  if (!extension) return { error: 'Icon must be a PNG, JPEG, or WebP image.' }
  if (file.size > ICON_MAX_BYTES) return { error: 'Icon must be under 1MB.' }

  const { supabase, business } = await requireOwnerBusiness()
  const { data: item } = await supabase
    .from('service_catalog_items')
    .select('id')
    .eq('id', itemId)
    .eq('business_id', business.id)
    .maybeSingle()
  if (!item) return { error: 'Item not found.' }

  // One icon per item — clear whatever's already there first so a format
  // change (e.g. png -> jpg) doesn't leave the old file behind under a
  // different extension.
  const { data: existing } = await supabase.storage.from('service-icons').list(business.id)
  const stale = (existing ?? []).filter((f) => f.name.startsWith(`${itemId}.`))
  if (stale.length > 0) {
    await supabase.storage.from('service-icons').remove(stale.map((f) => `${business.id}/${f.name}`))
  }

  const path = `${business.id}/${itemId}.${extension}`
  const { error: uploadError } = await supabase.storage.from('service-icons').upload(path, file, { contentType: file.type })
  if (uploadError) return { error: uploadError.message }

  const { data: publicUrl } = supabase.storage.from('service-icons').getPublicUrl(path)
  const iconUrl = `${publicUrl.publicUrl}?v=${Date.now()}`

  const { error: updateError } = await supabase.from('service_catalog_items').update({ icon_url: iconUrl }).eq('id', itemId)
  if (updateError) return { error: updateError.message }

  return { error: 'SAVED' } // handled as info, not error, in the UI
}

export async function removeCatalogItemIcon(itemId: string): Promise<ActionResult> {
  const { supabase, business } = await requireOwnerBusiness()
  const { data: item } = await supabase
    .from('service_catalog_items')
    .select('id')
    .eq('id', itemId)
    .eq('business_id', business.id)
    .maybeSingle()
  if (!item) return { error: 'Item not found.' }

  const { data: existing } = await supabase.storage.from('service-icons').list(business.id)
  const stale = (existing ?? []).filter((f) => f.name.startsWith(`${itemId}.`))
  if (stale.length > 0) {
    await supabase.storage.from('service-icons').remove(stale.map((f) => `${business.id}/${f.name}`))
  }

  const { error } = await supabase.from('service_catalog_items').update({ icon_url: null }).eq('id', itemId)
  if (error) return { error: error.message }

  return {}
}
