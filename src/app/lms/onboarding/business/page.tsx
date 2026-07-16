'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createBusiness } from '../../actions/tenant'
import { CURRENCIES, type ActionResult } from '../../actions/shared'
import { AuthHeader, AuthFooter } from '@/components/laundry-management-system/AuthChrome'
import BusinessHoursInput from '@/components/laundry-management-system/BusinessHoursInput'
import { selectAppearance } from '@/components/laundry-management-system/dashboard/FormField'

export default function CreateBusinessPage() {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(createBusiness, {})

  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/lms" className="block text-center text-2xl font-bold text-white mb-2">
            Laundry <span className="text-[#22D3EE]">Management System</span>
          </Link>
          <p className="text-center text-white/40 mb-8 text-sm">
            Tell us about your laundry business — you can add more branches later.
          </p>
          <form action={formAction} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <Field label="Business name" name="name" placeholder="Aling Maria Laundry Shop" />
            <Field label="Branch name" name="branchName" placeholder="Main Branch" />
            <Field label="Contact number" name="phone" placeholder="0917 123 4567" />
            <Field label="Address" name="address" placeholder="123 Rizal St, Quezon City" />
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm text-white/60">Currency</span>
                <select
                  name="currency"
                  defaultValue="PHP"
                  className={`mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#22D3EE] focus:outline-none ${selectAppearance}`}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c} className="bg-[#0A0A14]">
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-white/60">Timezone</span>
                <input
                  name="timezone"
                  type="text"
                  required
                  defaultValue="Asia/Manila"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#22D3EE] focus:outline-none"
                />
              </label>
            </div>
            <BusinessHoursInput name="businessHours" />
            {state.error && <p className="text-sm text-red-400">{state.error}</p>}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-gradient-to-r from-[#0D9488] to-[#22D3EE] py-2.5 font-semibold text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] disabled:opacity-50 transition-all"
            >
              {pending ? 'Setting up your business…' : 'Continue'}
            </button>
          </form>
        </div>
      </main>
      <AuthFooter />
    </div>
  )
}

function Field({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm text-white/60">{label}</span>
      <input
        name={name}
        type="text"
        required
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-[#22D3EE] focus:outline-none"
      />
    </label>
  )
}
