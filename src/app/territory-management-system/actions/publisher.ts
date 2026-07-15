'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { createAdminSupabase } from '@/lib/territory-management-system/supabase-server'
import { checkRateLimit, clientIp } from '@/lib/territory-management-system/rateLimit'
import { logError } from '@/lib/territory-management-system/errors'
import {
  addPublisherRecordSchema,
  deletePublisherAddedRecordSchema,
  editPublisherAddedRecordSchema,
  finishPartnershipSchema,
  logPublisherVisitSchema,
  movePartnershipRecordSchema,
  recommendCorrectionSchema,
  recommendRemovalSchema,
  renamePartnershipSchema,
  submitPartnershipNoteSchema,
  terminatePartnershipEarlySchema,
  updatePublisherRecordSchema,
} from '@/lib/territory-management-system/modules/assignment/schema'
import {
  finishPartnership,
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
  deleteRecord,
  getLatestVisitResult,
  getRecordById,
  getRecordDoNotCall,
  logVisit,
  recommendRecordCorrection,
  recommendRecordForRemoval,
  recordAddedByPartnership,
  updateRecord,
} from '@/lib/territory-management-system/modules/records/queries'
import { getSelectableResults, mergeConductorIntoNotes } from '@/lib/territory-management-system/modules/records/schema'
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
// they never retroactively appear in today's own partnership list (partnership_records).
// Stamped with created_by_partnership_id instead, which is what powers the publisher's own
// separate "My Added Records" list and its edit/delete permission checks.
export async function addPublisherRecordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = addPublisherRecordSchema.safeParse({
    partnershipToken: formData.get('partnershipToken'),
    recordId: formData.get('recordId'),
    territoryId: formData.get('territoryId'),
    sectionId: formData.get('sectionId'),
    blockId: formData.get('blockId'),
    address: formData.get('address'),
    unit: formData.get('unit'),
    residentName: formData.get('residentName'),
    plusCode: formData.get('plusCode'),
    householdMembers: formData.get('householdMembers'),
    notes: formData.get('notes'),
    initialResult: formData.get('initialResult'),
    initialConductorName: formData.get('initialConductorName'),
    initialNotes: formData.get('initialNotes'),
  })
  if (!parsed.success) return { error: 'Please fill in the required fields.' }
  if (!(await checkRateLimit(`tms-add-record:${clientIp(await headers())}`, 15))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }
  // A session that was already open before midnight could still try to submit after — the
  // client-side "ended" screen is a courtesy, this is the actual enforcement.
  if (partnership.expired) return { error: 'This assignment has ended for the day.' }
  if (partnership.finished_at || partnership.ended_early_at) return { error: 'Your ministry session has already ended.' }

  // This path runs on the service-role client (no RLS), so it must independently verify the
  // submitted territory/section/block chain actually belongs to this partnership's own
  // congregation before writing anything — otherwise a crafted request with a valid token but
  // a foreign territoryId could plant a record inside a different congregation's territory.
  const territory = await getTerritoryStructure(supabase, partnership.congregation_id, parsed.data.territoryId)
  const section = territory?.sections.find((s) => s.id === parsed.data.sectionId)
  const block = section?.blocks.find((b) => b.id === parsed.data.blockId)
  if (!territory || !section || !block) return { error: 'Invalid territory, section, or block.' }

  // A blank initialResult here re-derives the full SELECTABLE_VISIT_RESULTS list (a fresh
  // record has no prior visit and is never do_not_call yet), same re-validation pattern
  // logPublisherVisitAction already applies rather than trusting the submitted value outright.
  if (parsed.data.initialResult && !(getSelectableResults() as readonly string[]).includes(parsed.data.initialResult)) {
    return { error: 'Invalid initial status.' }
  }

  try {
    const record = await createRecord(supabase, partnership.congregation_id, {
      id: parsed.data.recordId,
      territoryId: parsed.data.territoryId,
      sectionId: parsed.data.sectionId,
      blockId: parsed.data.blockId,
      address: parsed.data.address,
      unit: parsed.data.unit,
      residentName: parsed.data.residentName,
      plusCode: parsed.data.plusCode,
      householdMembers: parsed.data.householdMembers,
      notes: parsed.data.notes,
      doNotCall: false,
      status: 'pending',
      source: 'publisher',
      createdByPartnershipId: partnership.id,
    })
    // Not marked as a completed partnership record — a just-added record is still pending admin
    // review and was never assigned to this partnership in the first place (see the comment on
    // this action's declaration).
    if (parsed.data.initialResult) {
      await logVisit(supabase, partnership.congregation_id, {
        recordId: record.id,
        visitedAt: new Date().toISOString(),
        result: parsed.data.initialResult,
        notes: mergeConductorIntoNotes(parsed.data.initialConductorName, parsed.data.initialNotes),
        createdBy: null,
        partnerName: partnership.name || null,
      })
    }
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

// Marks the partnership genuinely finished — called from the note screen's Skip/Send handlers,
// reachable from both the normal Sync & Finish path and the End Early path (both route through
// that same screen). Not gated on partnership.expired: a session finishing right at the day
// boundary should still be able to record that it finished. Doesn't require record ownership
// checks like most actions here — there's nothing to verify beyond "this token is real."
export async function finishPartnershipAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = finishPartnershipSchema.safeParse({ partnershipToken: formData.get('partnershipToken') })
  if (!parsed.success) return { error: 'Invalid request.' }
  if (!(await checkRateLimit(`tms-finish:${clientIp(await headers())}`, 10))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }

  try {
    await finishPartnership(supabase, partnership.id)
  } catch (e) {
    await logError(partnership.congregation_id, 'finishPartnershipAction', e)
    return { error: e instanceof Error ? e.message : 'Could not finish the ministry session.' }
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

// The "Update" button — recommends a corrected Plus Code (or other wrong info) for an assigned
// record, without editing it directly. Unlike the "Mark as Moved" paths above, this is NOT a
// ministry-visit outcome — the household situation hasn't changed, only the recorded data is
// wrong — so it deliberately does not log a visit or mark the record completed. The Admin
// reviews and applies (or dismisses) it from the Flagged for Correction list.
export async function recommendCorrectionAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = recommendCorrectionSchema.safeParse({
    partnershipToken: formData.get('partnershipToken'),
    recordId: formData.get('recordId'),
    plusCode: formData.get('plusCode'),
    reason: formData.get('reason'),
  })
  if (!parsed.success) return { error: 'Please fill in the Plus Code and a reason for the recommendation.' }
  if (!(await checkRateLimit(`tms-recommend-correction:${clientIp(await headers())}`, 15))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }
  if (partnership.expired) return { error: 'This assignment has ended for the day.' }

  const owns = await partnershipHasRecord(supabase, partnership.id, parsed.data.recordId)
  if (!owns) return { error: 'This contact record is not assigned to your partnership.' }

  try {
    await recommendRecordCorrection(supabase, parsed.data.recordId, parsed.data.plusCode, parsed.data.reason, partnership.name || 'Unnamed partnership')
  } catch (e) {
    await logError(partnership.congregation_id, 'recommendCorrectionAction', e)
    return { error: e instanceof Error ? e.message : 'Could not submit the recommendation.' }
  }

  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}/${partnership.claim_token}`)
  return { error: 'SAVED' }
}

// Deletes a record the publisher added themselves this session (never one that was actually
// assigned — recordAddedByPartnership only matches created_by_partnership_id, which is
// unrelated to partnership_records). Hard-blocked once the ministry session has ended, both
// normally (finished_at) or early (ended_early_at) — not just client-side hidden, since this
// runs on the service-role client with no RLS to fall back on.
export async function deletePublisherAddedRecordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = deletePublisherAddedRecordSchema.safeParse({
    partnershipToken: formData.get('partnershipToken'),
    recordId: formData.get('recordId'),
  })
  if (!parsed.success) return { error: 'Invalid request.' }
  if (!(await checkRateLimit(`tms-delete-added-record:${clientIp(await headers())}`, 15))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }
  if (partnership.expired) return { error: 'This assignment has ended for the day.' }
  if (partnership.finished_at || partnership.ended_early_at) return { error: 'Your ministry session has already ended.' }

  const owns = await recordAddedByPartnership(supabase, partnership.id, parsed.data.recordId)
  if (!owns) return { error: 'This contact record was not added by your partnership.' }

  try {
    await deleteRecord(supabase, parsed.data.recordId)
  } catch (e) {
    await logError(partnership.congregation_id, 'deletePublisherAddedRecordAction', e)
    return { error: e instanceof Error ? e.message : 'Could not delete the contact record.' }
  }

  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}/${partnership.claim_token}`)
  return { error: 'SAVED' }
}

