export interface CreateShortLinkParams {
  originalUrl: string
  shortUrl: string
}

export interface CreateShortLinkResponse {
  shortLinkId: string
  shortUrl: string
}
