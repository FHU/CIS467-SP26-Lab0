import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: ["./src/tests/globalSetup.ts"],
    sequence: {
      concurrent: false,
      shuffle: false,
    },
  },
});