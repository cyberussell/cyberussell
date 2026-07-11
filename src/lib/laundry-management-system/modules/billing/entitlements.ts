import type { Business, PlanTier } from '../tenant/types'

// ── Single source of truth for plans and entitlements ───────────────────────
// All plan gating goes through this module. Never write `plan_tier === 'professional'`
// checks elsewhere — add a feature flag here instead. Mirrors the pattern already
// proven in the Appointment System (src/lib/appointment-system/entitlements.ts,
// a different product, read-only reference) rather than inventing a new shape.

export type FeatureFlag =
  | 'unlimited_staff'
  | 'pickup_management'
  | 'delivery_management'
  | 'priority_queue'
  | 'advanced_reports'

export const FEATURE_LABELS: Record<FeatureFlag, string> = {
  unlimited_staff: 'Unlimited Staff Accounts',
  pickup_management: 'Pickup Management',
  delivery_management: 'Delivery Management',
  priority_queue: 'Priority Queue',
  advanced_reports: 'Advanced Reports',
}

export interface PlanConfig {
  tier: PlanTier
  name: string
  priceMonthly: number // PHP
  features: FeatureFlag[]
}

export const PLANS: Record<PlanTier, PlanConfig> = {
  essential: {
    tier: 'essential',
    name: 'Essential',
    priceMonthly: 399,
    features: [],
  },
  professional: {
    tier: 'professional',
    name: 'Professional',
    priceMonthly: 699,
    features: ['unlimited_staff', 'pickup_management', 'delivery_management', 'priority_queue', 'advanced_reports'],
  },
}

export const PLAN_ORDER: PlanTier[] = ['essential', 'professional']

function planOf(business: Pick<Business, 'plan_tier'>): PlanConfig {
  return PLANS[business.plan_tier] ?? PLANS.essential
}

export function hasFeature(business: Pick<Business, 'plan_tier'>, feature: FeatureFlag): boolean {
  return planOf(business).features.includes(feature)
}

/** First tier (in upgrade order) that includes the feature — for upgrade prompts. */
export function tierWithFeature(feature: FeatureFlag): PlanConfig {
  const tier = PLAN_ORDER.find((t) => PLANS[t].features.includes(feature)) ?? 'professional'
  return PLANS[tier]
}
