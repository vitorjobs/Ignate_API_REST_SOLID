<h1 align="center">
  🚀 RocketAPI • REST API com SOLID + Fastify
</h1>

<p align="center">
  Aplicação de estudos da <strong>Rocketseat</strong> utilizando <code>Node.js</code>, <code>Fastify</code> e os princípios do <strong>SOLID</strong>. 💡
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-v23.0.0-brightgreen" alt="Node version" />
  <img src="https://img.shields.io/badge/Fastify-%5E5.2.2-blue" alt="Fastify version" />
  <img src="https://img.shields.io/badge/TypeScript-%5E5.8.3-blueviolet" alt="TS version" />
</p>

---

## 📚 Sobre o Projeto

Este projeto é uma **API RESTful** construída com **Fastify** e estruturada com base nos princípios do **SOLID**, que favorecem um código mais limpo, desacoplado e escalável. É um ambiente de estudos com foco em entender boas práticas e explorar ferramentas modernas do ecossistema Node.js.

---

## 🧠 Princípios SOLID aplicados

Os princípios do SOLID são pilares fundamentais para garantir que o código seja **escalável**, **manutenível** e **de fácil leitura**. Eles foram implementados ao longo da arquitetura desta API.

| Letra | Princípio                         | Descrição                                                                 |
|-------|-----------------------------------|---------------------------------------------------------------------------|
| **S** | Single Responsibility Principle   | Cada classe deve ter uma única responsabilidade.                         |
| **O** | Open/Closed Principle             | O código deve estar aberto para extensão, mas fechado para modificação. |
| **L** | Liskov Substitution Principle     | Subtipos devem poder substituir seus tipos base sem quebrar o sistema.  |
| **I** | Interface Segregation Principle   | Muitas interfaces específicas são melhores que uma geral.               |
| **D** | Dependency Inversion Principle    | Dependa de abstrações, não de implementações concretas.                |

---

## 📌 Lista de Tarefas (To-Do)

Aqui estão os próximos passos planejados para o projeto:

- [ ] 🧪 **Criar testes unitários** — Garantir a estabilidade das funcionalidades com testes automatizados.
- [ ] 🔐 **Implementar autenticação** — Adicionar fluxo de login, JWT e controle de acesso.
- [ ] 📄 **Documentar rotas com Swagger** — Disponibilizar documentação da API para facilitar testes e integração.
- [ ] ☁️ **Deploy em ambiente de produção** — Subir a aplicação em uma infraestrutura estável (como Render, Vercel, EC2, etc).

---


---
## 🛠️ Stack Tecnológica

### Dependências Principais
- ⚡ **[Fastify](https://www.fastify.io/)** ^5.2.2 - Framework web rápido e leve
- 🛠️ **[Zod](https://zod.dev/)** 3.24.2 - Validação de dados com TypeScript-first schema validation
- ⚙️ **[Dotenv](https://github.com/motdotla/dotenv)** 16.4.7 - Gerenciamento de variáveis de ambiente
- 🗄️ **[Prisma Client](https://www.prisma.io/)** 6.6.0 - ORM typesafe para banco de dados
- 🔐 **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** 2.4.3 - Hash seguro de senhas

### Dev Dependencies
- 🔁 **[TSX](https://github.com/esbuild-kit/tsx)** 4.19.3 - Execução direta de TypeScript
- 📦 **[Tsup](https://tsup.egoist.dev/)** 8.4.0 - Bundler rápido baseado no esbuild
- 🧹 **[ESLint](https://eslint.org/)** 9.24.0 - Linter para padronização de código
- 🎨 **[@rocketseat/eslint-config](https://github.com/Rocketseat/eslint-config-rocketseat)** 2.2.2 - Configuração de ESLint
- 📝 **[TypeScript](https://www.typescriptlang.org/)** 5.8.3 - Superset JavaScript com tipagem
- 🏷️ **[@types/node](https://www.npmjs.com/package/@types/node)** 22.14.0 - Tipos para Node.js
- 🛠️ **[Prisma](https://www.prisma.io/)** 6.6.0 - Ferramenta CLI para migrações e geração do client

<!-- 
## 🛠️ Tecnologias & Ferramentas

- ⚡ **[Fastify](https://www.fastify.io/)** — Framework web rápido e leve para Node.js.
- 🧠 **[SOLID](https://en.wikipedia.org/wiki/SOLID)** — Conjunto de princípios para arquitetura de software orientado a objetos.
- 🛠️ **[TypeScript](https://www.typescriptlang.org/)** — Superset do JavaScript que adiciona tipagem estática.
- 🔁 **[TSX](https://github.com/esbuild-kit/tsx)** — Executa arquivos TypeScript direto, sem necessidade de transpilar.
- 📦 **[Tsup](https://tsup.egoist.dev/)** — Empacotador rápido baseado no esbuild, usado para build da aplicação. -->

---


---

## 🔃 Scripts disponíveis

| Comando             | Descrição                                                                 |
|---------------------|---------------------------------------------------------------------------|
| `npm run start:dev` | Inicia em modo dev com hot-reload usando `tsx watch src/server.ts`       |
| `npm run build`     | Compila o projeto para a pasta `build/` usando `tsup src --out-dir build`|
| `npm run start`     | Executa a versão compilada em produção (`node build/server.js`)           |

---

## 📂 Estrutura do Projeto

```text
PROJETO/
│
├── 📁 build/                  # Builds compilados para produção
├── 📁 node_modules/           # Dependências instaladas
├── 📁 prisma/                 
│   └── 📄 schema.prisma       # Modelos de dados e configuração do DB
├── 📁 src/                    # Código fonte principal
├── 📁 env/                    # Configurações de ambiente
│
├── 📄 app.ts                  # Configuração principal do app
├── 📄 server.ts               # Ponto de entrada do servidor
│
├── 📄 .editorconfig           # Padronização entre editores
├── 📄 .env                    # Variáveis locais (não versionado)
├── 📄 .env.example            # Template de variáveis de ambiente
│
├── 📄 .eslintignore           # Exceções do ESLint
├── 📄 .eslintrc.json          # Regras de linting
├── 📄 eslint.config.mjs       # Config ESLint (ES Modules)
│
├── 📄 .gitignore              # Arquivos ignorados pelo Git
├── 📄 .npmrc                  # Configurações do NPM
├── 📁 .comandos/              # Scripts e comandos úteis
│
├── 📄 package.json            # Configuração do projeto
├── 📄 package-lock.json       # Lock de dependências
├── 📄 tsconfig.json           # Configuração TypeScript
└── 📄 README.md               # Documentação principal

---
```
## 🚀 Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto

2. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   
3. Instale as dependências:
   ```bash
   npm install

4. Inicie o servidor em modo dev:
    ```bash
   npm run start:dev

5. Para produção:
   ```bash
   npm run build
   npm run start
   
6. Acesse via brouser ou Postman: 
   ```bash
   http://localhost:3333



