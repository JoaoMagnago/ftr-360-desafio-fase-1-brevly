import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getShortLink } from '@/app/functions/get-short-link'
import { incrementAccessCount } from '@/app/functions/increment-access-count'
import { isLeft, unwrapEither } from '@/infra/shared/either'

export const getShortLinkByShortUrlRoute: FastifyPluginAsyncZod =
  async server => {
    server.get(
      '/short-links/:shortUrl',
      {
        schema: {
          summary: 'Get short link by short url and increment its access count',
          tags: ['short-links'],
          params: z.object({
            shortUrl: z.string(),
          }),
          response: {
            200: z.object({
              id: z.string(),
              originalUrl: z.url(),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const searchQuery = request.params.shortUrl
        const shortLink = await getShortLink({ searchQuery })

        if (isLeft(shortLink)) {
          return reply
            .status(404)
            .send({ message: unwrapEither(shortLink).message })
        }

        const accessCount = shortLink.right.shortLink.accessCount ?? 0

        await incrementAccessCount({
          searchQuery: shortLink.right.shortLink.shortUrl,
          accessCount,
        })

        const { id, originalUrl } = unwrapEither(shortLink).shortLink

        return reply.status(200).send({ id, originalUrl })
      }
    )
  }
