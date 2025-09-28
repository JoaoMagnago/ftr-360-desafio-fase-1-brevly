import type {
  DeleteShortLinkParams,
  DeleteShortLinkResponse,
} from '../../types/index'
import { httpClient } from '../http-client'

export async function deleteShortLink(
  input: DeleteShortLinkParams
): Promise<DeleteShortLinkResponse> {
  const { data } = await httpClient.delete<DeleteShortLinkResponse>(
    `/short-links/${input.shortLinkId}`
  )
  return data
}
