'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { createDriver, updateDriver, deleteDriver } from '@/app/lms/actions/drivers'
import type { Driver } from '@/lib/laundry-management-system/modules/drivers/types'
import Card from './Card'
import { selectAppearance } from './FormField'

const inputClass =
  'w-full rounded-lg border border-teal-100 bg-[#F0FDFA] px-2.5 py-1.5 text-sm text-[#0B1B33] focus:border-[#22D3EE] focus:outline-none'
const selectClass = `${inputClass} ${selectAppearance}`

// Owner-only driver roster CRUD, embedded in the Delivery Management page —
// same shape as InventoryManager (add form + editable table rows).
export default function DriverManager({ drivers }: { drivers: Driver[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newDriver, setNewDriver] = useState({ name: '', phone: '', vehicleInfo: '' })

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newDriver.name.trim()) return
    const formData = new FormData()
    formData.set('name', newDriver.name)
    formData.set('phone', newDriver.phone)
    formData.set('vehicleInfo', newDriver.vehicleInfo)
    startTransition(async () => {
      const result = await createDriver({}, formData)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Driver added.')
      setNewDriver({ name: '', phone: '', vehicleInfo: '' })
      router.refresh()
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteDriver(id)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Driver deleted.')
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <h2 className="mb-3 font-semibold text-[#0B1B33]">Add driver</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:items-end">
          <label className="block">
            <span className="text-xs text-slate-500">Name</span>
            <input
              value={newDriver.name}
              onChange={(e) => setNewDriver((v) => ({ ...v, name: e.target.value }))}
              placeholder="Juan Dela Cruz"
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Phone</span>
            <input
              value={newDriver.phone}
              onChange={(e) => setNewDriver((v) => ({ ...v, phone: e.target.value }))}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Vehicle</span>
            <input
              value={newDriver.vehicleInfo}
              onChange={(e) => setNewDriver((v) => ({ ...v, vehicleInfo: e.target.value }))}
              placeholder="Motorcycle, plate ABC123"
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0D9488] to-[#22D3EE] px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </form>
      </Card>

      {drivers.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="text-sm text-slate-400">No drivers yet — add your first one above.</p>
        </Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-teal-100/60 bg-[#F0FDFA]">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-500">Name</th>
                <th className="px-4 py-3 font-medium text-slate-500">Phone</th>
                <th className="px-4 py-3 font-medium text-slate-500">Vehicle</th>
                <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 font-medium text-slate-500"></th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <DriverRow
                  key={driver.id}
                  driver={driver}
                  editing={editingId === driver.id}
                  onEdit={() => setEditingId(driver.id)}
                  onCancel={() => setEditingId(null)}
                  onSaved={() => {
                    setEditingId(null)
                    router.refresh()
                  }}
                  onDelete={() => handleDelete(driver.id)}
                />
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}

function DriverRow({
  driver,
  editing,
  onEdit,
  onCancel,
  onSaved,
  onDelete,
}: {
  driver: Driver
  editing: boolean
  onEdit: () => void
  onCancel: () => void
  onSaved: () => void
  onDelete: () => void
}) {
  const [pending, startTransition] = useTransition()
  const [draft, setDraft] = useState({
    name: driver.name,
    phone: driver.phone,
    vehicleInfo: driver.vehicle_info,
    active: driver.active,
  })

  function handleSave() {
    const formData = new FormData()
    formData.set('driverId', driver.id)
    formData.set('name', draft.name)
    formData.set('phone', draft.phone)
    formData.set('vehicleInfo', draft.vehicleInfo)
    formData.set('active', String(draft.active))
    startTransition(async () => {
      const result = await updateDriver({}, formData)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Driver updated.')
      onSaved()
    })
  }

  if (editing) {
    return (
      <tr className="border-b border-teal-50 last:border-0">
        <td className="px-4 py-2">
          <input value={draft.name} onChange={(e) => setDraft((v) => ({ ...v, name: e.target.value }))} className={inputClass} />
        </td>
        <td className="px-4 py-2">
          <input value={draft.phone} onChange={(e) => setDraft((v) => ({ ...v, phone: e.target.value }))} className={inputClass} />
        </td>
        <td className="px-4 py-2">
          <input
            value={draft.vehicleInfo}
            onChange={(e) => setDraft((v) => ({ ...v, vehicleInfo: e.target.value }))}
            className={inputClass}
          />
        </td>
        <td className="px-4 py-2">
          <select
            value={draft.active ? 'true' : 'false'}
            onChange={(e) => setDraft((v) => ({ ...v, active: e.target.value === 'true' }))}
            className={selectClass}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </td>
        <td className="px-4 py-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSave}
              disabled={pending}
              aria-label="Save changes"
              className="rounded-md p-1.5 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
            </button>
            <button onClick={onCancel} aria-label="Cancel editing" className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr className="border-b border-teal-50 last:border-0 hover:bg-[#F0FDFA]/60">
      <td className="px-4 py-3 text-[#0B1B33]">{driver.name}</td>
      <td className="px-4 py-3 text-slate-500">{driver.phone || '—'}</td>
      <td className="px-4 py-3 text-slate-500">{driver.vehicle_info || '—'}</td>
      <td className="px-4 py-3">
        <span className={`text-sm ${driver.active ? 'text-emerald-600' : 'text-slate-400'}`}>
          {driver.active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onEdit}
            aria-label={`Edit ${driver.name}`}
            className="rounded-md p-1.5 text-slate-400 hover:bg-[#CCFBF1] hover:text-[#0D9488]"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            aria-label={`Delete ${driver.name}`}
            className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
