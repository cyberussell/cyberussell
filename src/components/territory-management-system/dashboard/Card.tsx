// A solid black border + a visibly darker fill (vs. the page's near-white background) makes
// every panel easy to pick out at a glance — every content panel across TMS renders through
// this one component (or, for the handful of one-off screens that can't use it directly, an
// inline copy of this exact class string), so this is the single place to change the look.
export const panelClass = 'rounded-2xl border-2 border-black bg-[#E2E8F2] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-16px_rgba(37,99,235,0.25)]'

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`${panelClass} ${className}`}>{children}</div>
}
