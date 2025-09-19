import { uuidv7 } from 'uuidv7'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { createShortLink } from './create-short-link'
import { ShortLinkNotFoundError } from './errors/short-link-not-found'
import { getShortLink } from './get-short-link'

describe('get short link', () => {
  beforeEach(async () => {
    await db.delete(schema.shortLinks)
  })

  it('should be able to get a short link from its id', async () => {
    const shortUrl = `Example-Page${uuidv7().slice(0, 6).toLowerCase()}`
    const originalUrl = 'https://example.com'

    const createShortLinkSut = await createShortLink({ originalUrl, shortUrl })
    const shortLinkId = createShortLinkSut.right?.shortLinkId
    const selectedShortUrl = createShortLinkSut.right?.shortUrl

    const getShortLinkSut = await getShortLink({
      searchQuery: selectedShortUrl,
    })

    expect(isRight(getShortLinkSut)).toBe(true)
    if (isRight(getShortLinkSut)) {
      const shortLink = unwrapEither(getShortLinkSut).shortLink
      expect(shortLink).toEqual(
        expect.objectContaining({
          id: shortLinkId,
          shortUrl,
          originalUrl,
          accessCount: 0,
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
