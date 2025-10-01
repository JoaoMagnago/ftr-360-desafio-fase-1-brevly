import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { deleteShortLink } from './delete-short-link'
import { ShortLinkNotFoundError } from './errors/short-link-not-found'
import { createShortLink } from './create-short-link'

describe('delete short link', () => {
  it('should be able to delete a short link from its id', async () => {
    const shortUrl = `Example-Page${randomUUID().toLocaleLowerCase().replace(/-/g, '')}`
    const originalUrl = `https://example.com`

    const sut = await createShortLink({ originalUrl, shortUrl })

    const deleteShortLinkSut = await deleteShortLink({ shortLinkId: sut.right?.shortLinkId as string })

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
