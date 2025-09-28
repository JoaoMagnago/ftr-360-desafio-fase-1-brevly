export interface CreateShortLinkParams {
  originalUrl: string
  shortUrl: string
}

export interface CreateShortLinkResponse {
  shortLinkId: string
  shortUrl: string
}

export interface GetShortLinksResponse {
  shortLinks: {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: Date
  }[]
}
