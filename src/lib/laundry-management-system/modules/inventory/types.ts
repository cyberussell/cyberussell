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
