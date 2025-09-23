import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRight, unwrapEither } from '@/infra/shared/either'
// Get entire upload file to storage function as an object
import * as upload from '@/infra/storage/upload-file-to-storage'
import { makeShortLink } from '@/test/factories/make-short-link'
import { exportShortLinks } from './export-short-links'

describe('export short links', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
  })

  it('should be able to export short links', async () => {
    const uploadStub = vi
      .spyOn(upload, 'uploadFileToStorage')
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: 'http://example.com/file.csv',
        }
      })

    const namePattern = randomUUID().toLocaleLowerCase().replace(/-/g, '')

    const shortLink1 = await makeShortLink({
      shortUrl: `Example-Page1${namePattern}`,
    })
    const shortLink2 = await makeShortLink({
      shortUrl: `Example-Page2${namePattern}`,
    })
    const shortLink3 = await makeShortLink({
      shortUrl: `Example-Page3${namePattern}`,
    })
    const shortLink4 = await makeShortLink({
      shortUrl: `Example-Page4${namePattern}`,
    })
    const shortLink5 = await makeShortLink({
      shortUrl: `Example-Page5${namePattern}`,
    })

    const sut = await exportShortLinks()

    // The constant gets the contentStream from the only parameter of the first call of the mocked function
    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCSVStream.on('error', err => {
        reject(err)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map(row => row.split(','))

    expect(isRight(sut)).toBe(true)
    if (isRight(sut)) {
      expect(unwrapEither(sut).reportUrl).toBe('http://example.com/file.csv')
    }
    expect(csvAsArray).toEqual([
      ['ID', 'Original URL', 'Short URL', 'Access Count', 'Created at'],
      [
        shortLink1.id,
        shortLink1.originalUrl,
        shortLink1.shortUrl,
        shortLink1.accessCount.toString(),
        expect.any(String),
      ],
      [
        shortLink2.id,
        shortLink2.originalUrl,
        shortLink2.shortUrl,
        shortLink2.accessCount.toString(),
        expect.any(String),
      ],
      [
        shortLink3.id,
        shortLink3.originalUrl,
        shortLink3.shortUrl,
        shortLink2.accessCount.toString(),
        expect.any(String),
      ],
      [
        shortLink4.id,
        shortLink4.originalUrl,
        shortLink4.shortUrl,
        shortLink2.accessCount.toString(),
        expect.any(String),
      ],
      [
        shortLink5.id,
        shortLink5.originalUrl,
        shortLink5.shortUrl,
        shortLink2.accessCount.toString(),
        expect.any(String),
      ],
    ])
  })
})
