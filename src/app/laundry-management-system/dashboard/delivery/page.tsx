import { requirePagePermission } from '@/lib/laundry-management-system/modules/auth/queries'
import { getDeliveryQueue } from '@/lib/laundry-management-system/modules/orders/queries'
import { listActiveDrivers, listDrivers } from '@/lib/laundry-management-system/modules/drivers/queries'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import DeliveryQueueTable from '@/components/laundry-management-system/dashboard/DeliveryQueueTable'
import DriverManager from '@/components/laundry-management-system/dashboard/DriverManager'
import UpgradePrompt from '@/components/laundry-management-system/dashboard/UpgradePrompt'

export const dynamic = 'force-dynamic'

export default async function DeliveryPage() {
  const { supabase, business, role } = await requirePagePermission('manage_delivery')

  if (!hasFeature(business, 'feature_pickup_delivery')) {
    return (
      <div>
        <PageHeader title="Delivery Management" subtitle="Assign drivers and track deliveries." />
        <UpgradePrompt feature="feature_pickup_delivery" label="Delivery Management" />
      </div>
    )
  }

  const [orders, activeDrivers, allDrivers] = await Promise.all([
    getDeliveryQueue(supabase, business.id),
    listActiveDrivers(supabase, business.id),
    listDrivers(supabase, business.id),
  ])

  return (
    <div className="space-y-6">
      <div>
        <PageHeader title="Delivery Management" subtitle="Assign drivers and track deliveries." />
        <DeliveryQueueTable
          orders={orders}
          drivers={activeDrivers}
          currency={business.currency}
          orderBasePath="/laundry-management-system/dashboard/orders"
        />
      </div>
      {role === 'owner' && (
        <div>
          <h2 className="mb-3 text-lg font-bold text-[#0B1B33]">Drivers</h2>
          <DriverManager drivers={allDrivers} />
        </div>
      )}
    </div>
  )
}
