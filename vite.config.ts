import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  dts({
    include: ['src/**/*.ts','src/**/*.vue'],
    outDir: 'dist',
    staticImport: true
  })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'vuePopupLayer',
      fileName: (format) => `vue-popup-layer.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named', // 添加这一行
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
