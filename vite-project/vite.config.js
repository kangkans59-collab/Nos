import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy the existing Express backend's routes through the Vite dev
    // server so the frontend can call fetch('/auth/...') / fetch('/seller')
    // without hitting CORS (the backend at vite-project/backend sets no
    // CORS headers, and per instructions it isn't being modified). The
    // backend listens on port 6000 — see vite-project/backend/server.js.
    proxy: {
      '/auth': 'http://localhost:6000',
      '/seller': 'http://localhost:6000',
    },
  },
})
