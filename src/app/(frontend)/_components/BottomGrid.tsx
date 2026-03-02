import Image from 'next/image'
import { ActionLinkButton } from './ActionLinkButton'
import { getHomeCMSContent } from './getHomeCMSContent'

export async function ExploreMegatrendsCard() {
  const cms = await getHomeCMSContent()

  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="text-[20px] md:text-[22px] text-[#0b1035] mb-4">{cms.exploreMegatrendsCard.title}</h3>
      <img
        src={cms.exploreMegatrendsCard.imageUrl}
        alt={cms.exploreMegatrendsCard.title}
        className="mb-5 w-[140px] h-[140px] object-contain"
        loading="lazy"
      />
    </div>
  )
}

export async function BottomGrid() {
  const cms = await getHomeCMSContent()

  return (
    <section
      className="border-t border-[#e8ecf4] bg-white py-16 md:py-20"
      data-transition-static="true"
    >
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {/* See Performance */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[20px] md:text-[22px] text-[#0b1035] mb-4">See Performance</h3>
            <Image
              src="/images/performance_icon.png"
              alt="Performance"
              width={160}
              height={160}
              className="mb-5"
            />
            <ActionLinkButton
              href="/performance-analysis"
              label="Performance Chart"
              icon="chartLine"
            />
          </div>

          {/* Request Consultation */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[20px] md:text-[22px] text-[#0b1035] mb-4">
              Request Consultation
            </h3>
            <Image
              src="/images/consultation_icon.png"
              alt="Consultation"
              width={160}
              height={160}
              className="mb-5"
            />
            <ActionLinkButton href="/contact-us" label="Write to us" icon="mailCheck" />
          </div>

          {/* Downloads */}
          <div>
            <h3 className="text-[20px] md:text-[22px] text-[#0b1035] mb-4 text-center md:text-left">
              Downloads
            </h3>
            <div className="flex justify-center md:justify-start mb-5">
              <Image
                src="/images/downloads_icon.png"
                alt="Downloads"
                width={140}
                height={140}
              />
            </div>
            <div className="space-y-4">
              {cms.downloads.map((d) => (
                <ActionLinkButton
                  key={d.label}
                  href={d.href}
                  label={d.label}
                  icon="download"
                  external
                  className="justify-center md:justify-start px-3 py-2.5 text-[11px] tracking-[0.08em] sm:px-4 sm:text-[12px] md:px-5 md:text-[13px] md:tracking-[0.12em]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
