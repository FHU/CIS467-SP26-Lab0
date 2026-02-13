import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        env: {
            //NODE_ENV: 'test',
            DATABASE_URL: 'file:./test.db'
        },
        fileParallelism: false,
    }})