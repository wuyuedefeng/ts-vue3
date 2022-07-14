import { App } from 'vue'
import VirtualForm from './VirtualForm.vue'
import VirtualTable from './VirtualTable.vue'

export default {
  isntall(app: App) {
    app.component('VirtualForm', VirtualForm)
    app.component('VirtualTable', VirtualTable)
  }
}

