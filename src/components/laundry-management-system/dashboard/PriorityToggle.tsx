'use client'

import { useOptimistic, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Zap } from 'lucide-react'
import { toast } from 'sonner'
import { setOrderPriority } from '@/app/laundry-management-system/actions/orders'

export default function PriorityToggle({ orderId, isPriority }: { orderId: string; isPriority: boolean }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [optimisticPriority, setOptimisticPriority] = useOptimistic(isPriority, (_current, next: boolean) => next)

  function handleToggle() {
    const next = !optimisticPriority
    const formData = new FormData()
    formData.set('orderId', orderId)
    formData.set('isPriority', String(next))
    startTransition(async () => {
      setOptimisticPriority(next)
      const result = await setOrderPriority({}, formData)
      if (result.error) toast.error(result.error)
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={pending}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
        optimisticPriority
          ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          : 'border border-blue-100 bg-white text-slate-500 hover:border-[#38BDF8]/40'
      }`}
    >
      <Zap className="h-3.5 w-3.5" />
      {optimisticPriority ? 'Priority' : 'Mark Priority'}
    </button>
  )
}
