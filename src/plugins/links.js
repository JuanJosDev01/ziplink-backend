
import { createLink, createLinkForUser, getLinksByUser } from '../services/links.js'

/**
 * 
 * @param {import('fastify').FastifyInstance} fastify 
 * @param {*} opts 
 */
async function LinkRoute(fastify, opts) {
  //Config
  const dbConnection = await fastify.mysql.getConnection()
  fastify.get('/:userId', async (request, reply) => {
    const urls = await getLinksByUser(dbConnection, request.params.userId)
    return urls
  })
  fastify.post('/create', async (request, reply) => {
    const { url, userId } = request.body
    const newUrl = await createLinkForUser(dbConnection, url, request.protocol + "://" + request.headers.host, userId)
    return reply.code(201).send({ new_url: newUrl })
  })

  fastify.post('/create-temporary', async (request, reply) => {
    const { url } = request.body
    const newUrl = await createLink(dbConnection, url, request.protocol + "://" + request.headers.host)
    return reply.code(201).send({ new_url: newUrl })
  })

}
export default LinkRoute