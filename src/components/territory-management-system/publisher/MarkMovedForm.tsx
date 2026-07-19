'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ArrowRightLeft, LocateFixed, RefreshCw, Send, Truck } from 'lucide-react'
import FormField, { inputClass } from '@/components/territory-management-system/dashboard/FormField'
import Card from '@/components/territory-management-system/dashboard/Card'
import { locatePlusCode } from '@/lib/territory-management-system/plusCode'
import type { TerritoryStructure } from '@/lib/territory-management-system/modules/territory/types'

export interface MovedRecordFields {
  address: string
  unit: string
  residentName: string
  plusCode: string
  householdMembers: string
  notes: string
}

// Submitted by the "Recommend New Location" path — deliberately no residentName (same person,
// only the location changes, so nothing to recommend there) and admin-review-gated, unlike
// MovedRecordFields/onUpdate which writes directly. Territory/Section/Block are the *new*
// location's — the moved person may now live in a different barangay entirely, not just a
// different address within the same one.
export interface MoveRecommendFields {
  address: string
  unit: string
  plusCode: string
  householdMembers: string
  notes: string
  territoryId: string
  sectionId: string
  blockId: string
}

// Marking a record "Moved" is never a bare status update — the publisher must pick one of three
// paths: a different person lives here now (update directly), the same person moved and the
// current resident knows where to (recommend the new location for Admin approval), or recommend
// the Admin remove it outright, with a required reason. Collapsed behind a single trigger by
// default so it doesn't clutter every record's detail view.
export default function MarkMovedForm({
  initial,
  submitting,
  onUpdate,
  onRecommendMove,
  onRecommend,
  // Lets a parent skip straight past the trigger button — used by the mobile "Pass to Other /
  // Mark as Moved" button row (PublisherRecordDetailView), which only mounts this component
  // once its own "Mark as Moved" button is tapped, so the trigger itself would be redundant.
  initialMode = 'closed',
  currentRecordId,
  currentRecordLabel,
  householdRecords = [],
  territories,
  currentTerritoryId,
}: {
  initial: MovedRecordFields
  submitting: boolean
  // "Update Current Resident" — a different person lives here now, direct/instant write, no
  // Admin review (same trust level as logging a visit).
  onUpdate: (fields: MovedRecordFields) => void
  // "Recommend New Location" — the same person moved and the current resident here knows where
  // to. Review-gated like onRecommend below: nothing changes on the record until the Admin
  // applies it.
  onRecommendMove: (fields: MoveRecommendFields) => void
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
  // Every congregation territory (not just this batch's own) — the moved person may now live in
  // a barangay this partnership was never assigned to. Only used by "Recommend New Location".
  territories: TerritoryStructure[]
  // The record's own current territory — the Barangay/Section/Block pickers default here so a
  // publisher who's only updating the address within the same barangay doesn't have to touch them.
  currentTerritoryId: string
}) {
  const [mode, setMode] = useState<'closed' | 'choose' | 'updateCurrent' | 'recommendMove' | 'recommend'>(initialMode)
  const [fields, setFields] = useState(initial)
  const [reason, setReason] = useState('')
  const [recommendRecordId, setRecommendRecordId] = useState(currentRecordId)
  const [locating, setLocating] = useState(false)
  const [moveTerritoryId, setMoveTerritoryId] = useState(currentTerritoryId)
  const moveTerritory = territories.find((t) => t.id === moveTerritoryId)
  const [moveSectionId, setMoveSectionId] = useState(moveTerritory?.sections[0]?.id ?? '')
  const moveSection = moveTerritory?.sections.find((s) => s.id === moveSectionId)
  const [moveBlockId, setMoveBlockId] = useState(moveSection?.blocks[0]?.id ?? '')

  function handleMoveTerritoryChange(id: string) {
    setMoveTerritoryId(id)
    const t = territories.find((x) => x.id === id)
    const firstSection = t?.sections[0]
    setMoveSectionId(firstSection?.id ?? '')
    setMoveBlockId(firstSection?.blocks[0]?.id ?? '')
  }

  function handleMoveSectionChange(id: string) {
    setMoveSectionId(id)
    const s = moveTerritory?.sections.find((x) => x.id === id)
    setMoveBlockId(s?.blocks[0]?.id ?? '')
  }

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
            onClick={() => setMode('updateCurrent')}
            className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Update Current Resident
          </button>
          <button
            type="button"
            onClick={() => setMode('recommendMove')}
            className="w-full rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-semibold text-[#2563EB] transition hover:border-[#38BDF8]/40"
          >
            Recommend New Location
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

  if (mode === 'updateCurrent') {
    return (
      <Card className="border-amber-200 bg-amber-50 p-6">
        <h2 className="font-semibold text-[#0B1B33]">Update Current Resident</h2>
        <p className="mt-1 text-sm text-slate-500">A different person lives here now — update who's currently at this address.</p>
        <div className="mt-4 space-y-4">
          <FormField label="Unit" optional>
            <input
              value={fields.unit}
              onChange={(e) => setFields((f) => ({ ...f, unit: e.target.value }))}
              maxLength={40}
              disabled={submitting}
              className={inputClass}
            />
          </FormField>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Address">
              <input
                value={fields.address}
                onChange={(e) => setFields((f) => ({ ...f, address: e.target.value }))}
                maxLength={200}
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
          <FormField label="Household Members" optional>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={fields.householdMembers}
              onChange={(e) => setFields((f) => ({ ...f, householdMembers: e.target.value }))}
              disabled={submitting}
              className={inputClass}
            />
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

  if (mode === 'recommendMove') {
    return (
      <Card className="border-amber-200 bg-amber-50 p-6">
        <h2 className="font-semibold text-[#0B1B33]">Recommend New Location</h2>
        <p className="mt-1 text-sm text-slate-500">
          The current resident here knows where the person who used to live here moved to. This is sent to the Admin for
          approval — nothing changes on this record until it's applied.
        </p>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField label="Barangay">
              <select
                value={moveTerritoryId}
                onChange={(e) => handleMoveTerritoryChange(e.target.value)}
                disabled={submitting}
                className={inputClass}
              >
                {territories.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.description || t.name}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Section">
              <select
                value={moveSectionId}
                onChange={(e) => handleMoveSectionChange(e.target.value)}
                disabled={submitting || !moveTerritory?.sections.length}
                className={inputClass}
              >
                {moveTerritory?.sections.map((s) => (
                  <option key={s.id} value={s.id}>
                    Section {s.label}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Block">
              <select
                value={moveBlockId}
                onChange={(e) => setMoveBlockId(e.target.value)}
                disabled={submitting || !moveSection?.blocks.length}
                className={inputClass}
              >
                {moveSection?.blocks.map((b) => (
                  <option key={b.id} value={b.id}>
                    Block {b.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
          <FormField label="Unit" optional>
            <input
              value={fields.unit}
              onChange={(e) => setFields((f) => ({ ...f, unit: e.target.value }))}
              maxLength={40}
              disabled={submitting}
              className={inputClass}
            />
          </FormField>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="New Address">
              <input
                value={fields.address}
                onChange={(e) => setFields((f) => ({ ...f, address: e.target.value }))}
                maxLength={200}
                disabled={submitting}
                className={inputClass}
              />
            </FormField>
            <FormField label="Resident name">
              <input value={fields.residentName} disabled className={`${inputClass} bg-slate-100 text-slate-400`} />
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
          <FormField label="Household Members" optional>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={fields.householdMembers}
              onChange={(e) => setFields((f) => ({ ...f, householdMembers: e.target.value }))}
              disabled={submitting}
              className={inputClass}
            />
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
            onClick={() =>
              onRecommendMove({
                address: fields.address,
                unit: fields.unit,
                plusCode: fields.plusCode,
                householdMembers: fields.householdMembers,
                notes: fields.notes,
                territoryId: moveTerritoryId,
                sectionId: moveSectionId,
                blockId: moveBlockId,
              })
            }
            disabled={submitting || !fields.address.trim() || !moveTerritoryId || !moveSectionId || !moveBlockId}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Recommend Move
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
