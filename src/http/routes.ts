import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { profile } from "./controllers/profile";
// import { healthcheck } from "./healthcheck/health";
import { authenticate } from "./controllers/authenticate";
import { verifyJwt } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {

  // app.get('/health', healthcheck)
  app.get("/timestamp", (req, res) => res.send(Date.now().toString()));

  app.post('/sessions', authenticate)
  app.post('/users', register)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
