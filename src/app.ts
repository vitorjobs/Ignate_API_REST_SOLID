import fastifyJwt from "@fastify/jwt";
import { env } from "env";
import fastify from "fastify";
import { checkInsRoutes } from "http/controllers/check-ins/routes";
import { gymsRoutes } from "http/controllers/gyms/routes";
import { usersRoutes } from "http/controllers/users/routes";
import { appRoutes } from "http/routes";
import { ZodError } from "zod";
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
	/**
	 * * @description	
	 * * Configuração do JWT para autenticação
	 * * e autorização na aplicação.
	 * * O segredo é armazenado em uma variável de ambiente
	 * * para maior segurança.
	 * * O cookie é configurado para armazenar o token de atualização		
	 * * * e tem uma duração de 10 minutos.
	 * * * @param {string} env.JWT_SECRET - O segredo usado para assinar o token JWT.
	 * * * @param {object} cookie - Configurações do cookie.
	 * * * @param {string} cookie.cookieName - Nome do cookie que armazenará o token de atualização.
	 * * * @param {boolean} cookie.signed - Indica se o cookie deve ser assinado.
	 * * * @param {object} sign - Configurações de assinatura do token JWT.
	 * * * @param {string} sign.expiresIn - Tempo de expiração do token JWT.
	 * *
	 * * @returns {object} - Retorna a configuração do JWT.
	 * * @throws {Error} - Lança um erro se o segredo do JWT não estiver definido.
	 */
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: {
		expiresIn: '10m',
	},
})

app.get('/about', () => {
	return {
		Projeto: "🚀 SOLID API - Conceitos e Pratica",
		Tecnologias: "✨ Plataforma Node | Liguagem Javascript | Bibliotecas",
		Documentação: "🎯 Criada via SWAGGER",
		Dependencies: {
			fastify: '4.0.0',
			prisma: '3.0.0',
			bcryptjs: '2.4.3',
			env: env.NODE_ENV || 'development',
			supertest: '6.1.6',
			vitest: '0.0.1',
		},
	}
})


// ROTA USER
// * Validação com a biblioteca ZOD para checar os tipos e valores dos dados.

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.register(appRoutes)
app.register(fastifyCookie)
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
