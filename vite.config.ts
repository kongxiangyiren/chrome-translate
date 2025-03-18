import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ElementPlus from 'unplugin-element-plus/vite'
import tailwindcss from '@tailwindcss/vite'

import cdn from 'vite-plugin-cdn-import'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/chrome-translate/',
  plugins: [
    vue(),
    vueDevTools(),
    ElementPlus({}),
    tailwindcss(),
    cdn({
      modules: [
        'vue',
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: 'dist/index.full.js',
          css: 'dist/index.css',
        },
      ],
    }),
    VitePWA({
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
    }),
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
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
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
})
