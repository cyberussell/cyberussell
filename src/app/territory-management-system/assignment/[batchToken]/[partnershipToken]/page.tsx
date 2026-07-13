import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createAdminSupabase } from '@/lib/territory-management-system/supabase-server'
import { getPartnershipByToken } from '@/lib/territory-management-system/modules/assignment/queries'
import { getTerritoryStructure } from '@/lib/territory-management-system/modules/territory/queries'
import type { TerritoryStructure } from '@/lib/territory-management-system/modules/territory/types'
import PublisherWorkspaceApp from '@/components/territory-management-system/publisher/PublisherWorkspaceApp'
import AssignmentEndedNotice from '@/components/territory-management-system/publisher/AssignmentEndedNotice'

export const dynamic = 'force-dynamic'

export default async function PartnershipWorkspacePage({
  params,
}: {
  params: Promise<{ batchToken: string; partnershipToken: string }>
}) {
  const { batchToken, partnershipToken } = await params
  const supabase = createAdminSupabase()
  const partnership = await getPartnershipByToken(supabase, partnershipToken)
  if (!partnership || partnership.batch.access_token !== batchToken) notFound()
  if (partnership.expired) return <AssignmentEndedNotice />

  const territoryStructures = await Promise.all(
    partnership.territories.map((t) => getTerritoryStructure(supabase, partnership.congregation_id, t.id))
  )
  const validStructures = territoryStructures.filter((s): s is TerritoryStructure => s !== null)

  return (
    <div className="bg-[#F3F8FF] px-4 pt-4">
      <div className="mx-auto max-w-lg">
        <Link href={`/territory-management-system/assignment/${batchToken}`} className="text-sm text-[#2563EB] hover:underline">
          ← All Partnerships
        </Link>
      </div>
      <PublisherWorkspaceApp partnershipToken={partnershipToken} initialWorkspace={partnership} territoryStructures={validStructures} />
    </div>
  )
}
