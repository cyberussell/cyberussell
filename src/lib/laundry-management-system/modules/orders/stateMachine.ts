import type { OrderStatus } from './types'

// The full happy-path sequence, in order — used for rendering (e.g. progress
// position) wherever the workflow needs to be shown as a line, not just checked.
export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  'received',
  'sorting',
  'washing',
  'drying',
  'folding',
  'ready_for_pickup',
  'out_for_delivery',
  'completed',
]

export const TERMINAL_STATUSES: OrderStatus[] = ['completed', 'cancelled']

// The actual state machine: every status maps to the statuses it's allowed to
// move to next. Cancelled is reachable from any non-terminal step; completed
// and cancelled are both terminal (no further transitions). `ready_for_pickup`
// can go straight to `completed` (in-person pickup) without `out_for_delivery`
// (which is only for orders that get delivered instead of picked up).
export const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  received: ['sorting', 'cancelled'],
  sorting: ['washing', 'cancelled'],
  washing: ['drying', 'cancelled'],
  drying: ['folding', 'cancelled'],
  folding: ['ready_for_pickup', 'cancelled'],
  ready_for_pickup: ['out_for_delivery', 'completed', 'cancelled'],
  out_for_delivery: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
}

export function getNextStatuses(current: OrderStatus): OrderStatus[] {
  return ALLOWED_TRANSITIONS[current] ?? []
}

export function isValidTransition(from: OrderStatus, to: OrderStatus): boolean {
  return from === to || getNextStatuses(from).includes(to)
}

export function isTerminalStatus(status: OrderStatus): boolean {
  return TERMINAL_STATUSES.includes(status)
}
