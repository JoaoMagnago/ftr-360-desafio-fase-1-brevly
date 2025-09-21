import { pipeline, Readable, Transform } from 'node:stream'
import { promisify } from 'node:util'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const pipelineAsync = promisify(pipeline)

export async function streamShortLinksCsv(outputStream: NodeJS.WritableStream) {
  const rows = await db
    .select({
      id: schema.shortLinks.id,
      originalUrl: schema.shortLinks.originalUrl,
      shortUrl: schema.shortLinks.shortUrl,
      accessCount: schema.shortLinks.accessCount,
      createdAt: schema.shortLinks.createdAt,
    })
    .from(schema.shortLinks)

  outputStream.write(
    `${['ID', 'Original Url', 'Short Url', 'Access Count', 'Created At'].join(',')}\n`
  )

  const transform = new Transform({
    objectMode: true,
    transform(row, _encoding, callback) {
      const createdAtFormatted =
        row.createdAt instanceof Date
          ? row.createdAt.toISOString()
          : new Date(row.createdAt).toISOString()

      const csvLine = `${[
        row.id,
        row.originalUrl,
        row.shortUrl,
        row.accessCount,
        createdAtFormatted,
      ]
        .map(value => `"${String(value).replace(/"/g, '""')}"`)
        .join(',')}\n`

      callback(null, csvLine)
    },
  })

  await pipelineAsync(Readable.from(rows), transform, outputStream)
}
