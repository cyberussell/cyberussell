'use client'

import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, Plus, Check, X, RotateCcw, Tag, Upload } from 'lucide-react'
import { toast } from 'sonner'
import {
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
  reactivateCatalogItem,
  uploadCatalogItemIcon,
  removeCatalogItemIcon,
} from '@/app/lms/actions/catalog'
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  effectivePrice,
  isPromoActive,
  type CatalogCategory,
  type PromoType,
  type ServiceCatalogItem,
} from '@/lib/laundry-management-system/modules/catalog/types'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import Card from './Card'
import FilterPills from './FilterPills'
import TableSearchInput from './TableSearchInput'
import DataTable, { type DataTableColumn } from './DataTable'
import CatalogItemIcon from './CatalogItemIcon'

const inputClass =
  'w-full rounded-lg border border-teal-100 bg-[#F0FDFA] px-2.5 py-1.5 text-sm text-[#0B1B33] focus:border-[#22D3EE] focus:outline-none'

type View = 'active' | 'inactive'
type CategoryFilter = 'all' | CatalogCategory

type Draft = {
  name: string
  price: string
  category: CatalogCategory
  promoEnabled: boolean
  promoType: PromoType
  promoValue: string
  promoStartsAt: string
  promoEndsAt: string
}

const EMPTY_NEW_ITEM = {
  name: '',
  price: '0',
  category: 'wash' as CatalogCategory,
  promoEnabled: false,
  promoType: 'percent' as PromoType,
  promoValue: '0',
  promoStartsAt: '',
  promoEndsAt: '',
}

function isoToDateInput(iso: string | null): string {
  return iso ? iso.slice(0, 10) : ''
}

function promoFormData(form: FormData, draft: Pick<Draft, 'promoEnabled' | 'promoType' | 'promoValue' | 'promoStartsAt' | 'promoEndsAt'>) {
  if (draft.promoEnabled) {
    form.set('promoType', draft.promoType)
    form.set('promoValue', draft.promoValue)
    if (draft.promoStartsAt) form.set('promoStartsAt', draft.promoStartsAt)
    if (draft.promoEndsAt) form.set('promoEndsAt', draft.promoEndsAt)
  } else {
    form.set('promoType', '')
  }
}

function PromoFields({
  value,
  onChange,
}: {
  value: Pick<Draft, 'promoEnabled' | 'promoType' | 'promoValue' | 'promoStartsAt' | 'promoEndsAt'>
  onChange: (patch: Partial<Draft>) => void
}) {
  return (
    <div className="col-span-2 rounded-lg border border-dashed border-teal-200 bg-[#F0FDFA] p-3 sm:col-span-4">
      <label className="flex items-center gap-2 text-sm font-medium text-[#0B1B33]">
        <input
          type="checkbox"
          checked={value.promoEnabled}
          onChange={(e) => onChange({ promoEnabled: e.target.checked })}
          className="h-4 w-4 rounded border-teal-300 text-[#0D9488] focus:ring-[#22D3EE]"
        />
        Add promotion — less price this week
      </label>
      {value.promoEnabled && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <label className="block">
            <span className="text-xs text-slate-500">Discount type</span>
            <select
              value={value.promoType}
              onChange={(e) => onChange({ promoType: e.target.value as PromoType })}
              className={`mt-1 ${inputClass}`}
            >
              <option value="percent">Percent off</option>
              <option value="fixed">Amount off</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">{value.promoType === 'percent' ? 'Percent (%)' : 'Amount off'}</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={value.promoValue}
              onChange={(e) => onChange({ promoValue: e.target.value })}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Starts (optional)</span>
            <input
              type="date"
              value={value.promoStartsAt}
              onChange={(e) => onChange({ promoStartsAt: e.target.value })}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Ends (optional)</span>
            <input
              type="date"
              value={value.promoEndsAt}
              onChange={(e) => onChange({ promoEndsAt: e.target.value })}
              className={`mt-1 ${inputClass}`}
            />
          </label>
        </div>
      )}
    </div>
  )
}

