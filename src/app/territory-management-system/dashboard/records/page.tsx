import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { listRecords } from '@/lib/territory-management-system/modules/records/queries'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import RecordsTable from '@/components/territory-management-system/RecordsTable'
import CsvExportButton from '@/components/territory-management-system/CsvExportButton'

export default async function RecordsPage() {
  const { supabase, congregation } = await requireAdmin()
  const records = await listRecords(supabase, congregation.id)

  return (
    <div>
      <PageHeader
        title="Territory Records"
        subtitle="Search, filter, and review every address across all territories."
        action={<CsvExportButton href="/territory-management-system/dashboard/records/export" />}
      />
      <RecordsTable records={records} />
    </div>
  )
}
