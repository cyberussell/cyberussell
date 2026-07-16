'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inviteStaff } from '@/app/lms/actions/staff'
import { inviteStaffSchema, type InviteStaffInput } from '@/lib/laundry-management-system/modules/staff/schema'
import { useServerAction } from '@/lib/laundry-management-system/hooks/useServerAction'
import type { Branch } from '@/lib/laundry-management-system/modules/tenant/types'
import Card from '@/components/laundry-management-system/dashboard/Card'
import FormField, { inputClass } from '@/components/laundry-management-system/dashboard/FormField'

export default function StaffInviteForm({ branches }: { branches: Branch[] }) {
  const { dispatch, pending, error, successMessage } = useServerAction(inviteStaff, ['INVITED'], 'Invite sent.')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteStaffInput>({
    resolver: zodResolver(inviteStaffSchema),
    defaultValues: { email: '', title: '', branchId: '' },
  })

  function onSubmit(values: InviteStaffInput) {
    const formData = new FormData()
    formData.set('email', values.email)
    formData.set('title', values.title ?? '')
    formData.set('branchId', values.branchId ?? '')
    dispatch(formData)
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <h2 className="font-semibold text-[#0B1B33]">Invite staff</h2>
        <FormField label="Email" error={errors.email?.message}>
          <input {...register('email')} type="email" className={inputClass} />
        </FormField>
        <FormField label="Title" optional error={errors.title?.message}>
          <input {...register('title')} type="text" placeholder="Front desk" className={inputClass} />
        </FormField>
        {branches.length > 0 && (
          <FormField label="Branch" optional error={errors.branchId?.message}>
            <select {...register('branchId')} className={inputClass}>
              <option value="">Any branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </FormField>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {successMessage && <p className="text-sm text-emerald-600">Invite sent.</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-gradient-to-r from-[#0D9488] to-[#22D3EE] py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Sending invite…' : 'Send invite'}
        </button>
      </form>
    </Card>
  )
}
