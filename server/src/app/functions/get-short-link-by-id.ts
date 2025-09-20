import { ilike } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { ShortLinkNotFoundError } from './errors/short-link-not-found'

const getShortLinkByIdInput = z.object({
  searchQuery: z.string().optional(),
})

type GetShortLinkByIdInput = z.input<typeof getShortLinkByIdInput>

type GetShortLinkByIdOutput = {
  shortLink: {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: Date
  }
}

export async function getShortLinkById(
  input: GetShortLinkByIdInput
): Promise<Either<ShortLinkNotFoundError, GetShortLinkByIdOutput>> {
  const { searchQuery } = getShortLinkByIdInput.parse(input)

  const results = await db
    .select({
      id: schema.shortLinks.id,
      originalUrl: schema.shortLinks.originalUrl,
      shortUrl: schema.shortLinks.shortUrl,
      accessCount: schema.shortLinks.accessCount,
      createdAt: schema.shortLinks.createdAt,
    })
    .from(schema.shortLinks)
    .where(
      searchQuery ? ilike(schema.shortLinks.id, `%${searchQuery}%`) : undefined
    )

  const shortLink = results[0]

  if (!shortLink) {
    return makeLeft(new ShortLinkNotFoundError(searchQuery))
  }

  return makeRight({ shortLink })
}
