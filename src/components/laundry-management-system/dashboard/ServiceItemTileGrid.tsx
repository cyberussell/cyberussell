'use client'

import { Minus, Plus } from 'lucide-react'
import { effectivePrice, isAddonCategory, isPromoActive, type ServiceCatalogItem } from '@/lib/laundry-management-system/modules/catalog/types'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import CatalogItemIcon from './CatalogItemIcon'

// Tap-to-add POS-style item grid — controlled by the parent (WalkInOrderForm)
// rather than react-hook-form, since a tap grid with running quantities
// doesn't map cleanly onto a single registered field the way text/select
// inputs do. Split into a "Services" section (Wash, Dry, Ironing, Fold,
// combos, Dry Cleaning) and an "Add-ons" section (soap, dry sheets,
// softener, etc.) so staff aren't hunting for consumables mixed in among
// the actual services.
export default function ServiceItemTileGrid({
  items,
  cart,
  onChange,
  currency,
}: {
  items: ServiceCatalogItem[]
  cart: Record<string, number>
  onChange: (itemId: string, quantity: number) => void
  currency: string
}) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-teal-200 bg-[#F0FDFA] p-6 text-center text-sm text-slate-400">
        No catalog items yet — add priced items in Service Catalog before orders can be taken.
      </p>
    )
  }

  const services = items.filter((item) => !isAddonCategory(item.category))
  const addons = items.filter((item) => isAddonCategory(item.category))

  return (
    <div className="space-y-4">
      {services.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium text-slate-400">Services</p>
          <Tiles items={services} cart={cart} onChange={onChange} currency={currency} />
        </div>
      )}
      {addons.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium text-slate-400">Add-ons</p>
          <Tiles items={addons} cart={cart} onChange={onChange} currency={currency} />
        </div>
      )}
    </div>
  )
}

function Tiles({
  items,
  cart,
  onChange,
  currency,
}: {
  items: ServiceCatalogItem[]
  cart: Record<string, number>
  onChange: (itemId: string, quantity: number) => void
  currency: string
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const qty = cart[item.id] ?? 0
        const onSale = isPromoActive(item)
        const price = effectivePrice(item)
        return (
          <div
            key={item.id}
            className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition ${
              qty > 0 ? 'border-[#22D3EE] bg-[#F0FDFA]' : 'border-teal-100 bg-white'
            }`}
          >
            <CatalogItemIcon item={item} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#0B1B33]">{item.name}</p>
              {onSale ? (
                <p className="text-xs">
                  <span className="mr-1 text-slate-400 line-through">{formatCurrency(item.price, currency)}</span>
                  <span className="font-medium text-[#0D9488]">{formatCurrency(price, currency)}</span>
                </p>
              ) : (
                <p className="text-xs text-slate-400">{formatCurrency(item.price, currency)}</p>
              )}
            </div>
            {qty === 0 ? (
              <button
                type="button"
                onClick={() => onChange(item.id, 1)}
                className="w-full rounded-full bg-gradient-to-r from-[#0D9488] to-[#22D3EE] py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
              >
                Add
              </button>
            ) : (
              <div className="flex w-full items-center justify-between rounded-full border border-teal-100 bg-white px-1 py-1">
                <button
                  type="button"
                  onClick={() => onChange(item.id, qty - 1)}
                  aria-label={`Remove one ${item.name}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[#0D9488] transition hover:bg-[#CCFBF1]"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-sm font-semibold text-[#0B1B33]">{qty}</span>
                <button
                  type="button"
                  onClick={() => onChange(item.id, qty + 1)}
                  aria-label={`Add one ${item.name}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[#0D9488] transition hover:bg-[#CCFBF1]"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
