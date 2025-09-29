import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { z } from 'zod'
import { CouldNotRetrieveUrlError } from '@/app/functions/errors/could-not-retrieve-url'
import { exportShortLinks } from '@/app/functions/export-short-links'
import { isRight, unwrapEither } from '@/infra/shared/either'

export const exportShortLinksRoute: FastifyPluginAsyncZod = async server => {
  server.withTypeProvider<ZodTypeProvider>().get(
    '/short-links/exports',
    {
      schema: {
        summary:
          'Generate a CSV file with a report of all created short links, upload to remote storage and get the URL for download',
        tags: ['short-links'],
        response: {
          201: z
            .object({
              reportUrl: z.url(),
            })
            .describe('File generated and available for download'),
          502: z
            .object({
              message: z.string(),
            })
            .describe('Could not retrieve URL from storage provider'),
        },
      },
    },
    async (_request, reply) => {
      const result = await exportShortLinks()

      if (isRight(result)) {
        const { reportUrl } = unwrapEither(result)

        return reply.status(201).send({ reportUrl })
      }

      const error = unwrapEither(result)

      if (error instanceof CouldNotRetrieveUrlError) {
        return reply.status(502).send({ message: error.message })
      }
    }
  )
}
