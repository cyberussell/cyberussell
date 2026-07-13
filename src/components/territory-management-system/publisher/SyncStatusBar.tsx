'use client'

import { AlertTriangle, Cloud, CloudOff, RefreshCw } from 'lucide-react'

export default function SyncStatusBar({
  online,
  pendingCount,
  failedCount,
  syncing,
  onSync,
}: {
  online: boolean
  pendingCount: number
  failedCount: number
  syncing: boolean
  onSync: () => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100/60 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {online ? (
          <span className="flex items-center gap-1.5 text-emerald-600">
            <Cloud className="h-4 w-4" />
            Online
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-slate-500">
            <CloudOff className="h-4 w-4" />
            Offline
          </span>
        )}
        <span className="text-slate-300">·</span>
        <span className={pendingCount > 0 ? 'font-medium text-amber-600' : 'text-slate-400'}>
          {pendingCount > 0 ? `${pendingCount} pending sync` : 'All synced'}
        </span>
        {/* Distinct from "pending" on purpose — pending just means "waiting for a good
            connection," failed means the server actually rejected it and needs attention. */}
        {failedCount > 0 && (
          <>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1 font-medium text-red-500">
              <AlertTriangle className="h-3.5 w-3.5" />
              {failedCount} failed
            </span>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={onSync}
        disabled={syncing || (pendingCount === 0 && failedCount === 0)}
        className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-3 py-1.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
      >
        <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
        {syncing ? 'Syncing…' : "Commit Today's Work"}
      </button>
    </div>
  )
}
