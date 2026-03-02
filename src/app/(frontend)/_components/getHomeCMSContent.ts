import configPromise from '@payload-config'
import { cache } from 'react'
import { getPayload } from 'payload'

type RegulatoryItem = {
  label: string
  value: string
}

type TrendItem = {
  title: string
  body: string
  tickers: [string, string][]
  imageUrl: string
}

type DownloadItem = {
  label: string
  href: string
}

type ExploreMegatrendsCard = {
  title: string
  imageUrl: string
}

type WixRecord = Record<string, unknown>
type ParsedTrendItem = TrendItem & { manualSort: string; imageSource: string }
type ParsedDownloadItem = DownloadItem & { source: string }

export type HomeCMSContent = {
  hero: {
    heading: string
    subtitle: string
    ctaLabel: string
    ctaHref: string
  }
  regulatoryItems: RegulatoryItem[]
  trends: TrendItem[]
  downloads: DownloadItem[]
  exploreMegatrendsCard: ExploreMegatrendsCard
  regulatoryNotice: {
    title: string
    body: string
    address: string
  }
}

const fallbackHomeContent: HomeCMSContent = {
  hero: {
    heading: 'Investing in the World of Tomorrow Today',
    subtitle: 'Harnessing global megatrends to unlock long-term growth.',
    ctaLabel: 'Explore Our Megatrends',
    ctaHref: '/megatrends',
  },
  regulatoryItems: [
    { label: 'Regulatory Structure', value: 'UCITS' },
    { label: 'Portfolio Manager', value: 'MRB Fund Partners AG' },
    { label: 'Fund Administrator', value: 'VP Fund Solutions (Liechtenstein) AG' },
    { label: 'Custodian Bank', value: 'VP Bank (Liechtenstein) AG' },
    { label: 'Audit Company', value: 'Grant Thornton AG' },
    { label: 'Lichtenstein', value: 'FMA Approved' },
    { label: 'Switzerland', value: 'FINMA Approved' },
    { label: 'Tax Transparency', value: 'CH, LI' },
    { label: 'Sales Restrictions', value: 'USA' },
    { label: 'SFDR', value: 'Article 6' },
  ],
  trends: [
    {
      title: 'Technology/Technological Advancements',
      body: 'Innovation, particularly in areas such as artificial intelligence, machine learning, quantum computing, and the Internet of Things. These technologies are not only modifying existing industries but also creating entirely new market segments. Central to these advancements are semiconductors, which underpin data processing, enable AI algorithms, and drive efficiencies in sectors ranging from cloud computing to autonomous systems and industrial automation. Cybersecurity also remains a critical focal point, safeguarding digital ecosystems from an increasingly sophisticated threat landscape.',
      imageUrl: '/images/megatrend_technology.png',
      tickers: [
        ['NVDA', 'NVIDIA Corp'],
        ['GOOG', 'Alphabet Inc'],
      ],
    },
    {
      title: 'Changing Consumer Behavior/Demographics',
      body: 'Demographic transformations, including aging populations, urbanization, and increasingly digital-centric lifestyles are reshaping global demand dynamics. The growth of the mobile-first consumer is particularly pronounced, as smartphones and mobile applications become the preeminent medium for e-commerce, entertainment, and service delivery. These transferences are compounded by the demand for healthcare innovations driven by aging societies and the growth of intergenerational wealth transfer.',
      imageUrl: '/images/megatrend_consumer.png',
      tickers: [
        ['AMZN', 'Amazon.com Inc'],
        ['WMT', 'Walmart Inc'],
      ],
    },
    {
      title: 'Healthcare/Longevity Revolution',
      body: 'The healthcare sector is undergoing a paradigm shift, driven by breakthroughs in biotechnology, genomics, digital health, and personalized medicine. These innovations are reshaping patient care and improving outcomes through robotic surgery, extending life expectancy, and redefining the future of wellness. The advent of gene editing, wearable health technologies, and advanced medical devices is creating exponential growth opportunities for investors in medtech, biopharma, and healthcare infrastructure.',
      imageUrl: '/images/megatrend_healthcare.png',
      tickers: [
        ['GALD SW', 'Galderma Group AG'],
        ['ISRG', 'Intuitive Surgical Inc'],
      ],
    },
    {
      title: 'Shift in Economic Power',
      body: 'Transformation in global economic power, particularly in Asia and Latin America, is driving an unprecedented wave of growth in emerging markets. The expanding middle class in these regions is fueling an increase in consumption across a diverse array of sectors, including consumer goods, luxury, and digital services. Furthermore, the rapid adoption of digital currencies and the rise of fintech solutions are disrupting traditional financial systems, enabling cross-border economic integration and reducing friction in global transactions.',
      imageUrl: '/images/megatrend_economic.png',
      tickers: [
        ['MELI', 'MercadoLibre Inc'],
        ['700 HK', 'Tencent Holdings Ltd'],
      ],
    },
    {
      title: 'Mobility/Transportation',
      body: 'The accessibility of fundamental transformation is driven by the adoption of electric vehicles, autonomous driving technologies, and mobility-as-a-service platforms. The deployment of self-driving cars, trucks, and drones has the potential to dramatically enhance efficiency and safety while reducing environmental impact. These innovations are complemented by the development of smart infrastructure, which aims to optimize traffic flows and reduce congestion.',
      imageUrl: '/images/megatrend_mobility.png',
      tickers: [
        ['TSLA', 'Tesla Inc'],
        ['DUK', 'Duke Energy Corp'],
      ],
    },
    {
      title: 'Smart Infrastructure/Smart City',
      body: 'Urbanization, digitalization, and electrification are accelerating the transition toward smarter, more connected infrastructure. Advanced technologies such as artificial intelligence, Internet of Things, 5G, edge computing, and real-time analytics are increasingly embedded into smart housing, transportation systems, energy grids, utilities, and public services. As demand grows, investments are rising across key sectors including construction, data centers, transmission networks, energy, and telecommunications, highlighting the need for scalable, adaptive systems.',
      imageUrl: '/images/megatrend_infrastructure.png',
      tickers: [
        ['PRY IM', 'Prysmian S.p.A'],
        ['NBIS', 'Nebius Group N.V.'],
      ],
    },
  ],
  downloads: [
    {
      label: 'Factsheet USD',
      href: '/impgmt-clone/www.impgmtfund.com/_files/ugd/037a25_e3e73c35d566433fa958a54696b69633.pdf',
    },
    {
      label: 'Factsheet CHF Hedged',
      href: '/impgmt-clone/www.impgmtfund.com/_files/ugd/037a25_671093d7123f482e9e90bf53264f0f85.pdf',
    },
    {
      label: 'Fund Commentary',
      href: '/impgmt-clone/www.impgmtfund.com/_files/ugd/037a25_4f821338d34e4ad082c86d13bd46c757.pdf',
    },
    {
      label: 'Presentation',
      href: '/impgmt-clone/www.impgmtfund.com/_files/ugd/037a25_eb4acc9f30f64bc6a3cb83cd325b4333.pdf',
    },
  ],
  exploreMegatrendsCard: {
    title: 'Explore Our Megatrends',
    imageUrl: 'https://static.wixstatic.com/media/c3fe54_33107dbfb46d4ababca7567af0449730~mv2.png',
  },
  regulatoryNotice: {
    title: 'Regulatory Notice',
    body: 'Portfolio management of the IMP Global Megatrend Umbrella Fund is entrusted to MRB Fund Partners AG. In this document and all related marketing materials, the pronouns "we," "us," and "our" refer exclusively to MRB Fund Partners AG in relation to any investment decisions and regulated portfolio-management activities.',
    address: 'Fraumünsterstrasse 9 · 8001 Zürich · www.mrbpartner.ch',
  },
}

