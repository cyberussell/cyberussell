'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { updateCongregationSchema } from '@/lib/territory-management-system/modules/congregation/schema'
import { updateCongregation } from '@/lib/territory-management-system/modules/congregation/queries'
import { type ActionResult } from './shared'

export async function updateCongregationAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = updateCongregationSchema.safeParse({
    name: formData.get('name'),
    congregationNumber: formData.get('congregationNumber'),
    timezone: formData.get('timezone'),
  })
  if (!parsed.success) return { error: 'Please fill in all fields correctly.' }

  const { supabase, congregation } = await requireAdmin()
  try {
    await updateCongregation(supabase, congregation.id, {
      name: parsed.data.name,
      congregation_number: parsed.data.congregationNumber,
      timezone: parsed.data.timezone,
    })
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Could not update congregation settings.' }
  }

  revalidatePath('/territory-management-system/dashboard/settings')
  return { error: 'SAVED' }
}
