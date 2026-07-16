export type InventoryCategory = 'detergent' | 'fabric_conditioner' | 'packaging' | 'other'

export interface InventoryItem {
  id: string
  business_id: string
  branch_id: string | null
  name: string
  unit: string
  quantity: number
  low_stock_threshold: number
  category: InventoryCategory
  created_at: string
  updated_at: string
}

export interface InventoryItemVariant {
  id: string
  inventory_item_id: string
  label: string
  unit: string
  quantity: number
  low_stock_threshold: number
  created_at: string
  updated_at: string
}

// An item's own unit/quantity/low_stock_threshold only matter when variants
// is empty (a "simple" item) — the moment variants exist, all stock tracking
// and low-stock evaluation moves to them instead.
export interface InventoryItemWithVariants extends InventoryItem {
  variants: InventoryItemVariant[]
}
