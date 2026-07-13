'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createWalkInOrder } from '@/app/lms/actions/orders'
import { createOrderSchema, type CreateOrderInput } from '@/lib/laundry-management-system/modules/orders/schema'
import { useServerAction } from '@/lib/laundry-management-system/hooks/useServerAction'
import type { Branch } from '@/lib/laundry-management-system/modules/tenant/types'
import type { Customer } from '@/lib/laundry-management-system/modules/customer/types'
import type { StaffMember } from '@/lib/laundry-management-system/modules/staff/types'
import Card from './Card'
import FormField, { inputClass } from './FormField'

const SERVICE_PRESETS = ['Wash & Fold', 'Dry Clean', 'Wash & Iron', 'Iron Only', 'Comforter/Bulky']

export default function WalkInOrderForm({
  branches,
  customers = [],
  staff = [],
  enablePickupRequest = false,
}: {
  branches: Branch[]
  customers?: Customer[]
  staff?: (StaffMember & { profile: { full_name: string } | null })[]
  enablePickupRequest?: boolean
}) {
  const { dispatch, pending, error } = useServerAction(createWalkInOrder)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      branchId: branches.length === 1 ? branches[0].id : '',
      customerId: '',
      assignedStaffId: '',
      walkInName: '',
      walkInPhone: '',
      serviceLabel: '',
      amount: 0,
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

  function onSubmit(values: CreateOrderInput) {
    const formData = new FormData()
    formData.set('branchId', values.branchId)
    formData.set('customerId', values.customerId ?? '')
    formData.set('assignedStaffId', values.assignedStaffId ?? '')
    formData.set('walkInName', values.walkInName ?? '')
    formData.set('walkInPhone', values.walkInPhone ?? '')
    formData.set('serviceLabel', values.serviceLabel)
    formData.set('amount', String(values.amount))
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
    <Card className="max-w-xl p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {branches.length > 1 ? (
          <FormField label="Branch" error={errors.branchId?.message}>
            <select {...register('branchId')} className={inputClass}>
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

        <FormField label="Service Type" error={errors.serviceLabel?.message}>
          <input {...register('serviceLabel')} list="service-presets" placeholder="Wash & Fold" className={inputClass} />
          <datalist id="service-presets">
            {SERVICE_PRESETS.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </FormField>

        {customers.length > 0 && (
          <FormField label="Link to existing customer" optional error={errors.customerId?.message}>
            <select {...register('customerId')} className={inputClass}>
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
            <select {...register('assignedStaffId')} className={inputClass}>
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
          <FormField label="Amount" error={errors.amount?.message}>
            <input {...register('amount')} type="number" min="0" step="0.01" placeholder="0.00" className={inputClass} />
          </FormField>
          <FormField label="Weight (kg)" optional error={errors.weightKg?.message}>
            <input {...register('weightKg')} type="number" min="0" step="0.1" placeholder="0.0" className={inputClass} />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Expected Completion" optional error={errors.expectedCompletionAt?.message}>
            <input {...register('expectedCompletionAt')} type="date" className={inputClass} />
          </FormField>
          <FormField label="Payment Status" error={errors.paymentStatus?.message}>
            <select {...register('paymentStatus')} className={inputClass}>
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
          <div className="rounded-lg border border-blue-100 bg-[#F8FBFF] p-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <input
                {...register('pickupRequested')}
                type="checkbox"
                className="h-4 w-4 rounded border-blue-200 text-[#2563EB] focus:ring-[#38BDF8]"
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

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Creating order…' : 'Create order'}
        </button>
      </form>
    </Card>
  )
}
