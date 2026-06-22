import naive from 'naive-ui'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './style.css'
import 'naive-schema-form/style.css'

const app = createApp(App)
app.use(naive)
app.use(router)
app.mount('#app')
