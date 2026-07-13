'use client'

import { useMemo, useState } from 'react'
import { createAssignmentAction } from '@/app/territory-management-system/actions/assignments'
import { useServerAction } from '@/lib/territory-management-system/hooks/useServerAction'
import { DEFAULT_MAX_PER_PARTNERSHIP } from '@/lib/territory-management-system/modules/assignment/engine'
import FormField, { inputClass } from '@/components/territory-management-system/dashboard/FormField'
import Card from '@/components/territory-management-system/dashboard/Card'

export default function AssignmentForm({
  territories,
  hasExistingBatch,
}: {
  territories: { id: string; name: string; approvedCount: number }[]
  hasExistingBatch: boolean
}) {
  const { dispatch, pending, error } = useServerAction(createAssignmentAction)
  const [selected, setSelected] = useState<string[]>([])
  const [partnershipCount, setPartnershipCount] = useState(2)

  const eligibleTotal = useMemo(
    () => territories.filter((t) => selected.includes(t.id)).reduce((sum, t) => sum + t.approvedCount, 0),
    [territories, selected]
  )

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (
      hasExistingBatch &&
      !window.confirm(
        "An assignment already exists for today. Generating a new one replaces it — any partnerships publishers have already claimed today will be lost. Continue?"
      )
    ) {
      e.preventDefault()
    }
  }

  return (
    <Card className="max-w-2xl p-6">
      <form action={dispatch} onSubmit={handleSubmit} className="space-y-4">
        {hasExistingBatch && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            An assignment already exists for today. Generating a new one will replace it.
          </div>
        )}
        <FormField label="Territories">
          {territories.length === 0 ? (
            <p className="text-sm text-slate-400">No active territories yet.</p>
          ) : (
            <div className="space-y-2 rounded-lg border border-blue-100 p-3">
              {territories.map((t) => (
                <label key={t.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-[#0B1B33]">
                    <input
                      type="checkbox"
                      name="territoryIds"
                      value={t.id}
                      checked={selected.includes(t.id)}
                      onChange={() => toggle(t.id)}
                      className="h-4 w-4 rounded border-blue-200"
                    />
                    {t.name}
                  </span>
                  <span className="text-slate-400">{t.approvedCount} approved</span>
                </label>
              ))}
            </div>
          )}
        </FormField>
        <FormField label="Number of partnerships">
          <input
            name="partnershipCount"
            type="number"
            min={1}
            max={50}
            required
            value={partnershipCount}
            onChange={(e) => setPartnershipCount(Math.max(1, Number(e.target.value) || 1))}
            className={inputClass}
          />
        </FormField>
        <div className="rounded-lg border border-blue-100 bg-[#F8FBFF] p-3 text-sm text-slate-500">
          {eligibleTotal} approved contact record{eligibleTotal === 1 ? '' : 's'} available across the selected territories —
          up to {partnershipCount * DEFAULT_MAX_PER_PARTNERSHIP} will be assigned ({partnershipCount} partnership
          {partnershipCount === 1 ? '' : 's'} × {DEFAULT_MAX_PER_PARTNERSHIP} max).
          {eligibleTotal > 0 && eligibleTotal < partnershipCount && (
            <p className="mt-1 font-medium text-red-500">Not enough contact records for {partnershipCount} partnerships.</p>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={pending || selected.length === 0}
          className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Generating…' : 'Generate Assignment'}
        </button>
      </form>
    </Card>
  )
}
