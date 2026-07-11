import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { StaffMember } from './types'

// Essential plan cap. Professional plan (not built yet) would lift this. Lives
// here rather than actions/staff.ts because a 'use server' file may only
// export async functions — a plain const export there breaks the whole module.
export const STAFF_ACCOUNT_LIMIT = 3

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
