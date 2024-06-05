// ESM
import fastifyPlugin from 'fastify-plugin'
import fastifyMysql from '@fastify/mysql'

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector (fastify, options) {
  fastify.register(fastifyMysql, {
    connectionString: process.env.DATABASE_CONNECTION_STRING,
    promise: true
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector)
