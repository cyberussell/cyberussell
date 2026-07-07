import type { SupabaseClient } from '@supabase/supabase-js'
import type { Business, PlanTier } from './types'

// ── Single source of truth for plans and entitlements ───────────────────────
// All plan gating goes through this module. Never write `plan_tier === 'pro'`
// checks elsewhere — add a feature flag or limit here instead. The config is
// code-driven for v1 (four plans, manual billing); if plans ever become
// user-configurable, swap the PLANS constant for a DB read without touching
// call sites.

export type FeatureFlag =
  | 'public_booking_page'
  | 'customer_records'
  | 'email_notifications'
  | 'data_export'
  | 'messenger_booking_bot'
  | 'automated_reminders'
  | 'no_show_tracking'
  | 'revenue_reports'

export interface PlanConfig {
  tier: PlanTier
  name: string
  priceMonthly: number // PHP
  tagline: string
  /** null = unlimited */
  monthlyAppointments: number | null
  /** null = unlimited */
  providerLimit: number | null
  features: FeatureFlag[]
}

export const PLANS: Record<PlanTier, PlanConfig> = {
  free: {
    tier: 'free',
    name: 'Free',
    priceMonthly: 0,
    tagline: 'Start accepting bookings.',
    monthlyAppointments: 100,
    providerLimit: 1,
    features: ['public_booking_page', 'customer_records', 'no_show_tracking'],
  },
  basic: {
    tier: 'basic',
    name: 'Basic',
    priceMonthly: 299,
    tagline: 'Simple online booking.',
    monthlyAppointments: null,
    providerLimit: 5,
    features: ['public_booking_page', 'customer_records', 'no_show_tracking', 'email_notifications'],
  },
  pro: {
    tier: 'pro',
    name: 'Pro',
    priceMonthly: 699,
    tagline: 'Booking automation for growing businesses.',
    monthlyAppointments: null,
    providerLimit: null,
    features: [
      'public_booking_page',
      'customer_records',
      'no_show_tracking',
      'email_notifications',
      'data_export',
      'messenger_booking_bot',
      'automated_reminders',
      'revenue_reports',
    ],
  },
}

export const PLAN_ORDER: PlanTier[] = ['free', 'basic', 'pro']

// Marketing/UI bullet copy per plan — shown on both the public landing page
// and the logged-in Billing tab. Single-sourced here so the two can never
// show different feature lists for the same plan.
export const PLAN_BULLETS: Record<PlanTier, string[]> = {
  free: [
    '1 provider',
    'Public booking page',
    'Appointment calendar',
    'Customer records',
    'Services and pricing',
    'Business hours, breaks & blocked dates',
    'Cancellation and rescheduling',
    'Manual and walk-in appointments',
    'Up to 100 appointments / month',
  ],
  basic: [
    'Everything in Free',
    'Up to 5 staff / providers',
    'Unlimited appointments',
    'Email notifications (soon)',
    'Expanded appointment statistics',
    'Customer management tools',
  ],
  pro: [
    'Everything in Basic',
    'Unlimited staff / providers',
    'Messenger booking bot',
    'Automated reminders (soon)',
    'Customer notes & no-show tracking',
    'Basic revenue reports',
    'Data export (soon)',
  ],
}

function planOf(business: Pick<Business, 'plan_tier'>): PlanConfig {
  return PLANS[business.plan_tier] ?? PLANS.free
}

export function hasFeature(business: Pick<Business, 'plan_tier'>, feature: FeatureFlag): boolean {
  return planOf(business).features.includes(feature)
}

export function getFeatureLimit(
  business: Pick<Business, 'plan_tier'>,
  limit: 'monthlyAppointments' | 'providerLimit'
): number | null {
  return planOf(business)[limit]
}

/** First tier (in upgrade order) that includes the feature — for upgrade prompts. */
export function tierWithFeature(feature: FeatureFlag): PlanConfig {
  const tier = PLAN_ORDER.find((p) => PLANS[p].features.includes(feature)) ?? 'pro'
  return PLANS[tier]
}

// ── Usage (computed from existing tables; no counter tables needed) ─────────

function monthStartUtc(): string {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString()
}

/** Appointments created this calendar month (all sources, excluding cancelled). */
export async function getMonthlyAppointmentUsage(
  db: SupabaseClient,
  businessId: string
): Promise<number> {
  const { count } = await db
    .from('appointments')
    .select('id', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .neq('status', 'cancelled')
    .gte('created_at', monthStartUtc())
  return count ?? 0
}

export async function canCreateAppointment(
  db: SupabaseClient,
  business: Business
): Promise<{ allowed: boolean; used: number; limit: number | null }> {
  const limit = planOf(business).monthlyAppointments
  if (limit === null) return { allowed: true, used: 0, limit: null }
  const used = await getMonthlyAppointmentUsage(db, business.id)
  return { allowed: used < limit, used, limit }
}

export async function canAddProvider(
  db: SupabaseClient,
  business: Business
): Promise<{ allowed: boolean; used: number; limit: number | null }> {
  const limit = planOf(business).providerLimit
  if (limit === null) return { allowed: true, used: 0, limit: null }
  const { count } = await db
    .from('staff')
    .select('id', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('active', true)
  const used = count ?? 0
  return { allowed: used < limit, used, limit }
}
