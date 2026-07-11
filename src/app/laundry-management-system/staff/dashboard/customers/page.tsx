import { requireStaffAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import { listCustomers } from '@/lib/laundry-management-system/modules/customer/queries'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import CustomerSearchTable from '@/components/laundry-management-system/dashboard/CustomerSearchTable'

export const dynamic = 'force-dynamic'

export default async function StaffCustomersPage() {
  const { supabase, business } = await requireStaffAccess()
  const customers = await listCustomers(supabase, business.id)

  return (
    <div>
      <PageHeader title="Customers" subtitle="Search and view customers for your business." />
      <CustomerSearchTable customers={customers} basePath="/laundry-management-system/staff/dashboard/customers" />
    </div>
  )
}
