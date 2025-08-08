import { FastifyInstance } from "fastify";
import { register } from "./register";
import { profile } from "./profile";
// import { healthcheck } from "./healthcheck/health";
import { authenticate } from "./authenticate";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";
// import { update } from "./update";
// import { verifyUserRole } from "http/middlewares/verify-user-role";
// import { deleted } from "./delete";
import { getAll } from "./get-all";
import { update } from "./update";
// import { listAdminUsers } from "./get-admin-users";


export async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.post('/users', register)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
  app.patch('/users/role', update)
  app.patch('/token/refresh', refresh)
  // app.patch('/users/role',
  //   { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
  //   update,
  // )
  // app.delete('/users/:userId',
  //   { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
  //   deleted,
  // )
  app.get('/users', { onRequest: [verifyJwt] }, getAll)
  // app.get('/users/admin', { onRequest: [verifyJwt, verifyUserRole('ADMIN')] }, listAdminUsers)
}
