import authRoute from './plugins/auth.js'
import linksRoute from './plugins/links.js'
import dbConnection from './plugins/dbConnection.js'
import fastifyCors from '@fastify/cors'
import { redirectLink, redirectTemporaryLink } from './services/links.js'
/**
 * setup some routes
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {*} opts 
 */
export default async function (fastify, opts) {
  //Config
  fastify.register(dbConnection)
  await fastify.register(fastifyCors, { 
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })

  //Routes
  fastify.register(authRoute, { prefix: '/api/auth' })
  fastify.register(linksRoute, { prefix: '/api/links' })
  
  fastify.get('/api', async (request, reply) => {
    return { hello: 'world!' }
  })
  fastify.get('/:hash', async (request, reply) => {
    const dbConnection = await fastify.mysql.getConnection()
    const url_data = await redirectLink(dbConnection, request.protocol + "://" + request.headers.host + request.url)
    if (!url_data) return reply.code(404).send({ message: 'Not Found or Expired' })
    return reply.code(302).redirect(url_data.url_original)
  })
  fastify.get('/t/:hash', async (request, reply) => {
    const dbConnection = await fastify.mysql.getConnection()
    const url_data = await redirectTemporaryLink(dbConnection, request.protocol + "://" + request.headers.host + request.url)
    if (!url_data) return reply.code(404).send({ message: 'Not Found or Expired' })
    return reply.code(302).redirect(url_data.url_original)
  })

}
