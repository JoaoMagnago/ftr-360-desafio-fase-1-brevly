import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getShortLink } from '@/app/functions/get-short-link'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const incrementAccessCountInput = z.object({
  searchQuery: z.string(),
})

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
          },
        },
      },
      async (request, reply) => {
        const shortLink = await getShortLink({
          searchQuery: request.query?.searchQuery,
        })

        const accessCount = shortLink.right?.shortLink.accessCount ?? 0

        const { searchQuery } = incrementAccessCountInput.parse(request.query)

        const result = await db
          .update(schema.shortLinks)
          .set({
            accessCount: accessCount + 1,
          })
          .where(eq(schema.shortLinks.id, searchQuery))
          .returning({ updatedAccessCount: schema.shortLinks.accessCount })

        const updatedAccessCount = result[0]?.updatedAccessCount ?? 0

        return reply.status(200).send({ updatedAccessCount })
      }
    )
  }
