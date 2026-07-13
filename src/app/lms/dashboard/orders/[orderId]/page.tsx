import { notFound } from 'next/navigation'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { getOrderById } from '@/lib/laundry-management-system/modules/orders/queries'
import { listStaff } from '@/lib/laundry-management-system/modules/staff/queries'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'
import OrderDetailView from '@/components/laundry-management-system/dashboard/OrderDetailView'

export const dynamic = 'force-dynamic'

export default async function OwnerOrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const { supabase, business } = await requireOwnerBusiness()
  const [order, staff] = await Promise.all([
    getOrderById(supabase, business.id, orderId),
    listStaff(supabase, business.id),
  ])
  if (!order) notFound()

  return (
    <OrderDetailView
      order={order}
      currency={business.currency}
      staff={staff}
      canReassignStaff
      receiptHref={`/lms/orders/${order.id}/receipt`}
      showPriorityToggle={hasFeature(business, 'feature_priority_queue')}
    />
  )
}
