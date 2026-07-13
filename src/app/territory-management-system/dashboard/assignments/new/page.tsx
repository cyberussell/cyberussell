import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { listTerritories } from '@/lib/territory-management-system/modules/territory/queries'
import { getApprovedRecordCounts, getBatchForDate } from '@/lib/territory-management-system/modules/assignment/queries'
import { todayInTimezone } from '@/lib/territory-management-system/modules/assignment/date'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import AssignmentForm from '@/components/territory-management-system/AssignmentForm'

export const dynamic = 'force-dynamic'

export default async function NewAssignmentPage() {
  const { supabase, congregation } = await requireAdmin()
  const [territories, approvedCounts, existingBatch] = await Promise.all([
    listTerritories(supabase, congregation.id),
    getApprovedRecordCounts(supabase, congregation.id),
    getBatchForDate(supabase, congregation.id, todayInTimezone(congregation.timezone)),
  ])

  const activeTerritories = territories
    .filter((t) => t.status === 'active')
    .map((t) => ({ id: t.id, name: t.name, approvedCount: approvedCounts[t.id] ?? 0 }))

  return (
    <div>
      <PageHeader title="New Assignment" subtitle="Select territories and how many partnerships to split them across." />
      <AssignmentForm territories={activeTerritories} hasExistingBatch={!!existingBatch} />
    </div>
  )
}
