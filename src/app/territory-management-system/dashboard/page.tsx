import { CheckCircle2, Clock, ClipboardList, LayoutGrid, Map } from 'lucide-react'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { getDashboardStats } from '@/lib/territory-management-system/modules/dashboard/queries'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import StatCard from '@/components/territory-management-system/dashboard/StatCard'

export default async function DashboardPage() {
  const { supabase, congregation } = await requireAdmin()
  const stats = await getDashboardStats(supabase, congregation.id)

  return (
    <div className="space-y-8">
      <div>
        <PageHeader title="Dashboard" subtitle={`${congregation.name} — Congregation #${congregation.congregation_number}`} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Map} label="Territories" value={stats.territoryCount} />
          <StatCard icon={LayoutGrid} label="Sections" value={stats.sectionCount} />
          <StatCard icon={LayoutGrid} label="Blocks" value={stats.blockCount} />
          <StatCard icon={ClipboardList} label="Contact Records" value={stats.recordCount} />
          <StatCard
            icon={Clock}
            label="Pending Approval"
            value={stats.pendingRecordCount}
            hint={stats.pendingRecordCount > 0 ? 'Review in Contact Records' : undefined}
          />
          <StatCard icon={CheckCircle2} label="Visits Logged" value={stats.visitsLoggedCount} />
        </div>
      </div>
    </div>
  )
}
