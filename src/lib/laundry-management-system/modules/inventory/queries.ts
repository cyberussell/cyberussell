import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { InventoryItemWithVariants, InventoryItemVariant } from './types'

export async function listInventory(supabase: SupabaseClient, businessId: string) {
  const { data } = await supabase
    .from('inventory_items')
    .select('*, variants:inventory_item_variants(*)')
    .eq('business_id', businessId)
    .order('name', { ascending: true })

  const items = (data ?? []) as InventoryItemWithVariants[]
  // Sorted client-side rather than via a nested .order() call — keeps this
  // working regardless of the installed supabase-js version's support for
  // ordering embedded/foreign-table selects.
  for (const item of items) item.variants.sort((a, b) => a.label.localeCompare(b.label))
  return items
}

export interface LowStockEntry {
  id: string
  displayName: string
  unit: string
  quantity: number
  lowStockThreshold: number
}

// A variant-tracked item (variants.length > 0) is evaluated per variant —
// its own quantity/low_stock_threshold are ignored once it has variants.
// A simple item (no variants) is evaluated on its own fields, exactly as
// before. Supabase/PostgREST filters can't compare one column to another,
// so this stays a client-side derivation from the already-fetched list
// rather than a second query.
export function getLowStockItems(items: InventoryItemWithVariants[]): LowStockEntry[] {
  const entries: LowStockEntry[] = []
  for (const item of items) {
    if (item.variants.length > 0) {
      for (const variant of item.variants) {
        if (isLowStock(variant)) {
          entries.push({
            id: variant.id,
            displayName: `${item.name} — ${variant.label}`,
            unit: variant.unit,
            quantity: variant.quantity,
            lowStockThreshold: variant.low_stock_threshold,
          })
        }
      }
    } else if (item.quantity <= item.low_stock_threshold) {
      entries.push({
        id: item.id,
        displayName: item.name,
        unit: item.unit,
        quantity: item.quantity,
        lowStockThreshold: item.low_stock_threshold,
      })
    }
  }
  return entries
}

function isLowStock(variant: Pick<InventoryItemVariant, 'quantity' | 'low_stock_threshold'>) {
  return variant.quantity <= variant.low_stock_threshold
}
