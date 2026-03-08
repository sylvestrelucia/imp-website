import { getCMSAboutUsVideoUrl } from '../_components/getCMSPageBySlug'
import { ActionLinkButton } from '../_components/ActionLinkButton'
import { AnimatedIcon } from '../_components/AnimatedIcon'
import { PageHero } from '../_components/PageHero'
import { Button } from '@/components/ui/button'

const stefanCerts = [
  'Certificate Analyzing and Benchmarking Financial Information, New York Institute of Finance',
  'Certificate Money Markets and Portfolio Management, New York Institute of Finance',
  'Certificate Portfolio Management, New York Institute of Finance',
  'Certificate Portfolio Risk, New York Institute of Finance',
]

const karinCerts = [
  'Certified Member of the Board of Directors, International Business School (ZfU), Zürich',
  'Professional Certificate in Asset Management, New York Institute of Finance',
  'Professional Certificate in Portfolio Management, New York Institute of Finance',
  'Professional Certificate in Wealth Management, New York Institute of Finance',
]

const highlights = [
  'Entrepreneurial, owner-led, deeply client-focused family office',
  '20+ years of combined experience fund management',
  'Independent portfolio manager',
  'Based in Zürich, Switzerland & Vaduz, Liechtenstein',
]

function splitCertification(value: string) {
  const [title, ...institutionParts] = value.split(',')
  return {
    title: title?.trim() ?? value,
    institution: institutionParts.join(',').trim(),
  }
}

function renderHighlight(item: string) {
  if (item === 'Based in Zürich, Switzerland & Vaduz, Liechtenstein') {
    return (
      <>
        <span className="inline-flex items-center gap-2">
          <span>Based in Zürich</span>
          <img src="/images/flags/ch.svg" alt="Swiss flag" className="h-4 w-auto shrink-0" loading="lazy" />
        </span>
        <br />
        <span className="inline-flex items-center gap-2">
          <span>&amp; Vaduz</span>
          <img src="/images/flags/li.svg" alt="Liechtenstein flag" className="h-4 w-auto shrink-0" loading="lazy" />
        </span>
      </>
    )
  }

  return item
}

