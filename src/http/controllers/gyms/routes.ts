import { FastifyInstance } from "fastify";
import { verifyJwt } from "http/middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "domain";

export async function gymsRoutes(app: FastifyInstance) {
  // VERIFY JWT MIDDLEWARE
  // This middleware will be applied to all routes in this file
  // to ensure that the user is authenticated before accessing any gym-related routes.
  // This is done by calling the verifyJwt function, which checks the JWT token in the request.
  // If the token is valid, the request will proceed to the route handler.
  // If the token is invalid or missing, the request will be rejected with an error.
  // This is a security measure to protect the gym-related routes from unauthorized access.
  // The verifyJwt middleware is added to the Fastify instance using the addHook method.
  // This ensures that the middleware is executed for every request to the gym routes.
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms', create)
  app.get('/gyms/nearby', nearby)
  app.get('/gyms/search', search)

}
