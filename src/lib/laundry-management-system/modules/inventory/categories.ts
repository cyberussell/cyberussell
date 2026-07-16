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

// Generic over T so callers passing InventoryItemWithVariants (the shape
// listInventory now returns) keep the variants field on each grouped item.
export function groupByCategory<T extends InventoryItem>(items: T[]): { category: InventoryCategory; items: T[] }[] {
  return INVENTORY_CATEGORIES.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0)
}
