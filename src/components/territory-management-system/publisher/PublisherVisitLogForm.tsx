'use client'

import { useState } from 'react'
import {
  getSelectableResults,
  mergeConductorIntoNotes,
  SELECTABLE_VISIT_RESULTS,
  VISIT_RESULT_CONDUCTOR_PROMPT,
  VISIT_RESULT_LABELS,
} from '@/lib/territory-management-system/modules/records/schema'
import { nowLocalDatetime } from '@/lib/territory-management-system/modules/records/localTime'
import FormField, { inputClass } from '@/components/territory-management-system/dashboard/FormField'
import Card from '@/components/territory-management-system/dashboard/Card'

// latestResult narrows the Status choices once a record is already an ongoing Bible Study, and
// doNotCall narrows to Do Not Call/Visited Again — see getSelectableResults in records/schema.ts.
// 'moved' is additionally excluded here regardless of doNotCall: a publisher marking a record
// moved goes through the separate forced follow-up flow (Mark as Moved, on the record detail
// view), not this plain dropdown — see PublisherRecordDetailView.
// saving disables the form while the parent is enqueuing/syncing the just-submitted visit and
// advancing to the next record — the "saving" indicator itself lives at the top of the screen
// (PublisherWorkspaceApp), not on this button.
//
// visitedAt is never editable here — every batch is single-day (a publisher only ever logs
// visits for "today"), and nothing downstream reads time-of-day precision beyond a courtesy
// display in Visit History, so an editable datetime input was one more thing to fumble with on
// a small screen for no functional benefit. Shown as a plain read-only line instead, still the
// real value that gets saved.
export default function PublisherVisitLogForm({
  latestResult,
  doNotCall,
  saving,
  onLogVisit,
}: {
  latestResult?: string | null
  doNotCall?: boolean
  saving: boolean
  onLogVisit: (visitedAt: string, result: string, notes: string) => void
}) {
  const [visitedAt, setVisitedAt] = useState(nowLocalDatetime())
  const [result, setResult] = useState<(typeof SELECTABLE_VISIT_RESULTS)[number] | ''>('')
  const [conductorName, setConductorName] = useState('')
  const [notes, setNotes] = useState('')
  const selectableResults = getSelectableResults(latestResult, doNotCall).filter((r) => r !== 'moved')
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
        <FormField label="Status">
          <select
            required
            disabled={saving}
            value={result}
            onChange={(e) => setResult(e.target.value as (typeof SELECTABLE_VISIT_RESULTS)[number])}
            className={inputClass}
          >
            <option value="" disabled>
              Select a status…
            </option>
            {selectableResults.map((r) => (
              <option key={r} value={r}>
                {VISIT_RESULT_LABELS[r]}
              </option>
            ))}
          </select>
        </FormField>
        {conductorPrompt && (
          <FormField label={conductorPrompt}>
            <input
              value={conductorName}
              onChange={(e) => setConductorName(e.target.value)}
              required
              disabled={saving}
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
            disabled={saving}
            className={inputClass}
          />
        </FormField>
        <p className="text-xs text-slate-600">
          Visited {new Date(visitedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          Log Visit
        </button>
      </form>
    </Card>
  )
}
