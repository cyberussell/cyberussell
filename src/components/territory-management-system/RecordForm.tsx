'use client'

import { useState } from 'react'
import { createRecordAction } from '@/app/territory-management-system/actions/records'
import { useServerAction } from '@/lib/territory-management-system/hooks/useServerAction'
import type { TerritoryStructure } from '@/lib/territory-management-system/modules/territory/types'
import FormField, { inputClass } from '@/components/territory-management-system/dashboard/FormField'
import Card from '@/components/territory-management-system/dashboard/Card'

export default function RecordForm({ territory }: { territory: TerritoryStructure }) {
  const { dispatch, pending, error, successMessage } = useServerAction(createRecordAction, ['SAVED'], 'Record added.')
  const [sectionId, setSectionId] = useState(territory.sections[0]?.id ?? '')
  const section = territory.sections.find((s) => s.id === sectionId)

  if (territory.sections.length === 0) {
    return <Card className="p-6 text-sm text-slate-400">Add a section first before adding records.</Card>
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 font-semibold text-[#0B1B33]">Add a Contact Record</h2>
      {/* Remounting on success clears the uncontrolled address/unit/etc. fields for the next entry. */}
      <form action={dispatch} className="space-y-4" key={successMessage ?? 'form'}>
        <input type="hidden" name="territoryId" value={territory.id} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Section">
            <select name="sectionId" value={sectionId} onChange={(e) => setSectionId(e.target.value)} className={inputClass}>
              {territory.sections.map((s) => (
                <option key={s.id} value={s.id}>
                  Section {s.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Block">
            <select name="blockId" className={inputClass} disabled={!section || section.blocks.length === 0}>
              {(section?.blocks ?? []).map((b) => (
                <option key={b.id} value={b.id}>
                  Block {b.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>
        <FormField label="Address">
          <input name="address" required maxLength={200} className={inputClass} placeholder="123 Main St" />
        </FormField>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Unit" optional>
            <input name="unit" maxLength={40} className={inputClass} />
          </FormField>
          <FormField label="Resident name" optional>
            <input name="residentName" maxLength={120} className={inputClass} />
          </FormField>
        </div>
        <FormField label="Plus Code" optional>
          <input name="plusCode" maxLength={20} className={inputClass} placeholder="e.g. 7FG8+4V" />
        </FormField>
        <FormField label="Notes" optional>
          <textarea name="notes" maxLength={500} rows={2} className={inputClass} />
        </FormField>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" name="doNotCall" value="true" className="h-4 w-4 rounded border-blue-200" />
          Do Not Call
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={pending || !section || section.blocks.length === 0}
          className="rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Adding…' : 'Add Record'}
        </button>
      </form>
    </Card>
  )
}
