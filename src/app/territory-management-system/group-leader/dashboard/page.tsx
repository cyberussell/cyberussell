import { requireGroupLeader } from '@/lib/territory-management-system/modules/auth/queries'
import { getApprovedRecordCounts, getBatchesForGroupLeaderAndDate } from '@/lib/territory-management-system/modules/assignment/queries'
import { listTerritories } from '@/lib/territory-management-system/modules/territory/queries'
import { getBatchStats } from '@/lib/territory-management-system/modules/reports/queries'
import { getAssignmentBatchQrDataUrl, getAssignmentBatchUrl } from '@/lib/territory-management-system/modules/assignment/qr'
import { todayInTimezone } from '@/lib/territory-management-system/modules/assignment/date'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import GroupLeaderTabs, { type BatchView } from '@/components/territory-management-system/GroupLeaderTabs'
import AssignmentForm from '@/components/territory-management-system/AssignmentForm'

export const dynamic = 'force-dynamic'

// "Today's assignment" now means "my own batch(es) today" — a Group Leader can have more than
// one (013_group_leader_assignment_ownership.sql gave each Group Leader their own batch;
// 023_multiple_batches_per_group_leader.sql lifted the one-per-day limit so a Group Leader can
// also generate an overflow batch for extra publishers without disturbing their original one).
export default async function GroupLeaderDashboardPage() {
  const { supabase, congregation, userId } = await requireGroupLeader()
  const today = todayInTimezone(congregation.timezone)
  const batches = await getBatchesForGroupLeaderAndDate(supabase, congregation.id, userId, today)

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
  if (batches.length === 0) {
    return (
      <div>
        <PageHeader title="Today's Assignment" subtitle={`${today} — no assignment generated yet`} />
        <AssignmentForm territories={activeTerritories} hasExistingBatch={false} />
      </div>
    )
  }

  const batchViews = (
    await Promise.all(
      batches.map(async (batch): Promise<BatchView | null> => {
        const stats = await getBatchStats(supabase, congregation.id, batch.id, congregation.timezone)
        if (!stats) return null
        const qrDataUrl = await getAssignmentBatchQrDataUrl(batch.access_token)
        return {
          batchId: batch.id,
          qrDataUrl,
          publicUrl: getAssignmentBatchUrl(batch.access_token),
          requestedPartnershipCount: batch.requested_partnership_count,
          stats,
        }
      })
    )
  ).filter((v): v is BatchView => v !== null)
  if (batchViews.length === 0) return null

  // Union of every territory already covered by one of today's batches, for the overflow form's
  // territory picker (deliberately narrower than activeTerritories above, which lists every
  // active territory in the congregation — the overflow batch can only ever extend a territory
  // already assigned today, never start a brand new one).
  const todaysTerritoryIds = new Set(batchViews.flatMap((v) => v.stats.territories.map((t) => t.id)))
  const todaysTerritories = activeTerritories.filter((t) => todaysTerritoryIds.has(t.id))

  return (
    <GroupLeaderTabs batches={batchViews} activeTerritories={activeTerritories} todaysTerritories={todaysTerritories} />
  )
}
