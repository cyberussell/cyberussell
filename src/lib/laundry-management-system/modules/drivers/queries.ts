import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Driver } from './types'

export async function listDrivers(supabase: SupabaseClient, businessId: string) {
  const { data } = await supabase
    .from('drivers')
    .select('*')
    .eq('business_id', businessId)
    .order('name', { ascending: true })
  return (data ?? []) as Driver[]
}

export async function listActiveDrivers(supabase: SupabaseClient, businessId: string) {
  const { data } = await supabase
    .from('drivers')
    .select('*')
    .eq('business_id', businessId)
    .eq('active', true)
    .order('name', { ascending: true })
  return (data ?? []) as Driver[]
}
