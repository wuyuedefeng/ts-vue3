import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

function pathResolve(...args) {
  return resolve(__dirname, '.', ...args)
}

// https://vitejs.dev/config/
export default defineConfig(params => {
  const { command, mode } = params
  const ENV = loadEnv(mode, process.cwd())
  console.info(`running mode: ${mode}, command: ${command}, ENV: ${JSON.stringify(ENV)}`)

  return {
    base: './',
    resolve: {
      extensions: ['.json', '.js', '.jsx', '.ts', 'tsx', '.vue'],
      alias: {
        '@': pathResolve('src')
      }
    },
    plugins: [
      vue(),
      vueJsx(),
    ]
  }
})
