import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetAllUserUserUseCase } from "use-cases/factories/make-get-all-user-use-case";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {

	const getAllUsersUseCase = makeGetAllUserUserUseCase()
	const { allUsers: users } = await getAllUsersUseCase.getAll()

	return reply.status(200).send({
		users: {
			...users,
			password_hash: undefined,
		},
	})

}
