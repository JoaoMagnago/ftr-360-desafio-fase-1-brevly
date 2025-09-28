import type {
  GetShortLinkByShortUrlParams,
  GetShortLinkByShortUrlResponse,
} from '../../types/index'
import { httpClient } from '../http-client'

export async function getShortLinkByShortUrl(
  input: GetShortLinkByShortUrlParams
): Promise<GetShortLinkByShortUrlResponse> {
  const { data } = await httpClient.get<GetShortLinkByShortUrlResponse>(
    `/short-links/${input.shortUrl}`
  )
  return data
}
