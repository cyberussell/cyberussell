'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from '@/app/lms/actions/inventory'
import type { InventoryCategory, InventoryItem } from '@/lib/laundry-management-system/modules/inventory/types'
import { INVENTORY_CATEGORIES, INVENTORY_CATEGORY_LABELS, groupByCategory } from '@/lib/laundry-management-system/modules/inventory/categories'
import Card from './Card'
import FilterPills from './FilterPills'
import TableSearchInput from './TableSearchInput'

const inputClass =
  'w-full rounded-lg border border-teal-100 bg-[#F0FDFA] px-2.5 py-1.5 text-sm text-[#0B1B33] focus:border-[#22D3EE] focus:outline-none'

type View = 'all' | 'restock'

export default function InventoryManager({ items }: { items: InventoryItem[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [view, setView] = useState<View>('all')
  const [query, setQuery] = useState('')
  const [newItem, setNewItem] = useState({
    name: '',
    unit: 'pcs',
    quantity: '0',
    lowStockThreshold: '0',
    category: 'other' as InventoryCategory,
  })

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newItem.name.trim()) return
    const formData = new FormData()
    formData.set('name', newItem.name)
    formData.set('unit', newItem.unit)
    formData.set('quantity', newItem.quantity)
    formData.set('lowStockThreshold', newItem.lowStockThreshold)
    formData.set('category', newItem.category)
    startTransition(async () => {
      const result = await createInventoryItem({}, formData)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Item added.')
      setNewItem({ name: '', unit: 'pcs', quantity: '0', lowStockThreshold: '0', category: 'other' })
      router.refresh()
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteInventoryItem(id)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Item deleted.')
      router.refresh()
    })
  }

  const lowStockItems = items.filter((item) => item.quantity <= item.low_stock_threshold)
  const q = query.trim().toLowerCase()
  const searchedItems = q
    ? (view === 'restock' ? lowStockItems : items).filter(
        (item) => item.name.toLowerCase().includes(q) || INVENTORY_CATEGORY_LABELS[item.category].toLowerCase().includes(q)
      )
    : view === 'restock'
      ? lowStockItems
      : items
  const groups = groupByCategory(searchedItems)

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <h2 className="mb-3 font-semibold text-[#0B1B33]">Add item</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-2 gap-3 sm:grid-cols-6 sm:items-end">
          <label className="col-span-2 block">
            <span className="text-xs text-slate-500">Name</span>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem((v) => ({ ...v, name: e.target.value }))}
              placeholder="Detergent"
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Category</span>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem((v) => ({ ...v, category: e.target.value as InventoryCategory }))}
              className={`mt-1 ${inputClass}`}
            >
              {INVENTORY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {INVENTORY_CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Unit</span>
            <input
              value={newItem.unit}
              onChange={(e) => setNewItem((v) => ({ ...v, unit: e.target.value }))}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Quantity</span>
            <input
              type="number"
              min="0"
              value={newItem.quantity}
              onChange={(e) => setNewItem((v) => ({ ...v, quantity: e.target.value }))}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Low stock at</span>
            <input
              type="number"
              min="0"
              value={newItem.lowStockThreshold}
              onChange={(e) => setNewItem((v) => ({ ...v, lowStockThreshold: e.target.value }))}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0D9488] to-[#22D3EE] px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50 sm:col-span-1"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </form>
      </Card>

      {items.length > 0 && (
        <div className="space-y-3">
          <TableSearchInput value={query} onChange={setQuery} placeholder="Search by name or category…" />
          <FilterPills
            options={[
              { label: 'All', value: 'all' as View },
              { label: `Needs Restocking${lowStockItems.length > 0 ? ` (${lowStockItems.length})` : ''}`, value: 'restock' as View },
            ]}
            active={view}
            onChange={setView}
          />
        </div>
      )}

      {items.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="text-sm text-slate-400">No inventory items yet — add your first one above.</p>
        </Card>
      ) : searchedItems.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="text-sm text-slate-400">
            {q
              ? 'No items match your search.'
              : 'Everything is well-stocked — nothing needs restocking right now.'}
          </p>
        </Card>
      ) : (
        groups.map((group) => (
          <div key={group.category}>
            <h3 className="mb-2 px-1 text-sm font-semibold text-[#0B1B33]">{INVENTORY_CATEGORY_LABELS[group.category]}</h3>
            <Card className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-teal-100/60 bg-[#F0FDFA]">
                  <tr>
                    <th className="px-4 py-3 font-medium text-slate-500">Name</th>
                    <th className="px-4 py-3 font-medium text-slate-500">Category</th>
                    <th className="px-4 py-3 font-medium text-slate-500">Unit</th>
                    <th className="px-4 py-3 font-medium text-slate-500">Quantity</th>
                    <th className="px-4 py-3 font-medium text-slate-500">Low stock at</th>
                    <th className="px-4 py-3 font-medium text-slate-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item) => (
                    <InventoryRow
                      key={item.id}
                      item={item}
                      editing={editingId === item.id}
                      onEdit={() => setEditingId(item.id)}
                      onCancel={() => setEditingId(null)}
                      onSaved={() => {
                        setEditingId(null)
                        router.refresh()
                      }}
                      onDelete={() => handleDelete(item.id)}
                    />
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        ))
      )}
    </div>
  )
}

