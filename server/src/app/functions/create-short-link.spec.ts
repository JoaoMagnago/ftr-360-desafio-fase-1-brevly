import { eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight } from '@/infra/shared/either'

describe('create short link', () => {
  const namePattern = 'Example-Page1'
  const originalUrl = `https://example.com/${namePattern}`
  const shortUrl = namePattern

  beforeEach(() => {
    return db
      .delete(schema.shortLinks)
      .where(eq(schema.shortLinks.shortUrl, shortUrl))
  })

  it('should be able to create a short link and get its id', async () => {
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
