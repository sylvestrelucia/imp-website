import { PageHero } from '../_components/PageHero'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export default async function NewsletterSubscriptionPage() {
  return (
    <main className="bg-white text-[#0b1035]">
        <PageHero
          title="Newsletter Subscription"
          subtitle="Receive periodic updates on market developments, fund news, and our latest perspectives on global megatrends."
          palette={{
            color1: '#2b3dea',
            color2: 'oklch(0.46 0.13 18)',
            color3: 'oklch(0.46 0.11 322)',
          }}
          subtitleClassName="text-white/85 text-[16px] md:text-[18px] leading-relaxed max-w-2xl"
        />

        <section className="container py-16 md:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-[24px] leading-[1.25] text-[#0b1035]">Subscribe to our newsletter</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4f566f]">
              Enter your email address to subscribe to the IMP Global Megatrend newsletter.
            </p>

            <form className="mt-7 space-y-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="newsletter-first-name"
                    className="mb-1.5 block font-display text-[15px] leading-[1.3] text-[#4f566f]"
                  >
                    First name
                  </label>
                  <input
                    id="newsletter-first-name"
                    name="firstName"
                    type="text"
                    required
                    className="w-full border border-[#d9def0] bg-white px-4 py-3 text-[15px] text-[#0b1035] placeholder:text-[#b0b5c8] transition-colors focus:border-[#0040ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newsletter-last-name"
                    className="mb-1.5 block font-display text-[15px] leading-[1.3] text-[#4f566f]"
                  >
                    Last name
                  </label>
                  <input
                    id="newsletter-last-name"
                    name="lastName"
                    type="text"
                    required
                    className="w-full border border-[#d9def0] bg-white px-4 py-3 text-[15px] text-[#0b1035] placeholder:text-[#b0b5c8] transition-colors focus:border-[#0040ff] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="newsletter-email"
                  className="mb-1.5 block font-display text-[15px] leading-[1.3] text-[#4f566f]"
                >
                  Email <span className="text-[#7f879b]">(required)</span>
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  className="w-full border border-[#d9def0] bg-white px-4 py-3 text-[15px] text-[#0b1035] placeholder:text-[#b0b5c8] transition-colors focus:border-[#0040ff] focus:outline-none"
                />
              </div>

              <div>
                <h3 className="text-[16px] font-medium text-[#0b1035]">Consent</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#4f566f]">
                  By submitting this form, I agree to the storage and processing of my personal data for the
                  purpose of subscribing to our newsletter, in accordance with the GDPR.
                </p>

                <label htmlFor="newsletter-consent" className="mt-3 flex items-start gap-2 text-[14px] text-[#2b3045]">
                  <Checkbox
                    id="newsletter-consent"
                    name="consent"
                    required
                    className="mt-0.5 size-5 rounded-none border-[#d9def0] data-[state=checked]:border-[#0040ff] data-[state=checked]:bg-[#0040ff]"
                  />
                  I consent to the processing of my personal data. (Required)
                </label>
              </div>

              <Button
                type="submit"
                variant="default"
                size="clear"
                className="px-5 py-2.5 rounded-none font-display bg-[#0040ff] text-white hover:bg-[#0035d9]"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </section>
    </main>
  )
}
