'use client'

import Link from 'next/link'
import { ClipboardCheck, ClipboardList, ClipboardPlus, Home, Users, type LucideIcon } from 'lucide-react'

// Fixed bottom navigation for the publisher workspace, like a native app tab bar — easier to
// reach one-handed than a top bar while out in ministry. Download/Sync live in a top bar
// instead (see PublisherWorkspaceApp) — every other action lives here. "Record a Visit" only
// appears once a record is actually open, since there's nothing to record a visit against
// otherwise.
export default function PublisherBottomMenu({
  batchToken,
  view,
  onGoToHome,
  onGoToRecords,
  onGoToAddedRecords,
  showAddedRecords,
  onGoToVisitForm,
}: {
  batchToken: string
  view: 'home' | 'list' | 'detail' | 'addRecord' | 'addedRecords' | 'addedRecordDetail' | 'editAddedRecord'
  onGoToHome: () => void
  onGoToRecords: () => void
  // Hidden while readOnly (viewing another Ministry Partner's assignment) — a publisher-added
  // record only ever belongs to the partnership that added it, same as "Add a New Contact
  // Record" itself, which is also readOnly-gated.
  onGoToAddedRecords: () => void
  showAddedRecords: boolean
  onGoToVisitForm: () => void
}) {
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

  items.push(
    { key: 'home', label: 'Home', icon: Home, active: view === 'home', onClick: onGoToHome },
    { key: 'partners', label: 'All Partners', icon: Users, active: false, href: `/territory-management-system/assignment/${batchToken}` },
    { key: 'records', label: 'Assigned Records', icon: ClipboardList, active: view === 'list', onClick: onGoToRecords }
  )
  if (showAddedRecords) {
    items.push({
      key: 'addedRecords',
      label: 'My Added Records',
      icon: ClipboardPlus,
      active: view === 'addedRecords' || view === 'addedRecordDetail' || view === 'editAddedRecord',
      onClick: onGoToAddedRecords,
    })
  }
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
        // Active item gets a filled pill behind a visibly larger, bolder icon — on top of the
        // color change below — so the current section reads at a glance on a one-handed,
        // out-in-ministry tap target, not just a subtle color shift.
        const content = (
          <span className={`relative flex items-center justify-center rounded-full p-1.5 transition ${item.active ? 'bg-blue-50' : ''}`}>
            <Icon
              className={`${item.active ? 'h-6 w-6' : 'h-5 w-5'} ${item.spin ? 'animate-spin' : ''}`}
              strokeWidth={item.active ? 2.75 : 2}
              aria-hidden
            />
            {!!item.badge && (
              <span className="absolute -right-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 px-0.5 text-[9px] font-bold leading-none text-white">
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
