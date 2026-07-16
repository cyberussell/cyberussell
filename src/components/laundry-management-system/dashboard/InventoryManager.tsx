'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  createInventoryVariant,
  updateInventoryVariant,
  deleteInventoryVariant,
} from '@/app/lms/actions/inventory'
import type { InventoryCategory, InventoryItemVariant, InventoryItemWithVariants } from '@/lib/laundry-management-system/modules/inventory/types'
import { INVENTORY_CATEGORIES, INVENTORY_CATEGORY_LABELS, groupByCategory } from '@/lib/laundry-management-system/modules/inventory/categories'
import Card from './Card'
import FilterPills from './FilterPills'
import TableSearchInput from './TableSearchInput'
import DataTable, { type DataTableColumn } from './DataTable'
import { selectAppearance } from './FormField'

const inputClass =
  'w-full rounded-lg border border-teal-100 bg-[#F0FDFA] px-2.5 py-1.5 text-sm text-[#0B1B33] focus:border-[#22D3EE] focus:outline-none'
const selectClass = `${inputClass} ${selectAppearance}`

type View = 'all' | 'restock'
type ItemDraft = { name: string; unit: string; quantity: string; lowStockThreshold: string; category: InventoryCategory }
type VariantDraft = { label: string; unit: string; quantity: string; lowStockThreshold: string }

const EMPTY_VARIANT_DRAFT: VariantDraft = { label: '', unit: 'pcs', quantity: '0', lowStockThreshold: '0' }

// A variant-tracked item (variants.length > 0) is judged per variant — its
// own quantity/low_stock_threshold stop mattering the moment it has variants.
function itemNeedsRestock(item: InventoryItemWithVariants): boolean {
  return item.variants.length > 0
    ? item.variants.some((v) => v.quantity <= v.low_stock_threshold)
    : item.quantity <= item.low_stock_threshold
}

