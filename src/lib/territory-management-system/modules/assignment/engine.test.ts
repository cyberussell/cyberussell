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

  it('fills partnerships sequentially, in input order, up to the max per partnership', () => {
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
