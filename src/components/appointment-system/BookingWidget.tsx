'use client'

import { useState } from 'react'
import type { Service, Slot } from '@/lib/appointment-system/types'

type Step = 'service' | 'slot' | 'details' | 'done'

export default function BookingWidget({
  clinicSlug,
  services,
}: {
  clinicSlug: string
  services: Service[]
}) {
  const [step, setStep] = useState<Step>('service')
  const [serviceId, setServiceId] = useState<string | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [slot, setSlot] = useState<Slot | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function pickService(id: string) {
    setServiceId(id)
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `/appointments/api/book?clinic=${encodeURIComponent(clinicSlug)}&service=${encodeURIComponent(id)}`
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to load slots')
      setSlots(data.slots ?? [])
      setStep('slot')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!serviceId || !slot) return
    const form = new FormData(e.currentTarget)
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/appointments/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinicSlug,
          serviceId,
          staffId: slot.staffId,
          startsAt: slot.startsAt,
          fullName: String(form.get('fullName') ?? ''),
          phone: String(form.get('phone') ?? ''),
          note: String(form.get('note') ?? '') || undefined,
        }),
      })
      const data = await res.json()
      if (res.status === 409) {
        setError('That slot was just taken — please pick another one.')
        await pickService(serviceId)
        return
      }
      if (!res.ok) throw new Error(data.error ?? 'Booking failed')
      setStep('done')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (services.length === 0) {
    return (
      <p className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center text-sm text-slate-400">
        Online booking isn&apos;t set up yet — please message or call the clinic directly.
      </p>
    )
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      {step === 'service' && (
        <div className="space-y-2">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => pickService(s.id)}
              disabled={loading}
              className="w-full rounded-lg border border-slate-700 px-4 py-3 text-left hover:border-emerald-400 transition disabled:opacity-50"
            >
              <span className="font-medium">{s.name}</span>
              <span className="ml-2 text-sm text-slate-400">
                {s.duration_min} min · ₱{Number(s.price).toFixed(0)}
              </span>
            </button>
          ))}
        </div>
      )}

      {step === 'slot' && (
        <div>
          <button onClick={() => setStep('service')} className="mb-3 text-xs text-slate-400 hover:text-white">
            ← Change service
          </button>
          {slots.length === 0 ? (
            <p className="text-sm text-slate-400">No open slots in the next 2 weeks — please message the clinic.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {slots.map((s) => (
                <button
                  key={`${s.staffId}-${s.startsAt}`}
                  onClick={() => {
                    setSlot(s)
                    setStep('details')
                  }}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:border-emerald-400 transition"
                >
                  {s.label}
                  <span className="block text-xs text-slate-500">{s.staffName}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 'details' && slot && (
        <form onSubmit={submit} className="space-y-3">
          <button
            type="button"
            onClick={() => setStep('slot')}
            className="text-xs text-slate-400 hover:text-white"
          >
            ← Change time
          </button>
          <p className="text-sm">
            <span className="text-slate-400">Booking:</span> {slot.label} with {slot.staffName}
          </p>
          <input
            name="fullName"
            required
            minLength={2}
            placeholder="Full name"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
          />
          <input
            name="phone"
            required
            minLength={10}
            placeholder="Mobile number (09XXXXXXXXX)"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
          />
          <textarea
            name="note"
            rows={2}
            placeholder="Anything the clinic should know? (optional)"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-500 py-2.5 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition"
          >
            {loading ? 'Booking…' : 'Confirm booking'}
          </button>
        </form>
      )}

      {step === 'done' && (
        <div className="py-6 text-center">
          <p className="text-2xl">✅</p>
          <p className="mt-2 font-semibold">You&apos;re booked!</p>
          <p className="mt-1 text-sm text-slate-400">
            {slot?.label} with {slot?.staffName}. See you!
          </p>
        </div>
      )}
    </div>
  )
}
