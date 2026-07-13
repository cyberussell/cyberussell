'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { requireBusiness } from '@/lib/appointment-system/auth'

const createServiceSchema = z.object({
  name: z.string().trim().min(1),
  duration_min: z.coerce.number().finite().min(5),
  price: z.coerce.number().finite().min(0).catch(0),
})

export async function createService(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const parsed = createServiceSchema.safeParse({
    name: formData.get('name'),
    duration_min: formData.get('duration_min'),
    price: formData.get('price'),
  })
  if (!parsed.success) return
  const { name, duration_min, price } = parsed.data
  await supabase.from('services').insert({
    business_id: business.id,
    name,
    duration_min: Math.round(duration_min),
    price,
  })
  revalidatePath('/appointments/dashboard/services')
}

export async function toggleService(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  const id = String(formData.get('id'))
  const active = formData.get('active') === 'true'
  await supabase.from('services').update({ active: !active }).eq('id', id).eq('business_id', business.id)
  revalidatePath('/appointments/dashboard/services')
}

export async function deleteService(formData: FormData): Promise<void> {
  const { supabase, business } = await requireBusiness()
  await supabase.from('services').delete().eq('id', String(formData.get('id'))).eq('business_id', business.id)
  revalidatePath('/appointments/dashboard/services')
}
