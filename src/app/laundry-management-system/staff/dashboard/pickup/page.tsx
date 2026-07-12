import { requirePagePermission } from '@/lib/laundry-management-system/modules/auth/queries'
import { getPickupQueue } from '@/lib/laundry-management-system/modules/orders/queries'
import { listActiveDrivers } from '@/lib/laundry-management-system/modules/drivers/queries'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import PickupQueueTable from '@/components/laundry-management-system/dashboard/PickupQueueTable'
import UpgradePrompt from '@/components/laundry-management-system/dashboard/UpgradePrompt'

export const dynamic = 'force-dynamic'

export default async function StaffPickupPage() {
  const { supabase, business } = await requirePagePermission('manage_pickup')

  return (
    <div>
      <PageHeader title="Pickup Management" subtitle="Orders waiting to be picked up from the customer." />
      {hasFeature(business, 'feature_pickup_delivery') ? (
        <PickupQueueTable
          orders={await getPickupQueue(supabase, business.id)}
          drivers={await listActiveDrivers(supabase, business.id)}
          orderBasePath="/laundry-management-system/staff/dashboard/orders"
        />
      ) : (
        <UpgradePrompt feature="feature_pickup_delivery" label="Pickup Management" />
      )}
    </div>
  )
}
