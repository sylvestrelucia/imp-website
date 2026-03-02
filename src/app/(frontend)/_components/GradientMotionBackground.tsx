import type { ReactNode } from 'react'
import { HeroGradientCanvas } from './HeroGradientCanvas'

type GradientMotionBackgroundProps = {
  seed?: number
  className?: string
  overlayClassName?: string
  children?: ReactNode
}

function isCanvasEnabled(): boolean {
  const value = process.env.NEXT_PUBLIC_ENABLE_HERO_CANVAS_ANIMATION?.trim().toLowerCase()
  if (!value) return true
  return !['0', 'false', 'off', 'no'].includes(value)
}

export function GradientMotionBackground({
  seed = 1337,
  className,
  overlayClassName = 'bg-gradient-to-b from-primary/35 via-primary/12 to-primary/58',
  children,
}: GradientMotionBackgroundProps) {
  const rootClassName = className ? `grid h-full w-full overflow-hidden ${className}` : 'grid h-full w-full overflow-hidden'
  const showCanvas = isCanvasEnabled()

  return (
    <div className={rootClassName}>
      {showCanvas ? <HeroGradientCanvas seed={seed} /> : null}
      <div className={`row-start-1 col-start-1 h-full w-full ${overlayClassName}`}>
        {children}
      </div>
    </div>
  )
}
