'use server'

import { createServerSupabase } from '@/lib/territory-management-system/supabase-server'
import { requestPasswordResetSchema } from '@/lib/territory-management-system/modules/groupLeaders/schema'
import { type ActionResult } from './shared'

export async function requestPasswordResetAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = requestPasswordResetSchema.safeParse({ email: formData.get('email') })
  if (!parsed.success) return { error: 'Enter a valid email address.' }

  const supabase = await createServerSupabase()
  // Always the same success message regardless of whether the email actually has an account —
  // avoids leaking which addresses are registered.
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: 'https://www.cyberussell.com/territory-management-system/set-password',
  })
  return { error: 'SAVED' }
}
