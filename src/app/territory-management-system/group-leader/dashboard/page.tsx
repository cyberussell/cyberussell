import { requireGroupLeader } from '@/lib/territory-management-system/modules/auth/queries'
import { getApprovedRecordCounts, getBatchForDate } from '@/lib/territory-management-system/modules/assignment/queries'
import { listTerritories } from '@/lib/territory-management-system/modules/territory/queries'
import { getBatchStats } from '@/lib/territory-management-system/modules/reports/queries'
import { getAssignmentBatchQrDataUrl, getAssignmentBatchUrl } from '@/lib/territory-management-system/modules/assignment/qr'
import { todayInTimezone } from '@/lib/territory-management-system/modules/assignment/date'
import { deleteGroupLeaderAssignmentAction } from '@/app/territory-management-system/actions/group-leader'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import Card from '@/components/territory-management-system/dashboard/Card'
import ConfirmDeleteButton from '@/components/territory-management-system/dashboard/ConfirmDeleteButton'
import GroupLeaderTabs from '@/components/territory-management-system/GroupLeaderTabs'
import AssignmentForm from '@/components/territory-management-system/AssignmentForm'

export const dynamic = 'force-dynamic'

export default async function GroupLeaderDashboardPage() {
  const { supabase, congregation } = await requireGroupLeader()
  const today = todayInTimezone(congregation.timezone)
  const batch = await getBatchForDate(supabase, congregation.id, today)

  const [territories, approvedCounts] = await Promise.all([
    listTerritories(supabase, congregation.id),
    getApprovedRecordCounts(supabase, congregation.id),
  ])
  const activeTerritories = territories
    .filter((t) => t.status === 'active')
    .map((t) => ({ id: t.id, name: t.name, approvedCount: approvedCounts[t.id] ?? 0 }))

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
    <div className="space-y-8">
      <PageHeader
        title="Today's Assignment"
        subtitle={today}
        action={
          <ConfirmDeleteButton
            action={deleteGroupLeaderAssignmentAction.bind(null, batch.id)}
            confirmMessage="Delete today's assignment? Publishers who scanned the QR code will lose access."
            label="Delete Assignment"
          />
        }
      />

      <Card className="flex flex-col items-center gap-3 p-6 text-center">
        <h2 className="font-semibold text-[#0B1B33]">Assignment QR Code</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrDataUrl} alt="Assignment QR code" className="h-40 w-40" />
        <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="break-all text-xs text-[#2563EB] hover:underline">
          {publicUrl}
        </a>
        <p className="text-xs text-slate-400">Valid for today only — a new one is needed tomorrow.</p>
      </Card>

      <div>
        <h2 className="mb-4 font-semibold text-[#0B1B33]">Regenerate Assignment</h2>
        <AssignmentForm territories={activeTerritories} hasExistingBatch={true} />
      </div>

      <GroupLeaderTabs stats={stats} />
    </div>
  )
}
