'use client'

import { useEffect, useRef, useState, type ForwardRefExoticComponent } from 'react'
import {
  ArrowUpRightIcon,
  ChartLineIcon,
  CircleDollarSignIcon,
  CompassIcon,
  DownloadIcon,
  EarthIcon,
  HomeIcon,
  LinkedinIcon,
  MailCheckIcon,
  MenuIcon,
  TrendingUpIcon,
  UsersIcon,
  XIcon,
} from 'lucide-animated'

export type AnimatedIconName =
  | 'arrowUpRight'
  | 'chartLine'
  | 'circleDollar'
  | 'compass'
  | 'download'
  | 'earth'
  | 'home'
  | 'linkedin'
  | 'mailCheck'
  | 'menu'
  | 'trendingUp'
  | 'users'
  | 'x'

const icons = {
  arrowUpRight: ArrowUpRightIcon,
  chartLine: ChartLineIcon,
  circleDollar: CircleDollarSignIcon,
  compass: CompassIcon,
  download: DownloadIcon,
  earth: EarthIcon,
  home: HomeIcon,
  linkedin: LinkedinIcon,
  mailCheck: MailCheckIcon,
  menu: MenuIcon,
  trendingUp: TrendingUpIcon,
  users: UsersIcon,
  x: XIcon,
}

export function AnimatedIcon({
  name,
  size = 16,
  className,
  animate,
  animateOnHover = false,
  'aria-hidden': ariaHidden = true,
}: {
  name: AnimatedIconName
  size?: number
  className?: string
  animate?: boolean
  animateOnHover?: boolean
  'aria-hidden'?: boolean
}) {
  const Icon = icons[name] as unknown as ForwardRefExoticComponent<any>
  const wrapperRef = useRef<HTMLSpanElement | null>(null)
  const iconRef = useRef<{ startAnimation: () => void; stopAnimation: () => void } | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const shouldAnimate = animateOnHover ? isHovered : animate

  useEffect(() => {
    if (!animateOnHover) return

    const wrapper = wrapperRef.current
    const groupElement = wrapper?.closest('.group') as HTMLElement | null
    if (!groupElement) return

    const start = () => setIsHovered(true)
    const stop = () => setIsHovered(false)

    groupElement.addEventListener('mouseenter', start)
    groupElement.addEventListener('mouseleave', stop)

    return () => {
      groupElement.removeEventListener('mouseenter', start)
      groupElement.removeEventListener('mouseleave', stop)
    }
  }, [animateOnHover])

  useEffect(() => {
    if (shouldAnimate === undefined) return
    if (shouldAnimate) {
      iconRef.current?.startAnimation?.()
      return
    }
    iconRef.current?.stopAnimation?.()
  }, [shouldAnimate])

  return (
    <span
      ref={wrapperRef}
      className="inline-flex"
      onMouseEnter={animateOnHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={animateOnHover ? () => setIsHovered(false) : undefined}
    >
      <Icon ref={iconRef} size={size} className={className} aria-hidden={ariaHidden} />
    </span>
  )
}
