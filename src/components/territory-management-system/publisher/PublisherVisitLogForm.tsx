'use client'

import { useState } from 'react'
import {
  mergeConductorIntoNotes,
  SELECTABLE_VISIT_RESULTS,
  VISIT_RESULT_CONDUCTOR_PROMPT,
  VISIT_RESULT_LABELS,
} from '@/lib/territory-management-system/modules/records/schema'
import { nowLocalDatetime } from '@/lib/territory-management-system/modules/records/localTime'
import FormField, { inputClass } from '@/components/territory-management-system/dashboard/FormField'
import Card from '@/components/territory-management-system/dashboard/Card'

export default function PublisherVisitLogForm({
  onLogVisit,
}: {
  onLogVisit: (visitedAt: string, result: string, notes: string) => void
}) {
  const [visitedAt, setVisitedAt] = useState(nowLocalDatetime())
  const [result, setResult] = useState<(typeof SELECTABLE_VISIT_RESULTS)[number] | ''>('')
  const [conductorName, setConductorName] = useState('')
  const [notes, setNotes] = useState('')
  const notesRequired = result === 'other'
  const conductorPrompt = result ? VISIT_RESULT_CONDUCTOR_PROMPT[result] : undefined

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!result) return
    // Merged here, client-side, before the offline queue item is even created — the eventual
    // sync payload just carries an ordinary "notes" string, no special handling needed once it
    // reaches logPublisherVisitAction.
    onLogVisit(visitedAt, result, mergeConductorIntoNotes(conductorName, notes))
    setResult('')
    setConductorName('')
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
              required
              value={result}
              onChange={(e) => setResult(e.target.value as (typeof SELECTABLE_VISIT_RESULTS)[number])}
              className={inputClass}
            >
              <option value="" disabled>
                Select a result…
              </option>
              {SELECTABLE_VISIT_RESULTS.map((r) => (
                <option key={r} value={r}>
                  {VISIT_RESULT_LABELS[r]}
                </option>
              ))}
            </select>
          </FormField>
        </div>
        {conductorPrompt && (
          <FormField label={conductorPrompt}>
            <input
              value={conductorName}
              onChange={(e) => setConductorName(e.target.value)}
              required
              maxLength={80}
              className={inputClass}
            />
          </FormField>
        )}
        <FormField label="Notes" optional={!notesRequired}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={500}
            rows={2}
            required={notesRequired}
            className={inputClass}
          />
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
