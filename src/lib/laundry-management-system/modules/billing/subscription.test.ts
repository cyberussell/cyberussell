import { describe, it, expect } from 'vitest'
import { getSubscriptionBlock } from './subscription'

const NOW = new Date('2026-07-14T00:00:00.000Z')

describe('getSubscriptionBlock', () => {
  it('blocks a suspended business regardless of trial_ends_at', () => {
    expect(
      getSubscriptionBlock({ plan_status: 'suspended', trial_ends_at: '2099-01-01T00:00:00.000Z' }, NOW)
    ).toBe('suspended')
  })

  it('blocks a trial business once trial_ends_at has passed', () => {
    expect(
      getSubscriptionBlock({ plan_status: 'trial', trial_ends_at: '2026-07-01T00:00:00.000Z' }, NOW)
    ).toBe('trial_expired')
  })

  it('does not block a trial business still inside its trial window', () => {
    expect(
      getSubscriptionBlock({ plan_status: 'trial', trial_ends_at: '2026-08-01T00:00:00.000Z' }, NOW)
    ).toBeNull()
  })

  it('does not block an active (paid) business, even past the original trial date', () => {
    expect(
      getSubscriptionBlock({ plan_status: 'active', trial_ends_at: '2020-01-01T00:00:00.000Z' }, NOW)
    ).toBeNull()
  })
})
