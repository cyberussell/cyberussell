'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react'
import Card from '@/components/territory-management-system/dashboard/Card'

// Status labels stay in English (matching the "Status" dropdown in PublisherVisitLogForm) —
// only the explanations are in Tagalog, per Russell's request. Content is presentational copy
// specific to this help widget, kept local rather than folded into records/schema.ts.
const STATUS_HELP: { status: string; description: string }[] = [
  { status: 'Not At Home', description: 'Walang sumagot sa bahay. Ito ang gagamitin kapag walang aktwal na nakausap.' },
  {
    status: 'Visited Again',
    description:
      'Nakausap mo ulit sila pero walang bagong nangyari sa pag-uusap. (Ito rin ang gagamitin kapag pwede nang bisitahin ulit ang isang naka-Do Not Call na record at gusto nilang makipag-usap.)',
  },
  {
    status: 'Potential BS',
    description:
      'Nagpakita sila ng tunay na interes sa talakayan tungkol sa Bibliya, pero wala pang regular na pag-aaral na nagsimula. Dito nagsisimula ang funnel ng Bible Study — sa susunod na pagbisita, pipiliin mo ang Started Bible Study, ulitin ang Potential BS, o No Positive Response.',
  },
  {
    status: 'Started Bible Study',
    description: 'Kakasimula lang ng unang regular na pag-aaral. Sa susunod na pagbisita, magiging Bible Study (kung tuloy-tuloy) o No Positive Response.',
  },
  {
    status: 'Bible Study',
    description:
      'Kumpirmadong tuloy-tuloy na ang pag-aaral. Sa mga susunod na pagbisita, magiging Progressive BS o No Positive Response. (May hiwalay na paraan kung lumipat na sila — tingnan ang Moved sa ibaba.)',
  },
  {
    status: 'Progressive BS',
    description: 'Maganda ang takbo ng tuloy-tuloy na pag-aaral. Nananatili itong nasa "ongoing" funnel para sa susunod na pagbisita.',
  },
  {
    status: 'No Positive Response',
    description: 'Hindi tumuloy ang lead (Potential BS, Started, o ongoing) — dito nagtatapos ang funnel.',
  },
  {
    status: 'Do Not Call',
    description: 'Hiniling nilang huwag na silang bisitahin. Ini-lock ang record mula sa anumang pagbisita sa loob ng 6 na buwan.',
  },
  {
    status: 'Moved',
    description: 'Hindi na sila nakatira doon. Hihilingin sa iyo na itama ang address/contact info o irekomenda ang record para tanggalin.',
  },
  { status: 'Other', description: 'Hindi kasya sa alinman sa mga nasa itaas — kailangan ng notes.' },
]

export default function PublisherStatusHelp() {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="p-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-2 p-4 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-[#0B1B33]">
          <HelpCircle className="h-4 w-4 text-[#2563EB]" />
          Help — Mga Status ng Pagbisita
        </span>
        {expanded ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
        )}
      </button>
      {expanded && (
        <div className="space-y-3 border-t border-blue-50 p-4 pt-3">
          {STATUS_HELP.map(({ status, description }) => (
            <div key={status}>
              <p className="text-sm font-semibold text-[#0B1B33]">{status}</p>
              <p className="mt-0.5 text-sm text-slate-600">{description}</p>
            </div>
          ))}
          <p className="border-t border-blue-50 pt-3 text-xs text-slate-500">
            Hindi pinipili ng publisher — system-only: <span className="font-medium text-slate-600">Initial Visit</span> ay ang
            default/blangkong estado bago pa man magkaroon ng na-log na bisita; <span className="font-medium text-slate-600">Undone</span> ay
            awtomatikong ilalagay kapag tinapos nang maaga ng isang partner ang kanilang assignment na may mga hindi pa tapos na records.
          </p>
        </div>
      )}
    </Card>
  )
}
