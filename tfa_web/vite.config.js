import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 5177,
    strictPort: true, // ✅ prevent changing port
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5177,
      overlay: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
