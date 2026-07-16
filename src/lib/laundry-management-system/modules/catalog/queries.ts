import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { ServiceCatalogItem } from './types'

export async function listCatalogItems(
  supabase: SupabaseClient,
  businessId: string,
  { activeOnly = false }: { activeOnly?: boolean } = {}
) {
  let query = supabase.from('service_catalog_items').select('*').eq('business_id', businessId).order('name', { ascending: true })
  if (activeOnly) query = query.eq('active', true)
  const { data } = await query
  return (data ?? []) as ServiceCatalogItem[]
}
