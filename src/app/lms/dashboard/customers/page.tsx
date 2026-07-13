import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { listCustomers } from '@/lib/laundry-management-system/modules/customer/queries'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import CustomerSearchTable from '@/components/laundry-management-system/dashboard/CustomerSearchTable'

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
          <Link
            href="/lms/dashboard/customers/new"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <UserPlus className="h-4 w-4" />
            Add Customer
          </Link>
        }
      />
      <CustomerSearchTable customers={customers} basePath="/lms/dashboard/customers" />
    </div>
  )
}
