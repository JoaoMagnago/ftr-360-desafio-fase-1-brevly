import type { FastifyInstance } from 'fastify'
import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import z from 'zod'
import { createShortLink } from '@/app/functions/create-short-link'
import { InvalidShortUrlFormatError } from '@/app/functions/errors/invalid-short-url-format'
import { ShortLinkAlreadyExistsError } from '@/app/functions/errors/short-link-already-exists'
import { isRight, unwrapEither } from '@/infra/shared/either'

export const createShortLinkRoute: FastifyPluginAsyncZod = async (
  server: FastifyInstance
) => {
  server.withTypeProvider<ZodTypeProvider>().post(
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
          422: z
            .object({ message: z.string() })
            .describe('Invalid short URL format.'),
        },
      },
    },
    async (request, reply) => {
      const originalUrl = request.body?.originalUrl
      const shortUrl = request.body?.shortUrl

      const result = await createShortLink({
        originalUrl,
        shortUrl,
      })

      if (isRight(result)) {
        return reply.status(201).send({
          shortLinkId: result.right.shortLinkId,
        })
      }

      const error = unwrapEither(result)

      if (error instanceof ShortLinkAlreadyExistsError) {
        return reply.status(409).send({ message: error.message })
      } else if (error instanceof InvalidShortUrlFormatError) {
        return reply.status(422).send({ message: error.message })
      }
    }
  )
}
