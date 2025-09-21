export class ShortLinkAlreadyExistsError extends Error {
  constructor(shortUrl: string) {
    super(`Short link '${shortUrl}' already exists.`)
    this.name = 'ShortLinkAlreadyExists'
  }
}
