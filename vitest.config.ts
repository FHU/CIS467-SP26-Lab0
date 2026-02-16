import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    env: {
        DATABASE_URL: "file:./test.db"
    },
    fileParallelism: false,
    setupFiles: './src/test/setup.ts',
  },
});