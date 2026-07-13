'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { Upload, X } from 'lucide-react'
import { importRecordsAction, type ImportSummary } from '@/app/territory-management-system/actions/records'

// territoryId is set when launched from a specific Territory's page (rows skip the Territory
// Name column) and omitted when launched from the global Records page (every row must name
// its own territory).
export default function CsvImportDialog({ territoryId }: { territoryId?: string }) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<ImportSummary | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function handleImport() {
    const file = fileInputRef.current?.files?.[0]
    if (!file) return
    startTransition(async () => {
      const text = await file.text()
      const summary = await importRecordsAction(territoryId ?? null, text)
      setResult(summary)
    })
  }

  function handleClose() {
    setOpen(false)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-white px-3 py-1.5 text-sm font-medium text-[#2563EB] hover:border-[#38BDF8]/40"
      >
        <Upload className="h-4 w-4" />
        Import CSV
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={handleClose}>
          <div
            className="w-full max-w-lg rounded-2xl border border-blue-100/60 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-16px_rgba(37,99,235,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-[#0B1B33]">Import Contact Records from CSV</h2>
              <button onClick={handleClose} aria-label="Close" className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-3 text-sm text-slate-500">
              {territoryId ? (
                <>
                  Columns: <strong>Section, Block</strong> (required), Name, Plus Code, Household Members, Address, Unit,
                  Note, Do Not Call (optional). Section/Block must match existing labels in this territory.
                </>
              ) : (
                <>
                  Columns: <strong>Territory Name, Section, Block</strong> (required), Name, Plus Code, Household Members,
                  Address, Unit, Note, Do Not Call (optional). Territory/Section/Block must match existing labels exactly
                  (case-insensitive).
                </>
              )}{' '}
              Imported rows land as <strong>Pending</strong> for review.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="mb-4 block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#F0F6FF] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[#2563EB]"
            />
            {result && (
              <div className="mb-4 space-y-2 rounded-lg border border-blue-100 bg-[#F8FBFF] p-3 text-sm">
                <p className="font-medium text-[#0B1B33]">{result.imported} contact record(s) imported as pending.</p>
                {result.errors.length > 0 && (
                  <ul className="max-h-40 list-disc space-y-1 overflow-y-auto pl-4 text-red-500">
                    {result.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={handleImport}
              disabled={pending}
              className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
            >
              {pending ? 'Importing…' : 'Import'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
