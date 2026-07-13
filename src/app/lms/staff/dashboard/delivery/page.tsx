import { requirePagePermission } from '@/lib/laundry-management-system/modules/auth/queries'
import { getDeliveryQueue } from '@/lib/laundry-management-system/modules/orders/queries'
import { listActiveDrivers } from '@/lib/laundry-management-system/modules/drivers/queries'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import DeliveryQueueTable from '@/components/laundry-management-system/dashboard/DeliveryQueueTable'
import UpgradePrompt from '@/components/laundry-management-system/dashboard/UpgradePrompt'

export const dynamic = 'force-dynamic'

export default async function StaffDeliveryPage() {
  const { supabase, business } = await requirePagePermission('manage_delivery')

  return (
    <div>
      <PageHeader title="Delivery Management" subtitle="Assign drivers and track deliveries." />
      {hasFeature(business, 'feature_pickup_delivery') ? (
        <DeliveryQueueTable
          orders={await getDeliveryQueue(supabase, business.id)}
          drivers={await listActiveDrivers(supabase, business.id)}
          currency={business.currency}
          orderBasePath="/lms/staff/dashboard/orders"
        />
      ) : (
        <UpgradePrompt feature="feature_pickup_delivery" label="Delivery Management" />
      )}
    </div>
  )
}
