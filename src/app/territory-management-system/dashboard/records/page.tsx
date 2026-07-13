import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { listRecords } from '@/lib/territory-management-system/modules/records/queries'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import RecordsTable from '@/components/territory-management-system/RecordsTable'
import CsvExportButton from '@/components/territory-management-system/CsvExportButton'
import CsvImportDialog from '@/components/territory-management-system/CsvImportDialog'

export default async function RecordsPage() {
  const { supabase, congregation } = await requireAdmin()
  const records = await listRecords(supabase, congregation.id)

  return (
    <div>
      <PageHeader
        title="Contact Records"
        subtitle="Search, filter, and review every address across all territories."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <CsvImportDialog />
            <CsvExportButton href="/territory-management-system/dashboard/records/export" />
          </div>
        }
      />
      <RecordsTable records={records} />
    </div>
  )
}
