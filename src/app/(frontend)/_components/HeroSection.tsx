import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedHeroHeading } from './AnimatedHeroHeading'
import { GradientMotionBackground } from './GradientMotionBackground'
import { getHomeCMSContent } from './getHomeCMSContent'

export async function HeroSection() {
  const cms = await getHomeCMSContent()
  const heading = cms.hero.heading
  const subtitle = cms.hero.subtitle

  return (
    <section className="relative grid bg-primary overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Interactive background */}
      <GradientMotionBackground seed={2026} className="row-start-1 col-start-1" />

      <div className="relative z-10 row-start-1 col-start-1 w-full container pt-12 pb-20 md:pt-20 md:pb-28 lg:pt-[240px]">
        <AnimatedHeroHeading
          heading={heading}
          className="text-white text-[38px] md:text-[52px] font-semibold leading-[1.12] tracking-tight max-w-3xl"
        />
        <p className="mt-5 text-white font-light text-[19px] md:text-[22px] max-w-md leading-[1.6] whitespace-pre-line">
          {subtitle.replace('megatrends ', 'megatrends\n')}
        </p>
        <div className="mt-7">
          <Button asChild variant="heroCta" size="clear">
            <Link href={cms.hero.ctaHref}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 16.5L9 11.5L13 14.5L20 7.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 7.5H20V12.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="4" cy="16.5" r="1.5" fill="currentColor" />
                <circle cx="9" cy="11.5" r="1.5" fill="currentColor" />
                <circle cx="13" cy="14.5" r="1.5" fill="currentColor" />
              </svg>
              {cms.hero.ctaLabel}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
