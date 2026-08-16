import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@deepseek-ai/dsh-client-runtime/client': fileURLToPath(
        new URL('./tests/dsh-client-runtime.stub.ts', import.meta.url),
      ),
    },
  },
  css: { modules: { classNameStrategy: 'non-scoped' } },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx'],
    restoreMocks: true,
  },
})
