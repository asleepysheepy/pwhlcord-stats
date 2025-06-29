import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const isStorybook = process.argv[1]?.includes('storybook')

export default defineConfig({
  plugins: [tailwindcss(), !isStorybook && reactRouter(), tsconfigPaths()],
  test: {
    include: ['./app/**/*.test.{ts,tsx}'],
    setupFiles: ['./test/setup-tests.ts'],
    restoreMocks: true,
  },
})
