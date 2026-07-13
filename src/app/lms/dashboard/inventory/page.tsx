import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { listInventory } from '@/lib/laundry-management-system/modules/inventory/queries'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import InventoryManager from '@/components/laundry-management-system/dashboard/InventoryManager'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  const { supabase, business } = await requireOwnerBusiness()
  const items = await listInventory(supabase, business.id)

  return (
    <div>
      <PageHeader title="Inventory" subtitle="Track supplies across your business." />
      <InventoryManager items={items} />
    </div>
  )
}
