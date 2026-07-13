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
  section: string
  block: string
  address: string
  unit: string
  residentName: string
  plusCode: string
  notes: string
  doNotCall: boolean
}

export interface CsvImportResult {
  rows: CsvImportRow[]
  errors: string[]
}

const REQUIRED_HEADERS = ['Section', 'Block', 'Address']

// Import format mirrors the export columns (minus the read-only Territory/Status/Created At
// columns, which are implied by the territory the admin picked and always land as 'pending').
export function parseRecordsCsv(csvText: string): CsvImportResult {
  const parsed = Papa.parse<Record<string, string>>(csvText, { header: true, skipEmptyLines: true })
  const errors: string[] = parsed.errors.map((e) => `Row ${e.row ?? '?'}: ${e.message}`)

  const headers = parsed.meta.fields ?? []
  const missing = REQUIRED_HEADERS.filter((h) => !headers.includes(h))
  if (missing.length > 0) {
    errors.unshift(
      `Missing required column(s): ${missing.join(', ')}. Expected headers: Section, Block, Address, Unit, Resident Name, Plus Code, Notes, Do Not Call.`
    )
    return { rows: [], errors }
  }

  const rows: CsvImportRow[] = []
  parsed.data.forEach((row, index) => {
    const section = (row['Section'] ?? '').trim()
    const block = (row['Block'] ?? '').trim()
    const address = (row['Address'] ?? '').trim()
    if (!section || !block || !address) {
      errors.push(`Row ${index + 2}: Section, Block, and Address are required.`)
      return
    }
    rows.push({
      section,
      block,
      address,
      unit: (row['Unit'] ?? '').trim(),
      residentName: (row['Resident Name'] ?? '').trim(),
      plusCode: (row['Plus Code'] ?? '').trim(),
      notes: (row['Notes'] ?? '').trim(),
      doNotCall: ['yes', 'true', '1'].includes((row['Do Not Call'] ?? '').trim().toLowerCase()),
    })
  })

  return { rows, errors }
}
