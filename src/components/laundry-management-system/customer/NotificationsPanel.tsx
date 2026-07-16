'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, X } from 'lucide-react'
import type { NotificationEvent } from '@/lib/laundry-management-system/modules/orders/notifications'

export default function NotificationsPanel({ events }: { events: NotificationEvent[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-teal-100/60 bg-white shadow-sm transition hover:border-[#22D3EE]/40"
      >
        <Bell className="h-5 w-5 text-[#0B1B33]" />
        {events.length > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#0D9488]" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/30"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[70vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl"
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#0B1B33]">Notifications</h2>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              {events.length === 0 ? (
                <p className="pb-4 text-sm text-slate-400">Nothing yet — updates on your orders will show up here.</p>
              ) : (
                <ul className="space-y-3 pb-4">
                  {events.map((event, i) => (
                    <motion.li
                      key={event.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="rounded-2xl bg-[#F0FDFA] p-3.5"
                    >
                      <p className="text-sm text-[#0B1B33]">{event.message}</p>
                      <p className="mt-1 text-xs text-slate-400">{new Date(event.timestamp).toLocaleString('en-US')}</p>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