function richTextToParagraphs(richText: unknown): string[] {
  const root = (richText as { root?: { children?: Array<Record<string, unknown>> } } | null)?.root
  const children = Array.isArray(root?.children) ? root.children : []

  return children
    .map((node) => {
      const textChildren = Array.isArray(node?.children)
        ? (node.children as Array<Record<string, unknown>>)
        : []

      const text = textChildren
        .filter((child) => child?.type === 'text' && typeof child.text === 'string')
        .map((child) => child.text as string)
        .join('')
        .trim()

      return text
    })
    .filter(Boolean)
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function resolveWixDocumentUrl(value: string): string {
  if (!value) return ''
  if (value.startsWith('http://') || value.startsWith('https://')) return value

  // Expected format: wix:document://v1/ugd/<file-id>.pdf/<human-readable-name>.pdf
  const match = value.match(/wix:document:\/\/v1\/ugd\/([^/]+)/)
  if (match?.[1]) {
    return `https://www.impgmtfund.com/_files/ugd/${match[1]}`
  }

  return ''
}

function resolveWixImageUrl(value: string): string {
  if (!value) return ''
  if (value.startsWith('http://') || value.startsWith('https://')) return value

  if (value.startsWith('wix:image://')) {
    const parts = value.replace('wix:image://v1/', '').split('/')
    const fileId = parts[0]
    if (fileId) {
      return `https://static.wixstatic.com/media/${fileId}`
    }
  }

  if (value.includes('.')) {
    return `https://static.wixstatic.com/media/${value}`
  }

  return value
}

function getRecordTextValue(
  record: Record<string, unknown>,
  key: string,
  keyPrefix?: string,
): string | null {
  const direct = record[key]
  if (typeof direct === 'string' && direct.trim() !== '') {
    return direct
  }

  const textFields = Array.isArray(record.textFields)
    ? (record.textFields as Array<Record<string, unknown>>)
    : []

  const match = textFields.find((entry) => {
    const entryKey = entry?.key
    if (typeof entryKey !== 'string') return false
    if (entryKey === key) return true
    if (keyPrefix && entryKey.startsWith(keyPrefix)) return true
    return false
  })

  const value = match?.value
  if (typeof value === 'string' && value.trim() !== '') {
    return value
  }

  return null
}

function getRecordObjectValue(record: Record<string, unknown>, key: string): unknown {
  const direct = record[key]
  if (typeof direct === 'object' && direct !== null) {
    return direct
  }

  const objectFields = Array.isArray(record.objectFields)
    ? (record.objectFields as Array<Record<string, unknown>>)
    : []

  const match = objectFields.find((entry) => {
    const entryKey = entry?.key
    return typeof entryKey === 'string' && entryKey === key
  })

  return match?.value
}

function extractImageSourceFromUnknown(value: unknown, depth = 0): string | null {
  if (depth > 4 || value == null) return null

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return null
    return resolveWixImageUrl(trimmed)
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const resolved = extractImageSourceFromUnknown(item, depth + 1)
      if (resolved) return resolved
    }
    return null
  }

  if (typeof value !== 'object') return null

  const record = value as WixRecord
  const directStringKeys = [
    'url',
    'src',
    'id',
    'imageUrl',
    'imageURL',
    'imageSrc',
    'coverImage',
    'thumbnail',
  ]

  for (const key of directStringKeys) {
    const candidate = record[key]
    if (typeof candidate === 'string' && candidate.trim() !== '') {
      return resolveWixImageUrl(candidate)
    }
  }

  const nestedKeys = ['image', 'media', 'file', 'asset', 'source', 'cover', 'coverImage', 'thumbnail']
  for (const key of nestedKeys) {
    const resolved = extractImageSourceFromUnknown(record[key], depth + 1)
    if (resolved) return resolved
  }

  return null
}

