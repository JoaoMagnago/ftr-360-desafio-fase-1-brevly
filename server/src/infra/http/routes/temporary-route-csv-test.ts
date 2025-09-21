import type { FastifyPluginAsync } from 'fastify'
import { streamShortLinksCsv } from '@/app/functions/export-short-link-to-csv-shema'

export const shortLinksCsvRoute: FastifyPluginAsync = async server => {
  server.get('/short-links/csv', async (_, reply) => {
    // 1. Set headers for CSV download
    reply.header('Content-Type', 'text/csv')
    reply.header(
      'Content-Disposition',
      'attachment; filename="short-links.csv"'
    )

    // 2. Pass reply.raw (the writable stream) to the CSV function
    await streamShortLinksCsv(reply.raw)
  })
}
