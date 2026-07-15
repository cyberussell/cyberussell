import { describe, it, expect } from 'vitest'
import { calculateAssignment, isAssignmentError } from './engine'

describe('calculateAssignment', () => {
  it('rejects a non-integer or zero partnership count', () => {
    expect(isAssignmentError(calculateAssignment(['a', 'b'], 0))).toBe(true)
    expect(isAssignmentError(calculateAssignment(['a', 'b'], 1.5))).toBe(true)
    expect(isAssignmentError(calculateAssignment(['a', 'b'], -1))).toBe(true)
  })

  it('rejects fewer records than partnerships', () => {
    const result = calculateAssignment(['a', 'b'], 3)
    expect(isAssignmentError(result)).toBe(true)
  })

  it('fills partnerships sequentially, in input order, up to the max per partnership, leaving excess records unassigned for another day', () => {
    const records = Array.from({ length: 10 }, (_, i) => `r${i}`)
    const result = calculateAssignment(records, 2, 4)
    expect(isAssignmentError(result)).toBe(false)
    if (isAssignmentError(result)) return
    expect(result.partnerships).toEqual([
      { sequence: 1, recordIds: ['r0', 'r1', 'r2', 'r3'] },
      { sequence: 2, recordIds: ['r4', 'r5', 'r6', 'r7'] },
    ])
    expect(result.unassignedCount).toBe(2)
  })

  it('rejects a partnership count that would leave some partnerships with zero records', () => {
    // 9 records can fully cover at most ceil(9/6)=2 partnerships at the default 6-record cap —
    // requesting 3 would leave the 3rd partnership empty, so it's rejected up front instead.
    const records = Array.from({ length: 9 }, (_, i) => `r${i}`)
    const result = calculateAssignment(records, 3)
    expect(isAssignmentError(result)).toBe(true)
    if (!isAssignmentError(result)) return
    expect(result.error).toContain('Not enough approved records')
  })

  it('allows a partnership count exactly at the record-supported ceiling', () => {
    const records = Array.from({ length: 9 }, (_, i) => `r${i}`)
    const result = calculateAssignment(records, 2)
    expect(isAssignmentError(result)).toBe(false)
    if (isAssignmentError(result)) return
    expect(result.partnerships[0].recordIds).toHaveLength(6)
    expect(result.partnerships[1].recordIds).toHaveLength(3)
    expect(result.unassignedCount).toBe(0)
  })

  // Regression coverage for the two worked examples given when this rule was designed.
  it('matches the 50-records/20-publishers/group-of-2 example: 10 partnerships requested, only 9 are supportable', () => {
    const records = Array.from({ length: 50 }, (_, i) => `r${i}`)
    expect(isAssignmentError(calculateAssignment(records, 10))).toBe(true)
  })

  it('matches the 50-records/10-publishers/group-of-2 example: 5 partnerships requested, well within the 9 supportable', () => {
    const records = Array.from({ length: 50 }, (_, i) => `r${i}`)
    const result = calculateAssignment(records, 5)
    expect(isAssignmentError(result)).toBe(false)
    if (isAssignmentError(result)) return
    expect(result.unassignedCount).toBe(20) // 5 partnerships x 6 = 30 assigned, 20 left for another day
  })

  it('fills each partnership to the max before moving to the next, giving the last one the remainder', () => {
    const records = ['a', 'b', 'c']
    const result = calculateAssignment(records, 2, 2)
    expect(isAssignmentError(result)).toBe(false)
    if (isAssignmentError(result)) return
    expect(result.partnerships[0].recordIds).toEqual(['a', 'b'])
    expect(result.partnerships[1].recordIds).toEqual(['c'])
    expect(result.unassignedCount).toBe(0)
  })

  // Regression coverage: zero eligible records used to hard-error ("No approved records are
  // available"), which blocked a Group Leader from ever generating an assignment for a
  // brand-new/unmapped territory. It must now succeed with every partnership getting an empty
  // record list instead.
  it('creates empty-record partnerships for a territory with zero eligible records, instead of erroring', () => {
    const result = calculateAssignment([], 3)
    expect(isAssignmentError(result)).toBe(false)
    if (isAssignmentError(result)) return
    expect(result.partnerships).toEqual([
      { sequence: 1, recordIds: [] },
      { sequence: 2, recordIds: [] },
      { sequence: 3, recordIds: [] },
    ])
    expect(result.unassignedCount).toBe(0)
  })

  it('still requires a valid partnership count even with zero records', () => {
    expect(isAssignmentError(calculateAssignment([], 0))).toBe(true)
  })
})
