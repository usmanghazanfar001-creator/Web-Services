import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import seoPlugin from './seo-plugin.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  // Ignore any stray postcss.config.js in parent folders (e.g. an old Tailwind v3 setup)
  css: { postcss: { plugins: [] } },
})
