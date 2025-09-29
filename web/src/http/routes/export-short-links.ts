import type { ExportShortLinksResponse } from '../../types/index'
import { httpClient } from '../http-client'

export async function exportShortLinks(): Promise<ExportShortLinksResponse> {
  const { data } =
    await httpClient.get<ExportShortLinksResponse>(`/short-links/exports`)
  return data
}
