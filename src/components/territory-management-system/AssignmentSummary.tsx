import type { BatchSummary } from '@/lib/territory-management-system/modules/assignment/types'
import { getAssignmentBatchUrl } from '@/lib/territory-management-system/modules/assignment/qr'
import Card from '@/components/territory-management-system/dashboard/Card'
import PartnershipList from '@/components/territory-management-system/PartnershipList'

// Admin's read-only view of an assignment batch — no regenerate/delete controls here.
// Generation is exclusively the Territory Group Leader's call (see their dashboard).
export default function AssignmentSummary({ batch, qrDataUrl }: { batch: BatchSummary; qrDataUrl: string }) {
  const publicUrl = getAssignmentBatchUrl(batch.access_token)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 font-semibold text-[#0B1B33]">Assignment Summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Date</dt>
              <dd className="text-[#0B1B33]">{batch.assignment_date}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Territories</dt>
              <dd className="text-[#0B1B33]">{batch.territories.map((t) => t.name).join(', ') || '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Ministry Partners</dt>
              <dd className="text-[#0B1B33]">{batch.partnerships.length}</dd>
            </div>
          </dl>
        </Card>
        <Card className="flex flex-col items-center gap-3 p-6 text-center">
          <h2 className="font-semibold text-[#0B1B33]">Scan to Download Today&apos;s Assignment</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrDataUrl} alt="Assignment QR code" className="h-48 w-48" />
          <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="break-all text-xs text-[#2563EB] hover:underline">
            {publicUrl}
          </a>
        </Card>
      </div>
      <div>
        <h2 className="mb-4 font-semibold text-[#0B1B33]">Ministry Partners</h2>
        <PartnershipList partnerships={batch.partnerships} />
      </div>
    </div>
  )
}
