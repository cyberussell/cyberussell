import { redirect, notFound } from 'next/navigation'
import { requirePagePermission } from '@/lib/laundry-management-system/modules/auth/queries'
import { getOrderByNumber } from '@/lib/laundry-management-system/modules/orders/queries'

export const dynamic = 'force-dynamic'

// Shared, role-agnostic entry point for both the QR code printed on receipts/order
// pages and a manual "look up order #" search — resolves the order by its
// human-readable order_number, then redirects to the caller's own role-scoped
// detail page (which re-applies its own access checks, e.g. staff can't reach an
// order that isn't assigned to them just because they scanned its code).
export default async function OrderLookupPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params
  const session = await requirePagePermission('view_dashboard')
  const order = await getOrderByNumber(session.supabase, session.business.id, decodeURIComponent(orderNumber))
  if (!order) notFound()

  const basePath =
    session.role === 'owner'
      ? '/laundry-management-system/dashboard/orders'
      : '/laundry-management-system/staff/dashboard/orders'
  redirect(`${basePath}/${order.id}`)
}
