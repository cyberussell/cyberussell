import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Branch } from './types'

export async function listBranches(supabase: SupabaseClient, businessId: string) {
  const { data } = await supabase
    .from('branches')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: true })
  return (data ?? []) as Branch[]
}
