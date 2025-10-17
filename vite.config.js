import { defineConfig } from 'vite'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default defineConfig({
  root: 'src',                  // <-- index.html is inside src/
  publicDir: '../static',       // optional static folder
  base: process.env.NODE_ENV === 'production'
    ? '/Jagape-ITE18-Act1.9/' // GitHub repo name
    : '/',
  server: {
    host: true,
    open: !isCodeSandbox
  },
  build: {
    outDir: '../dist',           // build goes to root/dist
    emptyOutDir: true,
    sourcemap: true
  }
})