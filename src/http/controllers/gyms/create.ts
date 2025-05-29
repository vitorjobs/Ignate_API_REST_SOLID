import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { makeCreateGymUseCase } from "use-cases/factories/make-create-gym-use-case"

export async function create(request: FastifyRequest, reply: FastifyReply) {

	const createBodySchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
		latitude: z.number().refine((value) => {
			return value >= -90 && value <= 90
		}),
		longitude: z.number().refine((value) => {
			return value >= -180 && value <= 180
		}),
	})

	// Extrai dados do corpo da requisição e valida os campos usando um schema Zod pré-definido)
	const {
		description, phone, title, longitude, latitude
	} = createBodySchema.parse(request.body)

	const registerUseCase = makeCreateGymUseCase()
	await registerUseCase.execute({
		description, phone, title, longitude, latitude
	})

	return reply.status(201).send()
}
