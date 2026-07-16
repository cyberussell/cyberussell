import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { listCatalogItems } from '@/lib/laundry-management-system/modules/catalog/queries'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import ServiceCatalogManager from '@/components/laundry-management-system/dashboard/ServiceCatalogManager'

export const dynamic = 'force-dynamic'

export default async function CatalogPage() {
  const { supabase, business } = await requireOwnerBusiness()
  const items = await listCatalogItems(supabase, business.id)

  return (
    <div>
      <PageHeader title="Service Catalog" subtitle="Prices staff use when taking walk-in orders." />
      <ServiceCatalogManager items={items} currency={business.currency} />
    </div>
  )
}
