import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  root: 'client',
  envDir: '..',
  publicDir: '../site-public',
  plugins: [react()],
  server: {
    fs: { allow: ['..'] },
  },
  resolve: {
    alias: { '/src': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: true,
  },
})
