import { FastifyInstance } from "fastify";
import { healthcheck } from "./healthcheck/health";

export async function appRoutes(app: FastifyInstance) {
  app.get('/health', healthcheck)
  app.get("/timestamp", (req, res) => res.send(Date.now().toString()));

}