function fallbackTrendImageByTitle(title: string): string {
  const fallbackMap: Record<string, string> = {
    'Technology/Technological Advancements': '/images/megatrend_technology.png',
    'Changing Consumer Behavior/Demographics': '/images/megatrend_consumer.png',
    'Healthcare/Longevity Revolution': '/images/megatrend_healthcare.png',
    'Shift in Economic Power': '/images/megatrend_economic.png',
    'Mobility/Transportation': '/images/megatrend_mobility.png',
    'Smart Infrastructure/Smart City': '/images/megatrend_infrastructure.png',
  }

  return fallbackMap[title] ?? '/images/megatrend_technology.png'
}

function parseTrendImageSource(data: WixRecord): string | null {
  const textCandidates = [
    'image_fld',
    'image',
    'imageUrl',
    'imageURL',
    'imageSrc',
    'megatrendImage',
    'trendImage',
    'coverImage',
    'thumbnail',
    'icon',
    'iconUrl',
    'iconURL',
  ]

  for (const key of textCandidates) {
    const value = getRecordTextValue(data, key)
    if (value) return resolveWixImageUrl(value)
  }

  // Prefer explicit object-based image field names from Wix data first.
  const explicitObjectCandidates = ['image_fld', 'image', 'media', 'file', 'asset']
  for (const key of explicitObjectCandidates) {
    const value = getRecordObjectValue(data, key)
    const resolved = extractImageSourceFromUnknown(value)
    if (resolved) return resolved
  }

  // Keep a conservative fallback set in case source shape drifts.
  const objectCandidates = [
    'coverImage',
    'thumbnail',
    'icon',
    'trendImage',
    'megatrendImage',
  ]

  for (const key of objectCandidates) {
    const value = getRecordObjectValue(data, key)
    const resolved = extractImageSourceFromUnknown(value)
    if (resolved) return resolved
  }

  return null
}

