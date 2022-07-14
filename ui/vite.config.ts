import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // @ts-ignore
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  proxy: {
    '/api': {
      target: 'https://localhost:4000/api',
      changeOrigin: true,
      secure: false,
      ws: true,
    }
  }
})
