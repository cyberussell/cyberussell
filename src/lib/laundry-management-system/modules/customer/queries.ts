import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Customer } from './types'

export async function countCustomers(supabase: SupabaseClient, businessId: string) {
  const { count } = await supabase
    .from('customers')
    .select('id', { count: 'exact', head: true })
    .eq('business_id', businessId)
  return count ?? 0
}

export async function listCustomers(supabase: SupabaseClient, businessId: string) {
  const { data } = await supabase
    .from('customers')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
  return (data ?? []) as Customer[]
}

export async function listRecentCustomers(supabase: SupabaseClient, businessId: string, limit = 5) {
  const { data } = await supabase
    .from('customers')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data ?? []) as Customer[]
}

export async function getCustomerById(supabase: SupabaseClient, businessId: string, customerId: string) {
  const { data } = await supabase
    .from('customers')
    .select('*')
    .eq('business_id', businessId)
    .eq('id', customerId)
    .maybeSingle()
  return data as Customer | null
}
