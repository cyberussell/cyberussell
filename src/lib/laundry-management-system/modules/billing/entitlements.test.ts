import { describe, it, expect } from 'vitest'
import { hasFeature, getLimit, planWithFeature, PLANS } from './entitlements'

describe('entitlements', () => {
  it('Essential plan has the baseline features only', () => {
    expect(hasFeature({ plan_tier: 'essential' }, 'feature_order_tracking')).toBe(true)
    expect(hasFeature({ plan_tier: 'essential' }, 'feature_pickup_delivery')).toBe(false)
    expect(hasFeature({ plan_tier: 'essential' }, 'feature_priority_queue')).toBe(false)
    expect(hasFeature({ plan_tier: 'essential' }, 'feature_advanced_reports')).toBe(false)
  })

  it('Professional plan has every declared feature', () => {
    for (const feature of PLANS.professional.features) {
      expect(hasFeature({ plan_tier: 'professional' }, feature)).toBe(true)
    }
  })

  it('falls back to Essential entitlements for an unknown plan_tier', () => {
    // @ts-expect-error deliberately invalid input — guards against a bad/legacy DB row
    expect(hasFeature({ plan_tier: 'nonexistent' }, 'feature_pickup_delivery')).toBe(false)
  })

  it('reports the correct staff account limits per plan', () => {
    expect(getLimit({ plan_tier: 'essential' }, 'staffAccounts')).toBe(3)
    expect(getLimit({ plan_tier: 'professional' }, 'staffAccounts')).toBeNull()
  })

  it('planWithFeature finds the cheapest tier that includes a feature', () => {
    expect(planWithFeature('feature_order_tracking').id).toBe('essential')
    expect(planWithFeature('feature_pickup_delivery').id).toBe('professional')
  })
})
