export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-blue-100/60 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-16px_rgba(37,99,235,0.25)] ${className}`}
    >
      {children}
    </div>
  )
}
