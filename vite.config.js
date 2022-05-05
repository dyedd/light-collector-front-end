import {
  defineConfig,
  loadEnv
} from 'vite'
// import Components from 'unplugin-vue-components/vite'
// import {
//   AntDesignVueResolver,
// } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({
  mode
}) => {
  const config = loadEnv(mode, './')
  return {
    server: {
      proxy: {
        '/http': {
          target: config.VITE_REQUEST,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/http/, '')
        },
        '/giteeUrl': {
          target: 'https://gitee.com/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/giteeUrl/, '')
        },
      }
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/var.scss";`
        }
      }
    },
    plugins: [
      vue(),
      // Components({
      //   resolvers: [AntDesignVueResolver()]
      // })
    ]
  }
})