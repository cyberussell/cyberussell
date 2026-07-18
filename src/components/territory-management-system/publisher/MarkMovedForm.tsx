'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ArrowRightLeft, LocateFixed, RefreshCw, Truck } from 'lucide-react'
import FormField, { inputClass } from '@/components/territory-management-system/dashboard/FormField'
import Card from '@/components/territory-management-system/dashboard/Card'
import { locatePlusCode } from '@/lib/territory-management-system/plusCode'

export interface MovedRecordFields {
  address: string
  unit: string
  residentName: string
  plusCode: string
  notes: string
}

// Marking a record "Moved" is never a bare status update — the publisher must either correct
// the contact info themselves (a new resident likely lives there) or recommend the Admin
// remove it, with a required reason. Collapsed behind a single trigger by default so it doesn't
// clutter every record's detail view.
export default function MarkMovedForm({
  initial,
  submitting,
  onUpdate,
  onRecommend,
  // Lets a parent skip straight past the trigger button — used by the mobile "Pass to Other /
  // Mark as Moved" button row (PublisherRecordDetailView), which only mounts this component
  // once its own "Mark as Moved" button is tapped, so the trigger itself would be redundant.
  initialMode = 'closed',
  currentRecordId,
  currentRecordLabel,
  householdRecords = [],
}: {
  initial: MovedRecordFields
  submitting: boolean
  onUpdate: (fields: MovedRecordFields) => void
  // recordId is currentRecordId unless the publisher picks a different household member on the
  // record-picker step below (only shown when householdRecords is non-empty).
  onRecommend: (reason: string, recordId: string) => void
  initialMode?: 'closed' | 'choose'
  // This record's own id/label, used as the record picker's default selection and its own radio
  // option — required even when householdRecords is empty since onRecommend always needs a
  // recordId.
  currentRecordId: string
  currentRecordLabel: string
  // Other records at this same address (same Plus Code) already assigned to this partnership —
  // see PublisherWorkspaceApp's householdRecords. Empty for a single-record household, in which
  // case the picker step is skipped entirely (nothing to choose between).
  householdRecords?: { id: string; label: string }[]
}) {
  const [mode, setMode] = useState<'closed' | 'choose' | 'edit' | 'recommend'>(initialMode)
  const [fields, setFields] = useState(initial)
  const [reason, setReason] = useState('')
  const [recommendRecordId, setRecommendRecordId] = useState(currentRecordId)
  const [locating, setLocating] = useState(false)

  async function handleUseMyLocation() {
    setLocating(true)
    try {
      const result = await locatePlusCode()
      if ('error' in result) {
        toast.error(result.error)
      } else {
        setFields((f) => ({ ...f, plusCode: result.code }))
      }
    } finally {
      setLocating(false)
    }
  }

  if (mode === 'closed') {
    return (
      <button
        type="button"
        onClick={() => setMode('choose')}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 py-2.5 text-sm font-semibold text-amber-700 transition hover:border-amber-300"
      >
        <Truck className="h-4 w-4" />
        Unlocated
      </button>
    )
  }

  if (mode === 'choose') {
    return (
      <Card className="border-amber-200 bg-amber-50 p-6">
        <h2 className="font-semibold text-[#0B1B33]">This Household Is Unlocated</h2>
        <p className="mt-1 text-sm text-slate-500">Choose one before this can be logged as Unlocated.</p>
        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={() => setMode('edit')}
            className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Update Contact Record
          </button>
          <button
            type="button"
            onClick={() => setMode('recommend')}
            className="w-full rounded-lg border border-red-200 bg-white py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300"
          >
            Recommend for Admin Removal
          </button>
          <button
            type="button"
            onClick={() => setMode('closed')}
            className="w-full text-center text-xs font-medium text-slate-400 hover:underline"
          >
            Cancel
          </button>
        </div>
      </Card>
    )
  }

  if (mode === 'edit') {
    return (
      <Card className="border-amber-200 bg-amber-50 p-6">
        <h2 className="font-semibold text-[#0B1B33]">Update Contact Record</h2>
        <p className="mt-1 text-sm text-slate-500">
          A new local foreign resident likely lives here now — update who/what is here. If it is local, recommend this record
          for admin removal
        </p>
        <div className="mt-4 space-y-4">
          <FormField label="Address">
            <input
              value={fields.address}
              onChange={(e) => setFields((f) => ({ ...f, address: e.target.value }))}
              maxLength={200}
              disabled={submitting}
              className={inputClass}
            />
          </FormField>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Unit" optional>
              <input
                value={fields.unit}
                onChange={(e) => setFields((f) => ({ ...f, unit: e.target.value }))}
                maxLength={40}
                disabled={submitting}
                className={inputClass}
              />
            </FormField>
            <FormField label="Resident name" optional>
              <input
                value={fields.residentName}
                onChange={(e) => setFields((f) => ({ ...f, residentName: e.target.value }))}
                maxLength={120}
                disabled={submitting}
                className={inputClass}
              />
            </FormField>
          </div>
          <FormField label="Plus Code" optional>
            <div className="flex gap-2">
              <input
                value={fields.plusCode}
                onChange={(e) => setFields((f) => ({ ...f, plusCode: e.target.value }))}
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
          <FormField label="Notes" optional>
            <textarea
              value={fields.notes}
              onChange={(e) => setFields((f) => ({ ...f, notes: e.target.value }))}
              maxLength={500}
              rows={2}
              disabled={submitting}
              className={inputClass}
            />
          </FormField>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => setMode('choose')}
            disabled={submitting}
            className="flex-1 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-medium text-slate-500 hover:border-[#38BDF8]/40 disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => onUpdate(fields)}
            disabled={submitting || !fields.address.trim()}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <ArrowRightLeft className="h-4 w-4" />
                Save
              </>
            )}
          </button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-red-200 bg-red-50 p-6">
      <h2 className="font-semibold text-[#0B1B33]">Recommend for Admin Removal</h2>
      <p className="mt-1 text-sm text-slate-500">Required — tell the Admin why this record should be removed.</p>
      {householdRecords.length > 0 && (
        <div className="mt-4">
          <FormField label="Which record?">
            <div className="space-y-2">
              {[{ id: currentRecordId, label: currentRecordLabel }, ...householdRecords].map((r) => (
                <label key={r.id} className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="recommendRecordId"
                    checked={recommendRecordId === r.id}
                    onChange={() => setRecommendRecordId(r.id)}
                    disabled={submitting}
                    className="h-4 w-4 border-blue-200"
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </FormField>
        </div>
      )}
      <div className="mt-4">
        <FormField label="Reason">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={500}
            rows={3}
            required
            disabled={submitting}
            className={inputClass}
            placeholder="e.g. house is vacant / demolished, resident confirmed they moved away…"
          />
        </FormField>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => setMode('choose')}
          disabled={submitting}
          className="flex-1 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-medium text-slate-500 hover:border-[#38BDF8]/40 disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => onRecommend(reason, recommendRecordId)}
          disabled={submitting || !reason.trim()}
          className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          {submitting ? 'Submitting…' : 'Submit Recommendation'}
        </button>
      </div>
    </Card>
  )
}
