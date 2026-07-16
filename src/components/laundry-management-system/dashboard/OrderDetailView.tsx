import Link from 'next/link'
import { Printer } from 'lucide-react'
import type { OrderWithRelations } from '@/lib/laundry-management-system/modules/orders/types'
import type { StaffMember } from '@/lib/laundry-management-system/modules/staff/types'
import { getOrderQrDataUrl } from '@/lib/laundry-management-system/modules/orders/qr'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import Card from './Card'
import PageHeader from './PageHeader'
import OrderStatusControl from './OrderStatusControl'
import OrderDetailsEditForm from './OrderDetailsEditForm'
import StaffAssignmentControl from './StaffAssignmentControl'
import PriorityToggle from './PriorityToggle'
import OrderTimeline from '../OrderTimeline'
import Field from './Field'

// One shared detail view for both owner and staff order pages — each page
// just resolves its own auth/permissions and passes the right props in.
export default async function OrderDetailView({
  order,
  currency,
  staff,
  canReassignStaff,
  receiptHref,
  showPriorityToggle = false,
}: {
  order: OrderWithRelations
  currency: string
  staff: (StaffMember & { profile: { full_name: string } | null })[]
  canReassignStaff: boolean
  receiptHref: string
  showPriorityToggle?: boolean
}) {
  const qrDataUrl = await getOrderQrDataUrl(order.order_number)

  return (
    <div>
      <PageHeader
        title={order.order_number}
        subtitle="Order details"
        action={
          <Link
            href={receiptHref}
            className="flex items-center gap-2 rounded-full border border-teal-100 bg-white px-4 py-2 text-sm font-semibold text-[#0D9488] transition hover:border-[#22D3EE]/40"
          >
            <Printer className="h-4 w-4" />
            Receipt
          </Link>
        }
      />

      <Card className="mb-4 p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <OrderStatusControl orderId={order.id} status={order.status} />
          {showPriorityToggle && <PriorityToggle orderId={order.id} isPriority={order.is_priority} />}
        </div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3">
            <Field label="Customer" value={order.customer?.full_name || order.walk_in_name || 'Walk-in customer'} />
            <Field
              label="Assigned Staff"
              value={order.assigned_staff_id ? order.assigned_staff?.profile?.full_name || 'Staff assigned' : 'Unassigned'}
            />
            <Field label="Date Received" value={new Date(order.date_received).toLocaleDateString('en-US')} />
            <Field
              label="Expected Completion"
              value={
                order.expected_completion_at ? new Date(order.expected_completion_at).toLocaleDateString('en-US') : '—'
              }
            />
            <Field label="Weight" value={order.weight_kg ? `${order.weight_kg} kg` : '—'} />
            {order.items.length === 0 && <Field label="Service Type" value={order.service_label} />}
            <Field label="Amount" value={formatCurrency(order.amount, currency)} />
            <Field label="Payment Status" value={order.payment_status === 'paid' ? 'Paid' : 'Unpaid'} />
          </div>
          <div className="flex shrink-0 flex-col items-center gap-1 self-center sm:self-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt={`QR code for order ${order.order_number}`} className="h-28 w-28 rounded-lg border border-teal-100" />
            <p className="text-center text-[11px] text-slate-400">Scan to look up</p>
          </div>
        </div>
        {order.items.length > 0 && (
          <div className="mt-4 border-t border-teal-50 pt-4">
            <p className="mb-2 text-xs font-medium text-slate-400">Items</p>
            <ul className="space-y-1.5">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-[#0B1B33]">
                    {item.name} <span className="text-slate-400">× {item.quantity}</span>
                  </span>
                  <span className="font-medium text-[#0B1B33]">{formatCurrency(item.line_total, currency)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {order.notes && (
          <div className="mt-4 border-t border-teal-50 pt-4">
            <p className="text-xs font-medium text-slate-400">Notes</p>
            <p className="mt-1 text-sm text-[#0B1B33]">{order.notes}</p>
          </div>
        )}
      </Card>

      {canReassignStaff && (
        <Card className="mb-4 p-5">
          <h2 className="mb-3 font-semibold text-[#0B1B33]">Reassign Staff</h2>
          <StaffAssignmentControl orderId={order.id} currentStaffId={order.assigned_staff_id} staff={staff} />
        </Card>
      )}

      <div className="mb-4">
        <OrderDetailsEditForm order={order} />
      </div>

      <Card className="p-5">
        <h2 className="mb-4 font-semibold text-[#0B1B33]">Timeline</h2>
        <OrderTimeline history={order.status_history} />
      </Card>
    </div>
  )
}
