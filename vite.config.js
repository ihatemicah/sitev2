import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Routes in src/router.jsx. Each gets a copy of index.html at the build root, so
// GitHub Pages serves /about and /writing directly (no 404 redirect hack), and the
// relative asset paths still resolve because the copies sit next to index.html.
const ROUTE_PAGES = {
  about: 'About — Micah Carroll',
  writing: 'Writing — Micah Carroll',
}

function routePages() {
  return {
    name: 'route-pages',
    apply: 'build',
    // after Vite's own HTML plugin has put index.html in the bundle
    enforce: 'post',
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (!index) return
      const html = String(index.source)
      for (const [slug, title] of Object.entries(ROUTE_PAGES)) {
        this.emitFile({
          type: 'asset',
          fileName: `${slug}.html`,
          source: html
            .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
            .replace(/(<link rel="canonical" href="[^"]*\/)"/, `$1${slug}"`),
        })
      }
    },
  }
}

// https://vite.dev/config/ — base './' so assets resolve on github.io/<repo>/ or a custom domain
export default defineConfig({
  base: './',
  plugins: [
    routePages(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        experiments: resolve(__dirname, 'experiments.html'),
      },
    },
  },
})
