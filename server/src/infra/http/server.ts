import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createShortLinkRoute } from './routes/create-short-link'
import { deleteShortLinkRoute } from './routes/delete-short-link'
import { exportShortLinksRoute } from './routes/export-short-link'
import { getShortLinksRoute } from './routes/get-short-links'
import { incrementAccessCountRoute } from './routes/increment-access-count'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifyMultipart)

server.register(createShortLinkRoute)
server.register(deleteShortLinkRoute)
server.register(getShortLinksRoute)
server.register(incrementAccessCountRoute)
server.register(exportShortLinksRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server running!')
})
