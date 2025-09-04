import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const createShortLinkRoute: FastifyPluginAsyncZod = async (
  server: FastifyInstance
) => {
  server.post('/short-links', () => {
    return 'Hello world'
  })
}
