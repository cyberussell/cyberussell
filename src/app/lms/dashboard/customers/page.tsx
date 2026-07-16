import { UserPlus } from 'lucide-react'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { listCustomers } from '@/lib/laundry-management-system/modules/customer/queries'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import CustomerSearchTable from '@/components/laundry-management-system/dashboard/CustomerSearchTable'
import { ButtonLink } from '@/components/laundry-management-system/dashboard/Button'

export const dynamic = 'force-dynamic'

export default async function CustomersPage() {
  const { supabase, business } = await requireOwnerBusiness()
  const customers = await listCustomers(supabase, business.id)

  return (
    <div>
      <PageHeader
        title="Customers"
        subtitle="Everyone who's ordered from your business."
        action={
          <ButtonLink href="/lms/dashboard/customers/new" size="sm">
            <UserPlus className="h-4 w-4" />
            Add Customer
          </ButtonLink>
        }
      />
      <CustomerSearchTable customers={customers} basePath="/lms/dashboard/customers" />
    </div>
  )
}