function getRecordSortValue(record: WixRecord): string {
  const directSort = getRecordTextValue(record, '_manualSort_', '_manualSort_')
  if (directSort) return directSort

  const raw = record._manualSort
  return typeof raw === 'string' ? raw : ''
}

function parseWixRichParagraphs(richContent: unknown): string[] {
  const nodes = (richContent as { nodes?: unknown[] } | null)?.nodes
  if (!Array.isArray(nodes)) return []

  return nodes
    .map((node) => {
      const nodeRecord = (node ?? {}) as WixRecord
      const children = Array.isArray(nodeRecord.nodes) ? (nodeRecord.nodes as WixRecord[]) : []
      const text = children
        .map((child) => {
          const textData = (child.textData && typeof child.textData === 'object'
            ? child.textData
            : {}) as WixRecord
          return typeof textData.text === 'string' ? textData.text : ''
        })
        .join('')
      return stripHtml(text)
    })
    .filter((paragraph) => paragraph.length > 0)
}

function parseTrustListItems(docs: Array<Record<string, unknown>>): RegulatoryItem[] {
  return docs
    .map((doc) => {
      const data = (doc.data && typeof doc.data === 'object'
        ? doc.data
        : {}) as Record<string, unknown>

      const label = getRecordTextValue(data, 'title_fld')
      const rawValue = getRecordTextValue(data, 'description_fld')
      const value = rawValue ? stripHtml(rawValue) : null
      const manualSort = getRecordSortValue(data)

      if (!label || !value) {
        return null
      }

      return { label, value, manualSort }
    })
    .filter((item): item is RegulatoryItem & { manualSort: string } => item !== null)
    .sort((a, b) => {
      if (a.manualSort !== b.manualSort) return a.manualSort.localeCompare(b.manualSort)
      return a.label.localeCompare(b.label)
    })
    .map(({ label, value }) => ({ label, value }))
}

