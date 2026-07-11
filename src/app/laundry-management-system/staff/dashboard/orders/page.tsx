import Link from 'next/link'
import { PlusCircle, Printer } from 'lucide-react'
import { requireStaffAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import { listOrders } from '@/lib/laundry-management-system/modules/orders/queries'
import type { OrderStatus } from '@/lib/laundry-management-system/modules/orders/types'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import DataTable, { type DataTableColumn } from '@/components/laundry-management-system/dashboard/DataTable'
import OrderStatusControl from '@/components/laundry-management-system/dashboard/OrderStatusControl'
import OrderLookupForm from '@/components/laundry-management-system/dashboard/OrderLookupForm'

export const dynamic = 'force-dynamic'

const FILTERS: { label: string; value: OrderStatus | undefined }[] = [
  { label: 'All', value: undefined },
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

function buildFilterHref(status: OrderStatus | undefined, mine: boolean): string {
  const params = new URLSearchParams()
  if (status) params.set('status', status)
  params.set('mine', mine ? '1' : '0')
  return `/laundry-management-system/staff/dashboard/orders?${params.toString()}`
}

export default async function StaffOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; mine?: string }>
}) {
  const { status, mine } = await searchParams
  // Defaults to "Mine" (assigned to me) — staff's primary view is their own work.
  const isMine = mine !== '0'
  const { supabase, staff, business } = await requireStaffAccess()
  const orders = await listOrders(supabase, business.id, status as OrderStatus | undefined, isMine ? staff.id : undefined)

  const columns: DataTableColumn<(typeof orders)[number]>[] = [
    {
      header: 'Order #',
      cell: (o) => (
        <Link
          href={`/laundry-management-system/staff/dashboard/orders/${o.id}`}
          className="font-medium text-[#2563EB] hover:underline"
        >
          {o.order_number}
        </Link>
      ),
    },
    {
      header: 'Created',
      cell: (o) => <span className="text-slate-500">{new Date(o.created_at).toLocaleString('en-US')}</span>,
    },
    { header: 'Service', cell: (o) => o.service_label },
    {
      header: 'Customer',
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
    { header: 'Amount', cell: (o) => formatCurrency(o.amount, business.currency) },
    { header: 'Status', cell: (o) => <OrderStatusControl orderId={o.id} status={o.status} /> },
    {
      header: 'Receipt',
      cell: (o) => (
        <Link
          href={`/laundry-management-system/orders/${o.id}/receipt`}
          title="Print receipt"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-[#2563EB] transition"
        >
          <Printer className="h-4 w-4" />
        </Link>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle="Orders for your business."
        action={
          <Link
            href="/laundry-management-system/staff/dashboard/orders/new"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <PlusCircle className="h-4 w-4" />
            New Walk-in Order
          </Link>
        }
      />

      <div className="mb-4">
        <OrderLookupForm />
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.label}
            href={buildFilterHref(f.value, isMine)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              (status ?? undefined) === f.value
                ? 'bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white'
                : 'bg-white text-slate-500 border border-blue-100 hover:border-[#38BDF8]/40'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href={buildFilterHref(status as OrderStatus | undefined, false)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
            !isMine ? 'bg-[#0B1B33] text-white' : 'bg-white text-slate-500 border border-blue-100 hover:border-[#38BDF8]/40'
          }`}
        >
          All Staff
        </Link>
        <Link
          href={buildFilterHref(status as OrderStatus | undefined, true)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
            isMine ? 'bg-[#0B1B33] text-white' : 'bg-white text-slate-500 border border-blue-100 hover:border-[#38BDF8]/40'
          }`}
        >
          Mine
        </Link>
      </div>

      <DataTable columns={columns} rows={orders} emptyMessage="No orders match this filter." />
    </div>
  )
}
