import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import visualizer from 'rollup-plugin-visualizer'

function pathResolve(...args) {
  return resolve(__dirname, '.', ...args)
}

// https://vitejs.dev/config/
export default defineConfig(params => {
  const { command, mode } = params
  const ENV = loadEnv(mode, process.cwd())
  console.info(`running mode: ${mode}, command: ${command}, ENV: ${JSON.stringify(ENV)}`)

  return {
    plugins: getPlugins(),
    base: './',
    resolve: {
      extensions: ['.json', '.js', '.jsx', '.ts', 'tsx', '.vue'],
      alias: {
        '@': pathResolve('src'),
        '#': pathResolve('types'),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          // additionalData: `$injectedColor: orange;`
          additionalData: '@import "@/assets/stylesheets/globalInjectedData.scss";'
        },
        less: {
          // modifyVars: {
          //   '@primary-color': '#1990EB',
          // },
          // javascriptEnabled: true,
        }
      },
      // please config in postcss.config.js
      // postcss: {
      //   plugins: []
      // }
    },
    build: {
      rollupOptions: {
        output:{
          manualChunks: {
            // 'lodash-es': ['lodash-es'],
          }
        }
      }
    }
  }
})

function getPlugins(): any[] {
  const plugins = [
    vue(),
    vueJsx(),
    AutoImport({
      dts: 'types/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: 'types/components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
  ]

  if (process.env.FOR_ANALYTICS) {
    plugins.push(visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }))
  }

  return plugins
}