export default function ServiceCatalogManager({ items, currency }: { items: ServiceCatalogItem[]; currency: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [view, setView] = useState<View>('active')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [query, setQuery] = useState('')
  const [newItem, setNewItem] = useState(EMPTY_NEW_ITEM)
  const iconInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newItem.name.trim()) return
    const formData = new FormData()
    formData.set('name', newItem.name)
    formData.set('price', newItem.price)
    formData.set('category', newItem.category)
    promoFormData(formData, newItem)
    startTransition(async () => {
      const result = await createCatalogItem({}, formData)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Item added.')
      setNewItem(EMPTY_NEW_ITEM)
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
    setDraft({
      name: item.name,
      price: String(item.price),
      category: item.category,
      promoEnabled: !!item.promo_type,
      promoType: item.promo_type ?? 'percent',
      promoValue: item.promo_value != null ? String(item.promo_value) : '0',
      promoStartsAt: isoToDateInput(item.promo_starts_at),
      promoEndsAt: isoToDateInput(item.promo_ends_at),
    })
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
    formData.set('category', draft.category)
    promoFormData(formData, draft)
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

  function handleIconPick(itemId: string, file: File | undefined) {
    if (!file) return
    const formData = new FormData()
    formData.set('itemId', itemId)
    formData.set('icon', file)
    startTransition(async () => {
      const result = await uploadCatalogItemIcon({}, formData)
      if (result.error && result.error !== 'SAVED') {
        toast.error(result.error)
        return
      }
      toast.success('Icon updated.')
      router.refresh()
    })
  }

  function handleIconRemove(itemId: string) {
    startTransition(async () => {
      const result = await removeCatalogItemIcon(itemId)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success('Icon removed.')
      router.refresh()
    })
  }

  const activeItems = items.filter((i) => i.active)
  const inactiveItems = items.filter((i) => !i.active)
  const q = query.trim().toLowerCase()
  const scoped = view === 'active' ? activeItems : inactiveItems
  const categoryScoped = categoryFilter === 'all' ? scoped : scoped.filter((i) => i.category === categoryFilter)
  const searchedItems = q ? categoryScoped.filter((item) => item.name.toLowerCase().includes(q)) : categoryScoped

  const columns: DataTableColumn<ServiceCatalogItem>[] = [
    {
      header: 'Item',
      sortValue: (item) => item.name.toLowerCase(),
      cell: (item) =>
        editingId === item.id && draft ? (
          <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputClass} />
        ) : (
          <div className="flex items-center gap-3">
            <CatalogItemIcon item={item} size="sm" />
            <span>{item.name}</span>
          </div>
        ),
    },
    {
      header: 'Category',
      sortValue: (item) => CATEGORY_META[item.category].label,
      cell: (item) =>
        editingId === item.id && draft ? (
          <select
            value={draft.category}
            onChange={(e) => setDraft({ ...draft, category: e.target.value as CatalogCategory })}
            className={inputClass}
          >
            {CATEGORY_ORDER.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_META[c].label}
              </option>
            ))}
          </select>
        ) : (
          <span className="rounded-full bg-[#CCFBF1] px-2.5 py-1 text-xs font-medium text-[#0D9488]">
            {CATEGORY_META[item.category].label}
          </span>
        ),
    },
    {
      header: 'Price',
      sortValue: (item) => item.price,
      cell: (item) => {
        if (editingId === item.id && draft) {
          return (
            <div className="space-y-2">
              <input
                type="number"
                min="0"
                step="0.01"
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                className={inputClass}
              />
              <PromoFields value={draft} onChange={(patch) => setDraft((d) => (d ? { ...d, ...patch } : d))} />
            </div>
          )
        }
        const active = isPromoActive(item)
        const promoPrice = effectivePrice(item)
        return (
          <div>
            {active ? (
              <div className="flex items-center gap-2">
                <span className="text-slate-400 line-through">{formatCurrency(item.price, currency)}</span>
                <span className="font-medium text-[#0D9488]">{formatCurrency(promoPrice, currency)}</span>
              </div>
            ) : (
              <span className="font-medium text-[#0B1B33]">{formatCurrency(item.price, currency)}</span>
            )}
            <p className="text-xs text-slate-400">per {item.unit}</p>
            {active && (
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-600">
                <Tag className="h-3 w-3" />
                On sale
              </span>
            )}
          </div>
        )
      },
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
            <input
              ref={(el) => {
                iconInputRefs.current[item.id] = el
              }}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => handleIconPick(item.id, e.target.files?.[0])}
            />
            <button
              onClick={() => iconInputRefs.current[item.id]?.click()}
              aria-label={`Upload icon for ${item.name}`}
              title="Upload icon (PNG/JPEG/WebP, up to 1MB)"
              className="rounded-md p-1.5 text-slate-400 hover:bg-[#CCFBF1] hover:text-[#0D9488]"
            >
              <Upload className="h-4 w-4" />
            </button>
            {item.icon_url && (
              <button
                onClick={() => handleIconRemove(item.id)}
                aria-label={`Remove custom icon for ${item.name}`}
                title="Remove custom icon"
                className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            )}
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
          <label className="col-span-2 block sm:col-span-1">
            <span className="text-xs text-slate-500">Name</span>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem((v) => ({ ...v, name: e.target.value }))}
              placeholder="Dress"
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Category</span>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem((v) => ({ ...v, category: e.target.value as CatalogCategory }))}
              className={`mt-1 ${inputClass}`}
            >
              {CATEGORY_ORDER.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_META[c].label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-slate-500">Price ({CATEGORY_META[newItem.category].unit === 'load' ? 'per load' : 'per piece'})</span>
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
          <PromoFields value={newItem} onChange={(patch) => setNewItem((v) => ({ ...v, ...patch }))} />
        </form>
        <p className="mt-2 text-xs text-slate-400">
          Icons default to a suggested picture per category — upload your own from the item row below any time (PNG/JPEG/WebP, up to 1MB).
        </p>
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
          <FilterPills
            options={[
              { label: 'All categories', value: 'all' as CategoryFilter },
              ...CATEGORY_ORDER.map((c) => ({ label: CATEGORY_META[c].label, value: c as CategoryFilter })),
            ]}
            active={categoryFilter}
            onChange={setCategoryFilter}
            variant="dark"
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
