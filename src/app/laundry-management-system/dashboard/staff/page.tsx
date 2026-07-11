import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { listStaff, STAFF_ACCOUNT_LIMIT } from '@/lib/laundry-management-system/modules/staff/queries'
import { listBranches } from '@/lib/laundry-management-system/modules/tenant/queries'
import { hasFeature } from '@/lib/laundry-management-system/modules/billing/entitlements'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import DataTable, { type DataTableColumn } from '@/components/laundry-management-system/dashboard/DataTable'
import Card from '@/components/laundry-management-system/dashboard/Card'
import StaffInviteForm from '@/components/laundry-management-system/StaffInviteForm'

export const dynamic = 'force-dynamic'

export default async function StaffPage() {
  const { supabase, business } = await requireOwnerBusiness()
  const [staff, branches] = await Promise.all([listStaff(supabase, business.id), listBranches(supabase, business.id)])
  const activeCount = staff.filter((m) => m.active).length
  const unlimited = hasFeature(business, 'unlimited_staff')
  const atLimit = !unlimited && activeCount >= STAFF_ACCOUNT_LIMIT

  const columns: DataTableColumn<(typeof staff)[number]>[] = [
    { header: 'Name', cell: (m) => m.profile?.full_name || 'Pending invite' },
    { header: 'Title', cell: (m) => m.title || '—' },
    {
      header: 'Status',
      cell: (m) => (
        <span className={`text-sm ${m.active ? 'text-emerald-600' : 'text-slate-400'}`}>
          {m.active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Staff"
        subtitle={
          unlimited
            ? `${activeCount} staff member${activeCount === 1 ? '' : 's'} — unlimited on the Professional plan.`
            : `${activeCount} of ${STAFF_ACCOUNT_LIMIT} staff accounts used on the Essential plan.`
        }
      />
      <DataTable columns={columns} rows={staff} emptyMessage="No staff yet — invite your first team member below." />
      {atLimit ? (
        <Card className="p-6 text-sm text-slate-500">
          You&apos;ve reached the Essential plan&apos;s limit of {STAFF_ACCOUNT_LIMIT} staff accounts. Deactivate a staff
          member to free up a slot, or upgrade to the Professional plan for unlimited staff.
        </Card>
      ) : (
        <StaffInviteForm branches={branches} />
      )}
    </div>
  )
}
