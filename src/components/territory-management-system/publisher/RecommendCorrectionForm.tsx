'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { LocateFixed, PencilLine, RefreshCw } from 'lucide-react'
import FormField, { inputClass } from '@/components/territory-management-system/dashboard/FormField'
import Card from '@/components/territory-management-system/dashboard/Card'
import { locatePlusCode } from '@/lib/territory-management-system/plusCode'

export interface CorrectionFields {
  plusCode: string
  reason: string
  sectionId: string
  blockId: string
}

// Lets a publisher recommend a correction to a record's info (most commonly a wrong Plus Code,
// now also Section/Block — see 030_correction_section_block.sql) without editing it directly —
// the Admin reviews and applies or dismisses it from the Flagged for Correction list, same
// review-gated pattern as "Recommend for Admin Removal". Collapsed behind a trigger button by
// default, same convention as MarkMovedForm.
export default function RecommendCorrectionForm({
  currentPlusCode,
  currentSectionId,
  currentBlockId,
  sections,
  submitting,
  onSubmit,
  // Lets a parent skip straight past the trigger button — used by the mobile "Pass / Unlocated /
  // Update" button row, which only mounts this component once its own "Update" button is
  // tapped.
  initialOpen = false,
}: {
  currentPlusCode: string
  // The record's own territory's Section/Block structure — always known since this form is only
  // ever opened from an actual Contact Record (assigned or search-scope), never a bare location.
  // Section/Block start prefilled to the record's current values rather than blank.
  currentSectionId: string
  currentBlockId: string
  sections: { id: string; label: string; blocks: { id: string; label: string }[] }[]
  submitting: boolean
  onSubmit: (fields: CorrectionFields) => void
  initialOpen?: boolean
}) {
  const [open, setOpen] = useState(initialOpen)
  const [plusCode, setPlusCode] = useState(currentPlusCode)
  const [reason, setReason] = useState('')
  const [locating, setLocating] = useState(false)
  const [sectionId, setSectionId] = useState(currentSectionId)
  const [blockId, setBlockId] = useState(currentBlockId)
  const blockOptions = sections.find((s) => s.id === sectionId)?.blocks ?? []

  function handleSectionChange(id: string) {
    setSectionId(id)
    const s = sections.find((x) => x.id === id)
    setBlockId(s?.blocks[0]?.id ?? '')
  }

  async function handleUseMyLocation() {
    setLocating(true)
    try {
      const result = await locatePlusCode()
      if ('error' in result) {
        toast.error(result.error)
      } else {
        setPlusCode(result.code)
      }
    } finally {
      setLocating(false)
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-semibold text-[#2563EB] transition hover:border-[#38BDF8]/40"
      >
        <PencilLine className="h-4 w-4" />
        Correction
      </button>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="font-semibold text-[#0B1B33]">Recommend a Correction</h2>
      <p className="mt-1 text-sm text-slate-500">Wrong Plus Code or other info? Let the Admin know what it should be.</p>
      <div className="mt-4 space-y-4">
        <FormField label="Correct Plus Code">
          <div className="flex gap-2">
            <input
              value={plusCode}
              onChange={(e) => setPlusCode(e.target.value)}
              maxLength={20}
              disabled={submitting}
              className={`${inputClass} min-w-0 flex-1`}
              placeholder="e.g. 7FG8+4V"
            />
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={submitting || locating}
              title="Use my current location"
              aria-label="Use my current location"
              className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-white px-3 text-sm font-medium text-[#2563EB] transition hover:border-[#38BDF8]/40 disabled:opacity-50"
            >
              {locating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
            </button>
          </div>
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Section">
            <select value={sectionId} onChange={(e) => handleSectionChange(e.target.value)} disabled={submitting} className={inputClass}>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  Section {s.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Block">
            <select
              value={blockId}
              onChange={(e) => setBlockId(e.target.value)}
              disabled={submitting || blockOptions.length === 0}
              className={inputClass}
            >
              {blockOptions.map((b) => (
                <option key={b.id} value={b.id}>
                  Block {b.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>
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
          onClick={() => onSubmit({ plusCode: plusCode.trim(), reason: reason.trim(), sectionId, blockId })}
          disabled={submitting || !plusCode.trim() || !reason.trim() || !sectionId || !blockId}
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
