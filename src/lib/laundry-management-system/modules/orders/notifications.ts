import type { Order } from './types'

export interface NotificationEvent {
  id: string
  message: string
  timestamp: string
}

// Synthesizes an in-app notification feed from existing order timestamps —
// no separate notifications table. Each order can contribute up to 3 events
// (placed / ready / picked up), sorted newest-first.
export function buildNotifications(orders: Order[], limit = 15): NotificationEvent[] {
  const events: NotificationEvent[] = []

  for (const order of orders) {
    events.push({
      id: `${order.id}-created`,
      message: `Your ${order.service_label} order was placed.`,
      timestamp: order.created_at,
    })
    if (order.ready_at) {
      events.push({
        id: `${order.id}-ready`,
        message: `Your ${order.service_label} order is ready for pickup!`,
        timestamp: order.ready_at,
      })
    }
    if (order.completed_at) {
      events.push({
        id: `${order.id}-completed`,
        message: `Your ${order.service_label} order was picked up. Thank you!`,
        timestamp: order.completed_at,
      })
    }
  }

  return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit)
}
