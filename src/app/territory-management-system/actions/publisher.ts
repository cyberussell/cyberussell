'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { createAdminSupabase } from '@/lib/territory-management-system/supabase-server'
import { checkRateLimit, clientIp } from '@/lib/territory-management-system/rateLimit'
import { logError } from '@/lib/territory-management-system/errors'
import {
  addPublisherRecordSchema,
  logPublisherVisitSchema,
  movePartnershipRecordSchema,
  recommendRemovalSchema,
  renamePartnershipSchema,
  submitPartnershipNoteSchema,
  terminatePartnershipEarlySchema,
  updatePublisherRecordSchema,
} from '@/lib/territory-management-system/modules/assignment/schema'
import {
  getPartnershipById,
  getPartnershipByToken,
  markPartnershipRecordCompleted,
  movePartnershipRecord,
  partnershipHasRecord,
  renamePartnership,
  submitPartnershipNote,
  terminatePartnershipEarly,
} from '@/lib/territory-management-system/modules/assignment/queries'
import {
  createRecord,
  getLatestVisitResult,
  getRecordById,
  getRecordDoNotCall,
  logVisit,
  recommendRecordForRemoval,
  updateRecord,
} from '@/lib/territory-management-system/modules/records/queries'
import { getSelectableResults } from '@/lib/territory-management-system/modules/records/schema'
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
  if (!(await checkRateLimit(`tms-rename:${clientIp(await headers())}`, 10))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }
  // A session that was already open before midnight could still try to submit after — the
  // client-side "ended" screen is a courtesy, this is the actual enforcement.
  if (partnership.expired) return { error: 'This assignment has ended for the day.' }

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
  if (!parsed.success) {
    const notesIssue = parsed.error.issues.find((i) => i.path.includes('notes'))
    return { error: notesIssue?.message ?? 'Please fill in the visit details correctly.' }
  }
  if (!(await checkRateLimit(`tms-visit:${clientIp(await headers())}`, 40))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }
  if (partnership.expired) return { error: 'This assignment has ended for the day.' }

  const owns = await partnershipHasRecord(supabase, partnership.id, parsed.data.recordId)
  if (!owns) return { error: 'This contact record is not assigned to your partnership.' }

  // Re-derive the selectable results the same way the client's form does (from the record's
  // latest visit result + do_not_call flag) rather than checking a static list — a static list
  // can't account for the Bible Study follow-up or Do Not Call narrowing (getSelectableResults),
  // which is exactly what caused Progressing/Discontinued to be wrongly rejected here before
  // this fix.
  const [latestResult, doNotCall] = await Promise.all([
    getLatestVisitResult(supabase, parsed.data.recordId),
    getRecordDoNotCall(supabase, parsed.data.recordId),
  ])
  const selectable = getSelectableResults(latestResult, doNotCall)
  if (!(selectable as readonly string[]).includes(parsed.data.result)) return { error: 'Invalid visit result.' }

  try {
    await logVisit(supabase, partnership.congregation_id, {
      recordId: parsed.data.recordId,
      visitedAt: new Date(parsed.data.visitedAt).toISOString(),
      result: parsed.data.result,
      notes: parsed.data.notes,
      createdBy: null,
      partnerName: partnership.name || null,
    })
    await markPartnershipRecordCompleted(supabase, partnership.id, parsed.data.recordId)
  } catch (e) {
    await logError(partnership.congregation_id, 'logPublisherVisitAction', e)
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
  if (!(await checkRateLimit(`tms-add-record:${clientIp(await headers())}`, 15))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }
  // A session that was already open before midnight could still try to submit after — the
  // client-side "ended" screen is a courtesy, this is the actual enforcement.
  if (partnership.expired) return { error: 'This assignment has ended for the day.' }

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
    await logError(partnership.congregation_id, 'addPublisherRecordAction', e)
    return { error: e instanceof Error ? e.message : 'Could not add the contact record.' }
  }

  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}/${partnership.claim_token}`)
  return { error: 'SAVED' }
}

// Passes an assigned record to a different Ministry Partner in the same batch. Both sides are
// re-resolved server-side (the source via the caller's own token, the destination by id) —
// never trusts the client's claim that the destination actually belongs to this batch.
export async function movePartnershipRecordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = movePartnershipRecordSchema.safeParse({
    partnershipToken: formData.get('partnershipToken'),
    recordId: formData.get('recordId'),
    destinationPartnershipId: formData.get('destinationPartnershipId'),
  })
  if (!parsed.success) return { error: 'Invalid request.' }
  if (!(await checkRateLimit(`tms-move-record:${clientIp(await headers())}`, 20))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }
  if (partnership.expired) return { error: 'This assignment has ended for the day.' }
  if (parsed.data.destinationPartnershipId === partnership.id) return { error: 'Choose a different Ministry Partner.' }

  const owns = await partnershipHasRecord(supabase, partnership.id, parsed.data.recordId)
  if (!owns) return { error: 'This contact record is not assigned to your partnership.' }

  const destination = await getPartnershipById(supabase, parsed.data.destinationPartnershipId)
  if (!destination || destination.batch_id !== partnership.batch_id) return { error: 'Invalid destination Ministry Partner.' }
  if (destination.ended_early_at) return { error: 'That Ministry Partner has already ended their ministry for today.' }

  try {
    await movePartnershipRecord(supabase, partnership.id, destination.id, parsed.data.recordId)
  } catch (e) {
    await logError(partnership.congregation_id, 'movePartnershipRecordAction', e)
    return { error: e instanceof Error ? e.message : 'Could not move the contact record.' }
  }

  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}/${partnership.claim_token}`)
  return { error: 'SAVED' }
}

export async function terminatePartnershipEarlyAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = terminatePartnershipEarlySchema.safeParse({ partnershipToken: formData.get('partnershipToken') })
  if (!parsed.success) return { error: 'Invalid request.' }
  if (!(await checkRateLimit(`tms-terminate:${clientIp(await headers())}`, 5))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }
  if (partnership.expired) return { error: 'This assignment has ended for the day.' }

  try {
    await terminatePartnershipEarly(supabase, partnership.congregation_id, partnership.id, partnership.name)
  } catch (e) {
    await logError(partnership.congregation_id, 'terminatePartnershipEarlyAction', e)
    return { error: e instanceof Error ? e.message : 'Could not end the ministry session.' }
  }

  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}`)
  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}/${partnership.claim_token}`)
  return { error: 'SAVED' }
}

// Optional end-of-ministry note to the Admin — skippable, so this is only ever enqueued when
// the publisher actually writes something (see PublisherWorkspaceApp's note screen). Not
// gated on partnership.expired like the other actions here: a session finishing right at the
// day boundary should still be able to leave its note.
export async function submitPartnershipNoteAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = submitPartnershipNoteSchema.safeParse({
    partnershipToken: formData.get('partnershipToken'),
    note: formData.get('note'),
  })
  if (!parsed.success) return { error: 'Please enter a note.' }
  if (!(await checkRateLimit(`tms-note:${clientIp(await headers())}`, 5))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }

  try {
    await submitPartnershipNote(supabase, partnership.id, parsed.data.note)
  } catch (e) {
    await logError(partnership.congregation_id, 'submitPartnershipNoteAction', e)
    return { error: e instanceof Error ? e.message : 'Could not send the note.' }
  }

  return { error: 'SAVED' }
}

// "Mark as Moved" → "Update Contact Record" path — territory/section/block are never touched
// (same location, corrected contact info), and household_members/do_not_call are read from the
// existing row and passed straight through so this narrower form can't accidentally clear them.
// Still logs a real 'moved' visit underneath so the card tone/stats stay consistent with the
// other "Mark as Moved" path.
export async function updatePublisherRecordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = updatePublisherRecordSchema.safeParse({
    partnershipToken: formData.get('partnershipToken'),
    recordId: formData.get('recordId'),
    address: formData.get('address'),
    unit: formData.get('unit'),
    residentName: formData.get('residentName'),
    plusCode: formData.get('plusCode'),
    notes: formData.get('notes'),
  })
  if (!parsed.success) return { error: 'Please fill in the required fields.' }
  if (!(await checkRateLimit(`tms-update-record:${clientIp(await headers())}`, 15))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }
  if (partnership.expired) return { error: 'This assignment has ended for the day.' }

  const owns = await partnershipHasRecord(supabase, partnership.id, parsed.data.recordId)
  if (!owns) return { error: 'This contact record is not assigned to your partnership.' }

  const existing = await getRecordById(supabase, partnership.congregation_id, parsed.data.recordId)
  if (!existing) return { error: 'Contact record not found.' }

  try {
    await updateRecord(supabase, parsed.data.recordId, {
      address: parsed.data.address,
      unit: parsed.data.unit,
      residentName: parsed.data.residentName,
      plusCode: parsed.data.plusCode,
      householdMembers: existing.household_members ?? undefined,
      notes: parsed.data.notes,
      doNotCall: existing.do_not_call,
    })
    await logVisit(supabase, partnership.congregation_id, {
      recordId: parsed.data.recordId,
      visitedAt: new Date().toISOString(),
      result: 'moved',
      notes: 'Contact record updated after move.',
      createdBy: null,
      partnerName: partnership.name || null,
    })
    await markPartnershipRecordCompleted(supabase, partnership.id, parsed.data.recordId)
  } catch (e) {
    await logError(partnership.congregation_id, 'updatePublisherRecordAction', e)
    return { error: e instanceof Error ? e.message : 'Could not update the contact record.' }
  }

  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}/${partnership.claim_token}`)
  return { error: 'SAVED' }
}

// "Mark as Moved" → "Recommend for Admin Removal" path — the reason is required (enforced by
// recommendRemovalSchema), never an optional note. Also logs a real 'moved' visit, same as the
// Update Contact Record path above, so both paths leave the record in the same visible state.
export async function recommendRemovalAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = recommendRemovalSchema.safeParse({
    partnershipToken: formData.get('partnershipToken'),
    recordId: formData.get('recordId'),
    reason: formData.get('reason'),
  })
  if (!parsed.success) return { error: 'Please enter a reason for the recommendation.' }
  if (!(await checkRateLimit(`tms-recommend-removal:${clientIp(await headers())}`, 15))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }
  if (partnership.expired) return { error: 'This assignment has ended for the day.' }

  const owns = await partnershipHasRecord(supabase, partnership.id, parsed.data.recordId)
  if (!owns) return { error: 'This contact record is not assigned to your partnership.' }

  try {
    await recommendRecordForRemoval(supabase, parsed.data.recordId, parsed.data.reason, partnership.name || 'Unnamed partnership')
    await logVisit(supabase, partnership.congregation_id, {
      recordId: parsed.data.recordId,
      visitedAt: new Date().toISOString(),
      result: 'moved',
      notes: parsed.data.reason,
      createdBy: null,
      partnerName: partnership.name || null,
    })
    await markPartnershipRecordCompleted(supabase, partnership.id, parsed.data.recordId)
  } catch (e) {
    await logError(partnership.congregation_id, 'recommendRemovalAction', e)
    return { error: e instanceof Error ? e.message : 'Could not submit the recommendation.' }
  }

  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}/${partnership.claim_token}`)
  return { error: 'SAVED' }
}
