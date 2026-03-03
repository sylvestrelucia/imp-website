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
      data-transition-hero-height={withHeightAnimation ? 'true' : undefined}
      aria-hidden="true"
    >
      <Grainient
        color1={palette.color1}
        color2={palette.color2}
        color3={palette.color3}
        timeSpeed={variant === 'home' ? 0.55 : 0.6}
        colorBalance={-0.32}
        warpStrength={2.4}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </div>
  )
}
