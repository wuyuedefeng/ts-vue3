import { createApp, render } from 'vue'

import App from './App.vue'
import store from './store';

import './assets/stylesheets/application.scss'
import http from './utils/http'

const app = createApp(App)
app.use(store).mount('#app')

// 配置到全局变量中 const gv = getCurrentInstance().appContext.config.globalProperties
app.config.globalProperties.$http = http

app.render = (vnode, rootContainer) => {
  if (vnode && !vnode.appContext) vnode.appContext = app._context
  render(vnode, rootContainer)
}