import authRoute from './plugins/auth.js'
import linksRoute from './plugins/links.js'
import dbConnection from './plugins/dbConnection.js'
/**
 * setup some routes
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {*} opts 
 */
export default async function (fastify, opts) {
  //Config
  fastify.register(dbConnection)

  //Routes
  fastify.register(authRoute, { prefix: '/api/auth' })
  fastify.register(linksRoute, { prefix: '/api/links' })
  
  fastify.get('/api', async (request, reply) => {
    return { hello: 'world!' }
  })
}
