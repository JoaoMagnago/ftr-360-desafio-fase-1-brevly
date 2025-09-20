import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getAllShortLinks } from '@/app/functions/get-all-short-links'

export const getShortLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/short-links',
    {
      schema: {
        summary: 'Get all short links',
        tags: ['short-links'],
        response: {
          200: z.object({
            shortLinks: z.array(
              z.object({
                id: z.string(),
                originalUrl: z.url(),
                shortUrl: z.string(),
                accessCount: z.coerce.number(),
                createdAt: z.date(),
              })
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const shortLinks = await getAllShortLinks()

      return reply
        .status(200)
        .send({ shortLinks: shortLinks.right?.shortLinks ?? [] })
    }
  )
}
