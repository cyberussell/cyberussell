import Link from 'next/link'
import { CheckCircle2, Clock, ClipboardList, LayoutGrid, Map, QrCode } from 'lucide-react'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { getDashboardStats } from '@/lib/territory-management-system/modules/dashboard/queries'
import { listBatches } from '@/lib/territory-management-system/modules/assignment/queries'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import StatCard from '@/components/territory-management-system/dashboard/StatCard'
import Card from '@/components/territory-management-system/dashboard/Card'

export default async function DashboardPage() {
  const { supabase, congregation } = await requireAdmin()
  const [stats, batches] = await Promise.all([
    getDashboardStats(supabase, congregation.id),
    listBatches(supabase, congregation.id),
  ])
  const recentBatches = batches.slice(0, 5)

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
          <StatCard icon={QrCode} label="Assignments Generated" value={stats.assignmentBatchCount} />
          <StatCard icon={CheckCircle2} label="Visits Logged" value={stats.visitsLoggedCount} />
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-[#0B1B33]">Recent Assignments</h2>
          <Link href="/territory-management-system/dashboard/assignments" className="text-sm font-medium text-[#2563EB] hover:underline">
            View all
          </Link>
        </div>
        {recentBatches.length === 0 ? (
          <Card className="p-8 text-center text-sm text-slate-400">No assignments generated yet.</Card>
        ) : (
          <Card className="divide-y divide-blue-50">
            {recentBatches.map((b) => (
              <Link
                key={b.id}
                href={`/territory-management-system/dashboard/assignments/${b.id}`}
                className="flex items-center justify-between px-4 py-3 text-sm hover:bg-[#F8FBFF]/60"
              >
                <span className="font-medium text-[#0B1B33]">{b.assignment_date}</span>
                <span className="text-slate-400">{b.requested_partnership_count} partnership(s)</span>
              </Link>
            ))}
          </Card>
        )}
      </div>
    </div>
  )
}
