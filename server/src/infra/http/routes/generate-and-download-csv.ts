import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { z } from 'zod'
import { uploadCSV } from '@/app/functions/upload-csv'
import { isRight, unwrapEither } from '@/infra/shared/either'

export const generateAndDownloadCSVRoute: FastifyPluginAsyncZod =
  async server => {
    server.withTypeProvider<ZodTypeProvider>().put(
      '/short-links/csv',
      {
        schema: {
          summary:
            'Generate a CSV file, upload to remote storage and get the URL for download',
          tags: ['uploads'],
          consumes: ['multipart/form-data'],
          response: {
            201: z
              .object({
                remoteUrl: z.url(),
              })
              .describe('File generated and available for download'),
            400: z.object({ message: z.string() }).describe('Bad request'),
            502: z.object({ message: z.string() }).describe('Bad gateway'),
          },
        },
      },
      async (request, reply) => {
        const uploadedFile = await request.file({
          limits: {
            fieldSize: 1024 * 1024 * 2, // 2mb
          },
        })

        if (!uploadedFile) {
          return reply.status(400).send({ message: 'File is required.' })
        }

        const result = await uploadCSV({
          fileName: uploadedFile.filename,
          contentType: uploadedFile.mimetype,
          contentStream: uploadedFile.file,
        })

        if (uploadedFile.file.truncated) {
          return reply.status(400).send({ message: 'File size limit reached.' })
        }

        if (isRight(result)) {
          console.log(unwrapEither(result))
          return reply.status(201).send()
        }

        const error = unwrapEither(result)

        switch (error.constructor.name) {
          case 'InvalidFileFormat':
            return reply.status(400).send({ message: error.message })
          case 'CouldNotRetrieveUrlError':
            return reply.status(502).send({ message: error.message })
        }
      }
    )
  }
