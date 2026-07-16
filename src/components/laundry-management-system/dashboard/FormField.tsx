// Shared input styling — was an identical copy-pasted literal across ~10 form
// components. Deliberately just a class string, not a full input-kit
// component: React Hook Form's `register()` already handles wiring a plain
// <input>/<select>/<textarea> to form state, so wrapping it in yet another
// component would add indirection without removing any real duplication.
export const inputClass =
  'w-full rounded-lg border border-teal-100 bg-[#F0FDFA] px-3 py-2 text-[#0B1B33] placeholder:text-slate-400 focus:border-[#22D3EE] focus:outline-none'

export default function FormField({
  label,
  optional,
  error,
  children,
}: {
  label: string
  optional?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-600">
        {label}
        {optional && ' (optional)'}
      </span>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </label>
  )
}
