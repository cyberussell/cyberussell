'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateOrderDetails } from '@/app/lms/actions/orders'
import { updateDetailsSchema, type UpdateDetailsInput } from '@/lib/laundry-management-system/modules/orders/schema'
import { useServerAction } from '@/lib/laundry-management-system/hooks/useServerAction'
import type { Order } from '@/lib/laundry-management-system/modules/orders/types'
import Card from './Card'
import FormField, { inputClass } from './FormField'

function toDateInputValue(iso: string | null): string {
  if (!iso) return ''
  return iso.slice(0, 10)
}

export default function OrderDetailsEditForm({ order }: { order: Order }) {
  const { dispatch, pending, error, successMessage } = useServerAction(updateOrderDetails, ['SAVED'], 'Order details saved.')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDetailsInput>({
    resolver: zodResolver(updateDetailsSchema),
    defaultValues: {
      orderId: order.id,
      weightKg: order.weight_kg ?? '',
      expectedCompletionAt: toDateInputValue(order.expected_completion_at),
      paymentStatus: order.payment_status,
      notes: order.notes,
    },
  })

  function onSubmit(values: UpdateDetailsInput) {
    const formData = new FormData()
    formData.set('orderId', values.orderId)
    formData.set('weightKg', String(values.weightKg ?? ''))
    formData.set('expectedCompletionAt', values.expectedCompletionAt ?? '')
    formData.set('paymentStatus', values.paymentStatus)
    formData.set('notes', values.notes ?? '')
    dispatch(formData)
  }

  return (
    <Card className="p-5">
      <h2 className="mb-3 font-semibold text-[#0B1B33]">Order Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register('orderId')} />
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Weight (kg)" error={errors.weightKg?.message}>
            <input {...register('weightKg')} type="number" min="0" step="0.1" placeholder="0.0" className={inputClass} />
          </FormField>
          <FormField label="Expected Completion" error={errors.expectedCompletionAt?.message}>
            <input {...register('expectedCompletionAt')} type="date" className={inputClass} />
          </FormField>
        </div>

        <FormField label="Payment Status" error={errors.paymentStatus?.message}>
          <select {...register('paymentStatus')} className={inputClass}>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
        </FormField>

        <FormField label="Notes" error={errors.notes?.message}>
          <textarea {...register('notes')} rows={3} className={inputClass} />
        </FormField>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {successMessage && <p className="text-sm text-emerald-600">Saved!</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </Card>
  )
}
