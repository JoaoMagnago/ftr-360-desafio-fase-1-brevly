import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { makeShortLink } from '@/test/factories/make-short-link'
import { deleteShortLink } from './delete-short-link'
import { ShortLinkNotFoundError } from './errors/short-link-not-found'

describe('delete short link', () => {
  it('should be able to delete a short link from its id', async () => {
    const namePattern = randomUUID().toLocaleLowerCase().replace(/-/g, '')
    const shortLink = await makeShortLink({
      shortUrl: `Example-Page1${namePattern}`,
    })

    const shortLinkId = shortLink.id

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
