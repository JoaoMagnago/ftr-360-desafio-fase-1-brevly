import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['./src/test/setup.ts'],
    pool: 'forks', // ensures isolated processes
    sequence: {
      concurrent: false, // run tests sequentially
    },
  },
})
