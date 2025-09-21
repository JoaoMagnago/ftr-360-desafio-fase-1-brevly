import { Readable } from 'node:stream'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { CouldNotRetrieveUrlError } from './errors/could-not-retrieve-url'
import { InvalidFileFormatError } from './errors/invalid-file-format'

const uploadCSVInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadCSVInput = z.input<typeof uploadCSVInput>

const allowedMimeTypes = ['text/csv', 'application/csv']

export async function uploadCSV(
  input: UploadCSVInput
): Promise<
  Either<
    InvalidFileFormatError | CouldNotRetrieveUrlError,
    { remoteUrl: string }
  >
> {
  const { contentStream, contentType, fileName } = uploadCSVInput.parse(input)

  if (!allowedMimeTypes.includes(contentType)) {
    return makeLeft(new InvalidFileFormatError())
  }

  const { key, url } = await uploadFileToStorage({
    folder: 'downloads',
    fileName,
    contentType,
    contentStream,
  })

  const result = await db
    .update(schema.shortLinks)
    .set({
      csvRemoteKey: key,
      csvRemoteUrl: url,
    })
    .where(eq(schema.shortLinks.shortUrl, fileName))
    .returning({
      remoteUrl: schema.shortLinks.csvRemoteUrl,
    })

  const remoteUrl = result[0]?.remoteUrl

  if (!remoteUrl) {
    return makeLeft(new CouldNotRetrieveUrlError())
  }

  return makeRight({ remoteUrl })
}
