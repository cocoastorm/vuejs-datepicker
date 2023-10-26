import fs from 'node:fs';
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url';
import {defineConfig} from 'vite'
import Vue from '@vitejs/plugin-vue'

const locales = fs.readdirSync('./src/locale/translations').map((locale) => ([
  path.join('locale/translations', path.basename(locale, '.js')),
  path.resolve(__dirname, 'src/locale/translations', locale),
]))

export default defineConfig({
  plugins: [
    Vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: {
        'vuejs-datepicker': path.resolve(__dirname, 'src/main.js'),
        ...Object.fromEntries(locales),
        'locale/index': path.resolve(__dirname, 'src/locale/index.js'),
      },
      name: '@tunezilla/vuejs-datepicker',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
})
