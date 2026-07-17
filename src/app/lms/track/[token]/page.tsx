import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getOrderByPublicToken, groupOrderItems } from '@/lib/laundry-management-system/modules/orders/queries'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import StatusCard from '@/components/laundry-management-system/customer/StatusCard'
import OrderTimeline from '@/components/laundry-management-system/OrderTimeline'

export const dynamic = 'force-dynamic'

// Public, no-login order tracking — resolved by the opaque public_token
// alone (never a session). Deliberately renders a curated subset of the
// order: no assigned staff, driver, notes, or created_by — those stay
// internal to the owner/staff dashboard.
export default async function PublicOrderTrackingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const order = await getOrderByPublicToken(token)
  if (!order) notFound()

  const { services, addons } = groupOrderItems(order.items)
  const { business } = order

  return (
    <div className="min-h-screen bg-[#F0FDFA] px-4 py-10">
      <div className="mx-auto max-w-md">
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

        <StatusCard order={order} currency={business.currency} showTimeline={false} />

        {order.items.length > 0 && (
          <div className="mt-4 rounded-3xl border border-teal-100 bg-white p-5">
            {services.length > 0 && (
              <div className="mb-3">
                <p className="mb-2 text-xs font-medium text-slate-400">Services</p>
                <ul className="space-y-1.5">
                  {services.map((item) => (
                    <li key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-[#0B1B33]">
                        {item.name} <span className="text-slate-400">× {item.quantity}</span>
                      </span>
                      <span className="font-medium text-[#0B1B33]">{formatCurrency(item.line_total, business.currency)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {addons.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium text-slate-400">Add-ons</p>
                <ul className="space-y-1.5">
                  {addons.map((item) => (
                    <li key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-[#0B1B33]">
                        {item.name} <span className="text-slate-400">× {item.quantity}</span>
                      </span>
                      <span className="font-medium text-[#0B1B33]">{formatCurrency(item.line_total, business.currency)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 rounded-3xl border border-teal-100 bg-white p-5">
          <div className="space-y-1.5 text-sm">
            {order.expected_completion_at && (
              <div className="flex justify-between">
                <span className="text-slate-500">Expected completion</span>
                <span className="text-[#0B1B33]">{new Date(order.expected_completion_at).toLocaleDateString('en-US')}</span>
              </div>
            )}
            {order.pickup_requested && (
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup requested</span>
                <span className="text-[#0B1B33]">
                  {order.pickup_scheduled_at ? new Date(order.pickup_scheduled_at).toLocaleDateString('en-US') : 'Yes'}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500">Total</span>
              <span className="font-semibold text-[#0B1B33]">{formatCurrency(order.amount, business.currency)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-teal-100 bg-white p-5">
          <p className="mb-3 text-xs font-medium text-slate-400">Status history</p>
          <OrderTimeline history={order.status_history} />
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Lost this link? <Link href="/lms/track" className="text-[#0D9488] hover:underline">Track another order</Link>
        </p>
      </div>
    </div>
  )
}
