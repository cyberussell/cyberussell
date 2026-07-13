import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { getRecordById, listVisits } from '@/lib/territory-management-system/modules/records/queries'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import ApprovalBadge from '@/components/territory-management-system/ApprovalBadge'
import RecordApprovalActions from '@/components/territory-management-system/RecordApprovalActions'
import RecordEditForm from '@/components/territory-management-system/RecordEditForm'
import VisitLogForm from '@/components/territory-management-system/VisitLogForm'
import VisitHistoryList from '@/components/territory-management-system/VisitHistoryList'
import VisitResultBadge from '@/components/territory-management-system/VisitResultBadge'

export const dynamic = 'force-dynamic'

export default async function RecordDetailPage({ params }: { params: Promise<{ recordId: string }> }) {
  const { recordId } = await params
  const { supabase, congregation } = await requireAdmin()
  const record = await getRecordById(supabase, congregation.id, recordId)
  if (!record) notFound()
  const visits = await listVisits(supabase, recordId)
  const latestVisit = visits[0] ?? null

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${record.address}${record.unit ? `, ${record.unit}` : ''}`}
        subtitle={`${record.territory?.name ?? '—'} / Section ${record.section?.label ?? '—'} / Block ${record.block?.label ?? '—'}`}
        action={
          <div className="flex items-center gap-3">
            {latestVisit && <VisitResultBadge result={latestVisit.result} />}
            <ApprovalBadge status={record.status} />
            {record.status === 'pending' && <RecordApprovalActions recordId={record.id} />}
          </div>
        }
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecordEditForm record={record} />
        <VisitLogForm recordId={record.id} />
      </div>
      <div>
        <h2 className="mb-4 font-semibold text-[#0B1B33]">Visit History</h2>
        <VisitHistoryList visits={visits} />
      </div>
    </div>
  )
}
