import { describe, it, expect } from 'vitest'
import { isValidTransition, isTerminalStatus, getNextStatuses } from './stateMachine'

describe('order state machine', () => {
  it('allows the normal happy-path sequence', () => {
    expect(isValidTransition('received', 'sorting')).toBe(true)
    expect(isValidTransition('sorting', 'washing')).toBe(true)
    expect(isValidTransition('washing', 'drying')).toBe(true)
    expect(isValidTransition('drying', 'folding')).toBe(true)
    expect(isValidTransition('folding', 'ready_for_pickup')).toBe(true)
  })

  it('allows ready_for_pickup to skip straight to completed (in-person pickup)', () => {
    expect(isValidTransition('ready_for_pickup', 'completed')).toBe(true)
  })

  it('allows ready_for_pickup to go to out_for_delivery, then completed', () => {
    expect(isValidTransition('ready_for_pickup', 'out_for_delivery')).toBe(true)
    expect(isValidTransition('out_for_delivery', 'completed')).toBe(true)
  })

  it('allows cancellation from any non-terminal status', () => {
    for (const status of ['received', 'sorting', 'washing', 'drying', 'folding', 'ready_for_pickup', 'out_for_delivery'] as const) {
      expect(isValidTransition(status, 'cancelled')).toBe(true)
    }
  })

  it('rejects skipping steps out of order', () => {
    expect(isValidTransition('received', 'folding')).toBe(false)
    expect(isValidTransition('sorting', 'ready_for_pickup')).toBe(false)
  })

  it('rejects moving backward', () => {
    expect(isValidTransition('folding', 'washing')).toBe(false)
    expect(isValidTransition('completed', 'ready_for_pickup')).toBe(false)
  })

  it('rejects any transition out of a terminal status', () => {
    expect(getNextStatuses('completed')).toEqual([])
    expect(getNextStatuses('cancelled')).toEqual([])
    expect(isValidTransition('completed', 'sorting')).toBe(false)
    expect(isValidTransition('cancelled', 'received')).toBe(false)
  })

  it('treats a same-status "transition" as valid (no-op save)', () => {
    expect(isValidTransition('washing', 'washing')).toBe(true)
  })

  it('isTerminalStatus matches completed and cancelled only', () => {
    expect(isTerminalStatus('completed')).toBe(true)
    expect(isTerminalStatus('cancelled')).toBe(true)
    expect(isTerminalStatus('washing')).toBe(false)
  })
})
