import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { makeSearchGymsUseCase } from "use-cases/factories/make-search-gyms-use-case"

export async function search(request: FastifyRequest, reply: FastifyReply) {

	const searchGymsQuerySchema = z.object({
		query: z.string(),
		page: z.coerce.number().min(1).default(1),
	})

	// Extrai dados do corpo da requisição e valida os campos usando um schema Zod pré-definido)
	const {
		query, page
	} = searchGymsQuerySchema.parse(request.query)

	const registerUseCase = makeSearchGymsUseCase()

	const { gyms } = await registerUseCase.execute({
		query, page
	})

	return reply.status(200).send({
		gyms
	})
}
