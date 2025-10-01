import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { ShortLinkNotFoundError } from './errors/short-link-not-found'
import { getShortLink } from './get-short-link'
import { createShortLink } from './create-short-link'

describe('get short link', () => {
  it('should be able to get a short link from its short URL', async () => {
    const shortUrl = `Example-Page${randomUUID().toLocaleLowerCase().replace(/-/g, '')}`
    const originalUrl = `https://example.com`
    const namePattern = randomUUID().toLocaleLowerCase().replace(/-/g, '')
    await createShortLink({
      originalUrl,
      shortUrl,
    })

    const getShortLinkSut = await getShortLink({
      searchQuery: shortUrl,
    })

    expect(isRight(getShortLinkSut)).toBe(true)
    expect(unwrapEither(getShortLinkSut)).toMatchObject({
      shortLink: {
        id: expect.any(String),
        shortUrl: expect.any(String),
        originalUrl: expect.any(String),
        accessCount: expect.any(Number),
        createdAt: expect.any(Date)
      }
    })
  })

  it('should throw correct error if short link is not found', async () => {
    const getShortLinkSut = await getShortLink({
      searchQuery: 'non-existing-id',
    })

    expect(isRight(getShortLinkSut)).toBe(false)
    if (!isRight(getShortLinkSut)) {
      expect(unwrapEither(getShortLinkSut)).toBeInstanceOf(
        ShortLinkNotFoundError
      )
    }
  })
})
