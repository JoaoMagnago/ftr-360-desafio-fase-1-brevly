export class InvalidShortUrlFormat extends Error {
  constructor(shortUrl: string) {
    super(
      `Short link '${shortUrl}' has an invalid format. Only lowercase letters are allowed.`
    )
    this.name = 'InvalidShortUrlFormat'
  }
}
