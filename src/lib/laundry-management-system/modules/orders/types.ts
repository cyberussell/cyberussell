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

export type OrderWithRelations = Order & {
  customer: OrderCustomerRef | null
  assigned_staff: OrderAssignedStaffRef | null
}

export type OrderWithDriver = Order & {
  customer: OrderCustomerRef | null
  driver: OrderDriverRef | null
}
