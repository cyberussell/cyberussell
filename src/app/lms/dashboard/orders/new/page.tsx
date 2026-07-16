import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { listBranches } from '@/lib/laundry-management-system/modules/tenant/queries'
import { listCustomers } from '@/lib/laundry-management-system/modules/customer/queries'
import { listStaff } from '@/lib/laundry-management-system/modules/staff/queries'
import { listCatalogItems } from '@/lib/laundry-management-system/modules/catalog/queries'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import WalkInOrderForm from '@/components/laundry-management-system/dashboard/WalkInOrderForm'

export const dynamic = 'force-dynamic'

export default async function NewOrderPage() {
  const { supabase, business } = await requireOwnerBusiness()
  const [branches, customers, staff, catalogItems] = await Promise.all([
    listBranches(supabase, business.id),
    listCustomers(supabase, business.id),
    listStaff(supabase, business.id),
    listCatalogItems(supabase, business.id, { activeOnly: true }),
  ])

  return (
    <div>
      <PageHeader title="New Walk-in Order" subtitle="Record a new order for a customer at the counter." />
      <WalkInOrderForm
        branches={branches}
        customers={customers}
        staff={staff}
        catalogItems={catalogItems}
        enablePickupRequest={hasFeature(business, 'feature_pickup_delivery')}
        currency={business.currency}
      />
    </div>
  )
}
