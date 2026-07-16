'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, Plus, Check, X, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { createCatalogItem, updateCatalogItem, deleteCatalogItem, reactivateCatalogItem } from '@/app/lms/actions/catalog'
import type { ServiceCatalogItem } from '@/lib/laundry-management-system/modules/catalog/types'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import Card from './Card'
import FilterPills from './FilterPills'
import TableSearchInput from './TableSearchInput'
import DataTable, { type DataTableColumn } from './DataTable'
import Avatar from './Avatar'

const inputClass =
  'w-full rounded-lg border border-teal-100 bg-[#F0FDFA] px-2.5 py-1.5 text-sm text-[#0B1B33] focus:border-[#22D3EE] focus:outline-none'

type View = 'active' | 'inactive'

type Draft = { name: string; price: string }

export default function ServiceCatalogManager({ items, currency }: { items: ServiceCatalogItem[]; currency: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [view, setView] = useState<View>('active')
  const [query, setQuery] = useState('')
  const [newItem, setNewItem] = useState({ name: '', price: '0' })

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newItem.name.trim()) return
    const formData = new FormData()
    formData.set('name', newItem.name)
    formData.set('price', newItem.price)
    startTransition(async () => {
      const result = await createCatalogItem({}, formData)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Item added.')
      setNewItem({ name: '', price: '0' })
      router.refresh()
    })
  }

  function handleDeactivate(id: string) {
    startTransition(async () => {
      const result = await deleteCatalogItem(id)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Item deactivated.')
      router.refresh()
    })
  }

  function handleReactivate(id: string) {
    startTransition(async () => {
      const result = await reactivateCatalogItem(id)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Item reactivated.')
      router.refresh()
    })
  }

  function startEdit(item: ServiceCatalogItem) {
    setEditingId(item.id)
    setDraft({ name: item.name, price: String(item.price) })
  }

  function cancelEdit() {
    setEditingId(null)
    setDraft(null)
  }

  function saveEdit(itemId: string) {
    if (!draft) return
    const formData = new FormData()
    formData.set('itemId', itemId)
    formData.set('name', draft.name)
    formData.set('price', draft.price)
    startTransition(async () => {
      const result = await updateCatalogItem({}, formData)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Item updated.')
      cancelEdit()
      router.refresh()
    })
  }

  const activeItems = items.filter((i) => i.active)
  const inactiveItems = items.filter((i) => !i.active)
  const q = query.trim().toLowerCase()
  const scoped = view === 'active' ? activeItems : inactiveItems
  const searchedItems = q ? scoped.filter((item) => item.name.toLowerCase().includes(q)) : scoped

  const columns: DataTableColumn<ServiceCatalogItem>[] = [
    {
      header: 'Name',
      sortValue: (item) => item.name.toLowerCase(),
      cell: (item) =>
        editingId === item.id && draft ? (
          <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputClass} />
        ) : (
          <div className="flex items-center gap-3">
            <Avatar name={item.name} size="sm" />
            <span>{item.name}</span>
          </div>
        ),
    },
    {
      header: 'Price',
      sortValue: (item) => item.price,
      cell: (item) =>
        editingId === item.id && draft ? (
          <input
            type="number"
            min="0"
            step="0.01"
            value={draft.price}
            onChange={(e) => setDraft({ ...draft, price: e.target.value })}
            className={inputClass}
          />
        ) : (
          <span className="font-medium text-[#0B1B33]">{formatCurrency(item.price, currency)}</span>
        ),
    },
    {
      header: '',
      cell: (item) => {
        if (editingId === item.id) {
          return (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => saveEdit(item.id)}
                disabled={pending}
                aria-label="Save changes"
                className="rounded-md p-1.5 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50"
              >
                <Check className="h-4 w-4" />
              </button>
              <button onClick={cancelEdit} aria-label="Cancel editing" className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        }
        if (!item.active) {
          return (
            <button
              onClick={() => handleReactivate(item.id)}
              aria-label={`Reactivate ${item.name}`}
              className="flex items-center gap-1.5 rounded-md p-1.5 text-slate-400 hover:bg-[#CCFBF1] hover:text-[#0D9488]"
            >
              <RotateCcw className="h-4 w-4" />
              Reactivate
            </button>
          )
        }
        return (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => startEdit(item)}
              aria-label={`Edit ${item.name}`}
              className="rounded-md p-1.5 text-slate-400 hover:bg-[#CCFBF1] hover:text-[#0D9488]"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDeactivate(item.id)}
              aria-label={`Deactivate ${item.name}`}
              className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <h2 className="mb-3 font-semibold text-[#0B1B33]">Add item</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:items-end">
          <label className="col-span-2 block">
            <span className="text-xs text-slate-500">Name</span>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem((v) => ({ ...v, name: e.target.value }))}
              placeholder="Dress"
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Price</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={newItem.price}
              onChange={(e) => setNewItem((v) => ({ ...v, price: e.target.value }))}
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

      {items.length > 0 && (
        <div className="space-y-3">
          <TableSearchInput value={query} onChange={setQuery} placeholder="Search by name…" />
          <FilterPills
            options={[
              { label: `Active${activeItems.length > 0 ? ` (${activeItems.length})` : ''}`, value: 'active' as View },
              { label: `Inactive${inactiveItems.length > 0 ? ` (${inactiveItems.length})` : ''}`, value: 'inactive' as View },
            ]}
            active={view}
            onChange={setView}
          />
        </div>
      )}

      {items.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="text-sm text-slate-400">No catalog items yet — add your first one above.</p>
        </Card>
      ) : (
        <DataTable
          columns={columns}
          rows={searchedItems}
          emptyMessage={q ? 'No items match your search.' : view === 'active' ? 'No active items.' : 'No inactive items.'}
        />
      )}
    </div>
  )
}
