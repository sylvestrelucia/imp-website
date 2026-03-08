import { getCMSPageBySlug } from '../_components/getCMSPageBySlug'
import { CMSPageContent } from '../_components/CMSPageContent'
import { PageHero } from '../_components/PageHero'
import { AnimatedIcon } from '../_components/AnimatedIcon'
import { ContactLocationMap } from '../_components/ContactLocationMap'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export default async function ContactPage() {
  const cmsPage = await getCMSPageBySlug('contact-us')
  if (cmsPage) {
    return <CMSPageContent page={cmsPage as never} />
  }
  return (
    <main className="bg-white text-[#0b1035]">
        <PageHero
          title="Get In Touch"
          titleClassName="max-w-none"
          palette={{ color1: '#2b3dea', color2: 'oklch(0.47 0.11 128)', color3: 'oklch(0.47 0.10 176)' }}
        />

        <div className="container py-16 md:py-20 grid lg:grid-cols-[1fr_380px] gap-12">
          {/* Form */}
          <section>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-1.5 block font-display text-[15px] leading-[1.3] text-[#4f566f]">
                    First name
                  </label>
                  <input
                    className="w-full border border-[#d9def0] px-4 py-3 text-[15px] text-[#0b1035] bg-white placeholder:text-[#b0b5c8] focus:outline-none focus:border-[#0040ff] transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-display text-[15px] leading-[1.3] text-[#4f566f]">
                    Last name
                  </label>
                  <input
                    className="w-full border border-[#d9def0] px-4 py-3 text-[15px] text-[#0b1035] bg-white placeholder:text-[#b0b5c8] focus:outline-none focus:border-[#0040ff] transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block font-display text-[15px] leading-[1.3] text-[#4f566f]">Phone</label>
                <input
                  className="w-full border border-[#d9def0] px-4 py-3 text-[15px] text-[#0b1035] bg-white placeholder:text-[#b0b5c8] focus:outline-none focus:border-[#0040ff] transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-display text-[15px] leading-[1.3] text-[#4f566f]">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full border border-[#d9def0] px-4 py-3 text-[15px] text-[#0b1035] bg-white placeholder:text-[#b0b5c8] focus:outline-none focus:border-[#0040ff] transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <fieldset>
                <legend className="mb-3 font-display text-[15px] leading-[1.3] text-[#4f566f]">Inquiry type</legend>
                <div className="flex flex-wrap gap-4">
                  {['General Inquiry', 'Investment Request', 'Request Factsheet'].map((opt, idx) => (
                    <label key={opt} htmlFor={`inquiry-${idx}`} className="flex items-center gap-2 text-[14px] text-[#2b3045]">
                      <Checkbox
                        id={`inquiry-${idx}`}
                        className="size-5 rounded-none border-[#d9def0] data-[state=checked]:border-[#0040ff] data-[state=checked]:bg-[#0040ff]"
                        defaultChecked={opt === 'General Inquiry'}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label className="mb-1.5 block font-display text-[15px] leading-[1.3] text-[#4f566f]">
                  Your message
                </label>
                <textarea
                  rows={5}
                  className="w-full border border-[#d9def0] px-4 py-3 text-[15px] text-[#0b1035] bg-white placeholder:text-[#b0b5c8] focus:outline-none focus:border-[#0040ff] transition-colors resize-none"
                  placeholder="Enter your question or message"
                />
              </div>

              <div className="border-t border-[#d9def0] pt-5">
                <h3 className="text-[15px] font-medium text-[#0b1035] mb-2">Consent</h3>
                <p className="mb-3 text-[14px] leading-relaxed text-[#5f6477]">
                  By submitting this form, I agree to the storage and processing of my personal data
                  for the purpose of responding to my inquiry, in accordance with the GDPR.
                </p>
                <label htmlFor="contact-consent" className="flex items-start gap-2 text-[14px] text-[#2b3045]">
                  <Checkbox
                    id="contact-consent"
                    required
                    className="mt-0.5 size-5 rounded-none border-[#d9def0] data-[state=checked]:border-[#0040ff] data-[state=checked]:bg-[#0040ff]"
                  />
                  I consent to the processing of my personal data.
                </label>
              </div>

              <Button
                type="submit"
                variant="default"
                size="clear"
                className="rounded-none bg-[#0040ff] px-8 py-3 font-display text-[14px] text-white hover:bg-[#0035d9]"
              >
                Submit
              </Button>
            </form>
          </section>

          {/* Contact Info */}
          <aside className="lg:mt-0">
            <div className="border-l border-[#0040ff] pl-8">
              <h2 className="text-[22px] leading-[1.3] text-[#0b1035] mb-5">
                MRB Fund Partners AG
              </h2>
              <address className="not-italic text-[15px] text-[#2b3045] leading-relaxed space-y-4">
                <p>
                  Fraumünsterstrasse 9<br />
                  8001 Zürich
                </p>
                <div className="space-y-1">
                  <a
                    href="tel:+41444542571"
                    className="flex items-center gap-2 hover:text-[#0040ff] transition-colors"
                  >
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-[14px] w-[14px] shrink-0 text-current"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.77.68 2.6a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.47-1.24a2 2 0 0 1 2.11-.45c.83.33 1.7.56 2.6.68A2 2 0 0 1 22 16.92z" />
                    </svg>
                    +41 44 454 25 71
                  </a>
                  <a
                    href="mailto:info@mrbpartner.ch"
                    className="flex items-center gap-2 hover:text-[#0040ff] transition-colors"
                  >
                    <AnimatedIcon name="mailCheck" size={14} className="shrink-0 text-current" />
                    info@mrbpartner.ch
                  </a>
                  <a
                    href="https://www.mrbpartner.ch/"
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center gap-2 hover:text-[#0040ff] transition-colors"
                  >
                    <AnimatedIcon name="earth" size={14} className="shrink-0 text-current" />
                    www.mrbpartner.ch
                  </a>
                </div>
              </address>
            </div>
          </aside>
        </div>

        <section className="w-full">
          <ContactLocationMap />
        </section>
    </main>
  )
}
