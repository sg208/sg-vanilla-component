import { resolve } from "node:path"
import { defineConfig } from "vite"

const projectDir = import.meta.dirname
const root = resolve(projectDir, "src")
const outDir = resolve(projectDir, "dist")

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "./index.html"),
        result: resolve(root, "./result/index.html"),
        about: resolve(root, "./about/index.html"),
      },
    },
  },
})
