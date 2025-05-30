import { FastifyInstance } from "fastify";
import { register } from "./register";
import { profile } from "./profile";
// import { healthcheck } from "./healthcheck/health";
import { authenticate } from "./authenticate";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.post('/users', register)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
  app.patch('/token/refresh', refresh)

}
