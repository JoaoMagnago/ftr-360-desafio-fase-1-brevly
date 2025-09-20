import { uuidv7 } from 'uuidv7'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { createShortLink } from './create-short-link'
import { getAllShortLinks } from './get-all-short-links'

describe('get all short links', () => {
  beforeEach(async () => {
    await db.delete(schema.shortLinks)
  })

  it('should be able to get all short links from database', async () => {
    const shortUrls = [
      `Example-Page${uuidv7().slice(0, 6).toLowerCase()}`,
      `Example-Page1${uuidv7().slice(0, 6).toLowerCase()}`,
    ]
    const originalUrl = 'https://example.com'

    shortUrls.forEach(async shortUrl => {
      await createShortLink({ originalUrl, shortUrl })
    })

    const getAllShortLinksSut = await getAllShortLinks()

    expect(isRight(getAllShortLinksSut)).toBe(true)
    if (isRight(getAllShortLinksSut)) {
      const shortLinks = unwrapEither(getAllShortLinksSut).shortLinks
      expect(shortLinks.length).toBe(2)
    }
  })
})
