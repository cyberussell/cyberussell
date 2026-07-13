'use client'

import { useMemo, useState, useTransition } from 'react'
import Link from 'next/link'
import DataTable from '@/components/territory-management-system/dashboard/DataTable'
import FilterPills from '@/components/territory-management-system/dashboard/FilterPills'
import TableSearchInput from '@/components/territory-management-system/dashboard/TableSearchInput'
import ApprovalBadge from '@/components/territory-management-system/ApprovalBadge'
import ConfirmDeleteButton from '@/components/territory-management-system/dashboard/ConfirmDeleteButton'
import { approveRecordAction, deleteRecordAction, rejectRecordAction } from '@/app/territory-management-system/actions/records'
import type { TerritoryRecordWithLocation } from '@/lib/territory-management-system/modules/records/types'

const STATUS_OPTIONS: { label: string; value: 'all' | 'pending' | 'approved' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
]

// The cross-territory import has no Address column (Plus Code is the location identifier
// there), so address can be blank — fall back to Plus Code, then a placeholder, everywhere a
// record needs a single-line label.
function recordLabel(r: TerritoryRecordWithLocation): string {
  return r.address || r.plus_code || 'Unlabeled record'
}

export default function RecordsTable({ records }: { records: TerritoryRecordWithLocation[] }) {
  const [status, setStatus] = useState<'all' | 'pending' | 'approved'>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (status !== 'all' && r.status !== status) return false
      if (!search.trim()) return true
      const q = search.trim().toLowerCase()
      return (
        r.address.toLowerCase().includes(q) ||
        (r.plus_code?.toLowerCase().includes(q) ?? false) ||
        r.resident_name.toLowerCase().includes(q) ||
        (r.territory?.name.toLowerCase().includes(q) ?? false)
      )
    })
  }, [records, status, search])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterPills options={STATUS_OPTIONS} active={status} onChange={setStatus} />
        <TableSearchInput value={search} onChange={setSearch} placeholder="Search address, resident, territory…" />
      </div>
      <DataTable
        columns={[
          {
            header: 'Address',
            cell: (r) => (
              <Link href={`/territory-management-system/dashboard/records/${r.id}`} className="font-medium hover:text-[#2563EB]">
                {recordLabel(r)}
                {r.unit ? `, ${r.unit}` : ''}
              </Link>
            ),
            sortValue: (r) => recordLabel(r),
          },
          {
            header: 'Location',
            cell: (r) => `${r.territory?.name ?? '—'} / Sec ${r.section?.label ?? '—'} / Blk ${r.block?.label ?? '—'}`,
          },
          { header: 'Resident', cell: (r) => r.resident_name || '—', sortValue: (r) => r.resident_name },
          { header: 'Household', cell: (r) => r.household_members ?? '—' },
          { header: 'Status', cell: (r) => <ApprovalBadge status={r.status} /> },
          { header: 'DNC', cell: (r) => (r.do_not_call ? <span className="font-medium text-red-500">Yes</span> : '—') },
          { header: 'Actions', cell: (r) => <RecordActions record={r} /> },
        ]}
        rows={filtered}
        emptyMessage="No contact records match your filters."
      />
    </div>
  )
}

function RecordActions({ record }: { record: TerritoryRecordWithLocation }) {
  const [pending, startTransition] = useTransition()

  return (
    <div className="flex items-center gap-3">
      {record.status === 'pending' && (
        <>
          <button
            onClick={() => startTransition(() => approveRecordAction(record.id))}
            disabled={pending}
            className="text-sm font-medium text-[#2563EB] hover:underline disabled:opacity-50"
          >
            Approve
          </button>
          <button
            onClick={() => startTransition(() => rejectRecordAction(record.id))}
            disabled={pending}
            className="text-sm font-medium text-slate-500 hover:underline disabled:opacity-50"
          >
            Reject
          </button>
        </>
      )}
      <ConfirmDeleteButton
        action={() => deleteRecordAction(record.id)}
        confirmMessage={`Delete the contact record at ${recordLabel(record)}? This also deletes its visit history.`}
        ariaLabel={`Delete contact record at ${recordLabel(record)}`}
        className="text-slate-400 hover:text-red-500"
      />
    </div>
  )
}
