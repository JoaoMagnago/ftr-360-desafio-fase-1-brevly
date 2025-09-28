import type {
  CreateShortLinkParams,
  CreateShortLinkResponse,
} from '../../types/index'
import { httpClient } from '../http-client'

export async function createShortLink(
  data: CreateShortLinkParams
): Promise<CreateShortLinkResponse> {
  const response = await httpClient.post<CreateShortLinkResponse>(
    '/short-links',
    data
  )
  return response.data
}
