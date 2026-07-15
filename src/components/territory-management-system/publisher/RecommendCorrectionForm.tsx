'use client'

import { useState } from 'react'
import { MapPinned, RefreshCw } from 'lucide-react'
import FormField, { inputClass } from '@/components/territory-management-system/dashboard/FormField'
import Card from '@/components/territory-management-system/dashboard/Card'

export interface CorrectionFields {
  plusCode: string
  reason: string
}

// Lets a publisher recommend a correction to a record's info (most commonly a wrong Plus Code)
// without editing it directly — the Admin reviews and applies or dismisses it from the Flagged
// for Correction list, same review-gated pattern as "Recommend for Admin Removal". Collapsed
// behind a trigger button by default, same convention as MarkMovedForm.
export default function RecommendCorrectionForm({
  currentPlusCode,
  submitting,
  onSubmit,
  // Lets a parent skip straight past the trigger button — used by the mobile "Pass / Moved /
  // Update" button row, which only mounts this component once its own "Update" button is
  // tapped.
  initialOpen = false,
}: {
  currentPlusCode: string
  submitting: boolean
  onSubmit: (fields: CorrectionFields) => void
  initialOpen?: boolean
}) {
  const [open, setOpen] = useState(initialOpen)
  const [plusCode, setPlusCode] = useState(currentPlusCode)
  const [reason, setReason] = useState('')

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-semibold text-[#2563EB] transition hover:border-[#38BDF8]/40"
      >
        <MapPinned className="h-4 w-4" />
        Update
      </button>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="font-semibold text-[#0B1B33]">Recommend a Correction</h2>
      <p className="mt-1 text-sm text-slate-500">Wrong Plus Code or other info? Let the Admin know what it should be.</p>
      <div className="mt-4 space-y-4">
        <FormField label="Correct Plus Code">
          <input
            value={plusCode}
            onChange={(e) => setPlusCode(e.target.value)}
            maxLength={20}
            disabled={submitting}
            className={inputClass}
            placeholder="e.g. 7FG8+4V"
          />
        </FormField>
        <FormField label="Note to Admin">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={500}
            rows={3}
            disabled={submitting}
            className={inputClass}
            placeholder="Explain what's wrong and why…"
          />
        </FormField>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={submitting}
          className="flex-1 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-medium text-slate-500 hover:border-[#38BDF8]/40 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSubmit({ plusCode: plusCode.trim(), reason: reason.trim() })}
          disabled={submitting || !plusCode.trim() || !reason.trim()}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {submitting ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            'Send to Admin'
          )}
        </button>
      </div>
    </Card>
  )
}
