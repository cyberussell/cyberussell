import { requireStaffAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import { listBranches } from '@/lib/laundry-management-system/modules/tenant/queries'
import { listCustomers } from '@/lib/laundry-management-system/modules/customer/queries'
import { listStaff } from '@/lib/laundry-management-system/modules/staff/queries'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import WalkInOrderForm from '@/components/laundry-management-system/dashboard/WalkInOrderForm'

export const dynamic = 'force-dynamic'

export default async function StaffNewOrderPage() {
  const { supabase, business } = await requireStaffAccess()
  const [branches, customers, staff] = await Promise.all([
    listBranches(supabase, business.id),
    listCustomers(supabase, business.id),
    listStaff(supabase, business.id),
  ])

  return (
    <div>
      <PageHeader title="New Walk-in Order" subtitle="Record a new order for a customer at the counter." />
      <WalkInOrderForm
        branches={branches}
        customers={customers}
        staff={staff}
        enablePickupRequest={hasFeature(business, 'feature_pickup_delivery')}
      />
    </div>
  )
}
