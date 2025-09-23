import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { makeShortLink } from '@/test/factories/make-short-link'
import { ShortLinkNotFoundError } from './errors/short-link-not-found'
import { getShortLink } from './get-short-link'

describe('get short link', () => {
  it('should be able to get a short link from its id', async () => {
    const namePattern = randomUUID().toLocaleLowerCase().replace(/-/g, '')
    const shortLink = await makeShortLink({
      shortUrl: `Example-Page1${namePattern}`,
    })

    const { id: shortLinkId, originalUrl, shortUrl } = shortLink

    const getShortLinkSut = await getShortLink({
      searchQuery: shortUrl,
    })

    expect(isRight(getShortLinkSut)).toBe(true)
    if (isRight(getShortLinkSut)) {
      const shortLink = unwrapEither(getShortLinkSut).shortLink
      expect(shortLink).toEqual(
        expect.objectContaining({
          id: shortLinkId,
          shortUrl,
          originalUrl,
          accessCount: 1,
        })
      )
      expect(shortLink.createdAt).toBeInstanceOf(Date)
    }
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
