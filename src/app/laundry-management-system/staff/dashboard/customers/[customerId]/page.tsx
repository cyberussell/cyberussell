import { notFound } from 'next/navigation'
import { requireStaffAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import { getCustomerById } from '@/lib/laundry-management-system/modules/customer/queries'
import { listOrdersForCustomer } from '@/lib/laundry-management-system/modules/orders/queries'
import CustomerDetailView from '@/components/laundry-management-system/dashboard/CustomerDetailView'

export const dynamic = 'force-dynamic'

export default async function StaffCustomerDetailPage({ params }: { params: Promise<{ customerId: string }> }) {
  const { customerId } = await params
  const { supabase, business } = await requireStaffAccess()
  const customer = await getCustomerById(supabase, business.id, customerId)
  if (!customer) notFound()

  const orders = await listOrdersForCustomer(supabase, customer.id)

  return (
    <CustomerDetailView
      customer={customer}
      orders={orders}
      currency={business.currency}
      orderBasePath="/laundry-management-system/staff/dashboard/orders"
    />
  )
}
