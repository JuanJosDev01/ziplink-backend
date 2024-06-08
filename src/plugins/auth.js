/**
 * setup some routes
 * @param {import("fastify").FastifyInstance} fastify 
 * @param {*} opts 
 */

import { getUserByEmail, createUser, verifyUser } from "../services/auth.js";

async function AuthRoute (fastify, options) {
  const dbConnection = await fastify.mysql.getConnection();
  fastify.post('/register', async (request, reply) => {
    const { email, apellido, nombre, password } = request.body;
    const response = await verifyUser(dbConnection, email);
    if (response.length > 0) {
      return reply.code(400).send({ message: 'User already exists' });
    }
    const newUser = await createUser(dbConnection, { email, apellido, nombre, password });
    return reply.code(201).send(newUser);
  })

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;
    const response = await getUserByEmail(dbConnection, email, password);
    if (response.length === 0) {
      return reply.code(404).send({ message: 'User not found' });
    }
    return reply.code(200).send(response[0]);
  })
}

//ESM
export default AuthRoute;