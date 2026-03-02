import { HeroSection } from './_components/HeroSection'
import { RegulatoryStrip } from './_components/RegulatoryStrip'
import { MegatrendCard } from './_components/MegatrendCard'
import { BottomGrid, ExploreMegatrendsCard } from './_components/BottomGrid'
import { getHomeCMSContent } from './_components/getHomeCMSContent'

function getMegatrendAnchor(title: string): string {
  const byTitle: Record<string, string> = {
    'Technology/Technological Advancements': 'technology-technological-advancements',
    'Changing Consumer Behavior/Demographics': 'changing-consumer-behavior-demographics',
    'Healthcare/Longevity Revolution': 'healthcare-longevity-revolution',
    'Shift in Economic Power': 'shift-in-economic-power',
    'Mobility/Transportation': 'mobility-transportation',
    'Smart Infrastructure/Smart City': 'smart-infrastructure-smart-city',
  }

  const mapped = byTitle[title]
  if (mapped) return mapped

  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default async function HomePage() {
  const cms = await getHomeCMSContent()

  return (
    <>
      <HeroSection />
      <RegulatoryStrip />
      <main className="bg-white">
        {cms.trends.map((trend, i) => {
          const showExploreCardAboveTrend =
            trend.title === 'Changing Consumer Behavior/Demographics'

          return (
            <div key={trend.title}>
              {showExploreCardAboveTrend ? (
                <section className="border-t border-[#e8ecf4] bg-white py-12 md:py-14">
                  <div className="container">
                    <ExploreMegatrendsCard />
                  </div>
                </section>
              ) : null}
              <MegatrendCard
                {...trend}
                detailsHref={`/megatrends#${getMegatrendAnchor(trend.title)}`}
                detailsIcon="trendingUp"
                reverse={i % 2 === 1}
              />
            </div>
          )
        })}
      </main>
      <BottomGrid />
    </>
  )
}
