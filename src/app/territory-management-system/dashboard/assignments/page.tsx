import Link from 'next/link'
import { Plus } from 'lucide-react'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { listBatches } from '@/lib/territory-management-system/modules/assignment/queries'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import DataTable from '@/components/territory-management-system/dashboard/DataTable'

export default async function AssignmentsPage() {
  const { supabase, congregation } = await requireAdmin()
  const batches = await listBatches(supabase, congregation.id)

  return (
    <div>
      <PageHeader
        title="Assignments"
        subtitle="Generate and review territory assignment batches."
        action={
          <Link
            href="/territory-management-system/dashboard/assignments/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            New Assignment
          </Link>
        }
      />
      <DataTable
        columns={[
          {
            header: 'Date',
            cell: (b) => (
              <Link href={`/territory-management-system/dashboard/assignments/${b.id}`} className="font-medium hover:text-[#2563EB]">
                {b.assignment_date}
              </Link>
            ),
            sortValue: (b) => b.assignment_date,
          },
          { header: 'Partnerships Requested', cell: (b) => b.requested_partnership_count, sortValue: (b) => b.requested_partnership_count },
          {
            header: 'Created',
            cell: (b) => new Date(b.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
          },
        ]}
        rows={batches}
        emptyMessage="No assignments generated yet."
      />
    </div>
  )
}
