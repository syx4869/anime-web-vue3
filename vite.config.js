import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/graphql': {
        target: 'https://graphql.anilist.co',
        changeOrigin: true,
        secure: false
      }
    }
  }
})