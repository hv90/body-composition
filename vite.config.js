import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativo: serve tanto em usuario.github.io/<repo>/ quanto na raiz,
// sem precisar saber o nome do repositorio antes do deploy.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist', chunkSizeWarningLimit: 1200 }
})
