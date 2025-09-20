import type { FastifyInstance } from 'fastify'
import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import z from 'zod'
import { deleteShortLink } from '@/app/functions/delete-short-link'
import { ShortLinkNotFoundError } from '@/app/functions/errors/short-link-not-found'
import { isRight, unwrapEither } from '@/infra/shared/either'

export const deleteShortLinkRoute: FastifyPluginAsyncZod = async (
  server: FastifyInstance
) => {
  server.withTypeProvider<ZodTypeProvider>().delete(
    '/short-links/:id',
    {
      schema: {
        summary: 'Delete a short link',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z
            .object({ message: z.string() })
            .describe('Short link deleted.'),
          404: z
            .object({ message: z.string() })
            .describe('Short URL not found.'),
        },
      },
    },
    async (request, reply) => {
      const searchQuery = request.params.id

      const result = await deleteShortLink({ shortLinkId: searchQuery })

      if (isRight(result)) {
        return reply.status(200).send({
          message: result.right.message,
        })
      }

      const error = unwrapEither(result)

      if (error instanceof ShortLinkNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }
    }
  )
}
