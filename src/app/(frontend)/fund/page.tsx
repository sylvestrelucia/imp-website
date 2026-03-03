import {
  getCMSContentSectionsBySlug,
  getCMSFundDetails,
  getCMSFundShareClassMeta,
  getCMSHeroCopyBySlug,
  getCMSPageBySlug,
} from '../_components/getCMSPageBySlug'
import { ActionLinkButton } from '../_components/ActionLinkButton'
import type { AnimatedIconName } from '../_components/AnimatedIcon'
import { AnimatedIcon } from '../_components/AnimatedIcon'
import { CMSPageContent } from '../_components/CMSPageContent'
import { FundShareClassesSection } from '../_components/FundShareClassesSection'
import { PageHero } from '../_components/PageHero'

const fallbackDetails = [
  { label: 'Liquidity', value: 'Daily and T+3 settlement', icon: 'circleDollar' as const },
  { label: 'Asset Classes', value: 'Global equities, with selective use of funds/ETFs', icon: 'boxes' as const },
  { label: 'Regulatory Distribution', value: 'Switzerland', icon: 'mapPinCheck' as const },
  { label: 'Structure & Jurisdiction', value: 'UCITS · Liechtenstein', icon: 'shieldCheck' as const },
  { label: 'SFDR-Classification', value: 'Article 6 SFDR', icon: 'graduationCap' as const },
]

type ShareClassContent = {
  title: string
  feeLabel: string
  feeText: string
  isin: string
  wkn: string
  bloomberg: string
}

function getValueAfterLabel(input: string, label: string): string {
  const regex = new RegExp(`${label}:\\s*([^\\n\\r·|]+)`, 'i')
  const match = input.match(regex)
  return match?.[1]?.trim() ?? ''
}

function parseShareClassSection(sectionText: string, fallback: ShareClassContent): ShareClassContent {
  const lines = sectionText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const title = lines[0] || fallback.title
  const feeLine = lines.find((line) => /fee structure/i.test(line))
  const feeText = feeLine ? feeLine.replace(/^.*?:\s*/, '').trim() : fallback.feeText

  const joined = lines.join(' · ')
  const isin = getValueAfterLabel(joined, 'ISIN') || fallback.isin
  const wkn = getValueAfterLabel(joined, 'WKN') || fallback.wkn
  const bloomberg = getValueAfterLabel(joined, 'Bloomberg') || fallback.bloomberg

  const feeLabelBase = title.replace(/\s*Share Class\s*$/i, '').trim() || fallback.title

  return {
    title,
    feeLabel: `${feeLabelBase} Fee Structure`,
    feeText,
    isin,
    wkn,
    bloomberg,
  }
}

function renderDetailValue(label: string, value: string) {
  const showSwissFlag = /regulatory distribution/i.test(label) && /switzerland/i.test(value)

  return (
    <p className="text-[16px] md:text-[17px] leading-[1.35] text-[#2b3045]">
      {showSwissFlag ? (
        <span className="inline-flex items-center gap-2">
          <img src="/images/flags/ch.svg" alt="Swiss flag" className="h-4 w-auto" loading="lazy" />
          <span>{value}</span>
        </span>
      ) : (
        value
      )}
    </p>
  )
}

