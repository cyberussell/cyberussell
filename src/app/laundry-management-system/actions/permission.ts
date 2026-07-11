import 'server-only'
import { requireBusinessSession, type BusinessSession } from '@/lib/laundry-management-system/modules/auth/queries'
import { hasPermission, type Permission } from '@/lib/laundry-management-system/modules/auth/permissions'
import type { ActionResult } from './shared'

// Reusable Server Action permission gate: resolves the caller as owner or staff, then
// checks the role against the requested permission. Actions call this once at the top
// and return `denied` verbatim if set — keeps every mutation's permission check identical
// regardless of which role is allowed to call it. Kept out of shared.ts (which plain
// client components import for ActionResult/CURRENCIES) since this pulls in next/headers
// transitively and would break client bundling if it lived there.
export async function requireActionPermission(
  permission: Permission
): Promise<{ session: BusinessSession; denied: null } | { session: null; denied: ActionResult }> {
  const session = await requireBusinessSession()
  if (!hasPermission(session.role, permission)) {
    return { session: null, denied: { error: 'You do not have permission to do this.' } }
  }
  return { session, denied: null }
}
