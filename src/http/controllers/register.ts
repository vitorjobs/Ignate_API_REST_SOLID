import { prisma } from "lib/prisma"
import { z } from "zod"
import {FastifyRequest, FastifyReply} from "fastify"
import { hash } from "bcryptjs"

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name:  			z.string(),
		email: 			z.string().email(),
		password: 	z.string().min(6)
	})

	// Extrai dados do corpo da requisição e valida os campos usando um schema Zod pré-definido)
	const {name, email, password} = registerBodySchema.parse(request.body)

  const password_hash = await hash(password, 6)


	try {
		await prisma.user.create({
			data:{
				name,
				email,
				password_hash
			}
		})
		return reply.status(201).send()
	} catch (error) {
		return error
	}

}
