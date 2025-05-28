// Explicação do Ambiente de Teste com Prisma e Vitest
// Este código configura um ambiente de testes isolado para testes E2E(end - to - end) usando Vitest e Prisma, criando um banco de dados temporário para cada execução de teste.

// Funcionamento Geral
// O código implementa um ambiente customizado do Vitest que:

// Cria um schema de banco de dados único para cada execução de testes

// Configura o Prisma para usar este schema

// Aplica todas as migrations

// Limpa tudo após os testes


// # 1. Configuração Inicial
// Carrega variáveis de ambiente
// Importa a instância do Prisma
// Importa utilitários para execução de comandos shell e geração de UUIDs

import 'dotenv/config'
import { prisma } from 'lib/prisma'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest/environments'


// # 2. Geração da URL do Banco de Dados
// Pega a DATABASE_URL base
// Adiciona um parâmetro schema com um UUID único
// Exemplo: postgres://user:pass@localhost:5432/db?schema=abc123

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL env variable')
  }
  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

// # 3. Configuração do Ambiente (setup)
// Gera um UUID único para o schema
// Cria uma URL de conexão específica
// Executa as migrations no novo schema

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    // 1 - EXECUTA NO MOMENTO DO TESTE
    // CRIA O BANCO DE TESTE
    //  FEATURE DE SCHAMA DO POSTGRESS (DO PRÓPRIO POSTGRESS)
    const schema = randomUUID()
    const databaseUrl = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl
    console.log(databaseUrl)

    execSync('npx prisma migrate deploy')


    // #  4. Limpeza (teardown)
    // Remove completamente o schema após os testes
    // Desconecta do Prism

    return {
      // 2 - EXECUTA NO DEPOIS DO TESTE DO TESTE
      // APAGA O BANCO DE TESTE
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      }
    }
  }
}

// # Benefícios desta Abordagem
// Isolamento total: Cada execução de teste usa um schema diferente
// Paralelismo seguro: Testes podem rodar em paralelo sem conflitos
// Limpeza automática: Schemas são removidos após uso
// Migrations sempre atualizadas: prisma migrate deploy garante que o banco está atualizado

// # Quando Usar
// # # Ideal para:

// Testes E2E que envolvem operações no banco de dados
// Testes que precisam de um estado limpo do banco
// Projetos que usam Prisma como ORM

// # Fluxo de Execução
// Vitest inicia o ambiente
// Cria schema único → Aplica migrations → Roda testes
// Apaga schema → Finaliza execução


