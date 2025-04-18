import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { UserAlreadyExistsError } from "use-cases/errors/user-already-exists"
import { makeRegisterUseCase } from "use-cases/factories/make-register-use-case"

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	})

	// Extrai dados do corpo da requisição e valida os campos usando um schema Zod pré-definido)
	const { name, email, password } = registerBodySchema.parse(request.body)

	try {
		const registerUseCase = makeRegisterUseCase()
		await registerUseCase.execute({
			name,
			email,
			password
		})
	} catch (err) {
		if (err instanceof UserAlreadyExistsError) {
			return reply.status(409).send(err)
		}
		throw err
	}
	return reply.status(201).send()
}
