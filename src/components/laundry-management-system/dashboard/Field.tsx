// Shared label/value pair — previously duplicated identically in
// OrderDetailView.tsx and CustomerDetailView.tsx.
export default function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-[#0B1B33]">{value}</p>
    </div>
  )
}