function parseTrendItems(docs: WixRecord[]): ParsedTrendItem[] {
  return docs
    .map((doc) => {
      const data = (doc.data && typeof doc.data === 'object' ? doc.data : {}) as WixRecord
      const title = getRecordTextValue(data, 'title_fld')
      const descriptionHtml = getRecordTextValue(data, 'description_fld')
      const body = descriptionHtml ? stripHtml(descriptionHtml) : ''

      const firstCode = getRecordTextValue(data, 'firstStockCode')
      const firstName = getRecordTextValue(data, 'firstStockName')
      const secondCode = getRecordTextValue(data, 'secondStockCode')
      const secondName = getRecordTextValue(data, 'secondStockName')
      const tickers: [string, string][] = []

      if (firstCode && firstName) tickers.push([firstCode, firstName])
      if (secondCode && secondName) tickers.push([secondCode, secondName])

      const manualSort = getRecordSortValue(data)
      const imageSource = parseTrendImageSource(data)

      if (!title || !body) return null
      return {
        title,
        body,
        tickers,
        imageUrl: imageSource || fallbackTrendImageByTitle(title),
        imageSource: imageSource || '',
        manualSort,
      }
    })
    .filter((item): item is ParsedTrendItem => item !== null)
    .sort((a, b) => {
      if (a.manualSort !== b.manualSort) return b.manualSort.localeCompare(a.manualSort)
      return b.title.localeCompare(a.title)
    })
    .map((item) => item)
}

function parseDownloadItems(docs: WixRecord[]): ParsedDownloadItem[] {
  const first = docs[0]
  if (!first) return []

  const data = (first.data && typeof first.data === 'object' ? first.data : {}) as WixRecord
  const mapping: Array<{ key: string; label: string }> = [
    { key: 'factSheet', label: 'Factsheet USD' },
    { key: 'factsheetChfHedged', label: 'Factsheet CHF Hedged' },
    { key: 'fundCommentary', label: 'Fund Commentary' },
    { key: 'presentation', label: 'Presentation' },
  ]

  return mapping
    .map(({ key, label }) => {
      const raw = getRecordTextValue(data, key)
      if (!raw) return null
      const source = resolveWixDocumentUrl(raw)
      if (!source) return null
      return { label, href: source, source }
    })
    .filter((item): item is ParsedDownloadItem => item !== null)
}

function parseExploreMegatrendsTitle(data: WixRecord): string {
  const candidates = [
    'exploreMegatrendsTitle',
    'exploreOurMegatrendsTitle',
    'exploreMegatrendsLabel',
    'exploreOurMegatrendsLabel',
    'megatrendsTitle',
    'ourMegatrendsTitle',
  ]

  for (const key of candidates) {
    const value = getRecordTextValue(data, key)
    if (value) return stripHtml(value)
  }

  return fallbackHomeContent.exploreMegatrendsCard.title
}

function parseExploreMegatrendsImageSource(data: WixRecord): string {
  const candidates = [
    'exploreMegatrendsImage',
    'exploreOurMegatrendsImage',
    'exploreMegatrendsIcon',
    'exploreOurMegatrendsIcon',
    'megatrendsImage',
    'megatrendsIcon',
  ]

  for (const key of candidates) {
    const value = getRecordTextValue(data, key)
    if (value) return resolveWixImageUrl(value)
  }

  return resolveWixImageUrl(fallbackHomeContent.exploreMegatrendsCard.imageUrl)
}

function parseRegulatoryNoticeFromWix(
  legalDocs: WixRecord[],
  contactDocs: WixRecord[],
): HomeCMSContent['regulatoryNotice'] | null {
  const legalData = ((legalDocs[0]?.data as WixRecord | undefined) ?? {}) as WixRecord
  const contactData = ((contactDocs[0]?.data as WixRecord | undefined) ?? {}) as WixRecord

  const title = getRecordTextValue(legalData, 'title_fld')
  const legalParagraphs = parseWixRichParagraphs(legalData.richcontent)
  const body =
    legalParagraphs.find((paragraph) => /portfolio management/i.test(paragraph)) ??
    legalParagraphs[0] ??
    ''

  const addressRaw = getRecordTextValue(contactData, 'address')
  const websiteName = getRecordTextValue(contactData, 'websiteName')
  const websiteUrl = getRecordTextValue(contactData, 'websiteUrl')

  const addressParts: string[] = []
  if (addressRaw) {
    addressParts.push(addressRaw.replace(/\s*\n\s*/g, ' · ').trim())
  }
  if (websiteName) {
    addressParts.push(websiteName.trim())
  } else if (websiteUrl) {
    try {
      const host = new URL(websiteUrl).host
      addressParts.push(host)
    } catch {
      addressParts.push(websiteUrl.trim())
    }
  }

  if (!title && !body && addressParts.length === 0) return null

  return {
    title: title || fallbackHomeContent.regulatoryNotice.title,
    body: body || fallbackHomeContent.regulatoryNotice.body,
    address: addressParts.join(' · ') || fallbackHomeContent.regulatoryNotice.address,
  }
}

