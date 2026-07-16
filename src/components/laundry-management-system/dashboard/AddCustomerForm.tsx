'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addCustomer } from '@/app/lms/actions/customer'
import { addCustomerSchema, type AddCustomerInput } from '@/lib/laundry-management-system/modules/customer/schema'
import { useServerAction } from '@/lib/laundry-management-system/hooks/useServerAction'
import Card from './Card'
import FormField, { inputClass } from './FormField'

export default function AddCustomerForm() {
  const { dispatch, pending, error } = useServerAction(addCustomer)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCustomerInput>({
    resolver: zodResolver(addCustomerSchema),
    defaultValues: { fullName: '', phone: '', email: '', notes: '' },
  })

  function onSubmit(values: AddCustomerInput) {
    const formData = new FormData()
    formData.set('fullName', values.fullName)
    formData.set('phone', values.phone)
    formData.set('email', values.email ?? '')
    formData.set('notes', values.notes ?? '')
    dispatch(formData)
  }

  return (
    <Card className="max-w-xl p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Full name" error={errors.fullName?.message}>
          <input {...register('fullName')} type="text" className={inputClass} />
        </FormField>
        <FormField label="Phone" error={errors.phone?.message}>
          <input {...register('phone')} type="text" className={inputClass} />
        </FormField>
        <FormField label="Email" optional error={errors.email?.message}>
          <input {...register('email')} type="email" className={inputClass} />
        </FormField>
        <FormField label="Notes" optional error={errors.notes?.message}>
          <textarea {...register('notes')} rows={2} className={inputClass} />
        </FormField>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-gradient-to-r from-[#0D9488] to-[#22D3EE] py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Adding…' : 'Add customer'}
        </button>
      </form>
    </Card>
  )
}
