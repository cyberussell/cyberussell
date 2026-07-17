'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { z } from 'zod'
import { findOrderForTracking } from '@/lib/laundry-management-system/modules/orders/queries'
import { checkRateLimit, clientIp } from '@/lib/laundry-management-system/rateLimit'
import type { ActionResult } from './shared'

const trackSchema = z.object({
  orderNumber: z.string().min(1).max(20),
  phone: z.string().min(1).max(30),
})

// Public, unauthenticated — no requireX guard, matching the rest of this
// route's zero-session design. order_number alone is a guessable sequential
// bigserial, so a phone match (verified in findOrderForTracking) is the real
// access check here, backed by rate limiting against brute-forcing it.
export async function trackOrder(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const ip = clientIp(await headers())
  if (!(await checkRateLimit(`lms-track:${ip}`, 10))) {
    return { error: 'Too many attempts — please wait a minute and try again.' }
  }

  const parsed = trackSchema.safeParse({
    orderNumber: formData.get('orderNumber'),
    phone: formData.get('phone'),
  })
  if (!parsed.success) return { error: 'Enter your order number and phone number.' }

  const order = await findOrderForTracking(parsed.data.orderNumber.trim().toUpperCase(), parsed.data.phone)
  if (!order) return { error: 'Order not found — check the order number and phone number and try again.' }

  redirect(`/lms/track/${order.public_token}`)
}
