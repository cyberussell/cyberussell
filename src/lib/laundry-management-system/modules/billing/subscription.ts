import type { Business } from '../tenant/types'

export type SubscriptionBlock = 'suspended' | 'trial_expired' | null

// Pure and DB-free so this is unit-testable without a live Supabase project.
// The only two ways a business leaves 'trial' today are Russell manually
// flipping plan_status to 'active' after payment, or trial_ends_at passing
// with no such flip — billing isn't wired up to do this automatically yet.
export function getSubscriptionBlock(
  business: Pick<Business, 'plan_status' | 'trial_ends_at'>,
  now: Date = new Date()
): SubscriptionBlock {
  if (business.plan_status === 'suspended') return 'suspended'
  if (business.plan_status === 'trial' && new Date(business.trial_ends_at) < now) return 'trial_expired'
  return null
}
