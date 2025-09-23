import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { createShortLink } from './create-short-link'
import { InvalidShortUrlFormatError } from './errors/invalid-short-url-format'
import { ShortLinkAlreadyExistsError } from './errors/short-link-already-exists'

describe('create short link', () => {
  it('should be able to create a short link and get its id', async () => {
    const shortUrl = `Example-Page${randomUUID().toLocaleLowerCase().replace(/-/g, '')}`
    const originalUrl = `https://example.com`

    const result = await createShortLink({ originalUrl, shortUrl })

    expect(isRight(result)).toBe(true)

    if (isRight(result)) {
      const [shortLink] = await db
        .select({
          id: schema.shortLinks.id,
          shortUrl: schema.shortLinks.shortUrl,
        })
        .from(schema.shortLinks)
        .where(eq(schema.shortLinks.id, result.right.shortLinkId))

      expect(shortLink).toBeDefined()
      expect(shortLink.id).toBe(result.right.shortLinkId)
      expect(shortLink.shortUrl).toBe(result.right.shortUrl)
    }
  })

  it('should not be able to create a short link with an existing short url', async () => {
    const shortUrl = `Example-Page${randomUUID().toLocaleLowerCase().replace(/-/g, '')}`
    const originalUrl = `https://example.com`

    await createShortLink({ originalUrl, shortUrl })
    const sut = await createShortLink({ originalUrl, shortUrl })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(ShortLinkAlreadyExistsError)
  })

  it('should not be able to create a short link with incorrect format', async () => {
    const originalUrl = 'https://example.com'
    const invalidShortUrls = [
      'example-Page1',
      'ExampLe-Page',
      'Example Page',
      'Example*Page',
    ]

    invalidShortUrls.map(async shortUrl => {
      const res = await createShortLink({ originalUrl, shortUrl })
      expect(isLeft(res)).toBe(true)
      expect(unwrapEither(res)).toBeInstanceOf(InvalidShortUrlFormatError)
    })
  })
})
