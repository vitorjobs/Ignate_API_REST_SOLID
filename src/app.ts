import fastify from "fastify";
import { appRoutes } from "http/routes";
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