export default async function AboutUsPage() {
  const cmsVideoUrl = await getCMSAboutUsVideoUrl()
  const videoUrl =
    cmsVideoUrl ??
    'https://video.wixstatic.com/video/c3fe54_6ee2161638ae4f7598a5423325996d3e/1080p/mp4/file.mp4'

  return (
    <main className="bg-white text-[#0b1035]">
      <PageHero
        title="Meet the Team Behind the Strategy"
        palette={{
          color1: '#2b3dea',
          color2: 'oklch(0.47 0.11 128)',
          color3: 'oklch(0.47 0.10 176)',
        }}
      />

      <section className="container py-16 md:py-20">
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="text-[20px] md:text-[24px] leading-[1.5] text-[#2b3045] italic">
            &ldquo;We founded this investment strategy to offer forward-looking investors a way to
            benefit from the structural forces shaping the next decades &ndash; responsibly and with
            precision.&rdquo;
          </p>
          <p className="mt-4 font-display text-[22px] leading-[1.3] text-[#5f6477]">
            &mdash; Karin
            <br />
            &amp; Stefan Wiederkehr
          </p>
        </blockquote>
      </section>

      <section className="w-full pb-12 md:pb-16">
        <div className="overflow-hidden">
          <video className="w-full h-auto" autoPlay muted playsInline preload="metadata" aria-label="About us video">
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </section>

      <div className="container pb-16 md:pb-20 space-y-14">
        <h2 className="hidden text-[28px] leading-[1.2] text-[#0b1035] md:block">
          Karin B. Wiederkehr
          <br />
          &amp; Stefan Wiederkehr
        </h2>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <section className="space-y-6">
            <h2 className="text-[28px] leading-[1.2] text-[#0b1035] md:hidden">Karin B. Wiederkehr</h2>
            <div className="space-y-3 text-[#2b3045] text-[17px] leading-relaxed">
              <p>
                Karin began her career in investment management in 2002 and has developed profound
                expertise in both traditional financial markets and innovative investment strategies.
                She earned her Bachelor&rsquo;s and Master&rsquo;s degrees from universities in
                Boston, USA, and spent nearly 10 years abroad, gaining a global perspective on
                financial markets. She is fluent in German, English, and French.
              </p>
              <p>
                Karin B. Wiederkehr is a Portfolio Manager for the IMP Global Megatrend Fund, which
                she manages with Stefan Wiederkehr at MRB Fund Partners AG. With over 23 years of
                experience in finance and asset management, she is responsible for strategic
                investment activities and the management of global megatrends, ensuring the
                fund&rsquo;s alignment with long-term structural trends shaping the global economy. As
                an experienced asset manager and certified board member, she has built a broad
                network through her expertise and leadership.
              </p>
              <p>
                Previously, Karin served as a managing director at two successful asset management
                firms in Liechtenstein, holding a board position at one of them. Her extensive
                experience also includes being licensed as qualified managing director by the
                Financial Market Authority (FMA) since 2009. Her core competencies span traditional
                portfolio management, hedge fund advisory, as well as private equity and venture
                capital investments.
              </p>
            </div>
            <ul className="divide-y divide-[#d9def0]">
              {karinCerts.map((certification) => (
                <li key={certification} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-2">
                    <AnimatedIcon name="graduationCap" size={12} className="mt-1 shrink-0 text-[#2b3dea]" />
                    <div className="text-[14px] leading-relaxed text-[#2b3045]">
                      <span className="block font-medium text-[#0b1035]">{splitCertification(certification).title}</span>
                      <span className="block text-[#5f6477]">{splitCertification(certification).institution}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-[28px] leading-[1.2] text-[#0b1035] md:hidden">Stefan Wiederkehr</h2>
            <div className="space-y-3 text-[#2b3045] text-[17px] leading-relaxed">
              <p>
                Stefan began his investment career in 2008 as a private investor and financial
                advisor to entrepreneurial families in Europe. He obtained his Bachelor&rsquo;s degree
                in Boston, USA, and pursued further executive financial education in London, UK.
                Having lived abroad for nearly six years, he is fluent in German and English and
                maintains a strong international network.
              </p>
              <p>
                Stefan Wiederkehr is a Portfolio Manager for the IMP Global Megatrend Fund, which he
                manages with Karin Wiederkehr at MRB Fund Partners AG. He has served as a Portfolio
                Manager for the fund since 2016, overseeing investment strategies that capitalize on
                transformative global megatrends. With more than 17 years of experience in finance
                and asset management, he is responsible for defining the fund&rsquo;s strategic
                investment direction and managing its exposure to long-term growth themes.
              </p>
              <p>
                Previously, Stefan was part of the executive management at two successful asset
                management firms in Liechtenstein and acted as a Portfolio Manager for two investment
                funds. His extensive experience in the asset management industry includes receiving
                FMA licensing as Deputy Managing Director in 2014. Additionally, he was responsible
                for discretionary asset allocation and global fund selection. He also founded and led
                his own investment advisory and portfolio management company.
              </p>
            </div>
            <ul className="divide-y divide-[#d9def0]">
              {stefanCerts.map((certification) => (
                <li key={certification} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-2">
                    <AnimatedIcon name="graduationCap" size={12} className="mt-1 shrink-0 text-[#2b3dea]" />
                    <div className="text-[14px] leading-relaxed text-[#2b3045]">
                      <span className="block font-medium text-[#0b1035]">{splitCertification(certification).title}</span>
                      <span className="block text-[#5f6477]">{splitCertification(certification).institution}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="container border-t border-[#d9def0] py-16 md:py-20 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <ActionLinkButton
            href="/contact-us"
            label="Request a call"
            icon="users"
            iconBefore
            buttonVariant="outlineMuted"
          />
          <Button
            asChild
            variant="outlineMuted"
            size="clear"
            className="px-5 py-2.5 rounded-none font-display hover:bg-transparent"
          >
            <a href="https://www.linkedin.com/company/mrb-fund-partners-ag" rel="noreferrer" target="_blank" className="group">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on Linkedin
            </a>
          </Button>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <p
                key={item}
                className="border-l border-primary-light pl-4 md:pl-5 [font-family:var(--font-display-regular)] font-light text-[18px] md:text-[19px] leading-relaxed text-white"
              >
                {renderHighlight(item)}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