// Edits a record the publisher added themselves this session — unlike
// updatePublisherRecordAction ("Mark as Moved" → "Update Contact Record"), territory/section/
// block ARE editable here (a publisher correcting where they placed their own new record is a
// different situation than correcting contact info on an already-assigned one). Same
// finished_at/ended_early_at hard-block as the delete action above.
export async function editPublisherAddedRecordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = editPublisherAddedRecordSchema.safeParse({
    partnershipToken: formData.get('partnershipToken'),
    recordId: formData.get('recordId'),
    territoryId: formData.get('territoryId'),
    sectionId: formData.get('sectionId'),
    blockId: formData.get('blockId'),
    address: formData.get('address'),
    unit: formData.get('unit'),
    residentName: formData.get('residentName'),
    plusCode: formData.get('plusCode'),
    householdMembers: formData.get('householdMembers'),
    notes: formData.get('notes'),
  })
  if (!parsed.success) return { error: 'Please fill in the required fields.' }
  if (!(await checkRateLimit(`tms-edit-added-record:${clientIp(await headers())}`, 15))) return { error: 'Too many attempts. Please wait a moment.' }

  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, parsed.data.partnershipToken)
  if (!partnership) return { error: 'This partnership link is no longer valid.' }
  if (partnership.expired) return { error: 'This assignment has ended for the day.' }
  if (partnership.finished_at || partnership.ended_early_at) return { error: 'Your ministry session has already ended.' }

  const owns = await recordAddedByPartnership(supabase, partnership.id, parsed.data.recordId)
  if (!owns) return { error: 'This contact record was not added by your partnership.' }

  const territory = await getTerritoryStructure(supabase, partnership.congregation_id, parsed.data.territoryId)
  const section = territory?.sections.find((s) => s.id === parsed.data.sectionId)
  const block = section?.blocks.find((b) => b.id === parsed.data.blockId)
  if (!territory || !section || !block) return { error: 'Invalid territory, section, or block.' }

  const existing = await getRecordById(supabase, partnership.congregation_id, parsed.data.recordId)
  if (!existing) return { error: 'Contact record not found.' }

  try {
    await updateRecord(supabase, parsed.data.recordId, {
      territoryId: parsed.data.territoryId,
      sectionId: parsed.data.sectionId,
      blockId: parsed.data.blockId,
      address: parsed.data.address,
      unit: parsed.data.unit,
      residentName: parsed.data.residentName,
      plusCode: parsed.data.plusCode,
      householdMembers: parsed.data.householdMembers,
      notes: parsed.data.notes,
      doNotCall: existing.do_not_call,
    })
  } catch (e) {
    await logError(partnership.congregation_id, 'editPublisherAddedRecordAction', e)
    return { error: e instanceof Error ? e.message : 'Could not update the contact record.' }
  }

  revalidatePath(`/territory-management-system/assignment/${partnership.batch.access_token}/${partnership.claim_token}`)
  return { error: 'SAVED' }
}
