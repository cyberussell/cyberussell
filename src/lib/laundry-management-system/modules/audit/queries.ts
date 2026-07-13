import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { BusinessRole } from '../auth/queries'
import type { AuditAction, AuditEntityType, AuditLogWithActor } from './types'

// Best-effort: audit logging is supplementary, never allowed to fail the
// mutation it's describing. A failed insert is logged server-side and
// otherwise swallowed rather than surfaced to the caller.
export async function logActivity(
  supabase: SupabaseClient,
  params: {
    businessId: string
    actorId: string | null
    actorRole: BusinessRole
    action: AuditAction
    entityType: AuditEntityType
    entityId?: string
    details?: Record<string, unknown>
  }
): Promise<void> {
  const { error } = await supabase.from('audit_logs').insert({
    business_id: params.businessId,
    actor_id: params.actorId,
    actor_role: params.actorRole,
    action: params.action,
    entity_type: params.entityType,
    entity_id: params.entityId ?? null,
    details: params.details ?? {},
  })
  if (error) console.error('logActivity failed', error)
}

export async function listActivity(supabase: SupabaseClient, businessId: string) {
  const { data } = await supabase
    .from('audit_logs')
    .select('*, actor:profiles(full_name)')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
  return (data ?? []) as unknown as AuditLogWithActor[]
}
