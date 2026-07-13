import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { requireStaffAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import { listOrders } from '@/lib/laundry-management-system/modules/orders/queries'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import OrdersTable from '@/components/laundry-management-system/dashboard/OrdersTable'
import OrderLookupForm from '@/components/laundry-management-system/dashboard/OrderLookupForm'

export const dynamic = 'force-dynamic'

export default async function StaffOrdersPage() {
  const { supabase, staff, business } = await requireStaffAccess()
  const orders = await listOrders(supabase, business.id)

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle="Orders for your business."
        action={
          <Link
            href="/lms/staff/dashboard/orders/new"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <PlusCircle className="h-4 w-4" />
            New Walk-in Order
          </Link>
        }
      />

      <div className="mb-4">
        <OrderLookupForm />
      </div>

      <OrdersTable
        orders={orders}
        basePath="/lms/staff/dashboard/orders"
        currency={business.currency}
        staffId={staff.id}
      />
    </div>
  )
}
