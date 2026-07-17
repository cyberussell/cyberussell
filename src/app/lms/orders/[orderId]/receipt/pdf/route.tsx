import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { requirePagePermission } from '@/lib/laundry-management-system/modules/auth/queries'
import { getOrderById } from '@/lib/laundry-management-system/modules/orders/queries'
import { getOrderTrackingQrDataUrl } from '@/lib/laundry-management-system/modules/orders/qr'
import { ReceiptDocument } from '@/lib/laundry-management-system/receipt-pdf'

export const dynamic = 'force-dynamic'

export async function GET(_request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const { supabase, business } = await requirePagePermission('print_receipts')
  const order = await getOrderById(supabase, business.id, orderId)
  if (!order) return new NextResponse('Order not found.', { status: 404 })

  const qrDataUrl = await getOrderTrackingQrDataUrl(order.public_token)
  const buffer = await renderToBuffer(<ReceiptDocument business={business} order={order} qrDataUrl={qrDataUrl} />)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="receipt-${order.order_number}.pdf"`,
    },
  })
}
