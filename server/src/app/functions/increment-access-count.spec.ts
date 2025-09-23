import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { isRight } from '@/infra/shared/either'
import { makeShortLink } from '@/test/factories/make-short-link'
import { getShortLinkById } from './get-short-link-by-id'
import { incrementAccessCount } from './increment-access-count'

describe('increment short link access count', () => {
  it('should be able to increment the access count of a short link', async () => {
    const namePattern = randomUUID().toLocaleLowerCase().replace(/-/g, '')
    const shortLink = await makeShortLink({
      shortUrl: `Example-Page1${namePattern}`,
    })

    const shortLinkId = shortLink.id
    const accessCount = (await getShortLinkById({ searchQuery: shortLinkId }))
      .right?.shortLink.accessCount as number

    const incrementAccessCountSut = await incrementAccessCount({
      searchQuery: shortLinkId,
      accessCount,
    })

    expect(isRight(incrementAccessCountSut)).toBe(true)
  })
})
