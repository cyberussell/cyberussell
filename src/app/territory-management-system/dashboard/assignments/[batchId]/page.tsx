import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { getBatchSummary } from '@/lib/territory-management-system/modules/assignment/queries'
import { getAssignmentBatchQrDataUrl } from '@/lib/territory-management-system/modules/assignment/qr'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import AssignmentSummary from '@/components/territory-management-system/AssignmentSummary'

export const dynamic = 'force-dynamic'

export default async function AssignmentDetailPage({ params }: { params: Promise<{ batchId: string }> }) {
  const { batchId } = await params
  const { supabase, congregation } = await requireAdmin()
  const batch = await getBatchSummary(supabase, congregation.id, batchId)
  if (!batch) notFound()
  const qrDataUrl = await getAssignmentBatchQrDataUrl(batch.access_token)

  return (
    <div>
      <PageHeader title={`Assignment — ${batch.assignment_date}`} />
      <AssignmentSummary batch={batch} qrDataUrl={qrDataUrl} />
    </div>
  )
}
