import 'server-only'
import Papa from 'papaparse'
import type { TerritoryRecordWithLocation } from './types'

const EXPORT_COLUMNS = [
  'Territory',
  'Section',
  'Block',
  'Address',
  'Unit',
  'Resident Name',
  'Plus Code',
  'Household Members',
  'Notes',
  'Do Not Call',
  'Status',
  'Created At',
] as const

export function recordsToCsv(records: TerritoryRecordWithLocation[]): string {
  const rows = records.map((r) => ({
    Territory: r.territory?.name ?? '',
    Section: r.section?.label ?? '',
    Block: r.block?.label ?? '',
    Address: r.address,
    Unit: r.unit,
    'Resident Name': r.resident_name,
    'Plus Code': r.plus_code ?? '',
    'Household Members': r.household_members ?? '',
    Notes: r.notes,
    'Do Not Call': r.do_not_call ? 'yes' : 'no',
    Status: r.status,
    'Created At': r.created_at,
  }))
  // escapeFormulae guards against CSV/Excel formula injection — a resident name or note
  // starting with =, +, -, or @ would otherwise execute as a formula when the export is
  // opened in a spreadsheet app.
  return Papa.unparse(rows, { columns: [...EXPORT_COLUMNS], escapeFormulae: true })
}

export interface CsvImportRow {
  territoryName: string
  section: string
  block: string
  address: string
  unit: string
  residentName: string
  plusCode: string
  householdMembers: number | null
  notes: string
  doNotCall: boolean
}

export interface CsvImportResult {
  rows: CsvImportRow[]
  errors: string[]
}

// Every column has at least one alias so the same parser serves both the territory-scoped
// import (address-first, matches the original export headers) and the newer cross-territory
// import (Name/Territory Name/Household Members, no Address column at all).
const HEADER_ALIASES = {
  territoryName: ['Territory Name', 'Territory'],
  section: ['Section'],
  block: ['Block'],
  address: ['Address'],
  unit: ['Unit'],
  residentName: ['Name', 'Resident Name'],
  plusCode: ['Plus Code'],
  householdMembers: ['Household Members'],
  notes: ['Note', 'Notes'],
  doNotCall: ['Do Not Call'],
} as const

function pick(row: Record<string, string>, keys: readonly string[]): string {
  for (const key of keys) {
    if (row[key] !== undefined) return (row[key] ?? '').trim()
  }
  return ''
}

// requireTerritoryName is true for the global Records-page import (no territory pre-selected,
// so every row must name its own territory) and false for the per-territory import launched
// from a Territory's own page (territoryId is already fixed, a Territory Name column if
// present is ignored).
export function parseRecordsCsv(csvText: string, options: { requireTerritoryName: boolean }): CsvImportResult {
  const parsed = Papa.parse<Record<string, string>>(csvText, { header: true, skipEmptyLines: true })
  const errors: string[] = parsed.errors.map((e) => `Row ${e.row ?? '?'}: ${e.message}`)

  const headers = parsed.meta.fields ?? []
  const hasAny = (keys: readonly string[]) => keys.some((k) => headers.includes(k))
  const missingLabels: string[] = []
  if (!hasAny(HEADER_ALIASES.section)) missingLabels.push('Section')
  if (!hasAny(HEADER_ALIASES.block)) missingLabels.push('Block')
  if (options.requireTerritoryName && !hasAny(HEADER_ALIASES.territoryName)) missingLabels.push('Territory Name')
  if (missingLabels.length > 0) {
    errors.unshift(
      `Missing required column(s): ${missingLabels.join(', ')}. Expected headers: ${
        options.requireTerritoryName ? 'Territory Name, ' : ''
      }Section, Block, Name, Plus Code, Household Members, Address, Unit, Note, Do Not Call.`
    )
    return { rows: [], errors }
  }

  const rows: CsvImportRow[] = []
  parsed.data.forEach((row, index) => {
    const rowNum = index + 2
    const territoryName = pick(row, HEADER_ALIASES.territoryName)
    const section = pick(row, HEADER_ALIASES.section)
    const block = pick(row, HEADER_ALIASES.block)
    if (!section || !block) {
      errors.push(`Row ${rowNum}: Section and Block are required.`)
      return
    }
    if (options.requireTerritoryName && !territoryName) {
      errors.push(`Row ${rowNum}: Territory Name is required.`)
      return
    }

    const householdMembersRaw = pick(row, HEADER_ALIASES.householdMembers)
    let householdMembers: number | null = null
    if (householdMembersRaw) {
      const n = Number(householdMembersRaw)
      if (!Number.isInteger(n) || n < 0) {
        errors.push(`Row ${rowNum}: Household Members must be a whole number.`)
        return
      }
      householdMembers = n
    }

    const doNotCallRaw = pick(row, HEADER_ALIASES.doNotCall).toLowerCase()
    rows.push({
      territoryName,
      section,
      block,
      address: pick(row, HEADER_ALIASES.address),
      unit: pick(row, HEADER_ALIASES.unit),
      residentName: pick(row, HEADER_ALIASES.residentName),
      plusCode: pick(row, HEADER_ALIASES.plusCode),
      householdMembers,
      notes: pick(row, HEADER_ALIASES.notes),
      doNotCall: ['yes', 'true', '1'].includes(doNotCallRaw),
    })
  })

  return { rows, errors }
}
