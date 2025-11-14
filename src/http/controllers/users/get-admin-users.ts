
import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetAdminUserUseCase } from "use-cases/factories/make-get-admin-user-use-case";

export async function listAdminUsers(request: FastifyRequest, reply: FastifyReply) {

	const listAdminUsersUseCase = makeGetAdminUserUseCase();
	const adminUsers = await listAdminUsersUseCase.handle();

	return reply.status(200).send({
		admins: adminUsers
	});


}
