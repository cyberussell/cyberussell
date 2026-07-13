import { requirePagePermission } from '@/lib/laundry-management-system/modules/auth/queries'
import { listActivity } from '@/lib/laundry-management-system/modules/audit/queries'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import ActivityTable from '@/components/laundry-management-system/dashboard/ActivityTable'

export const dynamic = 'force-dynamic'

export default async function ActivityPage() {
  const { supabase, business } = await requirePagePermission('view_activity_log')
  const logs = await listActivity(supabase, business.id)

  return (
    <div>
      <PageHeader title="Activity" subtitle="A history of who did what across your business." />
      <ActivityTable logs={logs} />
    </div>
  )
}
