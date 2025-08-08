import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"

import { makeUpdateUserUseCase } from "use-cases/factories/make-update-user-use-case"
import { Role } from "@prisma/client"

export async function update(request: FastifyRequest, reply: FastifyReply) {
	// Schema de validação do body
	const updateUserRoleBodySchema = z.object({
		userId: z.string().uuid(),
		role: z.nativeEnum(Role) // Valida automaticamente contra o enum Role do Prisma
	});

	// Extrai dados do corpo da requisição e valida os campos usando um schema Zod pré-definido)
	const { userId, role } = updateUserRoleBodySchema.parse(request.body)


	try {

		const registerUseCase = makeUpdateUserUseCase()
		await registerUseCase.update({
			userId,
			role
		})
	} catch (error) {
		if (error instanceof z.ZodError) {
			return reply.status(400).send({
				message: "Invalid request data",
				errors: error.errors,
			});
		}
		throw error; // Re-throw other errors

	}

	return reply.status(201).send()
}
