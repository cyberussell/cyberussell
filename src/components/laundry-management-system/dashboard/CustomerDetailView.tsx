'use client'

import Link from 'next/link'
import type { Customer } from '@/lib/laundry-management-system/modules/customer/types'
import type { Order } from '@/lib/laundry-management-system/modules/orders/types'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import PageHeader from './PageHeader'
import Card from './Card'
import DataTable, { type DataTableColumn } from './DataTable'
import StatusBadge from './StatusBadge'

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-[#0B1B33]">{value}</p>
    </div>
  )
}

// One shared detail view for both owner and staff customer pages — same pattern
// as OrderDetailView: each page resolves its own auth and passes role-specific props in.
export default function CustomerDetailView({
  customer,
  orders,
  currency,
  orderBasePath,
}: {
  customer: Customer
  orders: Order[]
  currency: string
  orderBasePath: string
}) {
  const columns: DataTableColumn<Order>[] = [
    {
      header: 'Order #',
      cell: (o) => (
        <Link href={`${orderBasePath}/${o.id}`} className="font-medium text-[#0D9488] hover:underline">
          {o.order_number}
        </Link>
      ),
    },
    { header: 'Date', cell: (o) => <span className="text-slate-500">{new Date(o.created_at).toLocaleDateString('en-US')}</span> },
    { header: 'Service', cell: (o) => o.service_label },
    { header: 'Amount', cell: (o) => formatCurrency(o.amount, currency) },
    { header: 'Status', cell: (o) => <StatusBadge status={o.status} /> },
  ]

  return (
    <div>
      <PageHeader title={customer.full_name || 'Customer'} subtitle="Customer history" />

      <Card className="mb-4 p-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Field label="Phone" value={customer.phone || '—'} />
          <Field label="Email" value={customer.email || '—'} />
          <Field label="Customer since" value={new Date(customer.created_at).toLocaleDateString('en-US')} />
          <Field label="Total orders" value={orders.length} />
        </div>
        {customer.notes && (
          <div className="mt-4 border-t border-teal-50 pt-4">
            <p className="text-xs font-medium text-slate-400">Notes</p>
            <p className="mt-1 text-sm text-[#0B1B33]">{customer.notes}</p>
          </div>
        )}
      </Card>

      <Card className="mb-4 p-5">
        <h2 className="mb-4 font-semibold text-[#0B1B33]">Order history</h2>
        <DataTable columns={columns} rows={orders} emptyMessage="No orders yet for this customer." />
      </Card>
    </div>
  )
}
