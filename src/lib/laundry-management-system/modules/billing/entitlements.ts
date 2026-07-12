import type { Business, PlanTier } from '../tenant/types'

// ── Single source of truth for plans and entitlements ───────────────────────
// Plans are just named bundles of features/limits — never write
// `plan_tier === 'professional'` checks elsewhere, add or reshuffle a feature
// flag here instead. Mirrors the pattern already proven in the Appointment
// System (src/lib/appointment-system/entitlements.ts, a different product,
// read-only reference) rather than inventing a new shape.
//
// Adding a new plan (Enterprise, Franchise, ...): widen the `plan_tier` check
// constraint in a migration, then add one PlanConfig entry below referencing
// existing or new FeatureFlags. Changing pricing or which features a plan
// includes: edit this file only, no migration needed.

export type FeatureFlag =
  | 'feature_order_tracking'
  | 'feature_customer_database'
  | 'feature_inventory'
  | 'feature_receipt_printing'
  | 'feature_qr_lookup'
  | 'feature_pickup_delivery'
  | 'feature_priority_queue'
  | 'feature_advanced_reports'

export const FEATURE_LABELS: Record<FeatureFlag, string> = {
  feature_order_tracking: 'Laundry Order Tracking',
  feature_customer_database: 'Customer Database',
  feature_inventory: 'Inventory Tracking',
  feature_receipt_printing: 'Receipt Printing',
  feature_qr_lookup: 'QR Order Lookup',
  feature_pickup_delivery: 'Pickup & Delivery Management',
  feature_priority_queue: 'Priority Queue',
  feature_advanced_reports: 'Advanced Reports',
}

// Numeric caps a plan enforces, separate from on/off feature flags — null
// always means "unlimited." Grows here (e.g. `branches`, `monthlyOrders`)
// rather than as one-off constants scattered across modules.
export interface PlanLimits {
  staffAccounts: number | null
}

export interface PlanConfig {
  id: PlanTier
  name: string
  priceMonthly: number // PHP
  features: FeatureFlag[]
  limits: PlanLimits
}

// Essential's feature list is the single source of truth for "baseline"
// capabilities — Professional spreads it rather than re-listing it, so there's
// never two copies of the same list to keep in sync.
const ESSENTIAL_FEATURES: FeatureFlag[] = [
  'feature_order_tracking',
  'feature_customer_database',
  'feature_inventory',
  'feature_receipt_printing',
  'feature_qr_lookup',
]

export const PLANS: Record<PlanTier, PlanConfig> = {
  essential: {
    id: 'essential',
    name: 'Essential',
    priceMonthly: 399,
    features: ESSENTIAL_FEATURES,
    limits: { staffAccounts: 3 },
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    priceMonthly: 699,
    features: [...ESSENTIAL_FEATURES, 'feature_pickup_delivery', 'feature_priority_queue', 'feature_advanced_reports'],
    limits: { staffAccounts: null },
  },
}

export const PLAN_ORDER: PlanTier[] = ['essential', 'professional']

function planOf(business: Pick<Business, 'plan_tier'>): PlanConfig {
  return PLANS[business.plan_tier] ?? PLANS.essential
}

export function hasFeature(business: Pick<Business, 'plan_tier'>, flag: FeatureFlag): boolean {
  return planOf(business).features.includes(flag)
}

export function getLimit(business: Pick<Business, 'plan_tier'>, limit: keyof PlanLimits): number | null {
  return planOf(business).limits[limit]
}

/** First plan (in upgrade order) that includes the feature — for upgrade prompts. */
export function planWithFeature(flag: FeatureFlag): PlanConfig {
  const tier = PLAN_ORDER.find((t) => PLANS[t].features.includes(flag)) ?? 'professional'
  return PLANS[tier]
}
