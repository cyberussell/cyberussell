'use client'

import Link from 'next/link'
import { CheckCircle2, CloudOff, ClipboardCheck, ClipboardList, Download, RefreshCw, Users, type LucideIcon } from 'lucide-react'

// Fixed bottom navigation for the publisher workspace, like a native app tab bar — easier to
// reach one-handed than a top bar while out in ministry. Also folds in the two standalone
// action cards (Download for Offline Use, Commit Today's Work) that used to sit above the
// content, so every workspace-level action lives in one reachable place. "Record a Visit" only
// appears once a record is actually open, since there's nothing to record a visit against
// otherwise; Download/Sync only appear while `showSync` is true (hidden once already on the
// dedicated Sync/Done screens, same as the cards they replaced).
export default function PublisherBottomMenu({
  batchToken,
  view,
  onGoToRecords,
  onGoToVisitForm,
  showSync,
  downloaded,
  onDownload,
  online,
  pendingCount,
  failedCount,
  syncing,
  onSync,
}: {
  batchToken: string
  view: 'list' | 'detail' | 'addRecord'
  onGoToRecords: () => void
  onGoToVisitForm: () => void
  showSync: boolean
  downloaded: boolean
  onDownload: () => void
  online: boolean
  pendingCount: number
  failedCount: number
  syncing: boolean
  onSync: () => void
}) {
  const needsAttention = pendingCount > 0 || failedCount > 0
  const syncIcon = syncing ? RefreshCw : !online ? CloudOff : RefreshCw
  const syncLabel = syncing ? 'Syncing…' : !online ? 'Offline' : needsAttention ? 'Sync' : 'Synced'
  const syncBadge = !syncing && needsAttention ? pendingCount + failedCount : null

  const items: {
    key: string
    label: string
    icon: LucideIcon
    active: boolean
    disabled?: boolean
    spin?: boolean
    badge?: number | null
    onClick?: () => void
    href?: string
  }[] = []

  // Download/Sync go on the left, ahead of the navigation items.
  if (showSync) {
    items.push({
      key: 'download',
      label: downloaded ? 'Downloaded' : 'Download',
      icon: downloaded ? CheckCircle2 : Download,
      active: downloaded,
      disabled: downloaded,
      onClick: onDownload,
    })
    items.push({
      key: 'sync',
      label: syncLabel,
      icon: syncIcon,
      active: needsAttention,
      disabled: syncing || (pendingCount === 0 && failedCount === 0),
      spin: syncing,
      badge: syncBadge,
      onClick: onSync,
    })
  }

  items.push(
    { key: 'partners', label: 'All Partners', icon: Users, active: false, href: `/territory-management-system/assignment/${batchToken}` },
    { key: 'records', label: 'Assigned Records', icon: ClipboardList, active: view === 'list', onClick: onGoToRecords }
  )
  if (view === 'detail') {
    items.push({ key: 'visit', label: 'Record a Visit', icon: ClipboardCheck, active: true, onClick: onGoToVisitForm })
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 flex border-t border-blue-100/60 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_8px_rgba(15,23,42,0.06)] backdrop-blur"
      aria-label="Workspace navigation"
    >
      {items.map((item) => {
        const Icon = item.icon
        const content = (
          <span className="relative">
            <Icon className={`h-5 w-5 ${item.spin ? 'animate-spin' : ''}`} strokeWidth={item.active ? 2.5 : 2} aria-hidden />
            {!!item.badge && (
              <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 px-0.5 text-[9px] font-bold leading-none text-white">
                {item.badge}
              </span>
            )}
          </span>
        )
        // Icon-only — no visible label text below the icon. aria-label/title keep it
        // identifiable for screen readers and on long-press/hover.
        const className = `flex flex-1 items-center justify-center py-3.5 transition disabled:opacity-40 ${
          item.active ? 'text-[#2563EB]' : 'text-slate-400'
        }`
        return item.href ? (
          <Link key={item.key} href={item.href} className={className} aria-label={item.label} title={item.label}>
            {content}
          </Link>
        ) : (
          <button
            key={item.key}
            type="button"
            onClick={item.onClick}
            disabled={item.disabled}
            className={className}
            aria-label={item.label}
            title={item.label}
            aria-current={item.active ? 'page' : undefined}
          >
            {content}
          </button>
        )
      })}
    </nav>
  )
}
