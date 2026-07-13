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
export async function getOrderQrDataUrl(orderNumber: string): Promise<string> {
  return QRCode.toDataURL(getOrderLookupUrl(orderNumber), { margin: 1, width: 200 })
}
