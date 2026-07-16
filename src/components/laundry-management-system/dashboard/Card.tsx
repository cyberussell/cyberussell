export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-teal-100/60 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-16px_rgba(13,148,136,0.25)] ${className}`}
    >
      {children}
    </div>
  )
}
