import { notFound } from 'next/navigation'
import { requireStaffAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import { getOrderById } from '@/lib/laundry-management-system/modules/orders/queries'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'
import OrderDetailView from '@/components/laundry-management-system/dashboard/OrderDetailView'

export const dynamic = 'force-dynamic'

export default async function StaffOrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const { supabase, business, staff } = await requireStaffAccess()
  const order = await getOrderById(supabase, business.id, orderId)

  // Staff only sees assigned orders — not just in the list, in direct detail
  // links too, so this can't be bypassed by guessing/pasting another order's URL.
  if (!order || order.assigned_staff_id !== staff.id) notFound()

  return (
    <OrderDetailView
      order={order}
      currency={business.currency}
      staff={[]}
      canReassignStaff={false}
      receiptHref={`/laundry-management-system/orders/${order.id}/receipt`}
      showPriorityToggle={hasFeature(business, 'priority_queue')}
    />
  )
}
