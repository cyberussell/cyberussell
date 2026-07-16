export type CatalogCategory = 'wash' | 'dry' | 'wash_dry' | 'fold' | 'dry_clean' | 'addon'
export type CatalogUnit = 'load' | 'piece'
export type PromoType = 'percent' | 'fixed'

export interface ServiceCatalogItem {
  id: string
  business_id: string
  name: string
  price: number
  active: boolean
  category: CatalogCategory
  unit: CatalogUnit
  icon_key: string | null
  icon_url: string | null
  promo_type: PromoType | null
  promo_value: number | null
  promo_starts_at: string | null
  promo_ends_at: string | null
  created_at: string
  updated_at: string
}

// Category → (label, unit, default lucide icon name) — the "seed the right
// icon" default shown until an owner uploads a custom one for that item.
// Unit is derived from category rather than user-selectable: load-based
// services vs. per-piece dry cleaning/add-ons.
export const CATEGORY_META: Record<CatalogCategory, { label: string; unit: CatalogUnit; defaultIcon: string }> = {
  wash: { label: 'Washing', unit: 'load', defaultIcon: 'WashingMachine' },
  dry: { label: 'Drying', unit: 'load', defaultIcon: 'Wind' },
  wash_dry: { label: 'Wash & Dry', unit: 'load', defaultIcon: 'Waves' },
  fold: { label: 'Fold', unit: 'load', defaultIcon: 'Shirt' },
  dry_clean: { label: 'Dry Cleaning', unit: 'piece', defaultIcon: 'Shirt' },
  addon: { label: 'Add-on', unit: 'piece', defaultIcon: 'Package' },
}

export const CATEGORY_ORDER: CatalogCategory[] = ['wash', 'dry', 'wash_dry', 'fold', 'dry_clean', 'addon']

// Active-right-now check for a promo window — a null bound means
// "always started" / "never ends" respectively, matching the SQL side
// (create_walk_in_order_with_items in migration 020).
export function isPromoActive(item: Pick<ServiceCatalogItem, 'promo_type' | 'promo_starts_at' | 'promo_ends_at'>, now = new Date()): boolean {
  if (!item.promo_type) return false
  if (item.promo_starts_at && now < new Date(item.promo_starts_at)) return false
  if (item.promo_ends_at && now > new Date(item.promo_ends_at)) return false
  return true
}

export function effectivePrice(item: Pick<ServiceCatalogItem, 'price' | 'promo_type' | 'promo_value' | 'promo_starts_at' | 'promo_ends_at'>, now = new Date()): number {
  if (!isPromoActive(item, now) || item.promo_value == null) return item.price
  if (item.promo_type === 'percent') return Math.max(item.price * (1 - item.promo_value / 100), 0)
  return Math.max(item.price - item.promo_value, 0)
}
