import { eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { createShortLink } from './create-short-link'
import { InvalidShortUrlFormat } from './errors/invalid-short-url-format'
import { ShortLinkAlreadyExists } from './errors/short-link-already-exists'

describe('create short link', () => {
  beforeEach(async () => {
    await db.delete(schema.shortLinks)
  })

  it('should be able to create a short link and get its id', async () => {
    const shortUrl = 'Example-Page1'
    const originalUrl = `https://example.com/`

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

  it('should not be able to create a short link with an existing short url', async () => {
    const shortUrl = 'Example-Page1'
    const originalUrl = `https://example.com`

    await createShortLink({ originalUrl, shortUrl })
    const sut = await createShortLink({ originalUrl, shortUrl })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(ShortLinkAlreadyExists)
  })

  it('should not be able to create a short link with incorrect format', async () => {
    const shortUrlWithoutPascalCasing = 'example-Page1'
    const shortUrlWithMultipleUppercaseLetters = 'ExampLe-Page'
    const shortUrlWithSpecialCharacter = 'Example-Page*'
    const shortUrlWithSpace = 'Example Page'
    const originalUrl = `https://example.com`

    const result1 = await createShortLink({
      originalUrl,
      shortUrl: shortUrlWithoutPascalCasing,
    })
    const result2 = await createShortLink({
      originalUrl,
      shortUrl: shortUrlWithMultipleUppercaseLetters,
    })
    const result3 = await createShortLink({
      originalUrl,
      shortUrl: shortUrlWithSpecialCharacter,
    })
    const result4 = await createShortLink({
      originalUrl,
      shortUrl: shortUrlWithSpace,
    })

    expect(isLeft(result1)).toBe(true)
    expect(unwrapEither(result1)).toBeInstanceOf(InvalidShortUrlFormat)

    expect(isLeft(result2)).toBe(true)
    expect(unwrapEither(result2)).toBeInstanceOf(InvalidShortUrlFormat)

    expect(isLeft(result3)).toBe(true)
    expect(unwrapEither(result3)).toBeInstanceOf(InvalidShortUrlFormat)

    expect(isLeft(result4)).toBe(true)
    expect(unwrapEither(result4)).toBeInstanceOf(InvalidShortUrlFormat)
  })
})
