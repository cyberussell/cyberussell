'use client'

import type { StaffMember } from '@/lib/laundry-management-system/modules/staff/types'
import DataTable, { type DataTableColumn } from './DataTable'

type StaffRow = StaffMember & { profile: { full_name: string } | null }

export default function StaffTable({ staff }: { staff: StaffRow[] }) {
  const columns: DataTableColumn<StaffRow>[] = [
    { header: 'Name', cell: (m) => m.profile?.full_name || m.email },
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

  return <DataTable columns={columns} rows={staff} emptyMessage="No staff yet — invite your first team member below." />
}
