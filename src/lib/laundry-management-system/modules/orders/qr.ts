import 'server-only'
import QRCode from 'qrcode'

// Matches the hardcoded origin already used for the staff-invite email link
// (actions/staff.ts) — no env-based base URL exists yet in LMS scope.
const APP_ORIGIN = 'https://www.cyberussell.com'

export function getOrderLookupUrl(orderNumber: string): string {
  return `${APP_ORIGIN}/lms/orders/lookup/${encodeURIComponent(orderNumber)}`
}

// Scanning this with an ordinary phone camera opens the lookup URL directly —
// no in-app scanner needed. The lookup route resolves the order and redirects
// to the right role-scoped detail page (see orders/lookup/[orderNumber]/page.tsx).
// Internal use only (owner/staff's own printed order slips) — requires login,
// unlike getOrderTrackingQrDataUrl below.
export async function getOrderQrDataUrl(orderNumber: string): Promise<string> {
  return QRCode.toDataURL(getOrderLookupUrl(orderNumber), { margin: 1, width: 200 })
}

export function getOrderTrackingUrl(publicToken: string): string {
  return `${APP_ORIGIN}/lms/track/${encodeURIComponent(publicToken)}`
}

// The QR code printed on customer-facing receipts ("Scan to track your
// order") — points at the public, no-login tracking page keyed by the
// opaque public_token, never order_number.
export async function getOrderTrackingQrDataUrl(publicToken: string): Promise<string> {
  return QRCode.toDataURL(getOrderTrackingUrl(publicToken), { margin: 1, width: 200 })
}
