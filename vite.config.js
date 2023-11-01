import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const locales = fs.readdirSync('./src/locale/translations').map((locale) => ([
  path.join('locale/translations', path.basename(locale, '.js')),
  path.resolve(__dirname, 'src/locale/translations', locale)
]))

export default defineConfig({
  plugins: [
    Vue(),
    dts({
      copyDtsFiles: true,
      outDir: [
        'dist',
        'types'
      ],
      staticImport: true,
      // rollupTypes: true,
      compilerOptions: {
        declarationMap: true
      },
      include: [
        path.resolve(__dirname, '*.d.ts'),
        path.resolve(__dirname, 'src/components/Datepicker.vue'),
        path.resolve(__dirname, 'src/locale')
      ],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('components/Datepicker.vue', 'vuejs-datepicker'),
        content: content.replace('Datepicker.vue', 'vuejs-datepicker')
      })
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: {
        'vuejs-datepicker': path.resolve(__dirname, 'src/components/Datepicker.vue'),
        ...Object.fromEntries(locales),
        'locale/index': path.resolve(__dirname, 'src/locale/index.js')
      },
      name: '@tunezilla/vuejs-datepicker',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
