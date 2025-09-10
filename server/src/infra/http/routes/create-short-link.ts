import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export const createShortLinkRoute: FastifyPluginAsyncZod = async (
  server: FastifyInstance
) => {
  server.post(
    '/short-links',
    {
      schema: {
        summary: 'Create a short link',
        body: z.object({
          originalUrl: z.url(),
          shortUrl: z.string().max(30),
        }),
        response: {
          201: z.object({ shortLinkId: z.string() }),
          409: z
            .object({ message: z.string() })
            .describe('Short URL already exists.'),
        },
      },
    },
    async (_, reply) => {
      await db.insert(schema.shortLinks).values({
        originalUrl: 'https://www.google.com',
        shortUrl: 'google',
      })

      return reply.status(201).send({ shortLinkId: 'google' })
    }
  )
}
