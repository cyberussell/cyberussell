'use client'

import { useState } from 'react'
import type { BusinessHours, DayHours } from '@/lib/laundry-management-system/modules/tenant/types'

const DAYS: { key: keyof BusinessHours; label: string }[] = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
]

const DEFAULT_DAY: DayHours = { closed: false, open: '08:00', close: '18:00' }

function defaultHours(): BusinessHours {
  return DAYS.reduce((acc, { key }) => {
    acc[key] = key === 'sun' ? { ...DEFAULT_DAY, closed: true } : { ...DEFAULT_DAY }
    return acc
  }, {} as BusinessHours)
}

function mergeWithDefaults(initial?: Partial<BusinessHours>): BusinessHours {
  const base = defaultHours()
  if (!initial) return base
  return DAYS.reduce((acc, { key }) => {
    acc[key] = initial[key] ? { ...base[key], ...initial[key] } : base[key]
    return acc
  }, {} as BusinessHours)
}

// Renders a 7-day open/close picker and mirrors its value into a hidden JSON
// input so it can be submitted alongside a plain <form action={serverAction}>.
// `light` swaps the dark-on-navy auth styling for the light dashboard theme.
export default function BusinessHoursInput({
  name = 'businessHours',
  initialValue,
  light = false,
}: {
  name?: string
  initialValue?: Partial<BusinessHours>
  light?: boolean
}) {
  const [hours, setHours] = useState<BusinessHours>(() => mergeWithDefaults(initialValue))

  function updateDay(day: keyof BusinessHours, patch: Partial<DayHours>) {
    setHours((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }))
  }

  const labelClass = light ? 'text-sm text-slate-600' : 'text-sm text-white/60'
  const containerClass = light
    ? 'mt-1 space-y-1.5 rounded-lg border border-blue-100 bg-[#F8FBFF] p-3'
    : 'mt-1 space-y-1.5 rounded-lg border border-white/10 bg-white/5 p-3'
  const dayLabelClass = light ? 'w-9 text-slate-500' : 'w-9 text-white/60'
  const checkboxLabelClass = light ? 'flex items-center gap-1.5 text-slate-400' : 'flex items-center gap-1.5 text-white/50'
  const timeInputClass = light
    ? 'rounded border border-blue-100 bg-white px-1.5 py-0.5 text-[#0B1B33]'
    : 'rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-white'
  const dashClass = light ? 'text-slate-300' : 'text-white/30'

  return (
    <div>
      <span className={labelClass}>Business hours</span>
      <div className={containerClass}>
        {DAYS.map(({ key, label }) => {
          const day = hours[key]
          return (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span className={dayLabelClass}>{label}</span>
              <label className={checkboxLabelClass}>
                <input
                  type="checkbox"
                  checked={day.closed}
                  onChange={(e) => updateDay(key, { closed: e.target.checked })}
                  className="accent-[#38BDF8]"
                />
                Closed
              </label>
              {!day.closed && (
                <>
                  <input
                    type="time"
                    value={day.open}
                    onChange={(e) => updateDay(key, { open: e.target.value })}
                    className={timeInputClass}
                  />
                  <span className={dashClass}>–</span>
                  <input
                    type="time"
                    value={day.close}
                    onChange={(e) => updateDay(key, { close: e.target.value })}
                    className={timeInputClass}
                  />
                </>
              )}
            </div>
          )
        })}
      </div>
      <input type="hidden" name={name} value={JSON.stringify(hours)} />
    </div>
  )
}
