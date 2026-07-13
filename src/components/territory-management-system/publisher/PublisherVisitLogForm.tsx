'use client'

import { useState } from 'react'
import { VISIT_RESULT_LABELS, VISIT_RESULTS } from '@/lib/territory-management-system/modules/records/schema'
import FormField, { inputClass } from '@/components/territory-management-system/dashboard/FormField'
import Card from '@/components/territory-management-system/dashboard/Card'

function nowLocalDatetime() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

export default function PublisherVisitLogForm({
  onLogVisit,
}: {
  onLogVisit: (visitedAt: string, result: string, notes: string) => void
}) {
  const [visitedAt, setVisitedAt] = useState(nowLocalDatetime())
  const [result, setResult] = useState<(typeof VISIT_RESULTS)[number]>('initial_visit')
  const [notes, setNotes] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onLogVisit(visitedAt, result, notes)
    setNotes('')
    setVisitedAt(nowLocalDatetime())
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 font-semibold text-[#0B1B33]">Record a Visit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Visited at">
            <input
              type="datetime-local"
              required
              value={visitedAt}
              onChange={(e) => setVisitedAt(e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="Result">
            <select
              value={result}
              onChange={(e) => setResult(e.target.value as (typeof VISIT_RESULTS)[number])}
              className={inputClass}
            >
              {VISIT_RESULTS.map((r) => (
                <option key={r} value={r}>
                  {VISIT_RESULT_LABELS[r]}
                </option>
              ))}
            </select>
          </FormField>
        </div>
        <FormField label="Notes" optional>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} rows={2} className={inputClass} />
        </FormField>
        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Log Visit
        </button>
      </form>
    </Card>
  )
}
