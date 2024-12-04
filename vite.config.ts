import { defineConfig } from 'vite'
import { resolve, relative, extname } from 'path'
import { glob } from "glob"
import { fileURLToPath } from 'node:url'
import react from "@vitejs/plugin-react"
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry:  resolve(__dirname, 'src/main.ts'),
      name: 'MyDs',
      fileName: 'my-ds',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(glob.sync('src/**/*.{ts,tsx}').map(
        file => [
          relative('src', file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url))
        ]
      )),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js'
      }
    },
  },
  plugins: [react(), dts({ tsconfigPath: './tsconfig.app.json' }), libInjectCss()],
})
