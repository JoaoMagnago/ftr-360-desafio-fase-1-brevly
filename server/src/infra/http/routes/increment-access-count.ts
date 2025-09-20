import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getShortLinkById } from '@/app/functions/get-short-link-by-id'
import { incrementAccessCount } from '@/app/functions/increment-access-count'
import { isLeft } from '@/infra/shared/either'

export const incrementAccessCountRoute: FastifyPluginAsyncZod =
  async server => {
    server.put(
      '/short-links/access-count',
      {
        schema: {
          summary: 'Increment the access count of a short link',
          tags: ['short-links'],
          querystring: z.object({
            searchQuery: z.string().optional(),
          }),
          response: {
            200: z.object({ updatedAccessCount: z.coerce.number() }),
            404: z
              .object({ message: z.string() })
              .describe('Short link not found'),
          },
        },
      },
      async (request, reply) => {
        const { searchQuery } = request.query
        const shortLink = await getShortLinkById({ searchQuery })

        if (isLeft(shortLink)) {
          return reply.status(404).send({ message: shortLink.left.message })
        }

        const accessCount = shortLink.right.shortLink.accessCount ?? 0

        const updatedAccessCount = await incrementAccessCount({
          searchQuery: shortLink.right.shortLink.id,
          accessCount,
        })

        return reply
          .status(200)
          .send({
            updatedAccessCount: updatedAccessCount.right?.updatedAccessCount,
          })
      }
    )
  }
