import { PlusCircle } from 'lucide-react'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { listOrders } from '@/lib/laundry-management-system/modules/orders/queries'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import OrdersTable from '@/components/laundry-management-system/dashboard/OrdersTable'
import OrderLookupForm from '@/components/laundry-management-system/dashboard/OrderLookupForm'
import { ButtonLink } from '@/components/laundry-management-system/dashboard/Button'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const { supabase, business } = await requireOwnerBusiness()
  const orders = await listOrders(supabase, business.id)

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle="All orders for your business."
        action={
          <ButtonLink href="/lms/dashboard/orders/new" size="sm">
            <PlusCircle className="h-4 w-4" />
            New Walk-in Order
          </ButtonLink>
        }
      />

      <div className="mb-4">
        <OrderLookupForm />
      </div>

      <OrdersTable orders={orders} basePath="/lms/dashboard/orders" currency={business.currency} />
    </div>
  )
}
