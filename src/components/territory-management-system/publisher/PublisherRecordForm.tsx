'use client'

import { useState } from 'react'
import type { TerritoryStructure } from '@/lib/territory-management-system/modules/territory/types'
import FormField, { inputClass } from '@/components/territory-management-system/dashboard/FormField'
import Card from '@/components/territory-management-system/dashboard/Card'

export interface NewPublisherRecordPayload {
  territoryId: string
  sectionId: string
  blockId: string
  address: string
  unit: string
  residentName: string
  plusCode: string
  notes: string
}

// Fully controlled — enqueueing (not a native form action) is how this reaches the server now,
// so every field needs to be readable in JS on submit rather than pulled from FormData.
export default function PublisherRecordForm({
  territories,
  onSubmit,
  onCancel,
}: {
  territories: TerritoryStructure[]
  onSubmit: (payload: NewPublisherRecordPayload) => void
  onCancel: () => void
}) {
  const [territoryId, setTerritoryId] = useState(territories[0]?.id ?? '')
  const territory = territories.find((t) => t.id === territoryId)
  const [sectionId, setSectionId] = useState(territory?.sections[0]?.id ?? '')
  const section = territory?.sections.find((s) => s.id === sectionId)
  const [blockId, setBlockId] = useState(section?.blocks[0]?.id ?? '')
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('')
  const [residentName, setResidentName] = useState('')
  const [plusCode, setPlusCode] = useState('')
  const [notes, setNotes] = useState('')

  function handleTerritoryChange(id: string) {
    setTerritoryId(id)
    const t = territories.find((x) => x.id === id)
    const firstSection = t?.sections[0]
    setSectionId(firstSection?.id ?? '')
    setBlockId(firstSection?.blocks[0]?.id ?? '')
  }

  function handleSectionChange(id: string) {
    setSectionId(id)
    const s = territory?.sections.find((x) => x.id === id)
    setBlockId(s?.blocks[0]?.id ?? '')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!territoryId || !sectionId || !blockId || !address.trim()) return
    onSubmit({ territoryId, sectionId, blockId, address: address.trim(), unit, residentName, plusCode, notes })
  }

  if (!territory) return null

  return (
    <Card className="p-6">
      <h2 className="mb-1 font-semibold text-[#0B1B33]">Add a New Contact Record</h2>
      <p className="mb-4 text-xs text-slate-500">Submitted for admin review — it won&apos;t appear on today&apos;s assignment.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {territories.length > 1 && (
            <FormField label="Territory">
              <select value={territoryId} onChange={(e) => handleTerritoryChange(e.target.value)} className={inputClass}>
                {territories.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </FormField>
          )}
          <FormField label="Section">
            <select value={sectionId} onChange={(e) => handleSectionChange(e.target.value)} className={inputClass}>
              {territory.sections.map((s) => (
                <option key={s.id} value={s.id}>
                  Section {s.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>
        <FormField label="Block">
          <select
            value={blockId}
            onChange={(e) => setBlockId(e.target.value)}
            className={inputClass}
            disabled={!section || section.blocks.length === 0}
          >
            {(section?.blocks ?? []).map((b) => (
              <option key={b.id} value={b.id}>
                Block {b.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Address">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            maxLength={200}
            className={inputClass}
            placeholder="123 Main St"
          />
        </FormField>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Unit" optional>
            <input value={unit} onChange={(e) => setUnit(e.target.value)} maxLength={40} className={inputClass} />
          </FormField>
          <FormField label="Resident name" optional>
            <input value={residentName} onChange={(e) => setResidentName(e.target.value)} maxLength={120} className={inputClass} />
          </FormField>
        </div>
        <FormField label="Plus Code" optional>
          <input value={plusCode} onChange={(e) => setPlusCode(e.target.value)} maxLength={20} className={inputClass} placeholder="e.g. 7FG8+4V" />
        </FormField>
        <FormField label="Notes" optional>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} rows={2} className={inputClass} />
        </FormField>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-medium text-slate-500 hover:border-[#38BDF8]/40"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!section || section.blocks.length === 0}
            className="flex-1 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            Submit Record
          </button>
        </div>
      </form>
    </Card>
  )
}