function InventoryRow({
  item,
  editing,
  onEdit,
  onCancel,
  onSaved,
  onDelete,
}: {
  item: InventoryItem
  editing: boolean
  onEdit: () => void
  onCancel: () => void
  onSaved: () => void
  onDelete: () => void
}) {
  const [pending, startTransition] = useTransition()
  const [draft, setDraft] = useState({
    name: item.name,
    unit: item.unit,
    quantity: String(item.quantity),
    lowStockThreshold: String(item.low_stock_threshold),
    category: item.category,
  })
  const lowStock = item.quantity <= item.low_stock_threshold

  function handleSave() {
    const formData = new FormData()
    formData.set('itemId', item.id)
    formData.set('name', draft.name)
    formData.set('unit', draft.unit)
    formData.set('quantity', draft.quantity)
    formData.set('lowStockThreshold', draft.lowStockThreshold)
    formData.set('category', draft.category)
    startTransition(async () => {
      const result = await updateInventoryItem({}, formData)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Item updated.')
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
          <select
            value={draft.category}
            onChange={(e) => setDraft((v) => ({ ...v, category: e.target.value as InventoryCategory }))}
            className={inputClass}
          >
            {INVENTORY_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {INVENTORY_CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </td>
        <td className="px-4 py-2">
          <input value={draft.unit} onChange={(e) => setDraft((v) => ({ ...v, unit: e.target.value }))} className={inputClass} />
        </td>
        <td className="px-4 py-2">
          <input
            type="number"
            min="0"
            value={draft.quantity}
            onChange={(e) => setDraft((v) => ({ ...v, quantity: e.target.value }))}
            className={inputClass}
          />
        </td>
        <td className="px-4 py-2">
          <input
            type="number"
            min="0"
            value={draft.lowStockThreshold}
            onChange={(e) => setDraft((v) => ({ ...v, lowStockThreshold: e.target.value }))}
            className={inputClass}
          />
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
      <td className="px-4 py-3 text-[#0B1B33]">{item.name}</td>
      <td className="px-4 py-3 text-slate-500">{INVENTORY_CATEGORY_LABELS[item.category]}</td>
      <td className="px-4 py-3 text-slate-500">{item.unit}</td>
      <td className={`px-4 py-3 font-medium ${lowStock ? 'text-red-500' : 'text-[#0B1B33]'}`}>
        {item.quantity}
        {lowStock && <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-500">Low stock</span>}
      </td>
      <td className="px-4 py-3 text-slate-500">{item.low_stock_threshold}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onEdit}
            aria-label={`Edit ${item.name}`}
            className="rounded-md p-1.5 text-slate-400 hover:bg-[#CCFBF1] hover:text-[#0D9488]"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            aria-label={`Delete ${item.name}`}
            className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
