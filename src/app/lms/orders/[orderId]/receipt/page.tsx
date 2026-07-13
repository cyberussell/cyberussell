import { Download } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { requirePagePermission } from '@/lib/laundry-management-system/modules/auth/queries'
import { getOrderById } from '@/lib/laundry-management-system/modules/orders/queries'
import { getOrderQrDataUrl } from '@/lib/laundry-management-system/modules/orders/qr'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import PrintReceiptButton from '@/components/laundry-management-system/dashboard/PrintReceiptButton'

export const dynamic = 'force-dynamic'

export default async function ReceiptPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const { supabase, business } = await requirePagePermission('print_receipts')
  const order = await getOrderById(supabase, business.id, orderId)
  if (!order) notFound()
  const qrDataUrl = await getOrderQrDataUrl(order.order_number)

  return (
    <div className="min-h-screen bg-[#F3F8FF] px-4 py-10 print:bg-white print:p-0">
      <div className="mx-auto max-w-md rounded-2xl border border-blue-100 bg-white p-8 shadow-sm print:rounded-none print:border-0 print:shadow-none">
        <div className="mb-6 flex items-center justify-between print:hidden">
          <h1 className="text-lg font-semibold text-[#0B1B33]">Receipt</h1>
          <div className="flex items-center gap-2">
            <a
              href={`/lms/orders/${order.id}/receipt/pdf`}
              className="flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-[#2563EB] transition hover:border-[#38BDF8]/40"
            >
              <Download className="h-4 w-4" />
              PDF
            </a>
            <PrintReceiptButton />
          </div>
        </div>

        <div className="mb-6 text-center">
          {business.logo_url && (
            <Image
              src={business.logo_url}
              alt={`${business.name} logo`}
              width={56}
              height={56}
              className="mx-auto mb-2 h-14 w-14 rounded-xl object-cover"
            />
          )}
          <p className="text-lg font-bold text-[#0B1B33]">{business.name}</p>
          {business.address && <p className="text-xs text-slate-500">{business.address}</p>}
          {business.phone && <p className="text-xs text-slate-500">{business.phone}</p>}
        </div>

        <div className="space-y-2 border-t border-dashed border-slate-300 py-4 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Order #</span>
            <span className="font-medium text-[#0B1B33]">{order.order_number}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Date</span>
            <span className="text-[#0B1B33]">{new Date(order.created_at).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Customer</span>
            <span className="text-[#0B1B33]">{order.customer?.full_name || order.walk_in_name || 'Walk-in customer'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Service</span>
            <span className="text-[#0B1B33]">{order.service_label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status</span>
            <span className="text-[#0B1B33] capitalize">{order.status.replace('_', ' ')}</span>
          </div>
        </div>

        <div className="flex justify-between border-t border-dashed border-slate-300 pt-4 text-base font-bold text-[#0B1B33]">
          <span>Total</span>
          <span>{formatCurrency(order.amount, business.currency)}</span>
        </div>

        <div className="mt-6 flex flex-col items-center gap-1 border-t border-dashed border-slate-300 pt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrDataUrl} alt={`QR code for order ${order.order_number}`} className="h-24 w-24" />
          <p className="text-center text-[11px] text-slate-400">Scan to track your order</p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">Thank you for your business!</p>
      </div>
    </div>
  )
}
