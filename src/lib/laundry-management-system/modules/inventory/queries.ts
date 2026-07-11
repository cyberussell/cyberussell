import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { InventoryItem } from './types'

export async function listInventory(supabase: SupabaseClient, businessId: string) {
  const { data } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('business_id', businessId)
    .order('name', { ascending: true })
  return (data ?? []) as InventoryItem[]
}

// Supabase/PostgREST filters can't compare one column to another, so low-stock is
// derived client-side from the already-fetched list rather than a second query.
export function getLowStockItems(items: InventoryItem[]) {
  return items.filter((item) => item.quantity <= item.low_stock_threshold)
}
