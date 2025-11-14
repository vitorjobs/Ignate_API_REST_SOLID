import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { makeUserDeleteUseCase } from "use-cases/factories/make-delete-user-use-case";

export async function deleted(request: FastifyRequest, reply: FastifyReply) {
	// Schema de validação do body
	const deletedUserParamchema = z.object({
		userId: z.string().uuid(),
	});

	// Extrai dados do corpo da requisição e valida os campos usando um schema Zod pré-definido)
	const { userId } = deletedUserParamchema.parse(request.params)


	const deletedUseCase = makeUserDeleteUseCase()
	await deletedUseCase.delete({
		userId
	})

	return reply.status(200).send()
}
