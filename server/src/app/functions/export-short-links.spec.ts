import { randomUUID } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import { isRight, unwrapEither } from '@/infra/shared/either'
// Get entire upload file to storage function as an object
import * as upload from '@/infra/storage/upload-file-to-storage'
import { makeShortLink } from '@/test/factories/make-short-link'
import { exportShortLinks } from './export-short-links'

describe('export short links', () => {
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

    const upload1 = await makeShortLink({
      shortUrl: `Example-Page1${namePattern}`,
    })
    const upload2 = await makeShortLink({
      shortUrl: `Example-Page2${namePattern}`,
    })
    const upload3 = await makeShortLink({
      shortUrl: `Example-Page3${namePattern}`,
    })
    const upload4 = await makeShortLink({
      shortUrl: `Example-Page4${namePattern}`,
    })
    const upload5 = await makeShortLink({
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
      ['ID', 'Short URL', 'Original URL', 'Access Count', 'Created at'],
      [
        upload1.id,
        upload1.shortUrl,
        upload1.originalUrl,
        expect.any(Number),
        expect.any(String),
      ],
      [
        upload2.id,
        upload2.shortUrl,
        upload2.originalUrl,
        expect.any(Number),
        expect.any(String),
      ],
      [
        upload3.id,
        upload3.shortUrl,
        upload3.originalUrl,
        expect.any(Number),
        expect.any(String),
      ],
      [
        upload4.id,
        upload4.shortUrl,
        upload4.originalUrl,
        expect.any(Number),
        expect.any(String),
      ],
      [
        upload5.id,
        upload5.shortUrl,
        upload5.originalUrl,
        expect.any(Number),
        expect.any(String),
      ],
    ])
  })
})
