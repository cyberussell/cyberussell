import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { listStaff } from '@/lib/laundry-management-system/modules/staff/queries'
import { listBranches } from '@/lib/laundry-management-system/modules/tenant/queries'
import { getLimit } from '@/lib/laundry-management-system/modules/billing/entitlements'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import StaffManager from '@/components/laundry-management-system/dashboard/StaffManager'

export const dynamic = 'force-dynamic'

export default async function StaffPage() {
  const { supabase, business } = await requireOwnerBusiness()
  const [staff, branches] = await Promise.all([listStaff(supabase, business.id), listBranches(supabase, business.id)])
  const activeCount = staff.filter((m) => m.active).length
  const staffLimit = getLimit(business, 'staffAccounts')
  const unlimited = staffLimit === null
  const atLimit = !unlimited && activeCount >= staffLimit

  return (
    <div className="space-y-4">
      <PageHeader
        title="Staff"
        subtitle={
          unlimited
            ? `${activeCount} staff member${activeCount === 1 ? '' : 's'} — unlimited on the Professional plan.`
            : `${activeCount} of ${staffLimit} staff accounts used on the Essential plan.`
        }
      />
      <StaffManager
        staff={staff}
        branches={branches}
        atLimit={atLimit}
        limitMessage={`You've reached the Essential plan's limit of ${staffLimit} staff accounts. Deactivate a staff member to free up a slot, or upgrade to the Professional plan for unlimited staff.`}
      />
    </div>
  )
}
