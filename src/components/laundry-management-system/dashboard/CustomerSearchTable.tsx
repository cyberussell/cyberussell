'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Customer } from '@/lib/laundry-management-system/modules/customer/types'
import DataTable, { type DataTableColumn } from './DataTable'
import TableSearchInput from './TableSearchInput'
import Avatar from './Avatar'

export default function CustomerSearchTable({ customers, basePath }: { customers: Customer[]; basePath: string }) {
  const [query, setQuery] = useState('')

  const columns: DataTableColumn<Customer>[] = [
    {
      header: 'Name',
      sortValue: (c) => c.full_name.toLowerCase(),
      cell: (c) => (
        <Link href={`${basePath}/${c.id}`} className="flex items-center gap-3 font-medium text-[#0D9488] hover:underline">
          <Avatar name={c.full_name} size="sm" />
          {c.full_name}
        </Link>
      ),
    },
    { header: 'Phone', cell: (c) => c.phone || '—' },
    { header: 'Email', cell: (c) => c.email || '—' },
    {
      header: 'Added',
      sortValue: (c) => c.created_at,
      cell: (c) => <span className="text-slate-500">{new Date(c.created_at).toLocaleDateString()}</span>,
    },
  ]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return customers
    return customers.filter(
      (c) => c.full_name.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    )
  }, [customers, query])

  return (
    <div>
      <div className="mb-4">
        <TableSearchInput value={query} onChange={setQuery} placeholder="Search by name, phone, or email…" />
      </div>
      <DataTable
        columns={columns}
        rows={filtered}
        emptyMessage={query ? 'No customers match your search.' : 'No customers yet.'}
      />
    </div>
  )
}
