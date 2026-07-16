// Shared input styling — was an identical copy-pasted literal across ~10 form
// components. Deliberately just a class string, not a full input-kit
// component: React Hook Form's `register()` already handles wiring a plain
// <input>/<select>/<textarea> to form state, so wrapping it in yet another
// component would add indirection without removing any real duplication.
export const inputClass =
  'w-full rounded-lg border border-teal-100 bg-[#F0FDFA] px-3 py-2 text-[#0B1B33] placeholder:text-slate-400 focus:border-[#22D3EE] focus:outline-none'

// Appended (not swapped in) to whichever text-input className a <select> would
// otherwise share with its neighboring <input>s — native <select> rendering
// doesn't reliably match an <input>'s height even with identical padding
// (most visible in Safari), so this strips the native chrome and draws a
// custom chevron instead.
export const selectAppearance =
  'appearance-none bg-no-repeat bg-[length:14px] bg-[right_0.75rem_center] pr-9 bg-[url(\'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2224%22%20height=%2224%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%2394A3B8%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpolyline%20points=%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E\')]'

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