function resolveSupabasePublicMediaUrl(filename: string): string | null {
  if (!filename) return null

  const endpoint = process.env.S3_ENDPOINT
  const bucket = process.env.S3_BUCKET
  if (!endpoint || !bucket) return null

  try {
    const endpointUrl = new URL(endpoint)
    const baseOrigin = endpointUrl.origin
    const encodedFilename = filename
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/')

    return `${baseOrigin}/storage/v1/object/public/${bucket}/${encodedFilename}`
  } catch {
    return null
  }
}

async function resolveMediaUrlFromSource(
  payload: Awaited<ReturnType<typeof getPayload>>,
  imageSource: string,
): Promise<string> {
  if (!imageSource || imageSource.startsWith('/')) return imageSource

  const mediaBySource = await payload.find({
    collection: 'media',
    limit: 1,
    pagination: false,
    depth: 0,
    where: {
      wixSourceUrl: { equals: imageSource },
    },
  })

  const mediaDoc = mediaBySource.docs?.[0] as { url?: unknown; filename?: unknown } | undefined
  const mediaFilename = mediaDoc?.filename
  if (typeof mediaFilename === 'string' && mediaFilename.trim() !== '') {
    const supabaseMediaUrl = resolveSupabasePublicMediaUrl(mediaFilename)
    if (supabaseMediaUrl) return supabaseMediaUrl
  }

  const mediaUrl = mediaDoc?.url
  if (typeof mediaUrl === 'string' && mediaUrl.trim() !== '') {
    return mediaUrl
  }

  return imageSource
}

