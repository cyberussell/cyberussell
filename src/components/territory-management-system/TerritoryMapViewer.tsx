'use client'

import { useEffect, useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

// Reference image only — no section/block boundaries are drawn on it (count-based
// generation, not spatial). Click-to-zoom lightbox with native scroll/pinch, no new
// canvas/drawing dependency.
export default function TerritoryMapViewer({ mapImageUrl, territoryName }: { mapImageUrl: string; territoryName: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View ${territoryName} map full size`}
        className="group relative block w-full overflow-hidden rounded-xl border border-blue-100"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mapImageUrl} alt={`${territoryName} map`} className="w-full object-contain" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
          <ZoomIn className="h-8 w-8 text-white" />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setOpen(false)}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="max-h-full max-w-full overflow-auto" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mapImageUrl} alt={`${territoryName} map`} className="max-w-none" />
          </div>
        </div>
      )}
    </>
  )
}
