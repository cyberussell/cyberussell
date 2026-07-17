export type OrderStatus =
  | 'received'
  | 'sorting'
  | 'washing'
  | 'drying'
  | 'folding'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled'

export type PaymentStatus = 'unpaid' | 'paid'

export interface StatusHistoryEntry {
  status: OrderStatus
  changed_at: string
}

export interface Order {
  id: string
  order_number: string
  // Opaque, unguessable token for the public (no-login) tracking page —
  // order_number itself is a sequential bigserial, unsuitable for public use.
  public_token: string
  business_id: string
  branch_id: string
  customer_id: string | null
  walk_in_name: string
  walk_in_phone: string
  service_label: string
  amount: number
  status: OrderStatus
  notes: string
  created_by: string | null
  assigned_staff_id: string | null
  date_received: string
  expected_completion_at: string | null
  weight_kg: number | null
  payment_status: PaymentStatus
  status_history: StatusHistoryEntry[]
  created_at: string
  ready_at: string | null
  completed_at: string | null
  is_priority: boolean
  pickup_requested: boolean
  pickup_address: string
  pickup_scheduled_at: string | null
  pickup_completed_at: string | null
  delivery_scheduled_at: string | null
  driver_id: string | null
}

export interface DashboardStats {
  todayOrders: number
  ordersInProgress: number
  readyForPickup: number
  completedToday: number
  todayRevenue: number
  monthlyRevenue: number
  customersCount: number
  activeStaffCount: number
}

export interface StaffDashboardStats {
  ordersInProgress: number
  readyForPickup: number
  completedToday: number
  myOrdersToday: number
}

export interface OrderCustomerRef {
  full_name: string
  phone: string
}

export interface OrderAssignedStaffRef {
  id: string
  title: string
  profile: { full_name: string } | null
}

export interface OrderDriverRef {
  id: string
  name: string
  phone: string
}

export interface OrderItem {
  id: string
  order_id: string
  catalog_item_id: string | null
  name: string
  unit_price: number
  quantity: number
  line_total: number
  // Snapshot of the catalog item's category at order-creation time (false
  // for orders placed before this column existed) — the Services/Add-ons
  // split on the POS grid and every receipt surface keys off this.
  is_addon: boolean
  created_at: string
}

// `items` is empty for orders created before this feature shipped — every
// display component branches on `items.length` to fall back to the legacy
// single service_label/amount view for those.
export type OrderWithRelations = Order & {
  customer: OrderCustomerRef | null
  assigned_staff: OrderAssignedStaffRef | null
  items: OrderItem[]
}

export type OrderWithDriver = Order & {
  customer: OrderCustomerRef | null
  driver: OrderDriverRef | null
}
