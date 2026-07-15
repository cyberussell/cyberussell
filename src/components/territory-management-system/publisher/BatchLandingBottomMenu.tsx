'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ClipboardList, Download, RefreshCw, Users, type LucideIcon } from 'lucide-react'
import { getClaimedPartnershipToken } from '@/lib/territory-management-system/modules/offline/claim'

// Mirrors the workspace's own bottom bar for visual/navigational consistency on this
// batch-level page, which sits outside any single partnership's workspace. Assigned
// Records/Download/Sync all point into whichever partnership this device has already claimed
// (read from localStorage, client-side only — hence the mount-time effect rather than a lazy
// initializer, so server and first client render match) — there's no live download/sync state
// to show on this page, so tapping any of them just jumps into that workspace, where the real
// interactive versions take over. Greyed out (no destination) until a partnership is claimed.
export default function BatchLandingBottomMenu({ batchToken }: { batchToken: string }) {
  const [claimedToken, setClaimedToken] = useState<string | null>(null)

  useEffect(() => {
    setClaimedToken(getClaimedPartnershipToken(batchToken))
  }, [batchToken])

  const workspaceHref = claimedToken ? `/territory-management-system/assignment/${batchToken}/${claimedToken}` : null

  // Same order as the in-workspace PublisherBottomMenu: Download, Sync, All Partners, Assigned
  // Records — kept consistent so publishers don't relearn icon positions between pages.
  const items: { key: string; label: string; icon: LucideIcon; active: boolean; href: string | null }[] = [
    { key: 'download', label: 'Download', icon: Download, active: false, href: workspaceHref },
    { key: 'sync', label: 'Sync', icon: RefreshCw, active: false, href: workspaceHref },
    { key: 'partners', label: 'All Partners', icon: Users, active: true, href: null },
    { key: 'records', label: 'Assigned Records', icon: ClipboardList, active: false, href: workspaceHref },
  ]

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 flex border-t border-blue-100/60 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_8px_rgba(15,23,42,0.06)] backdrop-blur"
      aria-label="Workspace navigation"
    >
      {items.map((item) => {
        const Icon = item.icon
        const className = `flex flex-1 items-center justify-center py-3.5 transition ${
          item.active ? 'text-[#2563EB]' : item.href ? 'text-slate-400' : 'text-slate-300'
        }`
        return item.href ? (
          <Link key={item.key} href={item.href} className={className} aria-label={item.label} title={item.label}>
            <Icon className="h-5 w-5" strokeWidth={item.active ? 2.5 : 2} aria-hidden />
          </Link>
        ) : (
          <span
            key={item.key}
            className={className}
            aria-label={item.label}
            title={item.label}
            aria-current={item.active ? 'page' : undefined}
          >
            <Icon className="h-5 w-5" strokeWidth={item.active ? 2.5 : 2} aria-hidden />
          </span>
        )
      })}
    </nav>
  )
}
