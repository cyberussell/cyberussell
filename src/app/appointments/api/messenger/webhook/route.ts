import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabase } from '@/lib/booklypro/supabase-server'
import { verifyMetaSignature } from '@/lib/booklypro/messenger'
import { handleIncoming } from '@/lib/booklypro/flow'
import type { Clinic } from '@/lib/booklypro/types'

export const dynamic = 'force-dynamic'

// Meta webhook verification handshake (set the same token in the Meta app).
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  if (
    params.get('hub.mode') === 'subscribe' &&
    params.get('hub.verify_token') === process.env.META_VERIFY_TOKEN &&
    params.get('hub.challenge')
  ) {
    return new NextResponse(params.get('hub.challenge'), { status: 200 })
  }
  return new NextResponse('Forbidden', { status: 403 })
}

interface MessagingEvent {
  sender?: { id: string }
  message?: { text?: string; quick_reply?: { payload?: string }; is_echo?: boolean }
  postback?: { payload?: string }
}

interface WebhookEntry {
  id: string // page id
  messaging?: MessagingEvent[]
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  if (!verifyMetaSignature(rawBody, request.headers.get('x-hub-signature-256'))) {
    return new NextResponse('Invalid signature', { status: 401 })
  }

  let body: { object?: string; entry?: WebhookEntry[] }
  try {
    body = JSON.parse(rawBody)
  } catch {
    return new NextResponse('Bad payload', { status: 400 })
  }
  if (body.object !== 'page' || !Array.isArray(body.entry)) {
    return new NextResponse('Ignored', { status: 200 })
  }

  const db = createAdminSupabase()

  for (const entry of body.entry) {
    // Route by page id → clinic tenant.
    const { data: clinic } = await db
      .from('clinics')
      .select('*')
      .eq('fb_page_id', entry.id)
      .maybeSingle()
    if (!clinic) continue

    // Suspended clinics stop getting bot replies (manual billing enforcement).
    if ((clinic as Clinic).plan_status === 'suspended') continue

    const { data: secret } = await db
      .from('clinic_secrets')
      .select('fb_page_token')
      .eq('clinic_id', clinic.id)
      .maybeSingle()
    const pageToken = secret?.fb_page_token
    if (!pageToken) continue

    for (const event of entry.messaging ?? []) {
      const psid = event.sender?.id
      if (!psid || event.message?.is_echo) continue

      const payload = event.postback?.payload ?? event.message?.quick_reply?.payload
      const text = event.message?.text

      if (!payload && !text) continue
      try {
        await handleIncoming(db, clinic as Clinic, pageToken, psid, { payload, text })
      } catch (err) {
        console.error('[booklypro] webhook handling failed', err)
      }
    }
  }

  // Always 200 so Meta doesn't retry-storm the endpoint.
  return new NextResponse('EVENT_RECEIVED', { status: 200 })
}
