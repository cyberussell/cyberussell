'use client'

import { useMemo, useState } from 'react'
import type { AuditEntityType, AuditLogWithActor } from '@/lib/laundry-management-system/modules/audit/types'
import { AUDIT_ACTION_LABELS } from '@/lib/laundry-management-system/modules/audit/labels'
import DataTable, { type DataTableColumn } from './DataTable'
import FilterPills from './FilterPills'
import TableSearchInput from './TableSearchInput'

const ENTITY_FILTERS: { label: string; value: AuditEntityType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Orders', value: 'order' },
  { label: 'Inventory', value: 'inventory_item' },
  { label: 'Drivers', value: 'driver' },
  { label: 'Staff', value: 'staff' },
  { label: 'Business', value: 'business' },
  { label: 'Branches', value: 'branch' },
]

function describeDetails(log: AuditLogWithActor): string {
  const d = log.details
  switch (log.action) {
    case 'order_status_changed':
      return `${d.from} → ${d.to}`
    case 'order_staff_assigned':
      return d.assignedStaffId ? 'Assigned to a staff member' : 'Unassigned'
    case 'order_driver_assigned':
      return d.driverId ? 'Assigned to a driver' : 'Unassigned'
    case 'order_priority_changed':
      return d.isPriority ? 'Marked priority' : 'Priority removed'
    case 'inventory_item_deleted':
      return d.name ? `Deleted "${d.name}"` : 'Item deleted'
    case 'driver_deleted':
      return d.name ? `Deleted "${d.name}"` : 'Driver deleted'
    case 'staff_invited':
      return d.email ? `Invited ${d.email}` : 'Staff invited'
    case 'business_profile_updated':
      return d.name ? `Renamed to "${d.name}"` : 'Profile updated'
    case 'branch_details_updated':
      return d.name ? `"${d.name}" updated` : 'Branch updated'
    default:
      return ''
  }
}

export default function ActivityTable({ logs }: { logs: AuditLogWithActor[] }) {
  const [query, setQuery] = useState('')
  const [entityType, setEntityType] = useState<AuditEntityType | 'all'>('all')

  const filtered = useMemo(() => {
    let result = logs
    if (entityType !== 'all') result = result.filter((l) => l.entity_type === entityType)
    const q = query.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (l) =>
          AUDIT_ACTION_LABELS[l.action].toLowerCase().includes(q) ||
          (l.actor?.full_name ?? '').toLowerCase().includes(q) ||
          describeDetails(l).toLowerCase().includes(q)
      )
    }
    return result
  }, [logs, entityType, query])

  const columns: DataTableColumn<AuditLogWithActor>[] = [
    {
      header: 'When',
      sortValue: (l) => l.created_at,
      cell: (l) => <span className="text-slate-500">{new Date(l.created_at).toLocaleString('en-US')}</span>,
    },
    {
      header: 'Actor',
      cell: (l) => (
        <span>
          {l.actor?.full_name || (l.actor_role === 'owner' ? 'Owner' : 'Staff member')}{' '}
          <span className="text-xs text-slate-400">({l.actor_role})</span>
        </span>
      ),
    },
    { header: 'Action', sortValue: (l) => AUDIT_ACTION_LABELS[l.action], cell: (l) => AUDIT_ACTION_LABELS[l.action] },
    { header: 'Details', cell: (l) => <span className="text-slate-500">{describeDetails(l)}</span> },
  ]

  return (
    <div>
      <div className="mb-4">
        <TableSearchInput value={query} onChange={setQuery} placeholder="Search by actor, action, or details…" />
      </div>
      <div className="mb-4">
        <FilterPills options={ENTITY_FILTERS} active={entityType} onChange={setEntityType} />
      </div>
      <DataTable columns={columns} rows={filtered} emptyMessage="No activity recorded yet." />
    </div>
  )
}
