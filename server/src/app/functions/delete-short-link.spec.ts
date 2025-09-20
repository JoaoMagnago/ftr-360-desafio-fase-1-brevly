import { uuidv7 } from 'uuidv7'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { createShortLink } from './create-short-link'
import { deleteShortLink } from './delete-short-link'
import { ShortLinkNotFoundError } from './errors/short-link-not-found'

describe('delete short link', () => {
  beforeEach(async () => {
    await db.delete(schema.shortLinks)
  })

  it('should be able to delete a short link from its id', async () => {
    const shortUrl = `Example-Page${uuidv7().slice(0, 6).toLowerCase()}`
    const originalUrl = 'https://example.com'

    const createShortLinkSut = await createShortLink({ originalUrl, shortUrl })

    const shortLinkId = createShortLinkSut.right?.shortLinkId as string

    const deleteShortLinkSut = await deleteShortLink({ shortLinkId })

    expect(isRight(deleteShortLinkSut)).toBe(true)
  })

  it('should not be able to delete a short link that does not exist', async () => {
    const deleteShortLinkSut = await deleteShortLink({
      shortLinkId: 'non-existant-id',
    })

    expect(isLeft(deleteShortLinkSut)).toBe(true)
    expect(unwrapEither(deleteShortLinkSut)).toBeInstanceOf(
      ShortLinkNotFoundError
    )
  })
})
