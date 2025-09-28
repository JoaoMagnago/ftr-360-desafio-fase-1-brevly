import type {
  CreateShortLinkParams,
  CreateShortLinkResponse,
} from '../../types/index'
import { httpClient } from '../http-client'

export async function createShortLink(
  input: CreateShortLinkParams
): Promise<CreateShortLinkResponse> {
  const response = await httpClient.post<CreateShortLinkResponse>(
    '/short-links',
    input
  )
  return response.data
}
