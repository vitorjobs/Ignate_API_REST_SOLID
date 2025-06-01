// # Explicação da Configuração do Vitest
// Este código configura o Vitest (framework de testes para JavaScript/TypeScript) para um projeto com testes unitários e E2E (end-to-end). 


// defineConfig: Função do Vitest para definir configurações
// tsconfigPaths: Plugin que resolve caminhos de importação definidos no tsconfig.json
// plugins: [tsconfigPaths()]: Habilita o uso de aliases de importação


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


// # Configurações Globais
// environment: 'node': Roda testes em ambiente Node.js(não no navegador)
// globals: true: Habilita variáveis globais do Vitest(describe, test, expect, etc.)
// include: Padrão de arquivos que serão considerados testes
// exclude: Pastas ignoradas nos testes

// Forçar Vitest a usar CommonJS

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',

    // Configuração de cobertura
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        '**/node_modules/**',
        '**/build/**',
        '**/prisma/**',
        'vite.config.ts',
        '**/*.spec.ts',
        '**/test/**',
        '**/*.d.ts',
        '**/types/**'
      ],
      all: true // Força análise de todos os arquivos, mesmo não testados
    },

    // Configuração dos workspaces
    workspace: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/use-cases',
          // Configurações específicas para testes unitários

        }
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment: './prisma/vitest-environment-prisma/prisma-test-environment.ts',
          // Configurações específicas para testes e2e

        }
      }
    ],

    environment: 'node',
    globals: true,
    include: ['**/*.spec.ts'], // Padrão para arquivos de teste
    exclude: [
      '**/node_modules/**',
      '**/build/**',
      '**/prisma/**',
      'vite.config.ts'
    ],
  },
})
