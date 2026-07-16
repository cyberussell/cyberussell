import 'server-only'
import { randomBytes } from 'crypto'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { StaffMember } from './types'

export async function listStaff(supabase: SupabaseClient, businessId: string) {
  const { data } = await supabase
    .from('staff_members')
    .select('*, profile:profiles(full_name)')
    .eq('business_id', businessId)
    .order('created_at', { ascending: true })
  return (data ?? []) as (StaffMember & { profile: { full_name: string } | null })[]
}

export async function countActiveStaff(supabase: SupabaseClient, businessId: string) {
  const { count } = await supabase
    .from('staff_members')
    .select('id', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('active', true)
  return count ?? 0
}

// No 0/O/1/l/I — a temp password an owner has to read aloud or retype to relay to a staff
// member shouldn't hinge on distinguishing those by font. Same pattern as Territory Management
// System's Group Leader invites.
const TEMP_PASSWORD_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'

function generateTempPassword(length = 12): string {
  const bytes = randomBytes(length)
  let out = ''
  for (let i = 0; i < length; i += 1) out += TEMP_PASSWORD_ALPHABET[bytes[i] % TEMP_PASSWORD_ALPHABET.length]
  return out
}

// Creates the account with a generated temporary password instead of an emailed invite link —
// replaces the previous inviteUserByEmail() flow entirely, same root-cause reasoning as TMS's
// Group Leader invites (see migration 019's header comment): implicit-flow invite links can't
// survive @supabase/ssr's hardcoded PKCE browser client. The owner sees the password once
// (returned here) and relays it directly; must_change_password (set via user_metadata, applied
// by handle_new_user() in the same trigger-driven insert that already creates the staff_members
// row) forces a change-password screen before the new hire reaches their dashboard.
export async function inviteStaffWithPassword(
  adminSupabase: SupabaseClient,
  input: { email: string; title: string; businessId: string; branchId: string | null; tempPassword?: string }
): Promise<{ error?: string; tempPassword?: string }> {
  const tempPassword = input.tempPassword || generateTempPassword()
  const { data, error } = await adminSupabase.auth.admin.createUser({
    email: input.email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: {
      role: 'staff',
      business_id: input.businessId,
      branch_id: input.branchId,
      title: input.title,
      must_change_password: true,
    },
  })
  if (error) return { error: error.message }
  if (!data.user) return { error: 'Could not create the account.' }
  return { tempPassword }
}

// Owner-triggered reset — same temp-password mechanism as inviteStaffWithPassword, for a staff
// member who's forgotten their password or needs a fresh one. Unlike the invite path, this acts
// on an existing profiles row (no insert/trigger involved), so it needs its own follow-up update.
export async function resetStaffPassword(
  adminSupabase: SupabaseClient,
  profileId: string,
  customPassword?: string
): Promise<{ error?: string; tempPassword?: string }> {
  const tempPassword = customPassword || generateTempPassword()
  const { error: passwordError } = await adminSupabase.auth.admin.updateUserById(profileId, { password: tempPassword })
  if (passwordError) return { error: passwordError.message }
  const { error: profileError } = await adminSupabase.from('profiles').update({ must_change_password: true }).eq('id', profileId)
  if (profileError) return { error: profileError.message }
  return { tempPassword }
}
