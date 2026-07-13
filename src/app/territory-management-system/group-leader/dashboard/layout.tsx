import { Toaster } from 'sonner'
import { LogOut } from 'lucide-react'
import { requireGroupLeader } from '@/lib/territory-management-system/modules/auth/queries'
import { signOut } from '@/app/territory-management-system/actions/auth'

export const dynamic = 'force-dynamic'

export default async function GroupLeaderLayout({ children }: { children: React.ReactNode }) {
  const { congregation } = await requireGroupLeader()

  return (
    <div className="min-h-screen bg-[#F3F8FF]">
      <header className="flex items-center justify-between border-b border-blue-100/60 bg-white px-4 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-sm font-bold text-white">
            {congregation.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#0B1B33]">{congregation.name}</p>
            <p className="text-xs text-slate-400">Territory Group Leader</p>
          </div>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-[#F0F6FF] hover:text-[#0B1B33]"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </form>
      </header>
      <main className="px-4 py-8 sm:px-8">{children}</main>
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
