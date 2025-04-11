import fastify from "fastify";
import {z} from 'zod';
import { prisma } from "lib/prisma";
export const app = fastify()

app.get('/about', () => {
	return {
		Projeto: "🚀 SOLID API - Conceitos e Pratica",
		Tecnologias: "✨ Plataforma Node | Liguagem Javascript | Bibliotecas",
		Documentação: "🎯 Criada via SWAGGER"
	}
})


// ROTA USER
// * Validação com a biblioteca ZOD para checar os tipos e valores dos dados.

app.post('/users', async (request, reply) => {
	const registerBodySchema = z.object({
		name:  			z.string(),
		email: 			z.string().email(),
		password: 	z.string().min(6)
	})

	// Extrai dados do corpo da requisição e valida os campos usando um schema Zod pré-definido)
	const {name, email, password} = registerBodySchema.parse(request.body)

	try {
		await prisma.user.create({
			data:{
				name,
				email,
				password_hash: password
			}
		})
		return reply.status(201).send()
	} catch (error) {
		return error
	}

})