export const getHomeCMSContent = cache(async (): Promise<HomeCMSContent> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      limit: 1,
      pagination: false,
      where: {
        slug: { equals: 'home' },
      },
    })

    const page = result.docs?.[0]
    if (!page) return fallbackHomeContent

    const trustListResult = await payload.find({
      collection: 'wix-trust-list',
      limit: 100,
      pagination: false,
      depth: 0,
    })
    const trustListDocs = (trustListResult.docs ?? []) as unknown as Array<Record<string, unknown>>
    const trustListItems = parseTrustListItems(trustListDocs)

    if (trustListItems.length === 0) {
      payload.logger.warn(
        'Regulatory strip fallback in use: no valid rows found in wix-trust-list.',
      )
    }

    const trendResult = await payload.find({
      collection: 'wix-megatrend-dataset',
      limit: 100,
      pagination: false,
      depth: 0,
    })
    const trendDocs = (trendResult.docs ?? []) as unknown as WixRecord[]
    const trendItems = parseTrendItems(trendDocs)
    const trendsWithResolvedImages = await Promise.all(
      trendItems.map(async (trend) => {
        const resolvedImageUrl = trend.imageSource
          ? await resolveMediaUrlFromSource(payload, trend.imageSource)
          : trend.imageUrl

        return {
          title: trend.title,
          body: trend.body,
          tickers: trend.tickers,
          imageUrl: resolvedImageUrl || fallbackTrendImageByTitle(trend.title),
        }
      }),
    )

    if (trendItems.length === 0) {
      payload.logger.warn(
        'Trends fallback in use: no valid rows found in wix-megatrend-dataset.',
      )
    }

    const downloadResult = await payload.find({
      collection: 'wix-homepage-links',
      limit: 10,
      pagination: false,
      depth: 0,
    })
    const downloadDocs = (downloadResult.docs ?? []) as unknown as WixRecord[]
    const parsedDownloadItems = parseDownloadItems(downloadDocs)
    const downloadItems = await Promise.all(
      parsedDownloadItems.map(async (item) => {
        const resolvedHref = await resolveMediaUrlFromSource(payload, item.source)
        return { label: item.label, href: resolvedHref || item.href }
      }),
    )
    if (downloadItems.length === 0) {
      payload.logger.warn(
        'Downloads fallback in use: no valid rows found in wix-homepage-links.',
      )
    }

    const downloadData = ((downloadDocs[0]?.data as WixRecord | undefined) ?? {}) as WixRecord
    const exploreMegatrendsTitle = parseExploreMegatrendsTitle(downloadData)
    const exploreMegatrendsImageSource = parseExploreMegatrendsImageSource(downloadData)

    let exploreMegatrendsImageUrl = exploreMegatrendsImageSource

    if (exploreMegatrendsImageSource) {
      const mediaBySource = await payload.find({
        collection: 'media',
        limit: 1,
        pagination: false,
        depth: 0,
        where: {
          wixSourceUrl: { equals: exploreMegatrendsImageSource },
        },
      })

      const mediaDoc = mediaBySource.docs?.[0] as { url?: unknown; filename?: unknown } | undefined
      const mediaFilename = mediaDoc?.filename
      if (typeof mediaFilename === 'string' && mediaFilename.trim() !== '') {
        const supabaseMediaUrl = resolveSupabasePublicMediaUrl(mediaFilename)
        if (supabaseMediaUrl) {
          exploreMegatrendsImageUrl = supabaseMediaUrl
        }
      }

      const mediaUrl = mediaDoc?.url
      if (
        typeof mediaUrl === 'string' &&
        mediaUrl.trim() !== '' &&
        !exploreMegatrendsImageUrl.includes('/storage/v1/object/public/')
      ) {
        exploreMegatrendsImageUrl = mediaUrl
      }
    }

    const legalResult = await payload.find({
      collection: 'wix-legal-information',
      limit: 5,
      pagination: false,
      depth: 0,
    })
    const legalDocs = (legalResult.docs ?? []) as unknown as WixRecord[]

    const contactResult = await payload.find({
      collection: 'wix-contact-us',
      limit: 5,
      pagination: false,
      depth: 0,
    })
    const contactDocs = (contactResult.docs ?? []) as unknown as WixRecord[]

    const regulatoryNoticeFromWix = parseRegulatoryNoticeFromWix(legalDocs, contactDocs)
    if (!regulatoryNoticeFromWix) {
      payload.logger.warn(
        'Regulatory notice fallback in use: no valid data found in wix-legal-information / wix-contact-us.',
      )
    }

    const heroParagraphs = richTextToParagraphs(page.hero?.richText)
    const heroSource = heroParagraphs[0] ?? ''
    const heroSplit = heroSource.split('Harnessing')
    const heroHeading = (heroSplit[0] ?? '').replace(/\.+$/, '').trim()
    const heroSubtitle = heroSplit[1] ? `Harnessing${heroSplit[1]}`.trim() : ''

    return {
      hero: {
        heading: heroHeading || fallbackHomeContent.hero.heading,
        subtitle: heroSubtitle || fallbackHomeContent.hero.subtitle,
        ctaLabel: fallbackHomeContent.hero.ctaLabel,
        ctaHref: fallbackHomeContent.hero.ctaHref,
      },
      regulatoryItems:
        trustListItems.length > 0 ? trustListItems : fallbackHomeContent.regulatoryItems,
      trends: trendsWithResolvedImages.length > 0 ? trendsWithResolvedImages : fallbackHomeContent.trends,
      downloads: downloadItems.length > 0 ? downloadItems : fallbackHomeContent.downloads,
      exploreMegatrendsCard: {
        title: exploreMegatrendsTitle || fallbackHomeContent.exploreMegatrendsCard.title,
        imageUrl: exploreMegatrendsImageUrl || fallbackHomeContent.exploreMegatrendsCard.imageUrl,
      },
      regulatoryNotice: regulatoryNoticeFromWix ?? fallbackHomeContent.regulatoryNotice,
    }
  } catch {
    return fallbackHomeContent
  }
})
