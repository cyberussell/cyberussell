import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'

// Every function here operates on the service-role client — profiles RLS only ever allowed
// reading your own row (no admin ever needed to list other congregation members before), so
// there's no policy to lean on for "list every Group Leader in my congregation." Congregation
// scoping is therefore enforced explicitly in every query/mutation below, not by RLS.

export interface GroupLeaderProfile {
  id: string
  full_name: string
  email: string | null
  revoked_at: string | null
  created_at: string
}

export async function listGroupLeaders(supabase: SupabaseClient, congregationId: string): Promise<GroupLeaderProfile[]> {
  const { data } = await supabase
    .from('profiles')
    .select('id, full_name, email, revoked_at, created_at')
    .eq('congregation_id', congregationId)
    .eq('role', 'group_leader')
    .order('created_at', { ascending: false })
  return (data ?? []) as GroupLeaderProfile[]
}

// Re-resolved server-side before every mutation below — never trusts a client-supplied id alone
// without also confirming it belongs to the calling admin's own congregation.
export async function getGroupLeader(supabase: SupabaseClient, congregationId: string, profileId: string): Promise<GroupLeaderProfile | null> {
  const { data } = await supabase
    .from('profiles')
    .select('id, full_name, email, revoked_at, created_at')
    .eq('id', profileId)
    .eq('congregation_id', congregationId)
    .eq('role', 'group_leader')
    .maybeSingle()
  return (data as GroupLeaderProfile | null) ?? null
}

export async function inviteGroupLeader(
  supabase: SupabaseClient,
  congregationId: string,
  input: { firstName: string; lastName: string; email: string }
): Promise<{ error?: string }> {
  const fullName = `${input.firstName} ${input.lastName}`.trim()
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(input.email, {
    data: { full_name: fullName },
    redirectTo: 'https://www.cyberussell.com/territory-management-system/set-password',
  })
  if (error) return { error: error.message }
  if (!data.user) return { error: 'Could not create the invite.' }

  // handle_new_user() (001_init.sql) creates the profile row with role='admin' (the column
  // default) and no congregation as part of the same trigger-driven insert — this is what turns
  // it into an actual Group Leader attached to the inviting admin's own congregation. Upsert
  // rather than update: an .update().eq('id', ...) that happens to race the trigger (or matches
  // zero rows for any other reason) succeeds with no error and silently does nothing, leaving
  // the invited user able to log in but stuck with no congregation — exactly the failure this
  // was hitting live. Upsert writes the row unconditionally, so it can't go missing regardless
  // of whether the trigger's insert has already landed.
  const { error: profileError } = await supabase.from('profiles').upsert({
    id: data.user.id,
    role: 'group_leader',
    congregation_id: congregationId,
    email: input.email,
    full_name: fullName,
  })
  if (profileError) return { error: profileError.message }
  return {}
}

// Immediate and always available — bans the login but leaves the profile row in place as
// history. ban_duration has no literal "forever"; ~100 years is the conventional stand-in.
const PERMANENT_BAN_DURATION = '876000h'

export async function revokeGroupLeaderAccess(supabase: SupabaseClient, profileId: string): Promise<{ error?: string }> {
  const { error: banError } = await supabase.auth.admin.updateUserById(profileId, { ban_duration: PERMANENT_BAN_DURATION })
  if (banError) return { error: banError.message }
  const { error } = await supabase.from('profiles').update({ revoked_at: new Date().toISOString() }).eq('id', profileId)
  if (error) return { error: error.message }
  return {}
}

export async function restoreGroupLeaderAccess(supabase: SupabaseClient, profileId: string): Promise<{ error?: string }> {
  const { error: banError } = await supabase.auth.admin.updateUserById(profileId, { ban_duration: 'none' })
  if (banError) return { error: banError.message }
  const { error } = await supabase.from('profiles').update({ revoked_at: null }).eq('id', profileId)
  if (error) return { error: error.message }
  return {}
}

// Permanently removes a history entry (cascades to the profile row via auth.users' FK) — gated
// to entries at least 6 months old, enforced by the caller (actions/group-leaders.ts) using the
// congregation-verified row this module returns, not a client-supplied timestamp.
export async function deleteGroupLeader(supabase: SupabaseClient, profileId: string): Promise<{ error?: string }> {
  const { error } = await supabase.auth.admin.deleteUser(profileId)
  if (error) return { error: error.message }
  return {}
}
