export interface CreateShortLinkParams {
  originalUrl: string
  shortUrl: string
}

export interface CreateShortLinkResponse {
  shortLinkId: string
  shortUrl: string
}

export interface ShortLink {
  id: string
  originalUrl: string
  shortUrl: string
  accessCount: number
  createdAt: Date
}

export interface GetShortLinksResponse {
  shortLinks: ShortLink[]
}

export interface GetShortLinkByShortUrlParams {
  shortUrl: string
}

export interface GetShortLinkByShortUrlResponse {
  id: string
  originalUrl: string
}

export interface IncrementAccessCountParams {
  shortLinkId: string
}

export interface IncrementAccessCountResponse {
  updatedAccessCount: number
}

export interface DeleteShortLinkParams {
  shortLinkId: string
}

export interface DeleteShortLinkResponse {
  shortLinkId: string
  shortUrl: string
}
