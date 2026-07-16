'use client'

import Link from 'next/link'
import type { OrderWithRelations } from '@/lib/laundry-management-system/modules/orders/types'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import DataTable, { type DataTableColumn } from './DataTable'
import StatusBadge from './StatusBadge'
import PriorityToggle from './PriorityToggle'

export default function PriorityQueueTable({
  orders,
  currency,
  orderBasePath,
}: {
  orders: OrderWithRelations[]
  currency: string
  orderBasePath: string
}) {
  const columns: DataTableColumn<OrderWithRelations>[] = [
    {
      header: 'Order #',
      cell: (o) => (
        <Link href={`${orderBasePath}/${o.id}`} className="font-medium text-[#0D9488] hover:underline">
          {o.order_number}
        </Link>
      ),
    },
    { header: 'Customer', cell: (o) => o.customer?.full_name || o.walk_in_name || 'Walk-in customer' },
    { header: 'Service', cell: (o) => o.service_label },
    { header: 'Amount', cell: (o) => formatCurrency(o.amount, currency) },
    { header: 'Status', cell: (o) => <StatusBadge status={o.status} /> },
    { header: 'Priority', cell: (o) => <PriorityToggle orderId={o.id} isPriority={o.is_priority} /> },
  ]

  return (
    <DataTable
      columns={columns}
      rows={orders}
      emptyMessage="No active orders — the priority queue only shows orders still in progress."
    />
  )
}
