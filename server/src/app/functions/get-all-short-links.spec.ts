import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { makeShortLink } from '@/test/factories/make-short-link'
import { getAllShortLinks } from './get-all-short-links'

describe('get all short links', () => {
  it('should be able to get all short links from database', async () => {
    const namePattern = randomUUID().toLocaleLowerCase().replace(/-/g, '')

    await makeShortLink({
      shortUrl: `Example-Page1${namePattern}`,
    })
    await makeShortLink({
      shortUrl: `Example-Page2${namePattern}`,
    })

    const getAllShortLinksSut = await getAllShortLinks()

    expect(isRight(getAllShortLinksSut)).toBe(true)
    expect(unwrapEither(getAllShortLinksSut).shortLinks.length).toBeGreaterThan(1)
  })
})
