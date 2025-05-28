// # Explicação da Configuração do Vitest
// Este código configura o Vitest (framework de testes para JavaScript/TypeScript) para um projeto com testes unitários e E2E (end-to-end). 


// defineConfig: Função do Vitest para definir configurações
// tsconfigPaths: Plugin que resolve caminhos de importação definidos no tsconfig.json
// plugins: [tsconfigPaths()]: Habilita o uso de aliases de importação

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',

    // # Configuração dos Testes (test)
    // Divide os testes em dois grupos (workspaces):

    // ## Testes Unitários:

    // Nome: 'unit'    
    // Localização: src/use-cases    
    // Herda configurações padrão (extends: true)    

    // ## Testes E2E:    
    // Nome: 'e2e'    
    // Localização: src/http/controllers    
    // Ambiente customizado: Usa o ambiente Prisma que vimos anteriormente

    workspace: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/use-cases'
        }
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment: './prisma/vitest-environment-prisma/prisma-test-environment.ts',
        }
      }

    ],

    // # Configurações Globais
    // environment: 'node': Roda testes em ambiente Node.js(não no navegador)
    // globals: true: Habilita variáveis globais do Vitest(describe, test, expect, etc.)
    // include: Padrão de arquivos que serão considerados testes
    // exclude: Pastas ignoradas nos testes

    // Forçar Vitest a usar CommonJS
    environment: 'node',
    globals: true,
    // Especificar extensões de arquivo
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/build/**', '**/node_modules/**'],
  },
})


// # Funcionalidades Específicas
// ## Resolução de Caminhos:
//   O plugin tsconfigPaths permite usar aliases como @/modules em vez de caminhos relativos

// ## Separação de Testes:
//   Testes unitários e E2E rodam em configurações diferentes
//   Testes E2E usam ambiente com banco de dados isolado

// ## Extensibilidade:
//   extends: true permite que cada workspace herde as configurações globais

// # Fluxo de Execução
//   Vitest identifica os arquivos de teste pelo padrão include
//   Separa em workspaces baseado nas pastas configuradas
//   Para testes E2E:
//     Usa o ambiente customizado com Prisma
//     Cria schemas temporários no banco de dados
  
//   Para testes unitários:
//   Usa configuração padrão do Node.js


//   Esta configuração é ideal para projetos que:
//     Usam Prisma como ORM
//     Precisam separar testes unitários e E2E
//     Utilizam aliases de importação complexos
//     Requerem isolamento de banco de dados para testes E2E
