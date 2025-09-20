import { uuidv7 } from 'uuidv7'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight } from '@/infra/shared/either'
import { createShortLink } from './create-short-link'
import { getShortLinkById } from './get-short-link-by-id'
import { incrementAccessCount } from './increment-access-count'

describe('increment short link access count', () => {
  beforeEach(async () => {
    await db.delete(schema.shortLinks)
  })

  it('should be able to increment the access count of a short link', async () => {
    const shortUrl = `Example-Page${uuidv7().slice(0, 6).toLowerCase()}`
    const originalUrl = 'https://example.com'

    const createShortLinkSut = await createShortLink({ originalUrl, shortUrl })

    const shortLinkId = createShortLinkSut.right?.shortLinkId as string
    const accessCount = (await getShortLinkById({ searchQuery: shortLinkId }))
      .right?.shortLink.accessCount as number

    const incrementAccessCountSut = await incrementAccessCount({
      searchQuery: shortLinkId,
      accessCount,
    })

    expect(isRight(incrementAccessCountSut)).toBe(true)
  })
})
