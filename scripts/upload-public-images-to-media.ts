// @ts-nocheck
import path from 'node:path'
import { readFile } from 'node:fs/promises'
import config from '@payload-config'
import { getPayload } from 'payload'

const TARGET_FILES = [
  'consultation_icon.png',
  'technology_icon.png',
  'ps_defining_prioritizing.png',
  'performance_icon.png',
  'mobility_icon.png',
  'downloads_icon.png',
  'megatrend_mobility.png',
  'infrastructure_icon.png',
]

function filenameToAlt(filename: string): string {
  const withoutExt = filename.replace(/\.[a-zA-Z0-9]+$/, '')
  const normalized = withoutExt
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return normalized || 'Image'
}

async function main() {
  const payload = await getPayload({ config })
  const created: string[] = []
  const existing: string[] = []

  for (const filename of TARGET_FILES) {
    const byFilename = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
      pagination: false,
      depth: 0,
    })

    if ((byFilename.docs?.length ?? 0) > 0) {
      existing.push(filename)
      continue
    }

    const absPath = path.resolve(process.cwd(), 'public/images', filename)
    const data = await readFile(absPath)

    await payload.create({
      collection: 'media',
      data: {
        alt: filenameToAlt(filename),
        wixSourceUrl: `/images/${filename}`,
      },
      file: {
        name: filename,
        data,
        mimetype: 'image/png',
        size: data.byteLength,
      },
    })

    created.push(filename)
  }

  const summary = { created, existing }
  payload.logger.info({ summary }, 'Public image upload completed')
  console.log(JSON.stringify(summary, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
