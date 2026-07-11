import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { listBranches } from '@/lib/laundry-management-system/modules/tenant/queries'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import BusinessProfileForm from '@/components/laundry-management-system/dashboard/BusinessProfileForm'
import BranchDetailsForm from '@/components/laundry-management-system/dashboard/BranchDetailsForm'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const { supabase, business } = await requireOwnerBusiness()
  const branches = await listBranches(supabase, business.id)

  return (
    <div className="max-w-2xl space-y-4">
      <PageHeader title="Settings" subtitle="Manage your business profile and branches." />
      <BusinessProfileForm business={business} />
      {branches.map((branch) => (
        <BranchDetailsForm key={branch.id} branch={branch} />
      ))}
    </div>
  )
}
