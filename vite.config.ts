import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ElementPlus from 'unplugin-element-plus/vite'
import tailwindcss from '@tailwindcss/vite'

import cdn from 'vite-plugin-cdn-import'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log('mode', mode)

  const background: Record<string, string> =
    mode === 'chrome' ? { background: resolve('src/background.ts') } : {}

  return {
    base: mode === 'chrome' ? './' : '/chrome-translate/',
    plugins: [
      vue(),
      vueDevTools(),
      ElementPlus({}),
      tailwindcss(),
      mode !== 'chrome'
        ? cdn({
            prodUrl: '//unpkg.com/{name}@{version}/{path}',
            modules: [
              'vue',
              {
                name: 'element-plus',
                var: 'ElementPlus',
                path: 'dist/index.full.js',
                css: 'dist/index.css',
              },
              // {
              //   name: '@element-plus/icons-vue',
              //   var: 'ElementPlusIconsVue',
              //   path: 'dist/index.iife.min.js',
              // },
            ],
          })
        : undefined,
      mode !== 'chrome'
        ? VitePWA({
            devOptions: {
              enabled: false,
            },
            registerType: 'autoUpdate',
            injectRegister: 'inline',
            manifest: {
              description: 'chrome翻译',
              theme_color: '#DDE3E9',
              background_color: '#DDE3E9',
              icons: [
                //添加图标， 注意路径和图像像素正确
                {
                  src: '512x.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
              ],
            },
          })
        : undefined,
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      reportCompressedSize: false,
      // 打包目录
      outDir: './dist',

      // 静态文件管理,assetsDir和rollupOptions二选一
      // assetsDir:"assets",
      rollupOptions: {
        input: {
          main: resolve('index.html'),
          ...background,
        },
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'background') {
              return 'background.js'
            } else {
              return 'assets/js/[name]-[hash].js'
            }
          },
        },
      },

      // 移除log
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console.log()
          drop_console: true,
          //生产环境时移除debugger
          drop_debugger: false,
        },
      },
    },
  }
})
