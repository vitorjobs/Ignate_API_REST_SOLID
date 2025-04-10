import fastify from "fastify";

export const app = fastify()

app.get('/about', () => {
	return {
		Projeto: "🚀 SOLID API - Conceitos e Pratica",
		Tecnologias: "✨ Plataforma Node | Liguagem Javascript | Bibliotecas",
		Documentação: "🎯 Criada via SWAGGER"
	}
})
