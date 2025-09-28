import type { GetShortLinksResponse } from '../../types/index'
import { httpClient } from '../http-client'

export async function getShortLinks(): Promise<GetShortLinksResponse> {
  const { data } = await httpClient.get<GetShortLinksResponse>('/short-links')
  return data
}
