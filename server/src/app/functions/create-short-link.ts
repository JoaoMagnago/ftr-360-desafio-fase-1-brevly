import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { checkShortUrlFormat } from '../utils/string'
import { InvalidShortUrlFormatError } from './errors/invalid-short-url-format'
import { ShortLinkAlreadyExistsError } from './errors/short-link-already-exists'

const getShortLinkInput = z.object({
  originalUrl: z.string(),
  shortUrl: z.string(),
})

type CreateShortLinkInput = z.input<typeof getShortLinkInput>

type CreateShortLinkOutput = {
  shortLinkId: string
  shortUrl: string
}

export async function createShortLink(
  input: CreateShortLinkInput
): Promise<
  Either<
    InvalidShortUrlFormatError | ShortLinkAlreadyExistsError,
    CreateShortLinkOutput
  >
> {
  const { originalUrl, shortUrl } = getShortLinkInput.parse(input)

  if (!checkShortUrlFormat(shortUrl)) {
    return makeLeft(new InvalidShortUrlFormatError(shortUrl))
  }

  const [shortUrlAlreadyExists] = await db
    .select({ id: schema.shortLinks.id })
    .from(schema.shortLinks)
    .where(eq(schema.shortLinks.shortUrl, shortUrl))

  if (shortUrlAlreadyExists) {
    return makeLeft(new ShortLinkAlreadyExistsError(shortUrl))
  }

  const [shortLink] = await db
    .insert(schema.shortLinks)
    .values({
      originalUrl: originalUrl,
      shortUrl: shortUrl,
    })
    .returning({
      id: schema.shortLinks.id,
      shortUrl: schema.shortLinks.shortUrl,
    })

  return makeRight({ shortLinkId: shortLink.id, shortUrl: shortLink.shortUrl })
}
