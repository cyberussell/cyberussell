import { requireGroupLeader } from '@/lib/territory-management-system/modules/auth/queries'
import { getApprovedRecordCounts, getBatchForGroupLeaderAndDate } from '@/lib/territory-management-system/modules/assignment/queries'
import { listTerritories } from '@/lib/territory-management-system/modules/territory/queries'
import { getBatchStats } from '@/lib/territory-management-system/modules/reports/queries'
import { getAssignmentBatchQrDataUrl, getAssignmentBatchUrl } from '@/lib/territory-management-system/modules/assignment/qr'
import { todayInTimezone } from '@/lib/territory-management-system/modules/assignment/date'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import GroupLeaderTabs from '@/components/territory-management-system/GroupLeaderTabs'
import AssignmentForm from '@/components/territory-management-system/AssignmentForm'

export const dynamic = 'force-dynamic'

// "Today's assignment" now means "my own batch today" — multiple Group Leaders can each run
// their own concurrent batch the same day (013_group_leader_assignment_ownership.sql).
export default async function GroupLeaderDashboardPage() {
  const { supabase, congregation, userId } = await requireGroupLeader()
  const today = todayInTimezone(congregation.timezone)
  const batch = await getBatchForGroupLeaderAndDate(supabase, congregation.id, userId, today)

  const [territories, approvedCounts] = await Promise.all([
    listTerritories(supabase, congregation.id),
    getApprovedRecordCounts(supabase, congregation.id),
  ])
  const activeTerritories = territories
    .filter((t) => t.status === 'active')
    .map((t) => ({ id: t.id, name: t.name, barangayName: t.description, approvedCount: approvedCounts[t.id] ?? 0 }))

  // Campaign-day scenario: no assignment yet today — lead with the generation form itself
  // rather than a passive "nothing here" message, since this is the Group Leader's very first
  // decision most days.
  if (!batch) {
    return (
      <div>
        <PageHeader title="Today's Assignment" subtitle={`${today} — no assignment generated yet`} />
        <AssignmentForm territories={activeTerritories} hasExistingBatch={false} />
      </div>
    )
  }

  const stats = await getBatchStats(supabase, congregation.id, batch.id, congregation.timezone)
  if (!stats) return null
  const qrDataUrl = await getAssignmentBatchQrDataUrl(batch.access_token)
  const publicUrl = getAssignmentBatchUrl(batch.access_token)

  return (
    <GroupLeaderTabs
      batchId={batch.id}
      qrDataUrl={qrDataUrl}
      publicUrl={publicUrl}
      activeTerritories={activeTerritories}
      requestedPartnershipCount={batch.requested_partnership_count}
      stats={stats}
    />
  )
}
