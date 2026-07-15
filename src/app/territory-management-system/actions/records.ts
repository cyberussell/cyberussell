'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import {
  createRecordSchema,
  logVisitSchema,
  mergeConductorIntoNotes,
  updateRecordSchema,
} from '@/lib/territory-management-system/modules/records/schema'
import * as recordQueries from '@/lib/territory-management-system/modules/records/queries'
import { parseRecordsCsv } from '@/lib/territory-management-system/modules/records/csv'
import { getTerritoryStructure, listTerritories } from '@/lib/territory-management-system/modules/territory/queries'
import type { TerritoryStructure } from '@/lib/territory-management-system/modules/territory/types'
import { type ActionResult } from './shared'

export async function createRecordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = createRecordSchema.safeParse({
    territoryId: formData.get('territoryId'),
    sectionId: formData.get('sectionId'),
    blockId: formData.get('blockId'),
    address: formData.get('address'),
    unit: formData.get('unit'),
    residentName: formData.get('residentName'),
    plusCode: formData.get('plusCode'),
    householdMembers: formData.get('householdMembers'),
    notes: formData.get('notes'),
    doNotCall: formData.get('doNotCall'),
  })
  if (!parsed.success) return { error: 'Please fill in the required fields.' }

  const { supabase, congregation } = await requireAdmin()

  // RLS only checks that congregation_id on the new row belongs to the caller — it never
  // verifies the territoryId/sectionId/blockId in the (client-editable) hidden form fields
  // actually belong to that same congregation. Confirm the whole chain resolves within the
  // admin's own territory tree before writing, same check already required for the
  // publisher's equivalent (RLS-free) path in actions/publisher.ts.
  const territory = await getTerritoryStructure(supabase, congregation.id, parsed.data.territoryId)
  const section = territory?.sections.find((s) => s.id === parsed.data.sectionId)
  const block = section?.blocks.find((b) => b.id === parsed.data.blockId)
  if (!territory || !section || !block) return { error: 'Invalid territory, section, or block.' }

  try {
    await recordQueries.createRecord(supabase, congregation.id, parsed.data)
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Could not create the contact record.' }
  }

  revalidatePath('/territory-management-system/dashboard/records')
  revalidatePath(`/territory-management-system/dashboard/territories/${parsed.data.territoryId}`)
  return { error: 'SAVED' }
}

export async function updateRecordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = updateRecordSchema.safeParse({
    recordId: formData.get('recordId'),
    address: formData.get('address'),
    unit: formData.get('unit'),
    residentName: formData.get('residentName'),
    plusCode: formData.get('plusCode'),
    householdMembers: formData.get('householdMembers'),
    notes: formData.get('notes'),
    doNotCall: formData.get('doNotCall'),
  })
  if (!parsed.success) return { error: 'Please fill in the required fields.' }
  const { recordId, ...updates } = parsed.data

  const { supabase } = await requireAdmin()
  try {
    await recordQueries.updateRecord(supabase, recordId, updates)
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Could not update the contact record.' }
  }

  revalidatePath(`/territory-management-system/dashboard/records/${recordId}`)
  return { error: 'SAVED' }
}

export async function deleteRecordAction(recordId: string): Promise<void> {
  const { supabase } = await requireAdmin()
  await recordQueries.deleteRecord(supabase, recordId)
  revalidatePath('/territory-management-system/dashboard/records')
}

export async function approveRecordAction(recordId: string): Promise<void> {
  const { supabase } = await requireAdmin()
  await recordQueries.setRecordStatus(supabase, recordId, 'approved')
  revalidatePath('/territory-management-system/dashboard/records')
  revalidatePath(`/territory-management-system/dashboard/records/${recordId}`)
}

// "Reject" a pending CSV-imported record = delete it — there's no other state for a
// rejected row to sit in, and leaving it around unresolved would strand rows the admin
// already decided not to use.
export async function rejectRecordAction(recordId: string): Promise<void> {
  const { supabase } = await requireAdmin()
  await recordQueries.deleteRecord(supabase, recordId)
  revalidatePath('/territory-management-system/dashboard/records')
}

