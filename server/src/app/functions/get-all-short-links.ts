import { desc } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'

type GetAllShortLinksOutput = {
  shortLinks: {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: Date
  }[]
}

export async function getAllShortLinks(): Promise<
  Either<never, GetAllShortLinksOutput>
> {
  const shortLinks = await db
    .select({
      id: schema.shortLinks.id,
      originalUrl: schema.shortLinks.originalUrl,
      shortUrl: schema.shortLinks.shortUrl,
      accessCount: schema.shortLinks.accessCount,
      createdAt: schema.shortLinks.createdAt,
    })
    .from(schema.shortLinks)
    .orderBy(desc(schema.shortLinks.createdAt))

  return makeRight({ shortLinks })
}
