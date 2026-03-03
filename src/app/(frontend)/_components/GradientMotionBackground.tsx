import type { ReactNode } from 'react'
import { HeroGrainientBackground } from './HeroGrainientBackground'

type GradientMotionBackgroundProps = {
  seed?: number
  className?: string
  overlayClassName?: string
  children?: ReactNode
}

export function GradientMotionBackground({
  seed = 1337,
  className,
  overlayClassName = '',
  children,
}: GradientMotionBackgroundProps) {
  const rootClassName = className
    ? `relative h-full w-full overflow-hidden ${className}`
    : 'relative h-full w-full overflow-hidden'

  return (
    <div className={rootClassName}>
      <HeroGrainientBackground
        variant="home"
        palette={{ color1: '#2B3DEA', color2: '#782BEA', color3: '#2B9DEA' }}
        className={`absolute inset-0 z-0 pointer-events-none ${overlayClassName}`.trim()}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}
