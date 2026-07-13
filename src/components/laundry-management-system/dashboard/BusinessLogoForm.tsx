'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { uploadBusinessLogo } from '@/app/laundry-management-system/actions/settings'
import { useServerAction } from '@/lib/laundry-management-system/hooks/useServerAction'
import type { Business } from '@/lib/laundry-management-system/modules/tenant/types'
import Card from './Card'

export default function BusinessLogoForm({ business }: { business: Business }) {
  const { dispatch, pending, error } = useServerAction(uploadBusinessLogo, ['SAVED'], 'Logo updated.')
  const [preview, setPreview] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 font-semibold text-[#0B1B33]">Business logo</h2>
      <form action={dispatch} className="flex items-end gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-blue-100 bg-[#F8FBFF]">
          {preview ? (
            // A blob: URL from the just-selected file — next/image doesn't support
            // blob URLs, so the live pre-upload preview stays a plain <img>.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Business logo" className="h-full w-full object-cover" />
          ) : business.logo_url ? (
            <Image src={business.logo_url} alt="Business logo" width={64} height={64} className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-6 w-6 text-slate-300" />
          )}
        </div>
        <label className="flex-1">
          <span className="text-sm font-medium text-slate-600">Upload a new logo</span>
          <input
            type="file"
            name="logo"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#F0F6FF] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[#2563EB]"
          />
          <span className="mt-1 block text-xs text-slate-400">PNG, JPEG, or WebP — up to 2MB.</span>
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? 'Uploading…' : 'Upload'}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </Card>
  )
}