export default function InventoryManager({ items }: { items: InventoryItemWithVariants[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
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

  const restockItems = items.filter(itemNeedsRestock)
  const q = query.trim().toLowerCase()
  const scoped = view === 'restock' ? restockItems : items
  const searchedItems = q
    ? scoped.filter((item) => item.name.toLowerCase().includes(q) || INVENTORY_CATEGORY_LABELS[item.category].toLowerCase().includes(q))
    : scoped
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
              placeholder="Soap"
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Category</span>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem((v) => ({ ...v, category: e.target.value as InventoryCategory }))}
              className={`mt-1 ${selectClass}`}
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
            className="col-span-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0D9488] to-[#22D3EE] px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50 sm:col-span-1"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </form>
        <p className="mt-2 text-xs text-slate-400">
          Need to track variations (e.g. Soap — Bar 100g, Liquid 1L)? Add the base item above, then add variants from its
          card below — its own unit/quantity/low-stock-at then move to each variant instead.
        </p>
      </Card>

      {items.length > 0 && (
        <div className="space-y-3">
          <TableSearchInput value={query} onChange={setQuery} placeholder="Search by name or category…" />
          <FilterPills
            options={[
              { label: 'All', value: 'all' as View },
              { label: `Needs Restocking${restockItems.length > 0 ? ` (${restockItems.length})` : ''}`, value: 'restock' as View },
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
            {q ? 'No items match your search.' : 'Everything is well-stocked — nothing needs restocking right now.'}
          </p>
        </Card>
      ) : (
        groups.map((group) => (
          <div key={group.category} className="space-y-3">
            <h3 className="px-1 text-sm font-semibold text-[#0B1B33]">{INVENTORY_CATEGORY_LABELS[group.category]}</h3>
            <div className="space-y-3">
              {group.items.map((item) => (
                <InventoryItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// Self-contained per-product card: owns its own item-level edit state,
// variant-level edit state, and add-variant form — independent of every
// other card, so multiple cards can be mid-edit at once without collision.
function InventoryItemCard({ item }: { item: InventoryItemWithVariants }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<ItemDraft | null>(null)
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null)
  const [variantDraft, setVariantDraft] = useState<VariantDraft | null>(null)
  const [newVariant, setNewVariant] = useState<VariantDraft>(EMPTY_VARIANT_DRAFT)

  const hasVariants = item.variants.length > 0
  const lowVariantCount = item.variants.filter((v) => v.quantity <= v.low_stock_threshold).length
  const simpleLowStock = !hasVariants && item.quantity <= item.low_stock_threshold

  function startEdit() {
    setEditing(true)
    setDraft({
      name: item.name,
      unit: item.unit,
      quantity: String(item.quantity),
      lowStockThreshold: String(item.low_stock_threshold),
      category: item.category,
    })
  }

  function cancelEdit() {
    setEditing(false)
    setDraft(null)
  }

  function saveEdit() {
    if (!draft) return
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
      cancelEdit()
      router.refresh()
    })
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteInventoryItem(item.id)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Item deleted.')
      router.refresh()
    })
  }

  function handleAddVariant(e: React.FormEvent) {
    e.preventDefault()
    if (!newVariant.label.trim()) return
    const formData = new FormData()
    formData.set('itemId', item.id)
    formData.set('label', newVariant.label)
    formData.set('unit', newVariant.unit)
    formData.set('quantity', newVariant.quantity)
    formData.set('lowStockThreshold', newVariant.lowStockThreshold)
    startTransition(async () => {
      const result = await createInventoryVariant({}, formData)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Variant added.')
      setNewVariant(EMPTY_VARIANT_DRAFT)
      router.refresh()
    })
  }

  function startEditVariant(variant: InventoryItemVariant) {
    setEditingVariantId(variant.id)
    setVariantDraft({
      label: variant.label,
      unit: variant.unit,
      quantity: String(variant.quantity),
      lowStockThreshold: String(variant.low_stock_threshold),
    })
  }

  function cancelEditVariant() {
    setEditingVariantId(null)
    setVariantDraft(null)
  }

  function saveEditVariant(variantId: string) {
    if (!variantDraft) return
    const formData = new FormData()
    formData.set('variantId', variantId)
    formData.set('label', variantDraft.label)
    formData.set('unit', variantDraft.unit)
    formData.set('quantity', variantDraft.quantity)
    formData.set('lowStockThreshold', variantDraft.lowStockThreshold)
    startTransition(async () => {
      const result = await updateInventoryVariant({}, formData)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Variant updated.')
      cancelEditVariant()
      router.refresh()
    })
  }

  function handleDeleteVariant(variantId: string) {
    startTransition(async () => {
      const result = await deleteInventoryVariant(variantId)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Variant removed.')
      router.refresh()
    })
  }

  const variantColumns: DataTableColumn<InventoryItemVariant>[] = [
    {
      header: 'Variant',
      cell: (variant) =>
        editingVariantId === variant.id && variantDraft ? (
          <input
            value={variantDraft.label}
            onChange={(e) => setVariantDraft({ ...variantDraft, label: e.target.value })}
            className={inputClass}
          />
        ) : (
          variant.label
        ),
    },
    {
      header: 'Unit',
      cell: (variant) =>
        editingVariantId === variant.id && variantDraft ? (
          <input
            value={variantDraft.unit}
            onChange={(e) => setVariantDraft({ ...variantDraft, unit: e.target.value })}
            className={inputClass}
          />
        ) : (
          <span className="text-slate-500">{variant.unit}</span>
        ),
    },
    {
      header: 'Quantity',
      cell: (variant) => {
        if (editingVariantId === variant.id && variantDraft) {
          return (
            <input
              type="number"
              min="0"
              value={variantDraft.quantity}
              onChange={(e) => setVariantDraft({ ...variantDraft, quantity: e.target.value })}
              className={inputClass}
            />
          )
        }
        const low = variant.quantity <= variant.low_stock_threshold
        return (
          <span className={`font-medium ${low ? 'text-red-500' : 'text-[#0B1B33]'}`}>
            {variant.quantity}
            {low && <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-500">Low stock</span>}
          </span>
        )
      },
    },
    {
      header: 'Low stock at',
      cell: (variant) =>
        editingVariantId === variant.id && variantDraft ? (
          <input
            type="number"
            min="0"
            value={variantDraft.lowStockThreshold}
            onChange={(e) => setVariantDraft({ ...variantDraft, lowStockThreshold: e.target.value })}
            className={inputClass}
          />
        ) : (
          <span className="text-slate-500">{variant.low_stock_threshold}</span>
        ),
    },
    {
      header: '',
      cell: (variant) =>
        editingVariantId === variant.id ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => saveEditVariant(variant.id)}
              disabled={pending}
              aria-label="Save variant changes"
              className="rounded-md p-1.5 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={cancelEditVariant}
              aria-label="Cancel editing variant"
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => startEditVariant(variant)}
              aria-label={`Edit ${variant.label}`}
              className="rounded-md p-1.5 text-slate-400 hover:bg-[#CCFBF1] hover:text-[#0D9488]"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDeleteVariant(variant.id)}
              aria-label={`Delete ${variant.label}`}
              className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ),
    },
  ]

  return (
    <Card className="p-4">
      {editing && draft ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 sm:items-end">
          <label className="col-span-2 block">
            <span className="text-xs text-slate-500">Name</span>
            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={`mt-1 ${inputClass}`} />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Category</span>
            <select
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value as InventoryCategory })}
              className={`mt-1 ${selectClass}`}
            >
              {INVENTORY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {INVENTORY_CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </label>
          {!hasVariants && (
            <>
              <label className="block">
                <span className="text-xs text-slate-500">Unit</span>
                <input value={draft.unit} onChange={(e) => setDraft({ ...draft, unit: e.target.value })} className={`mt-1 ${inputClass}`} />
              </label>
              <label className="block">
                <span className="text-xs text-slate-500">Quantity</span>
                <input
                  type="number"
                  min="0"
                  value={draft.quantity}
                  onChange={(e) => setDraft({ ...draft, quantity: e.target.value })}
                  className={`mt-1 ${inputClass}`}
                />
              </label>
              <label className="block">
                <span className="text-xs text-slate-500">Low stock at</span>
                <input
                  type="number"
                  min="0"
                  value={draft.lowStockThreshold}
                  onChange={(e) => setDraft({ ...draft, lowStockThreshold: e.target.value })}
                  className={`mt-1 ${inputClass}`}
                />
              </label>
            </>
          )}
          <div className="flex items-center gap-1.5">
            <button
              onClick={saveEdit}
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
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-medium text-[#0B1B33]">{item.name}</span>
            <span className="rounded-full bg-[#CCFBF1] px-2.5 py-1 text-xs font-medium text-[#0D9488]">
              {INVENTORY_CATEGORY_LABELS[item.category]}
            </span>
            {hasVariants ? (
              <span className="text-sm text-slate-500">
                {item.variants.length} variant{item.variants.length === 1 ? '' : 's'}
                {lowVariantCount > 0 && (
                  <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-500">{lowVariantCount} low stock</span>
                )}
              </span>
            ) : (
              <span className={`text-sm font-medium ${simpleLowStock ? 'text-red-500' : 'text-[#0B1B33]'}`}>
                {item.quantity} {item.unit}
                {simpleLowStock && <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-500">Low stock</span>}
                <span className="ml-2 font-normal text-slate-400">(low at {item.low_stock_threshold})</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={startEdit}
              aria-label={`Edit ${item.name}`}
              className="rounded-md p-1.5 text-slate-400 hover:bg-[#CCFBF1] hover:text-[#0D9488]"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              aria-label={`Delete ${item.name}`}
              className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 border-t border-teal-50 pt-4">
        {hasVariants && <DataTable columns={variantColumns} rows={item.variants} pageSize={50} />}
        <form onSubmit={handleAddVariant} className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:items-end">
          <label className="col-span-2 block sm:col-span-1">
            <span className="text-xs text-slate-500">Variant label</span>
            <input
              value={newVariant.label}
              onChange={(e) => setNewVariant((v) => ({ ...v, label: e.target.value }))}
              placeholder="Bar 100g"
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Unit</span>
            <input
              value={newVariant.unit}
              onChange={(e) => setNewVariant((v) => ({ ...v, unit: e.target.value }))}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Quantity</span>
            <input
              type="number"
              min="0"
              value={newVariant.quantity}
              onChange={(e) => setNewVariant((v) => ({ ...v, quantity: e.target.value }))}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Low stock at</span>
            <input
              type="number"
              min="0"
              value={newVariant.lowStockThreshold}
              onChange={(e) => setNewVariant((v) => ({ ...v, lowStockThreshold: e.target.value }))}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="flex items-center justify-center gap-2 rounded-full border border-teal-200 bg-white px-3 py-2 text-sm font-medium text-[#0D9488] transition hover:bg-[#F0FDFA] disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Add variant
          </button>
        </form>
      </div>
    </Card>
  )
}
