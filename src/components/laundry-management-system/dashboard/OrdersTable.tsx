'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Printer } from 'lucide-react'
import type { OrderStatus, OrderWithRelations } from '@/lib/laundry-management-system/modules/orders/types'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import DataTable, { type DataTableColumn } from './DataTable'
import FilterPills from './FilterPills'
import TableSearchInput from './TableSearchInput'
import OrderStatusControl from './OrderStatusControl'

const STATUS_FILTERS: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Received', value: 'received' },
  { label: 'Sorting', value: 'sorting' },
  { label: 'Washing', value: 'washing' },
  { label: 'Drying', value: 'drying' },
  { label: 'Folding', value: 'folding' },
  { label: 'Ready for Pickup', value: 'ready_for_pickup' },
  { label: 'Out for Delivery', value: 'out_for_delivery' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]

export default function OrdersTable({
  orders,
  basePath,
  currency,
  staffId,
}: {
  orders: OrderWithRelations[]
  basePath: string
  currency: string
  // When set, shows a "Mine"/"All Staff" toggle (defaults to "Mine") — the
  // staff order page's primary view is their own assigned work.
  staffId?: string
}) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<OrderStatus | 'all'>('all')
  const [mine, setMine] = useState(true)

  const filtered = useMemo(() => {
    let result = orders
    if (staffId && mine) result = result.filter((o) => o.assigned_staff_id === staffId)
    if (status !== 'all') result = result.filter((o) => o.status === status)
    const q = query.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (o) =>
          o.order_number.toLowerCase().includes(q) ||
          o.service_label.toLowerCase().includes(q) ||
          (o.customer?.full_name ?? o.walk_in_name ?? '').toLowerCase().includes(q)
      )
    }
    return result
  }, [orders, staffId, mine, status, query])

  const columns: DataTableColumn<OrderWithRelations>[] = [
    {
      header: 'Order #',
      sortValue: (o) => o.order_number,
      cell: (o) => (
        <Link href={`${basePath}/${o.id}`} className="font-medium text-[#2563EB] hover:underline">
          {o.order_number}
        </Link>
      ),
    },
    {
      header: 'Created',
      sortValue: (o) => o.created_at,
      cell: (o) => <span className="text-slate-500">{new Date(o.created_at).toLocaleString('en-US')}</span>,
    },
    { header: 'Service', sortValue: (o) => o.service_label, cell: (o) => o.service_label },
    {
      header: 'Customer',
      sortValue: (o) => (o.customer?.full_name ?? o.walk_in_name ?? 'Walk-in customer').toLowerCase(),
      cell: (o) => o.customer?.full_name || o.walk_in_name || 'Walk-in customer',
    },
    {
      header: 'Assigned',
      cell: (o) =>
        o.assigned_staff_id ? (
          o.assigned_staff?.profile?.full_name || 'Staff assigned'
        ) : (
          <span className="text-slate-400">Unassigned</span>
        ),
    },
    { header: 'Amount', sortValue: (o) => o.amount, cell: (o) => formatCurrency(o.amount, currency) },
    { header: 'Status', cell: (o) => <OrderStatusControl orderId={o.id} status={o.status} /> },
    {
      header: 'Receipt',
      cell: (o) => (
        <Link
          href={`/laundry-management-system/orders/${o.id}/receipt`}
          title="Print receipt"
          aria-label={`Print receipt for order ${o.order_number}`}
          className="inline-flex items-center gap-1 text-slate-400 hover:text-[#2563EB] transition"
        >
          <Printer className="h-4 w-4" />
        </Link>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-4">
        <TableSearchInput value={query} onChange={setQuery} placeholder="Search by order #, customer, or service…" />
      </div>

      <div className="mb-3">
        <FilterPills options={STATUS_FILTERS} active={status} onChange={setStatus} />
      </div>

      {staffId && (
        <div className="mb-4">
          <FilterPills
            variant="dark"
            options={[
              { label: 'All Staff', value: false },
              { label: 'Mine', value: true },
            ]}
            active={mine}
            onChange={setMine}
          />
        </div>
      )}

      <DataTable columns={columns} rows={filtered} emptyMessage="No orders match this filter." />
    </div>
  )
}
