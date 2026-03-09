import { Resend } from 'resend'

type SyncContactToResendArgs = {
  firstName: string
  lastName: string
  email: string
  inquiryTypes: string[]
}

type SyncNewsletterSubscriberToResendArgs = {
  firstName: string
  lastName: string
  email: string
}

const TOPIC_TO_AUDIENCE_ENV: Record<string, string> = {
  'General Inquiry': 'RESEND_AUDIENCE_ID_GENERAL_INQUIRY',
  'Investment Request': 'RESEND_AUDIENCE_ID_INVESTMENT_REQUEST',
  'Request Factsheet': 'RESEND_AUDIENCE_ID_REQUEST_FACTSHEET',
}

function readEnvAudienceId(name: string): string | undefined {
  const value = process.env[name]?.trim()
  return value ? value : undefined
}

function fallbackAudienceIds(): string[] {
  const candidates = [
    readEnvAudienceId('RESEND_CONTACTS_AUDIENCE_ID'),
    readEnvAudienceId('RESEND_AUDIENCE_ID_NEWSLETTER_GENERAL'),
  ].filter((value): value is string => Boolean(value))

  return [...new Set(candidates)]
}

async function knownAudienceIds(resend: Resend): Promise<Set<string>> {
  const response = await resend.audiences.list()
  if (response.error) {
    throw new Error(response.error.message)
  }

  return new Set((response.data?.data || []).map((audience) => audience.id))
}

async function resolveAudienceIds({
  inquiryTypes,
  resend,
}: {
  inquiryTypes: string[]
  resend: Resend
}): Promise<string[]> {
  const configuredTopicAudienceIds = inquiryTypes
    .map((topic) => TOPIC_TO_AUDIENCE_ENV[topic])
    .map((envName) => (envName ? readEnvAudienceId(envName) : undefined))
    .filter((value): value is string => Boolean(value))

  const knownIds = await knownAudienceIds(resend)

  const validTopicAudienceIds = configuredTopicAudienceIds.filter((id) => knownIds.has(id))
  const unknownTopicAudienceIds = configuredTopicAudienceIds.filter((id) => !knownIds.has(id))
  if (unknownTopicAudienceIds.length > 0) {
    console.warn(
      `[resend-sync] Ignoring unknown configured audience IDs: ${unknownTopicAudienceIds.join(', ')}`,
    )
  }

  if (validTopicAudienceIds.length > 0) {
    return [...new Set(validTopicAudienceIds)]
  }

  const validFallbackAudienceIds = fallbackAudienceIds().filter((id) => knownIds.has(id))
  if (validFallbackAudienceIds.length > 0) {
    return [...new Set(validFallbackAudienceIds)]
  }

  return []
}

function isAlreadyExistsError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const message =
    'message' in error && typeof error.message === 'string' ? error.message.toLowerCase() : ''
  return message.includes('already exists') || message.includes('duplicate')
}

export async function syncContactToResend(args: SyncContactToResendArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return

  const resend = new Resend(apiKey)
  const audienceIds = await resolveAudienceIds({
    inquiryTypes: args.inquiryTypes,
    resend,
  })
  if (audienceIds.length === 0) return

  await Promise.all(
    audienceIds.map(async (audienceId) => {
      try {
        await resend.contacts.create({
          audienceId,
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          unsubscribed: false,
        })
      } catch (error) {
        if (isAlreadyExistsError(error)) return
        throw error
      }
    }),
  )
}

export async function syncNewsletterSubscriberToResend(
  args: SyncNewsletterSubscriberToResendArgs,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const audienceId = process.env.RESEND_AUDIENCE_ID_NEWSLETTER_GENERAL?.trim()
  if (!apiKey || !audienceId) return

  const resend = new Resend(apiKey)
  try {
    await resend.contacts.create({
      audienceId,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      unsubscribed: false,
    })
  } catch (error) {
    if (isAlreadyExistsError(error)) return
    throw error
  }
}
