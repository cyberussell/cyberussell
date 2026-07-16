import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-[#0D9488] to-[#22D3EE] text-white shadow-[0_4px_12px_-2px_rgba(13,148,136,0.4)] hover:brightness-110',
  secondary: 'border border-teal-100 bg-white text-[#0D9488] hover:border-[#22D3EE]/40 hover:bg-[#F0FDFA]',
}

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2',
  md: 'px-5 py-2.5',
}

function classes(variant: Variant, size: Size, className: string) {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: { variant?: Variant; size?: Size; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={classes(variant, size, className)} {...props} />
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  children,
}: {
  variant?: Variant
  size?: Size
  className?: string
  href: string
  children: ReactNode
}) {
  return (
    <Link href={href} className={classes(variant, size, className)}>
      {children}
    </Link>
  )
}
