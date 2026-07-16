// Exported so non-<div> elements that need the same look (e.g. a <form>
// that can't be wrapped in an extra Card div) can apply it directly.
export const CARD_CLASS =
  'rounded-3xl border border-teal-100/60 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-20px_rgba(13,148,136,0.3)]'

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`${CARD_CLASS} ${className}`}>{children}</div>
}
