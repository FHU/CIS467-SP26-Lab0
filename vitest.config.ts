import {defineConfig} from "vitest/config"

export default defineConfig({
    test: {
        globals: true,
        globalSetup: "src/tests/setup.js",
        env: {
            DATABASE_URL: "file:./test.db"
        },
        fileParallelism: false
    }
})