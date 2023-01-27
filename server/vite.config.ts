import { defineConfig } from "vitest/config"
import { alias } from "./alias"

export default defineConfig({
  test: {
    
    coverage: {
      reporter: ["html", "text", "json-summary", "json"],
      provider: "c8",
    }
  },
  root: ".",
  esbuild: {
    tsconfigRaw: "{}",
  },
  resolve: {
    alias,
  },
})