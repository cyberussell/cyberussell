import type { InventoryCategory, InventoryItem } from './types'

// No 'server-only' import here (unlike queries.ts) — the client InventoryManager
// component needs these labels/grouping too.
export const INVENTORY_CATEGORIES: InventoryCategory[] = ['detergent', 'fabric_conditioner', 'packaging', 'other']

export const INVENTORY_CATEGORY_LABELS: Record<InventoryCategory, string> = {
  detergent: 'Detergent',
  fabric_conditioner: 'Fabric Conditioner',
  packaging: 'Packaging',
  other: 'Other Consumables',
}

export function groupByCategory(items: InventoryItem[]): { category: InventoryCategory; items: InventoryItem[] }[] {
  return INVENTORY_CATEGORIES.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0)
}
