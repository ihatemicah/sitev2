import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/ — GitHub Pages: https://vite.dev/guide/static-deploy#github-pages
export default defineConfig({
  base: '/sitev2/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
