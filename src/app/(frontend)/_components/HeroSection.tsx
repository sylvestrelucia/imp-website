import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedHeroHeading } from './AnimatedHeroHeading'
import { GradientMotionBackground } from './GradientMotionBackground'
import { getHomeCMSContent } from './getHomeCMSContent'

const desktopHeroNav = [
  { href: '/fund', label: 'The Fund' },
  { href: '/megatrends', label: 'Our Megatrends' },
  { href: '/portfolio-strategy', label: 'Portfolio Strategy' },
  { href: '/performance-analysis', label: 'Performance Analysis' },
  { href: '/about-us', label: 'About Us' },
]

export async function HeroSection() {
  const cms = await getHomeCMSContent()
  const heading = cms.hero.heading
  const subtitle = cms.hero.subtitle

  return (
    <section className="relative grid bg-primary overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Interactive background */}
      <GradientMotionBackground seed={2026} className="row-start-1 col-start-1">
        <div className="hidden lg:block absolute top-0 left-0 right-0 z-[60] w-full">
          <div className="container">
            <nav className="w-full rounded-none bg-transparent text-white flex items-center justify-start">
              <div className="inline-flex overflow-hidden rounded-full border border-white/30 [perspective:1000px]">
                {desktopHeroNav.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`[font-family:var(--font-display-regular)] inline-flex items-center justify-center whitespace-nowrap bg-transparent px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-300 ease-out ${
                      index === 0 ? 'rounded-l-full' : ''
                    } ${
                      index === 0 ? '' : 'border-l border-white/30'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/newsletter-subscription"
                  className="[font-family:var(--font-display-regular)] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-r-full border-l border-white/30 bg-transparent px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-300 ease-out"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M1.25 4.75A1.75 1.75 0 0 1 3 3h10a1.75 1.75 0 0 1 1.75 1.75v6.5A1.75 1.75 0 0 1 13 13H3a1.75 1.75 0 0 1-1.75-1.75z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m1.75 5.25 5.334 4.14a1.5 1.5 0 0 0 1.832 0l5.334-4.14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Subscribe</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </GradientMotionBackground>

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
