import { requireCustomerAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import { listBranches } from '@/lib/laundry-management-system/modules/tenant/queries'
import BusinessSwitcher from '@/components/laundry-management-system/customer/BusinessSwitcher'
import PickupScheduleCard from '@/components/laundry-management-system/customer/PickupScheduleCard'
import ProfileForm from '@/components/laundry-management-system/customer/ProfileForm'

export const dynamic = 'force-dynamic'

const BASE_PATH = '/laundry-management-system/customer/dashboard'

export default async function CustomerProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string }>
}) {
  const { customer: customerParam } = await searchParams
  const { supabase, customers } = await requireCustomerAccess()
  const active = customers.find((c) => c.id === customerParam) ?? customers[0]
  const branches = await listBranches(supabase, active.business_id)

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-[#0B1B33]">Profile</h1>
      <p className="mb-4 text-sm text-slate-500">Manage your details at {active.business.name}.</p>

      <BusinessSwitcher customers={customers} activeId={active.id} basePath={`${BASE_PATH}/profile`} />

      <ProfileForm customer={active} />

      <div className="mt-5 space-y-4">
        {branches.map((branch) => (
          <PickupScheduleCard key={branch.id} branch={branch} />
        ))}
      </div>
    </div>
  )
}