export default async function FundPage() {
  const cmsHeroCopy = await getCMSHeroCopyBySlug('fund')
  const heroTitle = cmsHeroCopy?.title ?? ''
  const heroSubtitle = cmsHeroCopy?.subtitle
  const cmsSections = await getCMSContentSectionsBySlug('fund')
  const introText = cmsSections[0] ?? ''

  const usdFallback: ShareClassContent = {
    title: 'USD Share Class',
    feeLabel: 'USD Fee Structure',
    feeText: 'Up to 1.5% all-in, sign-on fee with performance fee with high-water mark',
    isin: 'LI0325349897',
    wkn: 'A2DWTX',
    bloomberg: 'IMPGLMT LE',
  }
  const chfFallback: ShareClassContent = {
    title: 'CHF Hedged Share Class',
    feeLabel: 'CHF Hedged Fee Structure',
    feeText: 'Up to 1.27% all-in, waived sign-on fee with performance fee with high-water mark (Soft-Close)',
    isin: 'LI1454290381',
    wkn: 'A41AWF',
    bloomberg: 'IMPGMCH LE',
  }

  const usdSectionText = cmsSections.find((section) => /usd share class/i.test(section)) ?? ''
  const chfSectionText = cmsSections.find((section) => /chf.*share class|hedged share class/i.test(section)) ?? ''
  const usdContent = usdSectionText ? parseShareClassSection(usdSectionText, usdFallback) : usdFallback
  const chfContent = chfSectionText ? parseShareClassSection(chfSectionText, chfFallback) : chfFallback
  const shareClassMeta = await getCMSFundShareClassMeta()
  const cmsDetails = await getCMSFundDetails()
  const details = cmsDetails?.length ? cmsDetails : fallbackDetails
  const firstDetailsRow = details.slice(0, Math.min(3, details.length))
  const secondDetailsRow = details.slice(firstDetailsRow.length)

  const cmsPage = await getCMSPageBySlug('fund')
  if (cmsPage) {
    return <CMSPageContent page={cmsPage as never} />
  }

  return (
    <main className="bg-white text-[#0b1035]">
        <PageHero
          title={heroTitle}
          subtitle={heroSubtitle}
          palette={{ color1: 'oklch(0.45 0.13 36)', color2: 'oklch(0.45 0.12 58)', color3: 'oklch(0.45 0.11 20)' }}
          subtitleClassName="text-white text-[19px] md:text-[21px] max-w-lg font-light"
          sectionClassName="relative overflow-hidden"
        />

        {introText ? (
          <section className="bg-secondary py-20 md:py-24">
            <div className="container">
              <div className="max-w-5xl">
                <blockquote className="border-l-2 border-primary-light pl-8 pr-8 text-white italic font-thin leading-relaxed text-[18px] md:text-[19px] whitespace-pre-line">
                  {introText}
                </blockquote>
              </div>
            </div>
          </section>
        ) : null}

        <section className="container pt-16 md:pt-20 pb-0 text-center">
            <h2 className="text-[13px] md:text-[14px] uppercase tracking-[0.12em] text-primary font-semibold mb-4">
              Our Investment Objective
            </h2>
            <p className="text-[22px] md:text-[28px] text-[#2b3045] leading-[1.35] italic">
              Focused on above-average, long-term capital appreciation through exposure to
              transformational megatrends.
            </p>
        </section>

        <div className="mt-12">
          <FundShareClassesSection
            usdContent={usdContent}
            chfContent={chfContent}
            shareClassMeta={shareClassMeta}
          />
        </div>

        <div>
          <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
            <div className="w-full border-l border-t border-[#d9def0]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                {firstDetailsRow.map(({ label, value, icon }) => (
                  <article
                    key={label}
                    className="border-r border-b border-[#d9def0] p-4 md:p-5 min-h-[110px] md:min-h-[120px]"
                  >
                    <div className="font-display inline-flex items-center gap-2 text-[13px] md:text-[14px] uppercase tracking-[0.12em] text-primary font-semibold mb-2">
                      <AnimatedIcon name={icon as AnimatedIconName} size={14} className="text-primary shrink-0" />
                      {label}
                    </div>
                    {renderDetailValue(label, value)}
                  </article>
                ))}
              </div>
              {secondDetailsRow.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-0">
                  {secondDetailsRow.map(({ label, value, icon }) => (
                    <article
                      key={label}
                      className="border-r border-b border-[#d9def0] p-4 md:p-5 min-h-[110px] md:min-h-[120px]"
                    >
                      <div className="font-display inline-flex items-center gap-2 text-[13px] md:text-[14px] uppercase tracking-[0.12em] text-primary font-semibold mb-2">
                        <AnimatedIcon name={icon as AnimatedIconName} size={14} className="text-primary shrink-0" />
                        {label}
                      </div>
                      {renderDetailValue(label, value)}
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        </div>

        <section className="pt-10 pb-10 md:pt-12 md:pb-12">
          <div className="container">
            <h3 className="mb-5 text-center text-[20px] md:text-[22px] text-[#0b1035]">Related Links</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <ActionLinkButton
                href="https://www.vpbank.com/de/vpfundsolutions/fondsinformationen/fondsdokumentationen"
                label="Fund documentation"
                icon="download"
                external
                iconBefore
                buttonVariant="outlineMuted"
              />
              <ActionLinkButton
                href="/performance-analysis"
                label="Key Investor Infos"
                icon="chartLine"
                iconBefore
                buttonVariant="outlineMuted"
              />
              <ActionLinkButton
                href="/legal-information"
                label="Regulatory Details"
                icon="trendingUp"
                iconBefore
                buttonVariant="outlineMuted"
              />
            </div>
          </div>
        </section>
    </main>
  )
}
