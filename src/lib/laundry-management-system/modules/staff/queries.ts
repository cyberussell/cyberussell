import 'server-only'
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
