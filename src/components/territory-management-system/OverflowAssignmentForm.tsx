'use client'

import { useState } from 'react'
import { createOverflowAssignmentAction } from '@/app/territory-management-system/actions/group-leader'
import { useServerAction } from '@/lib/territory-management-system/hooks/useServerAction'
import type { TerritoryStructure } from '@/lib/territory-management-system/modules/territory/types'
import FormField from '@/components/territory-management-system/dashboard/FormField'
import Card from '@/components/territory-management-system/dashboard/Card'
import { NumberStepper } from './AssignmentForm'

// Generates a second, independent batch for the same territory an existing batch already
// covers today — for when more publishers show up than the original batch had partnerships
// for. Deliberately much simpler than AssignmentForm: no "how many records support this many
// partnerships" math, since every partnership here always starts with zero records by design
// (see createOverflowAssignmentAction's forceZeroRecords) — this is a "go canvass/search"
// assignment, not a recompute against the territory's eligible-record pool. The territory list
// is pre-narrowed by the parent to only territories already covered by one of today's batches,
// so there's no "no active territories yet" empty state to handle here the way AssignmentForm
// has to.
export default function OverflowAssignmentForm({
  territories,
  territoryStructures,
  blockRecordCounts,
}: {
  territories: { id: string; name: string; barangayName: string }[]
  // Full section/block structure for each of today's territories — only used once exactly one
  // territory is checked below, to offer the optional "narrow to a search area" step.
  territoryStructures: TerritoryStructure[]
  // Per-block record counts (keyed by block id) — flags a block as "Empty" in the picker rather
  // than restricting the picker to empty blocks only (any block is selectable, per Russell).
  blockRecordCounts: Record<string, number>
}) {
  const { dispatch, pending, error } = useServerAction(createOverflowAssignmentAction)
  const [selected, setSelected] = useState<string[]>([])
  const [publisherCount, setPublisherCount] = useState(2)
  const [groupSize, setGroupSize] = useState(2)
  const [searchSectionId, setSearchSectionId] = useState('')
  const [searchBlockIds, setSearchBlockIds] = useState<string[]>([])
  const partnershipCount = Math.max(1, Math.ceil((publisherCount || 1) / (groupSize || 1)))

  function toggle(id: string) {
    setSelected((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      // The search-area picker only makes sense against exactly one territory — clear any
      // in-progress selection the moment that stops being true, rather than silently submitting
      // a stale section/block pair against the wrong (or no longer singular) territory.
      setSearchSectionId('')
      setSearchBlockIds([])
      return next
    })
  }

  function toggleBlock(id: string) {
    setSearchBlockIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  if (territories.length === 0) return null

  const singleTerritory = selected.length === 1 ? territoryStructures.find((t) => t.id === selected[0]) : undefined
  const searchSection = singleTerritory?.sections.find((s) => s.id === searchSectionId)

  return (
    <Card className="max-w-2xl p-6">
      <form action={dispatch} className="space-y-4">
        <FormField label="Territory (already assigned today)">
          <div className="space-y-2 rounded-lg border border-blue-100 p-3">
            {territories.map((t) => (
              <label key={t.id} className="flex items-center gap-2 text-sm text-[#0B1B33]">
                <input
                  type="checkbox"
                  name="territoryIds"
                  value={t.id}
                  checked={selected.includes(t.id)}
                  onChange={() => toggle(t.id)}
                  className="h-4 w-4 rounded border-blue-200"
                />
                {t.name}
                {t.barangayName ? ` — ${t.barangayName}` : ''}
              </label>
            ))}
          </div>
        </FormField>

        {singleTerritory && singleTerritory.sections.length > 0 && (
          <FormField label="Narrow to a search area (optional)">
            <div className="space-y-3 rounded-lg border border-blue-100 p-3">
              <select
                value={searchSectionId}
                onChange={(e) => {
                  setSearchSectionId(e.target.value)
                  setSearchBlockIds([])
                }}
                className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm text-[#0B1B33]"
              >
                <option value="">Whole territory (no search area)</option>
                {singleTerritory.sections.map((s) => (
                  <option key={s.id} value={s.id}>
                    Section {s.label}
                  </option>
                ))}
              </select>

              {searchSection && (
                <div className="flex flex-wrap gap-2">
                  {searchSection.blocks.map((b) => {
                    const count = blockRecordCounts[b.id] ?? 0
                    const checked = searchBlockIds.includes(b.id)
                    return (
                      <label
                        key={b.id}
                        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium ${
                          checked ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' : 'border-blue-100 text-slate-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="searchBlockIds"
                          value={b.id}
                          checked={checked}
                          onChange={() => toggleBlock(b.id)}
                          className="h-3.5 w-3.5 rounded border-blue-200"
                        />
                        Block {b.label}
                        {count === 0 && <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">Empty</span>}
                      </label>
                    )
                  })}
                </div>
              )}
              {searchSectionId && <input type="hidden" name="searchSectionId" value={searchSectionId} />}
              <p className="text-xs text-slate-500">
                Publishers assigned to this batch will see whatever contact records already exist in the blocks you choose
                (read-only, to avoid duplicate entries) plus their own pin map for the area.
              </p>
            </div>
          </FormField>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberStepper label="Extra publishers going out" value={publisherCount} onChange={setPublisherCount} min={1} max={999} />
          <NumberStepper label="Group size" value={groupSize} onChange={setGroupSize} min={1} max={10} />
        </div>
        <input type="hidden" name="partnershipCount" value={partnershipCount} />
        <div className="rounded-lg border border-blue-100 bg-[#F8FBFF] p-3 text-sm text-slate-500">
          <p>
            {publisherCount} publisher{publisherCount === 1 ? '' : 's'} in groups of {groupSize} → {partnershipCount} new
            Ministry Partner{partnershipCount === 1 ? '' : 's'}, each starting with no assigned records — they go canvass/search
            the territory instead.
          </p>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={pending || selected.length === 0}
          className="w-full rounded-lg border border-[#2563EB] bg-white py-2.5 font-semibold text-[#2563EB] transition hover:bg-blue-50 disabled:opacity-50"
        >
          {pending ? 'Generating…' : 'Generate Overflow QR Code'}
        </button>
      </form>
    </Card>
  )
}
