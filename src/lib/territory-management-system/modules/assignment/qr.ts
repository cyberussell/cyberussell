import 'server-only'
import QRCode from 'qrcode'

// Matches the hardcoded origin already used elsewhere in this codebase (LMS's
// orders/qr.ts, staff-invite emails) — no env-based base URL exists yet.
const APP_ORIGIN = 'https://www.cyberussell.com'

export function getAssignmentBatchUrl(accessToken: string): string {
  return `${APP_ORIGIN}/territory-management-system/assignment/${accessToken}`
}

// Scanning this with an ordinary phone camera opens the batch's public partnership list
// directly — no in-app scanner needed, no publisher account required.
// darkColor lets the caller distinguish an overflow batch's QR (navy) from a normal
// assignment's (black) at a glance — see group-leader/dashboard/page.tsx.
export async function getAssignmentBatchQrDataUrl(accessToken: string, darkColor = '#000000'): Promise<string> {
  return QRCode.toDataURL(getAssignmentBatchUrl(accessToken), {
    margin: 1,
    width: 480,
    color: { dark: darkColor, light: '#FFFFFF' },
  })
}