export async function logVisitAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = logVisitSchema.safeParse({
    recordId: formData.get('recordId'),
    visitedAt: formData.get('visitedAt'),
    result: formData.get('result'),
    conductorName: formData.get('conductorName'),
    notes: formData.get('notes'),
  })
  if (!parsed.success) {
    const notesIssue = parsed.error.issues.find((i) => i.path.includes('notes'))
    const conductorIssue = parsed.error.issues.find((i) => i.path.includes('conductorName'))
    return { error: notesIssue?.message ?? conductorIssue?.message ?? 'Please fill in the visit details correctly.' }
  }

  const { supabase, congregation, userId } = await requireAdmin()
  try {
    await recordQueries.logVisit(supabase, congregation.id, {
      recordId: parsed.data.recordId,
      visitedAt: new Date(parsed.data.visitedAt).toISOString(),
      result: parsed.data.result,
      notes: mergeConductorIntoNotes(parsed.data.conductorName, parsed.data.notes),
      createdBy: userId,
      partnerName: null,
    })
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Could not log the visit.' }
  }

  revalidatePath(`/territory-management-system/dashboard/records/${parsed.data.recordId}`)
  return { error: 'SAVED' }
}

export interface ImportSummary {
  imported: number
  errors: string[]
}

// territoryId is passed when launched from a specific Territory's page (every row lands in
// that territory, a Territory Name column if present is ignored) and null when launched from
// the global Records page (every row names its own territory via Territory Name, resolved by
// case-insensitive exact match against this congregation's territories — same matching rule
// already used for Section/Block below).
export async function importRecordsAction(territoryId: string | null, csvText: string): Promise<ImportSummary> {
  const { supabase, congregation } = await requireAdmin()
  const { rows, errors } = parseRecordsCsv(csvText, { requireTerritoryName: territoryId === null })

  const structureCache = new Map<string, TerritoryStructure>()
  const territoryIdByName = new Map<string, string>()
  if (territoryId) {
    const structure = await getTerritoryStructure(supabase, congregation.id, territoryId)
    if (!structure) return { imported: 0, errors: ['Territory not found.'] }
    structureCache.set(territoryId, structure)
  } else {
    const territories = await listTerritories(supabase, congregation.id)
    for (const t of territories) territoryIdByName.set(t.name.toLowerCase(), t.id)
  }

  const resolvedRows: Parameters<typeof recordQueries.importRecords>[2] = []
  const resolutionErrors: string[] = []
  const touchedTerritoryIds = new Set<string>()

  for (const [index, row] of rows.entries()) {
    const rowNum = index + 2
    let rowTerritoryId = territoryId

    if (!rowTerritoryId) {
      const matchId = territoryIdByName.get(row.territoryName.toLowerCase())
      if (!matchId) {
        resolutionErrors.push(`Row ${rowNum}: no territory named "${row.territoryName}".`)
        continue
      }
      rowTerritoryId = matchId
    }

    let structure = structureCache.get(rowTerritoryId)
    if (!structure) {
      const fetched = await getTerritoryStructure(supabase, congregation.id, rowTerritoryId)
      if (!fetched) {
        resolutionErrors.push(`Row ${rowNum}: territory not found.`)
        continue
      }
      structure = fetched
      structureCache.set(rowTerritoryId, structure)
    }

    const section = structure.sections.find((s) => s.label.toLowerCase() === row.section.toLowerCase())
    if (!section) {
      resolutionErrors.push(`Row ${rowNum}: no section "${row.section}" in territory "${structure.name}".`)
      continue
    }
    const block = section.blocks.find((b) => b.label.toLowerCase() === row.block.toLowerCase())
    if (!block) {
      resolutionErrors.push(`Row ${rowNum}: no block "${row.block}" in section "${row.section}".`)
      continue
    }

    touchedTerritoryIds.add(rowTerritoryId)
    resolvedRows.push({
      territoryId: rowTerritoryId,
      sectionId: section.id,
      blockId: block.id,
      address: row.address,
      unit: row.unit,
      residentName: row.residentName,
      plusCode: row.plusCode,
      householdMembers: row.householdMembers,
      notes: row.notes,
      doNotCall: row.doNotCall,
    })
  }

  const allErrors = [...errors, ...resolutionErrors]
  if (resolvedRows.length === 0) return { imported: 0, errors: allErrors }

  const imported = await recordQueries.importRecords(supabase, congregation.id, resolvedRows)
  revalidatePath('/territory-management-system/dashboard/records')
  for (const id of touchedTerritoryIds) revalidatePath(`/territory-management-system/dashboard/territories/${id}`)
  return { imported, errors: allErrors }
}
