'use client'

import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createWalkInOrder } from '@/app/lms/actions/orders'
import { createOrderSchema, type CreateOrderInput, type CreateOrderOutput } from '@/lib/laundry-management-system/modules/orders/schema'
import { useServerAction } from '@/lib/laundry-management-system/hooks/useServerAction'
import { formatCurrency } from '@/lib/laundry-management-system/format'
import type { Branch } from '@/lib/laundry-management-system/modules/tenant/types'
import type { Customer } from '@/lib/laundry-management-system/modules/customer/types'
import type { StaffMember } from '@/lib/laundry-management-system/modules/staff/types'
import type { ServiceCatalogItem } from '@/lib/laundry-management-system/modules/catalog/types'
import Card from './Card'
import FormField, { inputClass, selectAppearance } from './FormField'
import Avatar from './Avatar'
import ServiceItemTileGrid from './ServiceItemTileGrid'

export default function WalkInOrderForm({
  branches,
  customers = [],
  staff = [],
  catalogItems = [],
  enablePickupRequest = false,
  currency = 'PHP',
}: {
  branches: Branch[]
  customers?: Customer[]
  staff?: (StaffMember & { profile: { full_name: string } | null })[]
  catalogItems?: ServiceCatalogItem[]
  enablePickupRequest?: boolean
  currency?: string
}) {
  const { dispatch, pending, error } = useServerAction(createWalkInOrder)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateOrderInput, unknown, CreateOrderOutput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      branchId: branches.length === 1 ? branches[0].id : '',
      customerId: '',
      assignedStaffId: '',
      walkInName: '',
      walkInPhone: '',
      items: '[]',
      weightKg: '',
      expectedCompletionAt: '',
      paymentStatus: 'unpaid',
      notes: '',
      pickupRequested: false,
      pickupAddress: '',
      pickupScheduledAt: '',
    },
  })
  const pickupRequested = watch('pickupRequested')
  const watchedWeightKg = watch('weightKg')
  const watchedPaymentStatus = watch('paymentStatus')
  const watchedCustomerId = watch('customerId')
  const watchedWalkInName = watch('walkInName')
  const selectedCustomer = customers.find((c) => c.id === watchedCustomerId)
  const summaryCustomerName = selectedCustomer?.full_name || watchedWalkInName || 'Walk-in customer'

  // Tap-to-add cart — deliberately plain state, not react-hook-form-managed
  // (a tile grid with running quantities doesn't map onto a single
  // registered field). Kept in sync with a hidden `items` field below purely
  // so zodResolver's own "add at least one item" validation surfaces through
  // the normal errors.items path like every other field on this form.
  const [cart, setCart] = useState<Record<string, number>>({})

  const cartLines = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, quantity]) => quantity > 0)
        .map(([catalogItemId, quantity]) => {
          const item = catalogItems.find((i) => i.id === catalogItemId)
          return { catalogItemId, quantity, name: item?.name ?? '', unitPrice: item?.price ?? 0 }
        }),
    [cart, catalogItems]
  )
  const runningTotal = useMemo(() => cartLines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0), [cartLines])

  useEffect(() => {
    setValue(
      'items',
      JSON.stringify(cartLines.map(({ catalogItemId, quantity }) => ({ catalogItemId, quantity }))),
      { shouldValidate: false }
    )
  }, [cartLines, setValue])

  function handleCartChange(itemId: string, quantity: number) {
    setCart((prev) => {
      const next = { ...prev }
      if (quantity <= 0) delete next[itemId]
      else next[itemId] = quantity
      return next
    })
  }

  function onSubmit(values: CreateOrderOutput) {
    const formData = new FormData()
    formData.set('branchId', values.branchId)
    formData.set('customerId', values.customerId ?? '')
    formData.set('assignedStaffId', values.assignedStaffId ?? '')
    formData.set('walkInName', values.walkInName ?? '')
    formData.set('walkInPhone', values.walkInPhone ?? '')
    formData.set('items', JSON.stringify(cartLines.map(({ catalogItemId, quantity }) => ({ catalogItemId, quantity }))))
    formData.set('weightKg', String(values.weightKg ?? ''))
    formData.set('expectedCompletionAt', values.expectedCompletionAt ?? '')
    formData.set('paymentStatus', values.paymentStatus ?? 'unpaid')
    formData.set('notes', values.notes ?? '')
    if (values.pickupRequested) {
      formData.set('pickupRequested', 'true')
      formData.set('pickupAddress', values.pickupAddress ?? '')
      formData.set('pickupScheduledAt', values.pickupScheduledAt ?? '')
    }
    dispatch(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="space-y-4 p-6 lg:col-span-2">
        {branches.length > 1 ? (
          <FormField label="Branch" error={errors.branchId?.message}>
            <select {...register('branchId')} className={`${inputClass} ${selectAppearance}`}>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </FormField>
        ) : (
          <input type="hidden" {...register('branchId')} />
        )}

        <input type="hidden" {...register('items')} />
        <FormField label="Items" error={errors.items?.message}>
          <ServiceItemTileGrid items={catalogItems} cart={cart} onChange={handleCartChange} currency={currency} />
        </FormField>

        {customers.length > 0 && (
          <FormField label="Link to existing customer" optional error={errors.customerId?.message}>
            <select {...register('customerId')} className={`${inputClass} ${selectAppearance}`}>
              <option value="">None — anonymous walk-in</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.full_name}
                  {c.phone ? ` (${c.phone})` : ''}
                </option>
              ))}
            </select>
            <span className="mt-1 block text-xs text-slate-400">
              Linking lets this customer track the order in their own account.
            </span>
          </FormField>
        )}

        {staff.length > 0 && (
          <FormField label="Assigned Staff" optional error={errors.assignedStaffId?.message}>
            <select {...register('assignedStaffId')} className={`${inputClass} ${selectAppearance}`}>
              <option value="">Unassigned</option>
              {staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.profile?.full_name || 'Staff member'}
                  {s.title ? ` — ${s.title}` : ''}
                </option>
              ))}
            </select>
          </FormField>
        )}

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Weight (kg)" optional error={errors.weightKg?.message}>
            <input {...register('weightKg')} type="number" min="0" step="0.1" placeholder="0.0" className={inputClass} />
          </FormField>
          <FormField label="Expected Completion" optional error={errors.expectedCompletionAt?.message}>
            <input {...register('expectedCompletionAt')} type="date" className={inputClass} />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Payment Status" error={errors.paymentStatus?.message}>
            <select {...register('paymentStatus')} className={`${inputClass} ${selectAppearance}`}>
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Customer name" optional error={errors.walkInName?.message}>
            <input {...register('walkInName')} type="text" className={inputClass} />
          </FormField>
          <FormField label="Phone" optional error={errors.walkInPhone?.message}>
            <input {...register('walkInPhone')} type="text" className={inputClass} />
          </FormField>
        </div>

        {enablePickupRequest && (
          <div className="rounded-lg border border-teal-100 bg-[#F0FDFA] p-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <input
                {...register('pickupRequested')}
                type="checkbox"
                className="h-4 w-4 rounded border-teal-200 text-[#0D9488] focus:ring-[#22D3EE]"
              />
              Customer needs pickup
            </label>
            {Boolean(pickupRequested) && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <FormField label="Pickup address" error={errors.pickupAddress?.message}>
                  <input {...register('pickupAddress')} type="text" className={`${inputClass} bg-white`} />
                </FormField>
                <FormField label="Scheduled pickup" error={errors.pickupScheduledAt?.message}>
                  <input {...register('pickupScheduledAt')} type="datetime-local" className={`${inputClass} bg-white`} />
                </FormField>
              </div>
            )}
          </div>
        )}

        <FormField label="Notes" optional error={errors.notes?.message}>
          <textarea {...register('notes')} rows={2} className={inputClass} />
        </FormField>
      </Card>

      <Card className="h-fit p-6 lg:sticky lg:top-24 lg:col-span-1">
        <h2 className="mb-4 font-semibold text-[#0B1B33]">Order Summary</h2>
        <div className="flex items-center gap-3">
          <Avatar name={summaryCustomerName} size="sm" />
          <span className="truncate font-medium text-[#0B1B33]">{summaryCustomerName}</span>
        </div>
        <div className="mt-4 space-y-3 border-t border-teal-50 pt-4 text-sm">
          {cartLines.length === 0 ? (
            <p className="text-slate-400">No items added yet.</p>
          ) : (
            cartLines.map((line) => (
              <div key={line.catalogItemId} className="flex items-center justify-between gap-2">
                <span className="text-[#0B1B33]">
                  {line.name} <span className="text-slate-400">× {line.quantity}</span>
                </span>
                <span className="shrink-0 font-medium text-[#0B1B33]">{formatCurrency(line.unitPrice * line.quantity, currency)}</span>
              </div>
            ))
          )}
          {Number(watchedWeightKg) > 0 && (
            <div className="flex items-center justify-between border-t border-teal-50 pt-3">
              <span className="text-slate-500">Weight</span>
              <span className="font-medium text-[#0B1B33]">{String(watchedWeightKg)} kg</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Payment</span>
            <span className="font-medium capitalize text-[#0B1B33]">{watchedPaymentStatus}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-teal-100 pt-4">
          <span className="font-semibold text-[#0B1B33]">Total</span>
          <span className="text-xl font-bold text-[#0D9488]">{formatCurrency(runningTotal, currency)}</span>
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-4 w-full rounded-full bg-gradient-to-r from-[#0D9488] to-[#22D3EE] py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Creating order…' : 'Create order'}
        </button>
      </Card>
    </form>
  )
}
