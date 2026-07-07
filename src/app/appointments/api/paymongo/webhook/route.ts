import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabase } from '@/lib/appointment-system/supabase-server'
import { verifyPaymongoSignature } from '@/lib/appointment-system/paymongo'
import { logEvent } from '@/lib/appointment-system/events'

export const dynamic = 'force-dynamic'

interface PaymongoEvent {
  data: {
    attributes: {
      type: string
      data: {
        id: string
        attributes: {
          metadata: { business_id?: string; tier?: string } | null
        }
      }
    }
  }
}

// POST /appointments/api/paymongo/webhook — PayMongo "Pay Now" checkout completion.
// Registered separately from any other webhook already on this shared PayMongo account.
export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const secret = process.env.APPOINTMENTS_PAYMONGO_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const signature = request.headers.get('paymongo-signature')
  if (!verifyPaymongoSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const event = JSON.parse(rawBody) as PaymongoEvent
  const eventType = event.data.attributes.type

  if (eventType === 'checkout_session.payment.paid') {
    const session = event.data.attributes.data
    const businessId = session.attributes.metadata?.business_id
    const tier = session.attributes.metadata?.tier
    if (businessId && tier) {
      const db = createAdminSupabase()
      const renewsAt = new Date(Date.now() + 30 * 86400_000)
      await db
        .from('businesses')
        .update({ plan_tier: tier, plan_status: 'active', plan_renews_at: renewsAt.toISOString() })
        .eq('id', businessId)
        .eq('paymongo_checkout_session_id', session.id)
      await logEvent(db, businessId, 'billing_payment_paid', { tier, checkout_session_id: session.id })
    }
  }

  return NextResponse.json({ ok: true })
}
