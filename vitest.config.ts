import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    // Run tests sequentially to avoid database conflicts
    fileParallelism: false,
  },
});