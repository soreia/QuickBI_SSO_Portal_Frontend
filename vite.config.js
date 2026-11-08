import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      host: '127.0.0.1',
      port: Number(env.VITE_DEV_PORT || 5173),
      strictPort: false,
      open: false,
      proxy: {
        // 后端本地服务（Spring Boot / QuickBI 网关）默认 8081
        '/api': {
          target: env.VITE_PROXY_TARGET || 'http://127.0.0.1:8081',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    preview: {
      port: Number(env.VITE_PREVIEW_PORT || 4173),
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode !== 'production',
      chunkSizeWarningLimit: 800,
    },
  }
})
