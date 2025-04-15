import { env } from "env";
import fastify from "fastify";
import { appRoutes } from "http/routes";
import { ZodError } from "zod";
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

app.register(appRoutes)

// FUNÇÃO GLOBAL PARA TARTAR ERROS NA APLICAÇÃO

app.setErrorHandler((error, _request, reply) => {
	if(error instanceof ZodError){
		return reply
			.status(400)
			.send({message: "Validation error.", issues: error.format() })
	}
	
	if(env.NODE_ENV != "productions") {
		console.log(error)
	} else {
		// TODO FAZER LOGO COM FERRAMENTA DE LOG
	}
	return reply.status(500).send({})
})	
