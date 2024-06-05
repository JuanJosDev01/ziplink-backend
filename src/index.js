/**
 * setup some routes
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {*} opts 
 */
export default async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world!' }
  })
}
