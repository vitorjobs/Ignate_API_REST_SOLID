import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // Forçar Vitest a usar CommonJS
    environment: 'node',
    globals: true,
    // Especificar extensões de arquivo
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/build/**', '**/node_modules/**'],
  },
})
