import fastifyJwt from "@fastify/jwt";
import { env } from "env";
import fastify from "fastify";
import { checkInsRoutes } from "http/controllers/check-ins/routes";
import { gymsRoutes } from "http/controllers/gyms/routes";
import { usersRoutes } from "http/controllers/users/routes";
import { appRoutes } from "http/routes";
import { ZodError } from "zod";

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET
})

app.get('/about', () => {
	return {
		Projeto: "🚀 SOLID API - Conceitos e Pratica",
		Tecnologias: "✨ Plataforma Node | Liguagem Javascript | Bibliotecas",
		Documentação: "🎯 Criada via SWAGGER"
	}
})


// ROTA USER
// * Validação com a biblioteca ZOD para checar os tipos e valores dos dados.

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.register(appRoutes)
// FUNÇÃO GLOBAL PARA TARTAR ERROS NA APLICAÇÃO

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: "Validation error.", issues: error.format() })
	}

	if (env.NODE_ENV != "productions") {
		console.log(error)
	} else {
		// TODO FAZER LOGO COM FERRAMENTA DE LOG
	}
	return reply.status(500).send({})
})	
