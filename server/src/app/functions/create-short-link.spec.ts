import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight } from '@/infra/shared/either'

describe('create short link', () => {
  it('should be able to create a short link and get its id', async () => {
    const namePattern = randomUUID().toLowerCase().slice(0, 10)
    const originalUrl = `https://example.com/${namePattern}`
    const shortUrl = namePattern

    const { createShortLink } = await import('./create-short-link')

    const result = await createShortLink({ originalUrl, shortUrl })

    const [createdShortLink] = await db
      .select({ id: schema.shortLinks.id })
      .from(schema.shortLinks)
      .where(eq(schema.shortLinks.shortUrl, shortUrl))

    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      expect(result.right.shortLinkId).toEqual(createdShortLink.id)
    }
  })
})
