import { describe, it, expect } from 'vitest'
import { isDoNotCallLocked, isPartnershipAllDone } from './schema'

function record(overrides: Partial<Parameters<typeof isPartnershipAllDone>[0][number]> = {}) {
  return {
    id: 'r1',
    plusCode: null,
    completedAt: null,
    doNotCall: false,
    doNotCallAt: null,
    ...overrides,
  }
}

describe('isDoNotCallLocked', () => {
  it('is false when do_not_call is off', () => {
    expect(isDoNotCallLocked(false, new Date().toISOString())).toBe(false)
  })

  it('is false when do_not_call is on but there is no timestamp', () => {
    expect(isDoNotCallLocked(true, null)).toBe(false)
  })

  it('is true within the 6-month lock window', () => {
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    expect(isDoNotCallLocked(true, oneMonthAgo.toISOString())).toBe(true)
  })

  it('is false once the lock window has passed', () => {
    const sevenMonthsAgo = new Date()
    sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 7)
    expect(isDoNotCallLocked(true, sevenMonthsAgo.toISOString())).toBe(false)
  })
})

describe('isPartnershipAllDone', () => {
  it('is false for a partnership with zero assigned records (searching a fresh territory)', () => {
    expect(isPartnershipAllDone([])).toBe(false)
  })

  it('is true once every record is completed', () => {
    expect(
      isPartnershipAllDone([
        record({ id: 'a', completedAt: '2026-01-01T00:00:00Z' }),
        record({ id: 'b', completedAt: '2026-01-01T00:00:00Z' }),
      ])
    ).toBe(true)
  })

  it('is false while any non-locked record is still uncompleted', () => {
    expect(
      isPartnershipAllDone([record({ id: 'a', completedAt: '2026-01-01T00:00:00Z' }), record({ id: 'b', completedAt: null })])
    ).toBe(false)
  })

  it('excuses a record still locked under the Do Not Call cooldown, even with no completed_at', () => {
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    expect(
      isPartnershipAllDone([
        record({ id: 'a', completedAt: '2026-01-01T00:00:00Z' }),
        record({ id: 'b', completedAt: null, doNotCall: true, doNotCallAt: oneMonthAgo.toISOString() }),
      ])
    ).toBe(true)
  })

  it('does not excuse a record whose Do Not Call lock has already expired', () => {
    const sevenMonthsAgo = new Date()
    sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 7)
    expect(
      isPartnershipAllDone([
        record({ id: 'a', completedAt: '2026-01-01T00:00:00Z' }),
        record({ id: 'b', completedAt: null, doNotCall: true, doNotCallAt: sevenMonthsAgo.toISOString() }),
      ])
    ).toBe(false)
  })

  // Real bug found live (2026-07-19): a multi-record household only ever gets completed_at
  // stamped on whichever single record the visit was logged against — the sibling record(s)
  // never get their own completed_at. An un-grouped every-record check could never reach "done"
  // for a household even after the whole address was genuinely visited, blocking Sync & Finish.
  it('treats a household (shared Plus Code) as done once any one member is completed', () => {
    expect(
      isPartnershipAllDone([
        record({ id: 'a', plusCode: 'PLUS1', completedAt: '2026-01-01T00:00:00Z' }),
        record({ id: 'b', plusCode: 'PLUS1', completedAt: null }),
      ])
    ).toBe(true)
  })

  it('does not treat two different blank-Plus-Code records as the same household', () => {
    expect(
      isPartnershipAllDone([
        record({ id: 'a', plusCode: null, completedAt: '2026-01-01T00:00:00Z' }),
        record({ id: 'b', plusCode: null, completedAt: null }),
      ])
    ).toBe(false)
  })
})
