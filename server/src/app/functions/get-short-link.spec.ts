import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { createShortLink } from './create-short-link'
import { getShortLink } from './get-short-link'

describe('get short link', () => {
  beforeEach(async () => {
    await db.delete(schema.shortLinks)
  })

  it('should be able to get a short link from its id', async () => {
    const shortUrl = 'Example-Page1'
    const originalUrl = `https://example.com`

    const createShortLinkSut = await createShortLink({ originalUrl, shortUrl })

    const shortLinkId = createShortLinkSut.right?.shortLinkId

    const getShortLinkSut = await getShortLink({
      searchQuery: shortLinkId,
    })

    expect(isRight(getShortLinkSut)).toBe(true)
    if (isRight(getShortLinkSut)) {
      expect(unwrapEither(getShortLinkSut).shortLink).toEqual(
        expect.objectContaining({
          id: shortLinkId,
          shortUrl,
          originalUrl,
          accessCount: 0,
        })
      )
      expect(unwrapEither(getShortLinkSut).shortLink.createdAt).toBeInstanceOf(
        Date
      )
    }
  })
})
