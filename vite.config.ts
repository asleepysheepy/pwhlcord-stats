import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const isStorybook = process.argv[1]?.includes('storybook')
const loadReactRouter = !isStorybook && !process.env.VITEST

export default defineConfig({
  plugins: [tailwindcss(), loadReactRouter && reactRouter(), tsconfigPaths()],
  test: {
    include: ['./app/**/*.test.{ts,tsx}'],
    setupFiles: ['./test/setup-tests.ts'],
    restoreMocks: true,
    environment: 'jsdom',
  },
})
