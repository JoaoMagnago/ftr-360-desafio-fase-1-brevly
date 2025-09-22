import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { stringify } from 'csv-stringify'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'

type ExportShortLinksOutput = {
  reportUrl: string
}

export async function exportShortLinks(): Promise<
  Either<never, ExportShortLinksOutput>
> {
  const { sql, params } = db
    .select({
      id: schema.shortLinks.id,
      originalUrl: schema.shortLinks.originalUrl,
      shortUrl: schema.shortLinks.shortUrl,
      accessCount: schema.shortLinks.accessCount,
      createdAt: schema.shortLinks.createdAt,
    })
    .from(schema.shortLinks)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'Original URL' },
      { key: 'short_url', header: 'Short URL' },
      { key: 'access_count', header: 'Access Count' },
      { key: 'created_at', header: 'Created at' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], _encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      },
    }),
    csv,
    new Transform({
      transform(chunk: Buffer, _encoding, callback) {
        console.log(chunk.toString())
        callback()
      },
    }),
    uploadToStorageStream
  )

  await convertToCSVPipeline

  // const uploadToStorage = uploadFileToStorage({
  //   contentType: 'text/csv',
  //   folder: 'downloads',
  //   fileName: `${new Date().toISOString()}-uploads.csv`,
  //   contentStream: uploadToStorageStream,
  // })

  // const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return makeRight({ reportUrl: '' })
}
