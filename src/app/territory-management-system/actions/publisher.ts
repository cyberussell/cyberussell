'use server'

import { revalidatePath } from 'next/cache'
import { createAdminSupabase } from '@/lib/territory-management-system/supabase-server'
import {
  addPublisherRecordSchema,
  logPublisherVisitSchema,
  renamePartnershipSchema,
} from '@/lib/territory-management-system/modules/assignment/schema'
import {
  getPartnershipByToken,
  markPartnershipRecordCompleted,
  partnershipHasRecord,
  renamePartnership,
} from '@/lib/territory-management-system/modules/assignment/queries'
import { createRecord, logVisit } from '@/lib/territory-management-system/modules/records/queries'
import { VISIT_RESULTS } from '@/lib/territory-management-system/modules/records/schema'
import { getTerritoryStructure } from '@/lib/territory-management-system/modules/territory/queries'
import { type ActionResult } from './shared'

// Every action here is reachable with no login at all — the opaque partnership token in the
// form is the only credential. Each one re-resolves the token against the DB itself (never
// trusts anything the client claims about which partnership/congregation it belongs to) using
// the service-role client, since there's no publisher Supabase session for RLS to key off of.

export async function renamePartnershipAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = renamePartnershipSchema.safeParse({
    partnershipToken: formData.get('partnershipToken'),
    name: formData.get('name'),
  })
  if (!parsed.success) return { error: 'Enter a valid partnership name.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }

  await renamePartnership(supabase, partnership.id, parsed.data.name)
  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}`)
  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}/${partnership.claim_token}`)
  return { error: 'SAVED' }
}

export async function logPublisherVisitAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = logPublisherVisitSchema.safeParse({
    partnershipToken: formData.get('partnershipToken'),
    recordId: formData.get('recordId'),
    visitedAt: formData.get('visitedAt'),
    result: formData.get('result'),
    notes: formData.get('notes'),
  })
  if (!parsed.success) return { error: 'Please fill in the visit details correctly.' }
  if (!(VISIT_RESULTS as readonly string[]).includes(parsed.data.result)) return { error: 'Invalid visit result.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }

  const owns = await partnershipHasRecord(supabase, partnership.id, parsed.data.recordId)
  if (!owns) return { error: 'This record is not assigned to your partnership.' }

  try {
    await logVisit(supabase, partnership.congregation_id, {
      recordId: parsed.data.recordId,
      visitedAt: new Date(parsed.data.visitedAt).toISOString(),
      result: parsed.data.result,
      notes: parsed.data.notes,
      createdBy: null,
    })
    await markPartnershipRecordCompleted(supabase, partnership.id, parsed.data.recordId)
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Could not log the visit.' }
  }

  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}/${partnership.claim_token}`)
  return { error: 'SAVED' }
}

// New records added here are 'pending'/'publisher'-sourced, same review gate as CSV import —
// they never retroactively appear in today's own partnership list.
export async function addPublisherRecordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = addPublisherRecordSchema.safeParse({
    partnershipToken: formData.get('partnershipToken'),
    territoryId: formData.get('territoryId'),
    sectionId: formData.get('sectionId'),
    blockId: formData.get('blockId'),
    address: formData.get('address'),
    unit: formData.get('unit'),
    residentName: formData.get('residentName'),
    plusCode: formData.get('plusCode'),
    notes: formData.get('notes'),
  })
  if (!parsed.success) return { error: 'Please fill in the required fields.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }

  // This path runs on the service-role client (no RLS), so it must independently verify the
  // submitted territory/section/block chain actually belongs to this partnership's own
  // congregation before writing anything — otherwise a crafted request with a valid token but
  // a foreign territoryId could plant a record inside a different congregation's territory.
  const territory = await getTerritoryStructure(supabase, partnership.congregation_id, parsed.data.territoryId)
  const section = territory?.sections.find((s) => s.id === parsed.data.sectionId)
  const block = section?.blocks.find((b) => b.id === parsed.data.blockId)
  if (!territory || !section || !block) return { error: 'Invalid territory, section, or block.' }

  try {
    await createRecord(supabase, partnership.congregation_id, {
      territoryId: parsed.data.territoryId,
      sectionId: parsed.data.sectionId,
      blockId: parsed.data.blockId,
      address: parsed.data.address,
      unit: parsed.data.unit,
      residentName: parsed.data.residentName,
      plusCode: parsed.data.plusCode,
      notes: parsed.data.notes,
      doNotCall: false,
      status: 'pending',
      source: 'publisher',
    })
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Could not add the record.' }
  }

  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}/${partnership.claim_token}`)
  return { error: 'SAVED' }
}
