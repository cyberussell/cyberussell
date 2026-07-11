'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import type { Customer } from '@/lib/laundry-management-system/modules/customer/types'
import DataTable, { type DataTableColumn } from './DataTable'

export default function CustomerSearchTable({ customers, basePath }: { customers: Customer[]; basePath: string }) {
  const [query, setQuery] = useState('')

  const columns: DataTableColumn<Customer>[] = [
    {
      header: 'Name',
      cell: (c) => (
        <Link href={`${basePath}/${c.id}`} className="font-medium text-[#2563EB] hover:underline">
          {c.full_name}
        </Link>
      ),
    },
    { header: 'Phone', cell: (c) => c.phone || '—' },
    { header: 'Email', cell: (c) => c.email || '—' },
    { header: 'Added', cell: (c) => <span className="text-slate-500">{new Date(c.created_at).toLocaleDateString()}</span> },
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
      <div className="relative mb-4 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, phone, or email…"
          className="w-full rounded-lg border border-blue-100 bg-white py-2 pl-9 pr-3 text-sm text-[#0B1B33] placeholder:text-slate-400 focus:border-[#38BDF8] focus:outline-none"
        />
      </div>
      <DataTable
        columns={columns}
        rows={filtered}
        emptyMessage={query ? 'No customers match your search.' : 'No customers yet.'}
      />
    </div>
  )
}
