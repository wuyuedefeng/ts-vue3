import { createApp } from 'vue'

import App from './App.vue'
import store from './store';

import './assets/stylesheets/application.scss'

createApp(App).use(store).mount('#app')
