'use client'

import dynamic from 'next/dynamic'

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false })

export type HeroPalette = {
  color1: string
  color2: string
  color3: string
}

export function HeroGrainientBackground({
  palette,
  variant = 'page',
  className,
  withHeightAnimation = false,
}: {
  palette: HeroPalette
  variant?: 'home' | 'page'
  className?: string
  withHeightAnimation?: boolean
}) {
  return (
    <div
      className={className}
      data-transition-force="true"
      data-transition-keep-on-leave="true"
      data-transition-canvas-fade-on-leave="true"
      data-transition-hero-height={withHeightAnimation ? 'true' : undefined}
      aria-hidden="true"
    >
      <Grainient
        color1={palette.color1}
        color2={palette.color2}
        color3={palette.color3}
        timeSpeed={variant === 'home' ? 0.55 : 0.6}
        colorBalance={variant === 'home' ? -0.32 : 0.28}
        warpStrength={2.4}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={variant === 'home' ? 0.05 : 0.02}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={variant === 'home' ? 1.5 : 1}
        gamma={1}
        saturation={variant === 'home' ? 1 : 0.68}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </div>
  )
}
