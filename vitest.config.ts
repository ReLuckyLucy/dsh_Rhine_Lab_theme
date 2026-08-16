import { defineConfig } from 'vitest/config'

export default defineConfig({
  css: { modules: { classNameStrategy: 'non-scoped' } },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx'],
    restoreMocks: true,
  },
})
