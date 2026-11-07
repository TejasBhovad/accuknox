import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const defaults = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function IconBell(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  )
}

export function IconUser(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  )
}

export function IconRefresh(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M21 12a9 9 0 1 1-2.6-6.4" />
      <path d="M21 3v6h-6" />
    </svg>
  )
}

export function IconMore(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconClock(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </svg>
  )
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconClose(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function IconChevron(props: IconProps) {
  return (
    <svg {...defaults} width={12} height={12} {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
