import { requirePagePermission } from '@/lib/laundry-management-system/modules/auth/queries'
import { getPriorityQueue } from '@/lib/laundry-management-system/modules/orders/queries'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import PriorityQueueTable from '@/components/laundry-management-system/dashboard/PriorityQueueTable'
import UpgradePrompt from '@/components/laundry-management-system/dashboard/UpgradePrompt'

export const dynamic = 'force-dynamic'

export default async function PriorityQueuePage() {
  const { supabase, business } = await requirePagePermission('view_priority_queue')

  return (
    <div>
      <PageHeader title="Priority Queue" subtitle="Active orders, rush jobs first." />
      {hasFeature(business, 'feature_priority_queue') ? (
        <PriorityQueueTable
          orders={await getPriorityQueue(supabase, business.id)}
          currency={business.currency}
          orderBasePath="/laundry-management-system/dashboard/orders"
        />
      ) : (
        <UpgradePrompt feature="feature_priority_queue" label="Priority Queue" />
      )}
    </div>
  )
}
