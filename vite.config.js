import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig({
  base: '/DJTEFFO/',
  plugins: [react()],
  define: {
    // true si existe public/epk/DJ-TEFFO-EPK.pdf al momento del build (reinicia `npm run dev` si lo agregas)
    __EPK_EXISTS__: JSON.stringify(fs.existsSync(path.resolve('public/epk/DJ-TEFFO-EPK.pdf'))),
  },
  server: {
    port: 3000,
    open: true
  }
})
