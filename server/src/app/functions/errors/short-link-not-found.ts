export class ShortLinkNotFoundError extends Error {
  constructor(query: string | undefined) {
    super(
      query
        ? `No short link found matching "${query}".`
        : 'No short link found.'
    )
    this.name = 'ShortLinkNotFoundError'
  }
}
